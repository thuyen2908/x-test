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
	 * Composite step: change item price then save, then verify total price is visible.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I change the price to "<amount>"
	 *  2) And I click on the "Save" button in the popup dialog
	 *  3) Then I should see the total price "$<amount>" visible
	 */
	@When('I change price amount {string}')
	public async changePriceAmount(amount: string) {
		// 1) When I change the price to "<amount>"
		const priceInput = this.page.locator('input#itemNumbers\\.amount');
		await expect(priceInput).toBeVisible();
		await priceInput.clear();
		await priceInput.fill(amount);

		// 2) And I click on the "Save" button in the popup dialog
		const dialog = this.page.locator('div[role="dialog"]').last();
		const saveButton = dialog.getByRole('button', {
			name: 'Save',
			exact: true,
		});
		await expect(saveButton).toBeVisible();
		await saveButton.click();

		// 3) Then I should see the total price "$<amount>" visible
		const displayPrice = amount.trim().startsWith('$')
			? amount.trim()
			: `$${amount.trim()}`;
		const totalPriceElement = this.page.locator('.xTicketItems__total .price', {
			hasText: displayPrice,
		});
		await expect(totalPriceElement).toBeVisible();
	}

	/**
	 * Composite step: add a tip amount via the tip dialog.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I click on the adding "Tip" button
	 *  2) Then I should see a popup dialog with title "Add Tip"
	 *  3) When I fill "<amount>" from the numpad
	 *  4) Then I should see "$<amount>.00" tip in my cart
	 */
	@When('I add tip amount {string}')
	public async addTipAmount(amount: string) {
		// 1) When I click on the adding "Tip" button
		const tipButton = this.page.locator('.xCharge').getByText('Tip', {
			exact: true,
		});
		await expect(tipButton).toBeVisible();
		await tipButton.click();

		// 2) Then I should see a popup dialog with title "Add Tip"
		const dialog = this.page.locator('div[role="dialog"]').last();
		const dialogTitleElement = dialog.locator('.MuiDialogTitle-root').last();
		await expect(dialogTitleElement).toBeVisible();
		await expect(dialogTitleElement).toHaveText('Add Tip');

		// 3) When I fill "<amount>" from the numpad
		const digits = amount.replace(/[^0-9]/g, '');
		for (const digit of digits) {
			await this.page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}
		const okButton = dialog.getByRole('button', { name: 'OK', exact: true });
		await expect(okButton).toBeVisible();
		await okButton.click();

		// 4) Then I should see "$<amount>.00" tip in my cart
		const normalizedAmount = Number(amount.replace(/[^0-9.]/g, ''));
		const displayTip = Number.isFinite(normalizedAmount)
			? `$${normalizedAmount.toFixed(2)}`
			: amount;
		const tipElement = this.page.locator('ul.xCharge').getByText(displayTip);
		await expect(tipElement).toHaveText(displayTip);
	}

	/**
	 * Composite step: reopen a ticket from the payment list by payment amount.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) Then I should see the first ticket of payment "<amount>"
	 *  2) When I click on the first row for payment "<amount>" to expand details
	 *  3) Then I should see the "Reopen ticket" button visible
	 *  4) When I click on the "Reopen ticket" button
	 */
	@When('I reopen ticket with payment amount {string}')
	public async reopenTicketWithPaymentAmount(amount: string) {
		const refreshButton = this.page.getByTestId('RefreshIcon');
		await expect(refreshButton).toBeVisible();
		await refreshButton.click();

		await this.page.waitForLoadState('networkidle');
		// 1) Then I should see the first ticket of payment "<amount>"
		const firstPaymentRow = this.page
			.locator('.MuiDataGrid-row')
			.filter({
				has: this.page.locator('[data-field="paymentTotal"]', {
					hasText: amount,
				}),
			})
			.filter({
				has: this.page.locator('[data-field="paymentMethod"]', {
					hasText: /.+/,
				}),
			})
			.first();
		await expect(firstPaymentRow).toBeVisible();
		await expect(firstPaymentRow).toContainText(amount);

		// 2) When I click on the first row for payment "<amount>" to expand details
		await firstPaymentRow.click();

		// 3) Then I should see the "Reopen ticket" button visible
		const reopenButton = this.page.getByRole('button', {
			name: /reopen ticket/i,
		});
		await expect(reopenButton).toBeVisible();

		// 4) When I click on the "Reopen ticket" button
		await reopenButton.click();
	}

	/**
	 * Composite step: reopen a ticket from payments list then void it.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) Then I should see the first ticket of payment "<amount>"
	 *  2) When I click on the first row for payment "<amount>" to expand details
	 *  3) Then I should see the "Reopen ticket" button visible
	 *  4) When I click on the "Reopen ticket" button
	 *  5) And I wait for the page fully loaded
	 *  6) Then I should see the "Ticket View" screen
	 *  7) When I void the current open ticket with reason "System Test"
	 */
	@When('I reopen to void ticket with payment amount {string}')
	public async reopenToVoidTicketWithPaymentAmount(amount: string) {
		// Steps 1-4: reuse reopenTicketWithPaymentAmount
		await this.reopenTicketWithPaymentAmount(amount);

		// 5) And I wait for the page fully loaded
		await this.waitForNetworkIdle();

		// 6) Then I should see the "Ticket View" screen
		const ticketViewTitle = this.locators.pageName
			.getByText('Ticket View', { exact: true })
			.last();
		await expect(ticketViewTitle).toBeVisible();

		// 7) When I void the current open ticket with reason "System Test"
		const pageDetail = await this.locators.pageDetail.textContent();
		const ticketNumber = pageDetail?.split('#')[1]?.trim();

		const voidButton = this.page.getByRole('button', {
			name: 'VOID TICKET',
			exact: true,
		});
		await expect(voidButton).toBeVisible();
		await voidButton.click();

		const voidReasonDialog = this.locators.dialog('SELECT VOID REASON');
		const voidTicketConfirmDialog = this.locators.dialog('VOID TICKET');
		await expect(voidReasonDialog.or(voidTicketConfirmDialog)).toBeVisible();

		if (await voidReasonDialog.isVisible()) {
			await voidReasonDialog.getByText('System Test', { exact: true }).click();

			// In UI HTML, confirm dialog title is "Confirm Void" (draggable), and confirm button text is "confirm".
			const confirmDialog = this.page
				.locator('div[role="dialog"]', {
					has: this.page.locator('#draggable-dialog-title', {
						hasText: /confirm void/i,
					}),
				})
				.last();
			await expect(confirmDialog).toBeVisible();
			const confirmButton = confirmDialog.getByRole('button', {
				name: /confirm/i,
			});
			await expect(confirmButton).toBeVisible();
			await confirmButton.click();
		} else {
			const okButton = voidTicketConfirmDialog
				.or(this.page.locator('div[role="dialog"]').last())
				.getByRole('button', { name: 'OK', exact: true });
			await expect(okButton).toBeVisible();
			await okButton.click();

			if (ticketNumber) {
				await expect(
					this.locators.toast.getByText(
						`Ticket ${ticketNumber} deleted successfully.`,
					),
				).toBeVisible();
			}
		}
	}

	/**
	 * Composite step: adjust tip amount from payment history.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I click on the adjust tip icon
	 *  2) Then I should see a popup dialog containing the title "CONFIRM ADJUST TIP "
	 *  3) When I click on the action button "Adjust Tip" of the opening dialog
	 *  4) Then I should see a popup dialog with title "Adjust Tip "
	 *  5) When I enter the amount "<amount>"
	 *  6) And I click on the "Add Tip" button in the popup dialog
	 *  7) Then I should see the payment price contain amount "+ $<amount>.00"
	 */
	@When('I adjust tip amount {string}')
	public async adjustTipAmount(amount: string) {
		// 1) When I click on the adjust tip icon
		const adjustTipIcon = this.page.locator('.xPayment__history--listBtn');
		await expect(adjustTipIcon).toBeVisible();
		await adjustTipIcon.click();

		// 2) Then I should see a popup dialog containing the title "CONFIRM ADJUST TIP "
		const confirmAdjustTipDialog = this.page
			.locator('div[role="dialog"]')
			.filter({
				has: this.page.locator('.MuiDialogTitle-root', {
					hasText: /confirm\s+adjust\s+tip/i,
				}),
			})
			.last();
		await expect(confirmAdjustTipDialog).toBeVisible();

		// 3) When I click on the action button "Adjust Tip" of the opening dialog
		// Prefer the common actions container, but fall back to any role=button in the dialog.
		const adjustTipButton = confirmAdjustTipDialog
			.locator('div.MuiDialogActions-root')
			.getByRole('button', { name: /adjust\s*tip/i })
			.or(
				confirmAdjustTipDialog.getByRole('button', { name: /adjust\s*tip/i }),
			);
		await expect(adjustTipButton).toBeVisible();
		await adjustTipButton.click();

		// 4) Then I should see a popup dialog with title "Adjust Tip "
		const adjustTipDialog = this.page
			.locator('div[role="dialog"]')
			.filter({
				has: this.page.locator('.MuiDialogTitle-root', {
					hasText: /adjust\s+tip/i,
				}),
			})
			.last();
		await expect(adjustTipDialog).toBeVisible();

		// 5) When I enter the amount "<amount>"
		const digits = amount.replace(/[^0-9]/g, '');
		for (const digit of digits) {
			await this.page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}

		// 6) And I click on the "Add Tip" button in the popup dialog
		const addTipButton = adjustTipDialog.getByRole('button', {
			name: /add\s*tip/i,
		});
		await expect(addTipButton).toBeVisible();
		await addTipButton.click();

		// 7) Then I should see the payment price contain amount "+ $<amount>.00"
		const normalizedAmount = Number(amount.replace(/[^0-9.]/g, ''));
		const expectedDisplay = Number.isFinite(normalizedAmount)
			? `+ $${normalizedAmount.toFixed(2)}`
			: `+ $${amount}`;
		const priceElement = this.page.locator('.xPayment__history--price');
		await expect(priceElement).toContainText(expectedDisplay);
		await this.waitForNetworkIdle();
	}

	/**
	 * Composite step: adjust tip amount from payment history in the ticket adjustment.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I click on the adjust tip icon
	 *  2) Then I should see a popup dialog with title "Adjust Tip "
	 *  3) When I enter the amount "<amount>"
	 *  4) And I click on the "Add Tip" button in the popup dialog
	 *  5) Then I should see the payment price contain amount "+ $<amount>.00"
	 */
	@When('I adjust tip amount {string} in ticket adjustment')
	public async adjustTipAmountTicketAdjustment(amount: string) {
		// 1) When I click on the adjust tip icon
		const adjustTipIcon = this.page.locator('.xPayment__history--listBtn');
		await expect(adjustTipIcon).toBeVisible();
		await adjustTipIcon.click();

		// 2) Then I should see a popup dialog with title "Adjust Tip "
		const adjustTipDialog = this.page
			.locator('div[role="dialog"]')
			.filter({
				has: this.page.locator('.MuiDialogTitle-root', {
					hasText: /adjust\s+tip/i,
				}),
			})
			.last();
		await expect(adjustTipDialog).toBeVisible();

		// 3) When I enter the amount "<amount>"
		const digits = amount.replace(/[^0-9]/g, '');
		for (const digit of digits) {
			await this.page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}

		// 4) And I click on the "Add Tip" button in the popup dialog
		const addTipButton = adjustTipDialog.getByRole('button', {
			name: /add\s*tip/i,
		});
		await expect(addTipButton).toBeVisible();
		await addTipButton.click();

		// 5) Then I should see the payment price contain amount "+ $<amount>.00"
		const normalizedAmount = Number(amount.replace(/[^0-9.]/g, ''));
		const expectedDisplay = Number.isFinite(normalizedAmount)
			? `+ $${normalizedAmount.toFixed(2)}`
			: `+ $${amount}`;
		const priceElement = this.page.locator('.xPayment__history--price');
		await expect(priceElement).toContainText(expectedDisplay);
		await this.waitForNetworkIdle();
	}

	/**
	 * Composite step: remove a payment history entry and confirm void.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I click on the more menu for payment history of "<paymentType>"
	 *  2) Then I should see the tooltip remove
	 *  3) When I click on the tooltip remove
	 *  4) Then I should see a popup dialog with title "VOID PAYMENT"
	 *  5) And I should see a popup dialog with content "<paymentType>"
	 *  6) When I click on the "Remove" button in the popup dialog
	 *  7) Then I should see a second popup dialog with title "Confirm Void Payment"
	 *  8) When I click on the "Yes, void it" button in the popup dialog
	 */
	@When('I remove the payment history {string}')
	public async removePaymentHistory(paymentType: string) {
		// 1) When I click on the more menu for payment history of "<paymentType>"
		const paymentHistoryItem = this.page
			.locator('.xPayment__history--list li')
			.filter({ hasText: paymentType });
		await paymentHistoryItem.locator('button[aria-label="more"]').click();

		// 2) Then I should see the tooltip remove
		const tooltipRemove = this.page.locator(
			'.xPayment__history--tooltip.active .label:has-text("Remove")',
		);
		await expect(tooltipRemove).toBeVisible();

		// 3) When I click on the tooltip remove
		await tooltipRemove.click();

		// 4) Then I should see a popup dialog with title "VOID PAYMENT"
		const dialogTitleElement = this.page.locator('.MuiDialogTitle-root');
		await expect(dialogTitleElement).toBeVisible();
		await expect(dialogTitleElement).toHaveText('VOID PAYMENT');

		// 5) And I should see a popup dialog with content "<paymentType>"
		const dialogContentElement = this.page.locator('.MuiDialogContent-root');
		await expect(dialogContentElement).toBeVisible();
		await expect(dialogContentElement).toContainText(paymentType);

		// 6) When I click on the "Remove" button in the popup dialog
		const dialog = this.page.locator('div[role="dialog"]');
		const removeButton = dialog.getByRole('button', {
			name: 'Remove',
			exact: true,
		});
		await expect(removeButton).toBeVisible();
		await removeButton.click();

		// 7) Then I should see a second popup dialog with title "Confirm Void Payment"
		const secondDialogTitle = this.page.locator('.MuiDialogTitle-root').last();
		await expect(secondDialogTitle).toBeVisible();
		await expect(secondDialogTitle).toHaveText('Confirm Void Payment');

		// 8) When I click on the "Yes, void it" button in the popup dialog
		const yesVoidButton = this.page
			.locator('div[role="dialog"]')
			.getByRole('button', { name: 'Yes, void it', exact: true });
		await expect(yesVoidButton).toBeVisible();
		await yesVoidButton.click();
	}

	/**
	 * Composite step: remove a payment history entry in ticket view.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I click on the more menu for payment history of "<paymentType>"
	 *  2) Then I should see the tooltip remove
	 *  3) When I click on the tooltip remove
	 *  4) Then I should see a popup dialog with title "<paymentType> "
	 *  5) When I click on the "Remove" button in the popup dialog
	 */
	@When('I remove payment history {string} in ticket view')
	public async removePaymentHistoryInTicketView(paymentType: string) {
		// 1) When I click on the more menu for payment history of "<paymentType>"
		const paymentHistoryItem = this.page
			.locator('.xPayment__history--list li')
			.filter({ hasText: paymentType });
		await paymentHistoryItem.locator('button[aria-label="more"]').click();

		// 2) Then I should see the tooltip remove
		const tooltipRemove = this.page.locator(
			'.xPayment__history--tooltip.active .label:has-text("Remove")',
		);
		await expect(tooltipRemove).toBeVisible();

		// 3) When I click on the tooltip remove
		await tooltipRemove.click();

		// 4) Then I should see a popup dialog with title "<paymentType> "
		const dialogTitleElement = this.page.locator('.MuiDialogTitle-root');
		await expect(dialogTitleElement).toBeVisible();
		await expect(dialogTitleElement).toContainText(paymentType);

		// 5) When I click on the "Remove" button in the popup dialog
		const dialog = this.page.locator('div[role="dialog"]');
		const removeButton = dialog.getByRole('button', {
			name: 'Remove',
			exact: true,
		});
		await expect(removeButton).toBeVisible();
		await removeButton.click();
	}

	/**
	 * Composite step: search for a gift card by number.
	 *
	 * Performs, in order, the same actions as these existing steps:
	 *  1) When I enter the amount "<giftCardNumber>"
	 *  2) And I click on the "SEARCH" button
	 *  3) And I wait for the page fully loaded
	 *  4) Then I should see the text "DETAILS" visible
	 */
	@When('I search gift card {string}')
	public async searchGiftCard(giftCardNumber: string) {
		// 1) When I enter the amount "<giftCardNumber>"
		for (const digit of giftCardNumber) {
			await this.page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}

		// 2) And I click on the "SEARCH" button
		const searchButton = this.page.getByRole('button', {
			name: 'SEARCH',
			exact: true,
		});
		await expect(searchButton).toBeVisible();
		await searchButton.click();

		// 3) And I wait for the page fully loaded
		await this.waitForNetworkIdle();

		// 4) Then I should see the text "DETAILS" visible
		await expect(this.page.getByText('DETAILS', { exact: true })).toBeVisible();
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
