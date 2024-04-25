import json
import yaml
import subprocess
from pathlib import Path
import os

os.chdir("C:/Users/mzvalo/Desktop/Cypress-Securea/cypress-securea")


def run_cypress_tests(test_files):
    for test_file in test_files:
        command = f"npx cypress run --spec {test_file}"
        try:
            subprocess.run(command, shell=True, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error executing Cypress test for {test_file}: {e}")


def json_to_yaml(json_file, yaml_file):
    try:
        with open(json_file, 'r') as f:
            json_data = json.load(f)

        with open(yaml_file, 'w') as f:
            yaml.dump(json_data, f, default_flow_style=False)

        print(f"Successfully converted JSON file '{json_file}' to YAML file '{yaml_file}'")
    except Exception as e:
        print(f"Error converting JSON to YAML: {str(e)}")


def json_file_to_dict(file_path):
    try:
        with open(file_path, 'r') as json_file:
            data_dict = json.load(json_file)
            return data_dict
    except FileNotFoundError:
        print("File not found.")
        return None
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)
        return None

def extract_values(result_dict):
    stats = result_dict.get('stats', {})
    tests, failures, pending, start, end, duration = (
        stats.get(key) for key in ['tests', 'failures', 'pending', 'start', 'end', 'duration'])
    context = result_dict.get("results", [])
    elist = [i["context"] for adict in context[:1] for bdict in adict.get("suites", [])
             for cdict in [bdict] for ddict in [cdict.get("tests", [])]
             for i in ddict if i.get("context") is not None]
    return tests, pending, failures, start, end, duration, elist,

# def send_to_zabbix(yaml_file, tests, pending, failures, start, end, duration, contexts):
#     hostname = 'your_hostname'
#     zabbix_sender_cmd = ['zabbix_sender', '-z', 'your_zabbix_server', '-s', hostname, '-i', yaml_file]

#     data = [
#         (hostname, 'tests', tests),
#         (hostname, 'pending', pending),
#         (hostname, 'failures', failures),
#         (hostname, 'start', start),
#         (hostname, 'end', end),
#         (hostname, 'duration', duration),
#         (hostname, 'contexts', contexts),
#     ]

#     for item in data:
#         zabbix_sender_cmd.extend(['-k', item[1], '-o', str(item[2])])

#     zabbix_sender_process = subprocess.Popen(zabbix_sender_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#     zabbix_sender_output, zabbix_sender_error = zabbix_sender_process.communicate()

#     if zabbix_sender_process.returncode == 0:
#         print("Data sent to Zabbix successfully.")
#     else:
#         print("Error sending data to Zabbix:", zabbix_sender_error.decode())


if __name__ == "__main__":
    test_files = [
        Path("cypress/e2e/securea/tlsCheck.cy.js"),
        Path("cypress/e2e/securea/settingsTab.cy.js")
    ]
    run_cypress_tests(test_files)
    json_file_path = [
        Path('mochawesome-report/tlsCheck.json'),
        Path('mochawesome-report/settingsTab.json')
    ]
    yaml_file_path = [
        Path('mochawesome-report/tlsCheck.yaml'),
        Path('mochawesome-report/settingsTab.yaml')
    ]
    
    for json_file, yaml_file in zip(json_file_path, yaml_file_path):
        result_dict = json_file_to_dict(json_file)
        json_to_yaml(json_file, yaml_file)
        tests, pending, failures, start, end, duration, elist = extract_values(result_dict)

        if result_dict:
            print("Dictionary from JSON file:")
            print("Extracted values:")
            print(f"Tests: {tests}")
            print(f"Pending: {pending}")
            print(f"Failures: {failures}")
            print(f"Start: {start}")
            print(f"End: {end}")
            print(f"Duration: {duration}")
            if elist is not None:
                print(f"Contexts: {elist}")


            #send_to_zabbix(yaml_file_path, tests, pending, failures, start, end, duration, contexts)

