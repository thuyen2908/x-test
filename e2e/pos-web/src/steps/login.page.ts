import { expect } from '@playwright/test';
import { Fixture } from 'playwright-bdd/decorators';

import { constants, PageId } from '#const';
import { env } from '#env';

import { xPage } from './x.page';

const posConfig = env.posConfig;

export
@Fixture('loginPage')
class LoginPage extends xPage {
	override open() {
		return this.page.goto(constants.PageUrl[PageId.LOGIN]);
	}

	/**
	 * A list of this page specific locators
	 */
	public override get locators() {
		const { page } = this;

		return {
			...super.locators,

			emailInput: page.locator('input[name="email"]'),
			passwordInput: page.locator('input[name="password"]'),

			businessDayResetPrompt: page.getByText('Business Day is incorrect!', {
				exact: true,
			}),
		};
	}

	/* -------------------------------- BDD steps ------------------------------- */

	/**
	 * Enter admin's email and password
	 */
	public async keyInAdminEmailPassword() {
		const { locators } = this;

		await locators.emailInput.fill(posConfig.adminEmail);
		await locators.passwordInput.fill(posConfig.adminPassword);
	}

	/**
	 * Capture the screenshot of the login form
	 */
	public captureLoginFormScreenshot() {
		return expect(this.page).toHaveScreenshot('login-form.png');
	}

	/**
	 * Submit the login form
	 */
	public submitLogin() {
		return this.page
			.getByRole('button', { name: 'SIGN IN', exact: true })
			.click();
	}

	/**
	 * Reset the Business Day if prompted
	 */
	public resetBusinessDay() {
		return this.page
			.getByRole('button', { name: 'Reset', exact: true })
			.click();
	}
}
