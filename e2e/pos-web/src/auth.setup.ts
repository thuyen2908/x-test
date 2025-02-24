import { resolve } from 'node:path';

import { expect } from '@playwright/test';
import { ensureFile } from 'fs-extra/esm';

import { constants, PageId, UserRole } from './const';
import { env } from './env';
import { test as setup } from './steps/fixtures';

const __dirname = import.meta.dirname;
const posConfig = env.posConfig;

setup('Authentication: Admin role', async ({ page, xPage }) => {
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
	await loginPage.keyInAdminEmailPassword();

	// visual check
	await page.waitForLoadState('networkidle'); // wait until the background image fully loaded
	await loginPage.captureLoginFormScreenshot();

	// submit login
	await loginPage.submitLogin();

	const businessDayResetPrompt = loginPage.locators.businessDayResetPrompt;
	const adminName = loginPage.locators.merchantInfo.getByText(
		posConfig.adminName,
	);

	// wait until the loading spinner is gone
	await expect(businessDayResetPrompt.or(adminName)).toBeVisible({
		// currently, look like the login process is quite slow, re-adjust this value in the future if necessary
		timeout: 30_000,
	});

	// reset business date if prompted
	if (await businessDayResetPrompt.isVisible()) {
		await loginPage.resetBusinessDay();

		// wait until the homepage is loaded
		expect(adminName).toBeVisible();
	}

	// persist all browser context to the auth storage
	await page.context().storageState({ path: authStorage });
});
