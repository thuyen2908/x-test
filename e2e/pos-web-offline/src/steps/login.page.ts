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
	 * Wait for all visual resources (CSS background images, `<img>` elements, fonts) to be fully loaded.
	 * This prevents flaky visual regression tests caused by partially-loaded pages in SPA environments
	 * where assets are rendered after the initial JS execution.
	 */
	public async waitForVisualReadiness() {
		const { page } = this;

		// Phase 1: wait for the initial load event (scripts, stylesheets, synchronous images)
		await page.waitForLoadState('load');

		// Phase 2: poll until the SPA has rendered at least one CSS background-image URL.
		//   In React/SPA apps the background-image is often set *after* the load event,
		//   so we need to keep checking until the computed style includes a real URL.
		await page.waitForFunction(
			() => {
				const elements = Array.from(document.querySelectorAll('*'));
				for (const el of elements) {
					const bg = getComputedStyle(el).backgroundImage;
					if (
						bg &&
						bg !== 'none' &&
						bg.includes('url(') &&
						!bg.includes('data:')
					)
						return true;
				}
				return false;
			},
			{ timeout: 30_000 },
		);

		// Phase 3: now that the URLs are in the DOM, wait for every visual asset to be fully decoded
		await page.evaluate(async () => {
			// fonts
			await document.fonts.ready;

			const waitForUrl = (url: string): Promise<void> =>
				new Promise((resolve) => {
					const img = new Image();
					img.onload = () => resolve();
					img.onerror = () => resolve();
					img.src = url;
					if (img.complete) {
						resolve();
						return;
					}
				});

			// CSS background-image URLs
			const bgUrls = new Set<string>();
			const allElements = Array.from(document.querySelectorAll('*'));
			for (const el of allElements) {
				const bg = getComputedStyle(el).backgroundImage;
				if (bg && bg !== 'none') {
					const matches = Array.from(
						bg.matchAll(/url\(["']?([^"')]+)["']?\)/g),
					);
					for (const match of matches) {
						if (match[1] && !match[1].startsWith('data:')) bgUrls.add(match[1]);
					}
				}
			}
			await Promise.all([...bgUrls].map(waitForUrl));

			// <img> elements
			await Promise.all(
				Array.from(document.querySelectorAll('img')).map((img) =>
					img.complete ? Promise.resolve() : img.decode().catch(() => {}),
				),
			);
		});
	}

	/**
	 * Capture the screenshot of the login form
	 */
	public captureLoginFormScreenshot() {
		return expect(this.page).toHaveScreenshot('login-form.png', {
			animations: 'disabled',
		});
	}

	/**
	 * Submit the login form
	 */
	public submitLogin() {
		return this.page
			.getByRole('button', { name: 'SIGN IN', exact: true })
			.click();
	}
}
