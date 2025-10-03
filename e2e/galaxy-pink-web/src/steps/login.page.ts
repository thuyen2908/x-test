import { expect } from '@playwright/test';
import { Fixture } from 'playwright-bdd/decorators';

import { constants } from '#const';
import { PageId } from '#types';

import { xPage } from './x.page';

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

			/**
			 * Locate the email input field on the {@link PageId.LOGIN} page
			 */
			emailInput: page.locator('input[name="email"]'),
			/**
			 * Locate the password input field on the {@link PageId.LOGIN} page
			 */
			passwordInput: page.locator('input[name="password"]'),

			/**
			 * Locate the prompt asking to reset the Business Day when logging in on a wrong day
			 */
			businessDayResetPrompt: page.getByText('Business Day is incorrect!', {
				exact: true,
			}),
		};
	}

	/**
	 * Enter admin's email and password
	 */
	public async keyInAdminEmailPassword(email: string, password: string) {
		const { locators } = this;

		await locators.emailInput.fill(email);
		await locators.passwordInput.fill(password);
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
