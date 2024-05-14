import json
import yaml
import subprocess
import os
import sys
from datetime import datetime

def run_cypress_test(test_file: str) -> int:
    command = f"npx cypress run --spec {test_file}"
    try:
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing Cypress test for {test_file}: {e}")
        return e.returncode

    return 0


def json_to_dict_to_yaml(json_file: str):
    try:
        with open(json_file, 'r') as file:
            json_data = json.load(file)
    except FileNotFoundError:
        print("File not found.")
        return None
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)
        return None

    try:
        yaml_file: str = os.path.join(path_repots, json_file.replace(".json", ".yaml"))
        with open(yaml_file, 'w') as f:
            yaml.dump(json_data, f, default_flow_style=False)

        print(f"Successfully converted JSON file '{json_file}' to YAML file '{yaml_file}'")
    except Exception as e:
        print(f"Error converting JSON to YAML: {str(e)}")

    return json_data


def extract_values(keys, result_dict):
    res = {}
    stats = result_dict.get('stats', {})

    for key in keys:
        res[key] = stats.get(key, None)

    # Convert to seconds
    if isinstance(res['duration'], int):
        res['duration'] = int(res['duration'] / 1000)

    return res


def send_to_zabbix(server, host, prefix, stats, suffix=''):
    for key, value in stats.items():
        zabbix_sender_cmd = ['zabbix_sender', '-z', server, '-p', '10051', '-s', host, '-k', prefix + key + suffix, '-o', str(value)]
        print(f" Z {key}: {value}")
        zabbix_sender_process = subprocess.Popen(zabbix_sender_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        zabbix_sender_output, zabbix_sender_error = zabbix_sender_process.communicate()

        if zabbix_sender_process.returncode != 0:
            print("Error sending data to Zabbix, cmdline:", zabbix_sender_cmd)
            print("Error sending data to Zabbix, stdout:", zabbix_sender_output.decode())
            print("Error sending data to Zabbix, stderr:", zabbix_sender_error.decode())


if __name__ == "__main__":

    zabbix_host: str = 'sec-tester10'
    zabbix_server: str = 'zabbix.bcresearch.eu'

    path_tests: str = '/root/cypress/securea-zabbix/cypress/e2e'
    path_repots: str = '/root/cypress/securea-zabbix/mochawesome-report'

    tests = {
        'tlsCheck': 'tlsCheck.json',
        'assetIdentificationMVP': 'assetIdentificationMVP.json',
        'controllBrowserMVP': 'controllBrowserMVP.json',
        'threatBrowserMVP': 'threatBrowserMVP.json',
        'riskAssessmentMVP': 'riskAssessmentMVP.json',
    }

    stats_keys = ['tests', 'pending', 'failures', 'start', 'end', 'duration']
    aggregates = {'returncode': 0, 'start': None, 'end': None, 'tests': 0, 'pending': 0, 'failures': 0, 'duration': 0, 'ok': 0}

    os.chdir("/root/cypress/securea-zabbix")

    discovery = []

    for test, file_res in tests.items():
        stats = {}
        file_test = test + '.cy.js'

        # Run the test
        print(f"{test}:")
        stats['returncode'] = run_cypress_test(os.path.join(path_tests, file_test))

        result_dict = json_to_dict_to_yaml(os.path.join(path_repots, file_res))

        if not result_dict:
            continue

        # Extract stats from the results
        stats.update(extract_values(stats_keys, result_dict))
        stats['ok'] = int(stats['tests'] - stats['failures'])

        if aggregates['start'] is None:
            aggregates['start'] = stats['start']
        aggregates['end'] = stats['end']
        aggregates['duration'] += stats['duration']
        aggregates['tests'] += stats['tests']
        aggregates['failures'] += stats['failures']
        aggregates['ok'] += stats['ok']
        aggregates['returncode'] += max(aggregates['returncode'], stats['returncode'])

        # Extract and collect titles from the results for Zabbix discovery
        key = test
        title = result_dict['results'][0]['title']
        discovery.append({'name': key, 'title': title})

        # Process special cases
        if 'tlsCheck' in file_test and isinstance(result_dict, dict):
            test_results = result_dict['results'][0]['suites'][0]['tests']
            for test_res in test_results:
                if test_res['title'] == 'valid until':
                    context = test_res['context'].replace('"', '')
                    stats['outStr'] = context
                    try:
                        date = datetime.strptime(context, '%d%m%Y')
                        stats['outNum'] = int(date.timestamp())
                    except:
                        stats['outNum'] = 0

        # Print stats
        yaml.dump(stats, sys.stdout, default_flow_style=False)

        # Send stats to Zabbix
        send_to_zabbix(zabbix_server, zabbix_host, f'bcr.cypress[{key}, ', stats, ']')

    # Write the aggregated stats to Zabbix
    key: str = "_total"
    send_to_zabbix(zabbix_server, zabbix_host, f'bcr.cypress[{key}, ', aggregates, ']')

    # Write Zabbix discovery data to a file as JSON
    with open('/tmp/cypress_discovery.json', 'w') as f:
        json.dump(discovery, f)
