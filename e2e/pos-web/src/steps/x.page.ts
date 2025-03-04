import { type Locator, type Page, expect } from '@playwright/test';
import { Fixture, Given, When } from 'playwright-bdd/decorators';

import { constants } from '#const';
import type { PageId } from '#types';

import type { TestConfig } from '../test-config';
import type { TestStorage } from '../test-storage';

import type { TimesheetAction } from './parameters';

declare global {
	interface Window {
		chrome: Record<string, unknown>;
	}
}

/**
 * The base Page class, every other [POM (Page Object Model)](https://playwright.dev/docs/pom)
 * 	should extend this class.
 * This class also includes utility steps that are common to all pages
 */
export
@Fixture('xPage')
class xPage {
	constructor(
		protected readonly testConfig: TestConfig,
		protected readonly testStorage: TestStorage,
		protected readonly page: Page,
	) {
		// A solution for the issue of unable to click the "PAYMENT" button.
		// Somehow our POS website relies on window.chrome.webview to function properly,
		//   the `chrome` property is `undefined` in headless browsers,
		// 	 so we receive a cannot read properties of undefined error while trying to click the "PAYMENT" button
		// This is a workaround for the issue
		page.addInitScript(() => {
			window.chrome = {};
		});
	}

	/* ----------------------------- Utility methods ---------------------------- */

	/**
	 * Open the page in the browser, this method should be overridden by subclasses
	 */
	protected open(): ReturnType<Page['goto']> {
		return Promise.resolve(null);
	}

	/**
	 * A list of this page specific locators
	 */
	public get locators() {
		const { page } = this;

		const dialog = (dialogTitle: string, id = 'alert-dialog-title') =>
			page.locator('div[role="dialog"]', {
				has: page.locator(`#${id}`, {
					hasText: dialogTitle,
				}),
			});
		const draggableDialog = (dialogTitle: string) =>
			dialog(dialogTitle, 'draggable-dialog-title');

		const pageHeader = page.locator('div.xHeader__top');

		const companyProfile = pageHeader.locator('div.xCompanyProfile');
		const merchantInfo = companyProfile.locator('ul.xHeader__info');

		return {
			dialog,
			draggableDialog,
			dialogCloseButton: (dialogLocator: Locator, buttonTitle = 'Close') =>
				dialogLocator.locator(`button[title="${buttonTitle}"]`),

			toast: page.locator('div.MuiAlert-message'),

			pageHeader,
			pageName: pageHeader.locator('p.pageName'),
			pageDetail: pageHeader.locator('p.pageDetail'),

			companyProfile,
			merchantInfo,
			merchantName: merchantInfo.locator(
				'li.merchantInfo__dbaName > span.label',
			),
			merchantContact: merchantInfo.locator('li.merchantInfo__address'),

			timesheetButton: page.getByText('Timesheet', { exact: true }),
			clockInButton: page.getByText('Clock In', { exact: true }),
			clockOutButton: page.getByText('Clock Out', { exact: true }),
		};
	}

	/**
	 * Wait for a specific API call to be completed
	 */
	public waitForResponseOfAPI(api: keyof typeof constants.APIs) {
		return this.page.waitForResponse((response) => {
			const [method, url] = constants.APIs[api];
			const request = response.request();

			return request.url().includes(url) && request.method() === method;
		});
	}

	/**
	 * Enter a PIN using the on-screen numpad
	 */
	public async enterPIN(PIN: string, numpadLocator: Locator) {
		for (const pinDigit of PIN) {
			const pinDigitButton = numpadLocator.getByText(pinDigit, { exact: true });
			await pinDigitButton.click();
		}
	}

	/* -------------------------------- BDD steps ------------------------------- */

	@Given('I am on the {pageId} page')
	public gotoPage(pageId: PageId) {
		return this.page.goto(constants.PageUrl[pageId]);
	}

	@When('I clock {timesheetAction} the timesheet with PIN {string}')
	public async clockInTimesheet(timesheetAction: TimesheetAction, PIN: string) {
		const { locators } = this;

		// click on the Timesheet button
		await locators.timesheetButton.click();

		// find and click on the Clock In / Out button
		const clockInOutButton =
			timesheetAction === 'in'
				? locators.clockInButton
				: locators.clockOutButton;
		await clockInOutButton.click();

		// expect the enter password dialog to be visible
		const enterPasswordDialog = locators.dialog('PASSWORD');
		await expect(enterPasswordDialog).toBeVisible();

		// enter the PIN
		await this.enterPIN(PIN, enterPasswordDialog);

		const successfullyClockedInToast = locators.toast.getByText(
			'clocked in successfully',
		); // in case of new session
		const alreadyClockedInToast = locators.toast.getByText('has clocked in'); // in case there's an existing session

		// expect a toast message indicating the result of the operation
		await expect(
			successfullyClockedInToast.or(alreadyClockedInToast),
		).toBeVisible();

		// if the dialog is still visible, close it
		if (await enterPasswordDialog.isVisible()) {
			await locators
				.dialogCloseButton(enterPasswordDialog, 'PASSWORD')
				.click()
				.catch();
		}
	}
}
