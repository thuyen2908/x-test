import { expect } from '@playwright/test';
import { Fixture, When } from 'playwright-bdd/decorators';

import { constants } from '#const';
import { PageId } from '#types';

import { xPage } from './x.page';

export
@Fixture('ticketViewPage')
class TicketViewPage extends xPage {
	/**
	 * The page title
	 */
	public static get TITLE() {
		return 'Ticket View';
	}

	override open() {
		return this.page.goto(constants.PageUrl[PageId.TICKET_VIEW]);
	}

	/**
	 * A list of this page specific locators
	 */
	public override get locators() {
		const { page } = this;

		return {
			/**
			 * Expose the flexible ticket function title locator from xPage
			 * @example this.locators.ticketFunctionTitle('SELECT VOID REASON')
			 */
			...super.locators,

			/**
			 * Locate the service list section, which is the middle column of the "Ticket View" page
			 */
			serviceList: page.locator('ul:has(> li.ItemService)'),

			/**
			 * Locate the "VOID TICKET" button on the header, which is on the left of the Calendar element
			 */
			voidButton: page.getByRole('button', { name: 'VOID TICKET' }),
			/**
			 * Locate a reason when voiding a ticket that has been changed status to "DONE"
			 */
			voidReasonDialog: page.locator('.xTicketFunctions__content', {
				has: page.locator(
					'.xTicketFunctions__title >> text=SELECT VOID REASON',
				),
			}),
		};
	}

	/**
	 * Get the current ticket number shown on the page header
	 */
	public async getTicketNumber(): Promise<string | undefined> {
		const pageDetail = await this.locators.pageDetail.textContent();

		return pageDetail?.split('#')[1]?.trim();
	}

	/* -------------------------------- BDD steps ------------------------------- */

	/**
	 * Void the current ticket on screen
	 */
	@When('I void the current open ticket with no reason')
	public async voidTicket(reason?: string) {
		const { locators, page } = this;

		const ticketNumber = await this.getTicketNumber();

		await locators.voidButton.click();
		const voidReasonDialog = locators.voidReasonDialog;
		const voidTicketConfirmDialog = page.locator('.xTicketFunctions__content', {
			has: page.locator('.xTicketFunctions__title >> text=VOID TICKET'),
		});

		await expect(voidReasonDialog.or(voidTicketConfirmDialog)).toBeVisible();

		if (await voidReasonDialog.isVisible()) {
			if (reason) {
				await voidReasonDialog
					.locator('li')
					.getByText(reason, { exact: true })
					.click();
			}

			const confirmDialog = locators.draggableDialog('CONFIRM VOID');
			await expect(confirmDialog).toBeVisible();

			await confirmDialog.getByRole('button', { name: 'CONFIRM' }).click();
		} else if (await voidTicketConfirmDialog.isVisible()) {
			await voidTicketConfirmDialog.getByRole('button', { name: 'OK' }).click();

			if (ticketNumber) {
				await expect(
					locators.toast.getByText(
						`Ticket ${ticketNumber} deleted successfully.`,
					),
				).toBeVisible();
			}
		}
	}

	/**
	 * Void the current ticket on screen with a specific reason
	 */
	@When('I void the current open ticket with reason {string}')
	public async voidTicketWithProvidedReason(reason: string) {
		return this.voidTicket(reason);
	}
}
