import { resolve } from 'node:path';

import { expect } from '@playwright/test';
import { ensureFile } from 'fs-extra/esm';

import { PageId, UserRole } from '#types';

import { constants } from './const';
import { test as setup } from './steps/fixtures';

const __dirname = import.meta.dirname;

setup('Authentication: Admin role', async ({ page, xPage, testConfig }) => {
	setup.setTimeout(40_000);

	// make sure that the path is ready
	const authStorage = resolve(
		__dirname,
		'..',
		constants.AuthStorage[UserRole.ADMIN],
	);
	await ensureFile(authStorage);

	// go to login page
	const loginPage = await xPage.goto(PageId.LOGIN);

	// key in email & password
	await loginPage.keyInAdminEmailPassword(
		testConfig.adminEmail,
		testConfig.adminPassword,
	);

	// visual check
	await page.waitForLoadState('networkidle'); // wait until the background image fully loaded
	await loginPage.captureLoginFormScreenshot();

	// submit login
	await loginPage.submitLogin();

	const businessDayResetPrompt = loginPage.locators.businessDayResetPrompt;
	const username = loginPage.locators.merchantInfo.getByText(
		testConfig.adminName,
	);

	// wait until the loading spinner is gone
	await expect(businessDayResetPrompt.or(username)).toBeVisible({
		// currently, look like the login process is quite slow, re-adjust this value in the future if necessary
		timeout: 25_000,
	});

	// reset business date if prompted
	if (await businessDayResetPrompt.isVisible()) {
		await loginPage.resetBusinessDay();

		// wait until the homepage is loaded
		expect(username).toBeVisible();
	}

	// persist all browser context to the auth storage
	await page.context().storageState({ path: authStorage });
});
