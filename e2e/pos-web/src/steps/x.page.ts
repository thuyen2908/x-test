import { type Locator, type Page, expect } from '@playwright/test';
import { Fixture, Given, When } from 'playwright-bdd/decorators';

import { constants } from '#const';
import type { PageId, TestOptions } from '#types';

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

		const dialog = (dialogTitle?: string, id = 'alert-dialog-title') => {
			if (dialogTitle)
				return page.locator('div[role="dialog"]', {
					has: page.locator(`#${id}`, {
						hasText: dialogTitle,
					}),
				});

			return page.locator('div[role="dialog"]', {
				has: page.locator(`#${id}`),
			});
		};
		const draggableDialog = (dialogTitle: string) =>
			dialog(dialogTitle, 'draggable-dialog-title');

		const pageHeader = page.locator('div.xHeader__top');

		const companyProfile = pageHeader.locator('div.xCompanyProfile');
		const merchantInfo = companyProfile.locator('ul.xHeader__info');

		return {
			/**
			 * Locate the current opening dialog
			 */
			dialog,
			/**
			 * Locate the current opening `draggable` dialog
			 */
			draggableDialog,
			/**
			 * Locate the content section of a dialog
			 */
			dialogContent: (dialogLocator: Locator) =>
				dialogLocator.locator('div.MuiDialogContent-root'),
			/**
			 * Locate an Action Button of a dialog, ex: "CONFIRM", "CANCEL",...
			 */
			dialogActionButton: (dialogLocator: Locator, buttonText: string) =>
				dialogLocator
					.locator('div.MuiDialogActions-root')
					.getByRole('button', { name: buttonText, exact: true }),
			/**
			 * Locate the Close button of a dialog, ex: "X" button at the top right corner of the dialog
			 */
			dialogCloseButton: (dialogLocator: Locator, buttonTitle = 'Close') =>
				dialogLocator.locator(`button[title="${buttonTitle}"]`),

			/**
			 * Locate the Toast message container
			 */
			toast: page.locator('div.MuiAlert-message'),

			/**
			 * Locate the page's header
			 */
			pageHeader,
			/**
			 * Locate the name of the current page, usually on the top left corner of the page, ex: "Ticket View".
			 * Some pages don't have this element
			 */
			pageName: pageHeader.locator('p.pageName'),
			/**
			 * Locate the page detail section of the current page, usually appears below the page name, ex: "John Doe - #001" (Ticket View page).
			 * Some pages don't have this element
			 */
			pageDetail: pageHeader.locator('p.pageDetail'),

			/**
			 * Locate the Company Profile section of the current Salon + the Breadcrumb element,
			 * 	which is usually located on the top right corner of the page, next to the Calendar element
			 */
			companyProfile,
			/**
			 * Like the {@link companyProfile} locator, except it doesn't include the Breadcrumb element
			 */
			merchantInfo,
			/**
			 * Locate the name of the Salon on the top right corner of the page
			 */
			merchantName: merchantInfo.locator(
				'li.merchantInfo__dbaName > span.label',
			),
			/**
			 * Locate the contact information (address, phone number,...) on the top right corner of the page
			 */
			merchantContact: merchantInfo.locator('li.merchantInfo__address'),

			/**
			 * Locate a Navigation Menu item
			 */
			navItem: (itemName: string) =>
				page.locator('li.xNavbar__item', {
					hasText: new RegExp(`^${itemName}$`),
				}),
		};
	}

	/**
	 * Wait for a specific API call to be completed
	 */
	public waitForResponseOfAPI(
		api: keyof typeof constants.APIs,
		options: TestOptions = {},
	) {
		return this.page.waitForResponse(
			(response) => {
				const [method, url] = constants.APIs[api];
				const request = response.request();

				return request.url().includes(url) && request.method() === method;
			},
			{ timeout: options.timeout },
		);
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

	/**
	 * Go to a specific page by its {@link PageId}
	 */
	@Given('I am on the {pageId} page')
	public async gotoPage(pageId: PageId) {
		await this.page.goto(constants.PageUrl[pageId]);
	}

	/**
	 * Wait for the page fully loaded
	 */
	@When('I wait for the page fully loaded')
	public waitForNetworkIdle() {
		return this.page.waitForLoadState('networkidle');
	}

	/**
	 * Select an item in the Navigation Bar
	 *
	 * @param navPath - The path to the navigation item, could be a single item or a path to a nested item, separated by " > ".
	 *   For example: "Quick Sale", "Timesheet > Clock In", "Timesheet > Clock Out"
	 */
	@When('I navigate to {string} on the navigation bar')
	public async selectNavItem(navPath: string) {
		const { locators } = this;

		// wait for the menu bar ready
		await this.waitForNetworkIdle();

		const navItems = navPath.split(' > ');
		for (const navItem of navItems) {
			await locators.navItem(navItem).click();
		}
	}

	/**
	 * Click on an element inside the content section of the opening dialog
	 */
	@When(
		'I click on the {string} text inside the content section of the opening dialog',
	)
	public async clickOnContentElementInsideOpeningDialog(text: string) {
		const { locators } = this;

		const dialog = locators.dialog();
		const dialogContent = locators.dialogContent(dialog);

		await dialogContent.getByText(text, { exact: true }).last().click();
	}

	/**
	 * Click on Action Buttons of the opening dialog, ex: "CONFIRM", "CANCEL",...
	 */
	@When('I click on the action button {string} of the opening dialog')
	public async clickOnActionButtonOfOpeningDialog(buttonText: string) {
		const { locators } = this;

		const dialog = locators.dialog();
		const actionButton = locators.dialogActionButton(dialog, buttonText);

		await actionButton.click();
	}

	/**
	 * Close the opening dialog if it's visible
	 */
	@When('I close the opening dialog')
	public async closeOpeningDialog() {
		const { locators } = this;

		const dialog = locators.dialog();
		const closeButton = locators.dialogCloseButton(dialog);

		await closeButton.click();
	}

	/**
	 * Clock In/Out Timesheet with provided PIN
	 */
	@When('I clock {timesheetAction} the timesheet with PIN {string}')
	public async clockInTimesheet(timesheetAction: TimesheetAction, PIN: string) {
		const { locators } = this;

		// find and click on the Clock In / Out button
		const clockInOutNavigationPath =
			timesheetAction === 'in'
				? 'Timesheet > Clock In'
				: 'Timesheet > Clock Out';
		await this.selectNavItem(clockInOutNavigationPath);

		// expect the enter password dialog to be visible
		const enterPasswordDialog = locators.dialog('PASSWORD');
		await expect(enterPasswordDialog).toBeVisible();

		// enter the PIN
		await this.enterPIN(PIN, enterPasswordDialog);

		// click confirm action button
		await this.clickOnActionButtonOfOpeningDialog('CONFIRM');

		if (timesheetAction === 'in') {
			const successfullyClockedInToast = locators.toast.getByText(
				'clocked in successfully',
			); // in case of new session
			const alreadyClockedInToast = locators.toast.getByText('has clocked in'); // in case there's an existing session

			// expect a toast message indicating the result of the operation
			await expect(
				successfullyClockedInToast.or(alreadyClockedInToast),
			).toBeVisible();
		} else if (timesheetAction === 'out') {
			const successfullyClockedOutToast = locators.toast.getByText(
				'clocked out successfully',
			); // in case of clock out
			const alreadyClockedOutToast =
				locators.toast.getByText('has not clocked in'); // in case there's no existing session

			// expect a toast message indicating the result of the operation
			await expect(
				successfullyClockedOutToast.or(alreadyClockedOutToast),
			).toBeVisible();
		}

		// if the dialog is still visible, close it
		if (await enterPasswordDialog.isVisible()) {
			await this.closeOpeningDialog();
		}
	}
}
