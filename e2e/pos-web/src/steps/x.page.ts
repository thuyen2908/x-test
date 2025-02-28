import { type Locator, type Page, expect } from '@playwright/test';
import { Fixture, Given, When } from 'playwright-bdd/decorators';

import { PageId } from '#const';

import type { TimesheetAction } from './parameters';

declare global {
	interface Window {
		chrome: Record<string, unknown>;
	}
}

/**
 * When create a new POM, add it here to use the universal `gotoPage` method
 */
const getPOMPageIdMap = async () => ({
	[PageId.LOGIN]: await import('./login.page').then((m) => m.LoginPage),
	[PageId.HOME]: await import('./home.page').then((m) => m.HomePage),
});

type POMPageIdMap = Awaited<ReturnType<typeof getPOMPageIdMap>>;

/**
 * The base Page class, every other [POM (Page Object Model)](https://playwright.dev/docs/pom)
 * 	should extend this class.
 * This class also includes utility steps that are common to all pages
 */
export
@Fixture('xPage')
class xPage {
	constructor(protected readonly page: Page) {
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
	 * Go to a specific page
	 *
	 * @returns The POM (Page Object Model) object of the target page
	 */
	public async goto<TPageId extends keyof POMPageIdMap>(
		pageId: TPageId,
	): Promise<InstanceType<POMPageIdMap[TPageId]>> {
		const pomPageIdMap = await getPOMPageIdMap();

		const targetPage = new pomPageIdMap[pageId](this.page);
		await targetPage.open();

		return targetPage as InstanceType<POMPageIdMap[TPageId]>;
	}

	/**
	 * A list of this page specific locators
	 */
	public get locators() {
		const { page } = this;

		const merchantInfo = page.locator('ul', {
			has: page.locator('li.merchantInfo__dbaName'),
		});

		const dialog = (dialogTitle: string) =>
			page.locator('div[role="dialog"]', {
				has: page.locator('#alert-dialog-title', {
					hasText: dialogTitle,
				}),
			});

		return {
			/**
			 * Locate the dialog element by its title
			 */
			dialog,
			/**
			 * Locate the close button of an open dialog
			 */
			dialogCloseButton: (dialogTitle: string, buttonTitle = 'Close') =>
				dialog(dialogTitle).locator(`button[title="${buttonTitle}"]`),

			toast: page.locator('div.MuiAlert-message'),

			merchantInfo,

			timesheetButton: page.getByText('Timesheet', { exact: true }),
			clockInButton: page.getByText('Clock In', { exact: true }),
			clockOutButton: page.getByText('Clock Out', { exact: true }),
		};
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
		return this.goto(pageId);
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
			await locators.dialogCloseButton('PASSWORD').click().catch();
		}
	}
}
