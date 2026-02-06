import { expect, type Locator, type Page } from '@playwright/test';
import { Fixture, Given, When } from 'playwright-bdd/decorators';

import { constants } from '#const';
import { type PageId, type TestOptions } from '#types';

import { type TestConfig } from '../test-config';
import { type TestStorage } from '../test-storage';
import { type TimesheetAction } from './parameters';

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

		const pageHeader = page.locator('div.xHeader__main');

		const companyProfile = pageHeader.locator('div.xMerchantInfo');
		const merchantInfo = pageHeader.locator('div.xMerchantInfo');

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
			 * Locate the Select customer button
			 */
			selectCustomerButton: page.locator('.TicketSearch__customer'),
			/**
			 * Locate the button used to add a new customer from the Select customer dialog
			 */
			addCustomerButton: page.getByRole('button', {
				name: 'Click Here To Add Customers',
				exact: true,
			}),
			/**
			 * Locate the loyalty program selector within the Create New Customer dialog
			 */
			loyaltyProgramSelect: page.locator(
				'#mui-component-select-loyaltyProgramId',
			),
			/**
			 * Locate the first name input inside the Create New Customer dialog
			 */
			newCustomerFirstNameInput: page.locator('input[name="firstName"]'),
			/**
			 * Locate the cell phone input inside the Create New Customer dialog
			 */
			newCustomerPhoneInput: page.locator('input[name="cellPhone"]'),
			/**
			 * Locate the customer name displayed on the ticket after assignment
			 */
			ticketCustomerName: page.locator('.TicketSearch__customer .mainTitle'),

			/**
			 * Locate the page's header
			 */
			pageHeader,
			/**
			 * Locate the name of the current page, usually on the top left corner of the page, ex: "Ticket View".
			 * Some pages don't have this element
			 */
			pageName: pageHeader.locator('span.pageName'),
			/**
			 * Locate the page detail section of the current page, usually appears below the page name, ex: "John Doe - #001" (Ticket View page).
			 * Some pages don't have this element
			 */
			pageDetail: pageHeader.locator('div.pageDetail'),

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
			merchantName: companyProfile.locator(
				'div.merchantInfo__dbaName > span.label',
			),
			/**
			 * Locate the contact information (address, phone number,...) on the top right corner of the page
			 */
			merchantContact: companyProfile.locator('div.merchantInfo__address'),
			/**
			 * Locate the Pay button on the ticket screen
			 */
			payButton: page.locator('button#action_pay'),
			/**
			 * Locate a payment type option by its exact label
			 */
			paymentTypeOption: (paymentType: string) =>
				page.locator('.paymentType').getByText(paymentType, { exact: true }),
			/**
			 * Locate the Tip button within the charge actions
			 */
			tipButton: page.locator('.xCharge').getByText('Tip', { exact: true }),
			/**
			 * Locate the ticket functions title displayed within dialogs
			 */
			ticketFunctionsTitle: page.locator('.xTicketFunctions__title'),
			/**
			 * Locate the last payment row matching a given total amount
			 */
			lastPaymentRowByAmount: (amount: string) =>
				page
					.locator('.MuiDataGrid-virtualScrollerContent')
					.locator('.MuiDataGrid-row')
					.filter({
						has: page.locator('[data-field="paymentTotal"]', {
							hasText: amount,
						}),
					})
					.last(),
			/**
			 * Locate the refresh button in the Closed Ticket list
			 */
			refreshButton: page.locator('[data-testid="RefreshOutlinedIconIcon"]'),
			/**
			 * Locate the search input for Closed Ticket list
			 */
			searchInput: page.locator('input[placeholder="Search…"]'),
			/**
			 * Locate a ticket function menu item by name
			 */
			ticketFunctionMenuItem: (menuName: string) =>
				page
					.locator('ul.xTicketFunctions__menu li')
					.getByText(menuName, { exact: true }),
			/**
			 * Locate a numpad key by its displayed digit
			 */
			numpadKey: (digit: string) =>
				digit === '.'
					? page.locator('button.key:has(span.text-dot)')
					: page.locator(`button.key:has(span.text-num:has-text("${digit}"))`),
			/**
			 * Locate a tip entry inside the cart by its display value, e.g. "$5.00"
			 */
			tipAmount: (displayValue: string) =>
				page.locator('ul.xCharge').getByText(displayValue, { exact: true }),
			/**
			 * Locate a Daily Task option by its exact label
			 */
			dailyTaskOption: (label: string) =>
				page.locator('.dailyTask').getByText(label, { exact: true }),

			/**
			 * Locate a Navigation Menu item
			 */
			navItem: (itemName: string) =>
				page
					.locator('li.xNavbar__item')
					.filter({
						has: page.locator('span.label', {
							hasText: itemName,
							exact: true,
						}),
					})
					.first(),
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

	@When('I pay the exact amount by {string}')
	public async payBy(paymentType: string) {
		const { locators } = this;

		// Step 1: Click the Pay button
		await locators.payButton.click();

		// Step 2: Click the payment type Cash
		const paymentTypeOption = locators.paymentTypeOption(paymentType).first();
		await paymentTypeOption.click();

		// Step 3: Wait for the Close Ticket dialog
		const closeTicketDialog = locators.dialog('Close Ticket');
		await expect(closeTicketDialog).toBeVisible();

		// Step 4: Verify dialog contains CHANGE $0.00
		const dialogContent = locators.dialogContent(closeTicketDialog);
		await expect(dialogContent).toContainText('CHANGE');
		await expect(dialogContent).toContainText('$0.00');

		// Step 5: Click OK to confirm payment
		const okButton = locators.dialogActionButton(closeTicketDialog, 'OK');
		await okButton.click();

		await expect(closeTicketDialog).toBeHidden();
	}

	@When('I add tip amount {string}')
	public async addTip(amount: string) {
		const { locators } = this;

		const tipButton = locators.tipButton.first();
		await expect(tipButton).toBeVisible();
		await tipButton.click();

		await expect(locators.ticketFunctionsTitle).toHaveText('ENTER TIP AMOUNT');

		const digits = amount.replace(/[^0-9]/g, '');
		for (const digit of digits) {
			const key = locators.numpadKey(digit).first();
			await expect(key).toBeVisible();
			await key.click();
		}

		const confirmButton = this.page.getByRole('button', {
			name: 'OK',
			exact: true,
		});
		await expect(confirmButton).toBeVisible();
		await confirmButton.click();

		const formattedAmount = `$${Number(amount).toFixed(2)}`;
		const tipEntry = locators.tipAmount(formattedAmount).first();
		await expect(tipEntry).toBeVisible();
		await expect(tipEntry).toHaveText(formattedAmount);
	}

	@When('I change price amount {string}')
	public async changePriceAmount(amount: string) {
		const { locators } = this;

		const changePriceMenuItem = locators
			.ticketFunctionMenuItem('CHANGE PRICE')
			.first();
		await expect(changePriceMenuItem).toBeVisible();
		await changePriceMenuItem.click();

		await expect(locators.ticketFunctionsTitle).toHaveText('ENTER PRICE');

		for (const char of amount) {
			const key = locators.numpadKey(char).first();
			await expect(key).toBeVisible();
			await key.click();
		}

		const okButton = this.page.getByRole('button', { name: 'OK', exact: true });
		await expect(okButton).toBeVisible();
		await okButton.click();

		const formattedAmount = `$${Number(amount).toFixed(2)}`;
		const totalPriceElement = this.page
			.locator('.xTicketItems__total .price', {
				hasText: formattedAmount,
			})
			.first();
		await expect(totalPriceElement).toBeVisible();
	}

	@When('I refresh and search amount {string}')
	public async refreshAndSearchAmount(amount: string) {
		const { locators } = this;

		await expect(locators.refreshButton).toBeVisible();
		await locators.refreshButton.click();
		await this.waitForNetworkIdle();

		await expect(locators.searchInput).toBeVisible();
		await locators.searchInput.fill(amount);
		await this.waitForNetworkIdle();

		const formattedAmount = amount.trim().startsWith('$')
			? amount.trim()
			: `$${Number(amount.trim()).toFixed(2)}`;
		const lastPaymentRow = locators.lastPaymentRowByAmount(formattedAmount);
		await lastPaymentRow.scrollIntoViewIfNeeded();
		await expect(lastPaymentRow).toBeVisible();
	}

	@When(
		'I click to create new customer with the default loyalty program {string}',
	)
	public async clickToCreateNewCustomerWithDefaultLoyaltyProgram(
		program: string,
	) {
		const { locators } = this;

		await expect(locators.selectCustomerButton).toBeVisible();
		await locators.selectCustomerButton.click();

		await expect(locators.addCustomerButton).toBeVisible();
		await locators.addCustomerButton.click();

		const createCustomerDialog = locators.draggableDialog(
			'Create New Customer',
		);
		await createCustomerDialog.waitFor({ state: 'visible' });
		await expect(createCustomerDialog).toBeVisible();

		await locators.loyaltyProgramSelect.waitFor({ state: 'attached' });
		await expect(locators.loyaltyProgramSelect).toBeVisible();
		await expect(locators.loyaltyProgramSelect).toHaveText(program);
	}

	@When('I create the new customer name {string}')
	public async createNewCustomerName(name: string) {
		const { locators } = this;

		const createCustomerDialog = locators.draggableDialog(
			'Create New Customer',
		);
		await createCustomerDialog.waitFor({ state: 'visible' });
		await expect(createCustomerDialog).toBeVisible();

		await expect(locators.newCustomerFirstNameInput).toBeVisible();
		await locators.newCustomerFirstNameInput.fill(name);
		await expect(locators.newCustomerFirstNameInput).toHaveValue(name);

		const randomPhone = Math.floor(
			1000000000 + Math.random() * 9000000000,
		).toString();
		await expect(locators.newCustomerPhoneInput).toBeVisible();
		await locators.newCustomerPhoneInput.fill(randomPhone);
		const formattedPhone = `(${randomPhone.slice(0, 3)}) ${randomPhone.slice(
			3,
			6,
		)}-${randomPhone.slice(6)}`;
		await expect(locators.newCustomerPhoneInput).toHaveValue(formattedPhone);

		const saveButton = locators.dialogActionButton(
			createCustomerDialog,
			'Save',
		);
		await expect(saveButton).toBeVisible();
		await saveButton.click();

		await this.waitForNetworkIdle();
		await expect(createCustomerDialog).not.toBeVisible();
		await expect(locators.ticketCustomerName).toHaveText(name);
	}

	@When('I reopen ticket with payment amount {string}')
	public async reopenTicketWithPaymentAmount(amount: string) {
		const { locators } = this;

		const paymentRow = locators.lastPaymentRowByAmount(amount);
		await paymentRow.scrollIntoViewIfNeeded();
		await expect(paymentRow).toBeVisible();

		const avatarCell = paymentRow.locator('[data-field="avatar"]');
		await expect(avatarCell).toBeVisible();
		await avatarCell.click();

		const reopenTask = locators.dailyTaskOption('Reopen ticket').first();
		await expect(reopenTask).toBeVisible();
		await reopenTask.click();
	}

	/**
	 * Clock In/Out Timesheet with provided PIN
	 */
	// @When('I clock {timesheetAction} the timesheet with PIN {string}')
	// public async clockInTimesheet(timesheetAction: TimesheetAction, PIN: string) {
	// 	const { locators } = this;

	// 	// find and click on the Clock In / Out button
	// 	const clockInOutNavigationPath =
	// 		timesheetAction === 'in'
	// 			? 'Timesheet > Clock In'
	// 			: 'Timesheet > Clock Out';
	// 	await this.selectNavItem(clockInOutNavigationPath);

	// 	// expect the enter password dialog to be visible
	// 	const enterPasswordDialog = locators.dialog('PASSWORD');
	// 	await expect(enterPasswordDialog).toBeVisible();

	// 	// enter the PIN
	// 	await this.enterPIN(PIN, enterPasswordDialog);

	// 	// click confirm action button
	// 	await this.clickOnActionButtonOfOpeningDialog('CONFIRM');

	// 	if (timesheetAction === 'in') {
	// 		const successfullyClockedInToast = locators.toast.getByText(
	// 			'clocked in successfully',
	// 		); // in case of new session
	// 		const alreadyClockedInToast = locators.toast.getByText('has clocked in'); // in case there's an existing session

	// 		// expect a toast message indicating the result of the operation
	// 		await expect(
	// 			successfullyClockedInToast.or(alreadyClockedInToast),
	// 		).toBeVisible();
	// 	} else if (timesheetAction === 'out') {
	// 		const successfullyClockedOutToast = locators.toast.getByText(
	// 			'clocked out successfully',
	// 		); // in case of clock out
	// 		const alreadyClockedOutToast =
	// 			locators.toast.getByText('has not clocked in'); // in case there's no existing session

	// 		// expect a toast message indicating the result of the operation
	// 		await expect(
	// 			successfullyClockedOutToast.or(alreadyClockedOutToast),
	// 		).toBeVisible();
	// 	}

	// 	// if the dialog is still visible, close it
	// 	if (await enterPasswordDialog.isVisible()) {
	// 		await this.closeOpeningDialog();
	// 	}
	// }

	@When('I clock {timesheetAction} the timesheet with PIN {string}')
	public async clockTimesheetFromFunctions(
		timesheetAction: TimesheetAction,
		PIN: string,
	) {
		const { locators } = this;
		const normalizedAction = timesheetAction.toLowerCase();
		if (!['in', 'out'].includes(normalizedAction)) {
			throw new Error(
				`Unsupported timesheet action "${timesheetAction}". Use "in" or "out".`,
			);
		}

		await this.page
			.locator('.pageName')
			.getByText('FUNCTIONS', { exact: true })
			.click();

		await this.page
			.locator('.dailyTask')
			.getByText(normalizedAction === 'out' ? 'Clock Out' : 'Clock In', {
				exact: true,
			})
			.click();

		const enterPasswordDialog = locators.dialog('PASSWORD');
		await expect(enterPasswordDialog).toBeVisible();

		await this.enterPIN(PIN, enterPasswordDialog);

		await this.clickOnActionButtonOfOpeningDialog('CONFIRM');

		if (normalizedAction === 'in') {
			const successfullyClockedInToast = locators.toast.getByText(
				'clocked in successfully',
			); // in case of new session
			const alreadyClockedInToast = locators.toast.getByText('has clocked in'); // in case there's an existing session

			await expect(
				successfullyClockedInToast.or(alreadyClockedInToast),
			).toBeVisible();
		} else {
			const successfullyClockedOutToast = locators.toast.getByText(
				'clocked out successfully',
			); // in case of clock out
			const alreadyClockedOutToast =
				locators.toast.getByText('has not clocked in'); // in case there's no existing session

			await expect(
				successfullyClockedOutToast.or(alreadyClockedOutToast),
			).toBeVisible();
		}

		if (await enterPasswordDialog.isVisible()) {
			await this.closeOpeningDialog();
		}
	}
}
