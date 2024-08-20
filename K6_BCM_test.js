import { browser } from 'k6/browser';
import { check } from 'k6';
import { BASE_URL } from "../consts.js";
import { login } from "../utils/loginUtils.js";
import { switchTenant } from "../utils/tenantUtils.js";

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==0'],
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(BASE_URL); // Navigate to the base URL

    // Perform login
    await login(page, "QA_user", "zIaNuhpGz8uxZRazhSCU");

    const tenantName = 'cypressTenantLukas';
    if (tenantName) {
      await switchTenant(page, tenantName); // Switch tenant if the tenant name is provided
    }

    // Selecting and clicking Management button
    const management_locator = page.locator('#app > div > div.sidebar.w-20.z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(4) > div > div');
    await management_locator.click();
    await page.waitForTimeout(500);

    // Selecting and clicking BCM button
    let bcm_locator = page.locator('#app > div > div.sidebar.w-\\[24rem\\].z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(4) > div:nth-child(2) > div:nth-child(3) > div > button');
    await bcm_locator.click();
    await page.waitForTimeout(500);

    // Selecting and opening Bussines Processes Browser
    const business_processes_locator = page.locator('#app > div > div.sidebar.w-\\[24rem\\].z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(4) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div > a');
    await business_processes_locator.click();
    await page.waitForTimeout(500);

    // Click Add asset button
    const add_bussines_asset = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div > div > div > div.wrapper__header > div.flex.items-center.justify-center.ml-auto.gap-x-2 > button.p-button.p-component.primary-btn');
    await add_bussines_asset.click();
    await page.waitForTimeout(2500);

    // Set name to new asset
    let asset_name = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\!grid.\\!grid-cols-1.\\@\\[550px\\]\\/main\\:\\!grid-cols-2.\\@\\[850px\\]\\/main\\:\\!grid-cols-3.model-grid.\\!auto-rows-max > div.relative.field.field--hidden > input');
    await asset_name.focus();
    await asset_name.fill('k6 Test asset');
    await page.waitForTimeout(1500);

    // Ensure the asset description field is visible and interactable
    let asset_description = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\!grid.\\!grid-cols-1.\\@\\[550px\\]\\/main\\:\\!grid-cols-2.\\@\\[850px\\]\\/main\\:\\!grid-cols-3.model-grid.\\!auto-rows-max > div:nth-child(2) > textarea');
    await asset_description.focus();
    await asset_description.fill('asset description');
    await page.waitForTimeout(1000);
    
    // Click create button
    let create_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\@\\[350px\\]\\/main\\:p-4.p-2.pt-4.h-fit.max-h-\\[9rem\\] > div > button:nth-child(1)');
    await create_button.click();
    await page.waitForTimeout(1000);



    // Click edit button
    let edit_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div:nth-child(1) > div > form > div.flex.items-center.justify-between.p-1 > div > button:nth-child(1)');
    await edit_button.click();
    await page.waitForTimeout(1000);

    // Editing asset description
    asset_description = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\!grid.\\!grid-cols-1.\\@\\[550px\\]\\/main\\:\\!grid-cols-2.\\@\\[850px\\]\\/main\\:\\!grid-cols-3.model-grid.\\!auto-rows-max > div:nth-child(2) > textarea');
    await asset_description.waitFor({ state: 'visible' });
    await asset_description.focus();
    await asset_description.fill('edited the asset description');
    await page.waitForTimeout(1000);

    // Click save button
    let save_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div:nth-child(1) > div > form > div.\\@\\[350px\\]\\/main\\:p-4.p-2.pt-4.h-fit > div > button.p-button.p-component.primary-btn');
    await save_button.waitFor({ state: 'visible'});
    await save_button.click();
    await page.waitForTimeout(1000);

    // Delete the Asset
    let delete_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div:nth-child(1) > div > form > div.flex.items-center.justify-between.p-1 > div > button:nth-child(2)');
    await delete_button.click();
    await page.waitForTimeout(500);
    delete_button = page.locator('body > div.p-confirm-popup.p-component > div.p-confirm-popup-footer > button.p-button.p-component.p-confirm-popup-accept.p-button-sm');
    await delete_button.click();
    await page.waitForTimeout(500);









    // Click Tenant button
    const tenant_locator = page.locator('#app > div > div.sidebar.w-20.z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(1)');
    await tenant_locator.click();
    await page.waitForTimeout(1000);

    // Click Configuration button
    const configuration_locator = page.locator('#app > div > div.sidebar.w-\\[24rem\\].z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(1) > div:nth-child(2) > div.dropdown.border-black-200.border-black-200 > div > button');
    await configuration_locator.click();
    await page.waitForTimeout(500);
  
    // Click on BCM button
    bcm_locator = page.locator('#app > div > div.sidebar.w-\\[24rem\\].z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(1) > div:nth-child(2) > div.dropdown.border-black-200.border-black-200 > div:nth-child(2) > div > a:nth-child(4) > div > div > button');
    await bcm_locator.click();
    await page.waitForTimeout(500);

    // Click Impacts button
    const impacts_locator = page.locator('#app > div > div.sidebar.w-\\[24rem\\].z-\\[100\\] > div.menu.\\!overflow-x-hidden > div:nth-child(1) > div:nth-child(2) > div.dropdown.border-black-200.border-black-200 > div:nth-child(2) > div > a:nth-child(4) > div > div:nth-child(2) > div');
    await impacts_locator.click()
    await page.waitForTimeout(500);

    // Click on Add button
    const add_impacts_asset = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(1) > div > div > div.wrapper__header > div.flex.items-center.justify-center.ml-auto.gap-x-2 > button.p-button.p-component.primary-btn');
    await add_impacts_asset.click();
    await page.waitForTimeout(2500);

    // Set name to new asset
    asset_name = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\!grid.\\!grid-cols-1.\\@\\[550px\\]\\/main\\:\\!grid-cols-2.\\@\\[850px\\]\\/main\\:\\!grid-cols-3.model-grid.\\!auto-rows-max > div.relative.field.field--hidden > input');
    await asset_name.focus();
    await asset_name.fill('k6 Test asset');
    await page.waitForTimeout(1500);

    // Ensure the asset description field is visible and interactable
    asset_description = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\!grid.\\!grid-cols-1.\\@\\[550px\\]\\/main\\:\\!grid-cols-2.\\@\\[850px\\]\\/main\\:\\!grid-cols-3.model-grid.\\!auto-rows-max > div:nth-child(2) > textarea');
    await asset_description.focus();
    await asset_description.fill('asset description');
    await page.waitForTimeout(1000);
    
    // Click create button
    create_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\@\\[350px\\]\\/main\\:p-4.p-2.pt-4.h-fit.max-h-\\[9rem\\] > div > button:nth-child(1)');
    await create_button.click();
    await page.waitForTimeout(1000);


    // Click edit button
    edit_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div:nth-child(1) > div > form > div.flex.items-center.justify-between.p-1 > div > button:nth-child(1)');
    await edit_button.click();
    await page.waitForTimeout(1000);

    // Editing asset description
    asset_description = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div > div > form > div.\\!grid.\\!grid-cols-1.\\@\\[550px\\]\\/main\\:\\!grid-cols-2.\\@\\[850px\\]\\/main\\:\\!grid-cols-3.model-grid.\\!auto-rows-max > div:nth-child(2) > textarea');
    await asset_description.waitFor({ state: 'visible' });
    await asset_description.focus();
    await asset_description.fill('edited the asset description');
    await page.waitForTimeout(1000);

    // Click save button
    save_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div:nth-child(1) > div > form > div.\\@\\[350px\\]\\/main\\:p-4.p-2.pt-4.h-fit > div > button.p-button.p-component.primary-btn');
    await save_button.waitFor({ state: 'visible'});
    await save_button.click();
    await page.waitForTimeout(1000);

    // Delete the Asset
    delete_button = page.locator('#app > div > div.z-0.flex.flex-col.w-auto.h-full.ml-20 > div.flex-auto.w-full.router-view > div > div:nth-child(3) > div > div:nth-child(1) > div > form > div.flex.items-center.justify-between.p-1 > div > button:nth-child(2)');
    await delete_button.click();
    await page.waitForTimeout(500);
    delete_button = page.locator('body > div.p-confirm-popup.p-component > div.p-confirm-popup-footer > button.p-button.p-component.p-confirm-popup-accept.p-button-sm');
    await delete_button.click();



    await page.waitForTimeout(5000);

  } finally {
    await page.close(); // Ensure the page is closed after the script runs
    await context.close(); // Close the browser context
  }
}
