import { resolve } from 'node:path';

import { expect, test as setup } from '@playwright/test';
import { ensureFile } from 'fs-extra/esm';

import { constants, PageId, UserRole } from './const';
import { env } from './env';

const __dirname = import.meta.dirname;

setup('Authentication: Admin role', async ({ page }) => {
	setup.setTimeout(50_000);

	// make sure that the path is ready
	const authStorage = resolve(
		__dirname,
		'..',
		constants.AuthStorage[UserRole.ADMIN],
	);
	await ensureFile(authStorage);

	const posConfig = env.posConfig;

	// go to login page
	await page.goto(constants.PageUrl[PageId.LOGIN]);

	// key in username & password
	await page.fill('input[name="email"]', posConfig.adminUsername);
	await page.fill('input[name="password"]', posConfig.adminPassword);

	// visual check
	await page.waitForLoadState('networkidle'); // wait until the background image fully loaded
	await expect(page).toHaveScreenshot('filled-login-form.png');

	// submit login
	await page.getByRole('button', { name: 'SIGN IN' }).click();

	const businessDateResetPrompt = page.getByText('Business Day is incorrect!');
	const adminName = page.getByText(posConfig.adminName);

	// wait until the loading spinner is gone
	await expect(businessDateResetPrompt.or(adminName)).toBeVisible({
		// currently, look like the login process is quite slow, re-adjust this value in the future if necessary
		timeout: 30_000,
	});

	// reset business date if there's a warning prompt
	if (await businessDateResetPrompt.isVisible()) {
		await page.getByRole('button', { name: 'Reset' }).click();

		// wait until the homepage is loaded
		expect(adminName).toBeVisible();
	}

	// persist all browser context to the auth storage
	await page.context().storageState({ path: authStorage });
});
