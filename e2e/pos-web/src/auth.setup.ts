import path from 'node:path';
import { expect, test as setup } from '@playwright/test';
import { ensureFile } from 'fs-extra/esm';

import { constants } from './const';
import { env } from './env';
import { PageId } from './typings';

const __dirname = import.meta.dirname;

// resolve the path to auth storage files
const userAuthStorage = path.resolve(
	__dirname,
	'..',
	constants.AuthStorage.user,
);

setup('authentication', async ({ page }) => {
	// make sure that the path is ready
	await ensureFile(userAuthStorage);

	const posConfig = env.posConfig;

	// go to login page
	await page.goto(constants.PageUrl[PageId.LOGIN]);

	// key in username & password
	await page.fill('input[name="email"]', posConfig.username);
	await page.fill('input[name="password"]', posConfig.password);

	// visual check
	await page.waitForLoadState('networkidle'); // wait until the background image fully loaded
	await expect(page).toHaveScreenshot('filled-login-form.png');

	// submit login
	await page.getByRole('button', { name: 'SIGN IN' }).click();

	const businessDateResetPrompt = page.getByText('Business Day is incorrect!');
	const salonName = page.getByText(posConfig.salonName);

	// wait until the loading spinner is gone
	await expect(businessDateResetPrompt.or(salonName)).toBeVisible({
		// currently, look like the login process is quite slow, re-adjust in the future if necessary
		timeout: 10000,
	});

	// reset business date if there's a warning prompt
	if (await businessDateResetPrompt.isVisible()) {
		await page.getByRole('button', { name: 'Reset' }).click();

		// wait until the homepage is loaded
		expect(salonName).toBeVisible();
	}

	// persist all browser context to the auth storage
	await page.context().storageState({ path: userAuthStorage });
});
