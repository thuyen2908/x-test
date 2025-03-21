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
			...super.locators,

			serviceList: page.locator('ul:has(> li.ItemService)'),

			voidButton: page.getByRole('button', { name: 'VOID TICKET' }),
			voidReasonDialog: super.locators.dialog('SELECT VOID REASON'),
		};
	}

	/**
	 * Get the current ticket number shown on the page header
	 */
	public async getTicketNumber() {
		const pageDetail = await this.locators.pageDetail.textContent();

		return pageDetail?.split('#')[1]?.trim();
	}

	/**
	 * Void the current ticket on screen
	 */
	@When('I void the current open ticket with no reason')
	public async voidTicket(reason = 'Mistake') {
		const { locators } = this;

		// store the ticket number for later assertion
		const ticketNumber = await this.getTicketNumber();

		// click the void button
		await locators.voidButton.click();
		const voidReasonDialog = locators.voidReasonDialog;
		const voidTicketConfirmDialog = locators.dialog('VOID TICKET');

		// wait for 1 of 2 dialog types to be visible
		await expect(voidReasonDialog.or(voidTicketConfirmDialog)).toBeVisible();

		if (await voidReasonDialog.isVisible()) {
			// in case the services associate with this ticket have changed status to DONE
			// select a reason for voiding the ticket
			await voidReasonDialog.getByText(reason).click();

			// waiting for the subsequent confirm dialog to be visible
			const confirmDialog = locators.draggableDialog('CONFIRM VOID');
			await expect(confirmDialog).toBeVisible();

			await confirmDialog.getByRole('button', { name: 'CONFIRM' }).click();
		} else {
			// in case there's no service status changed to DONE
			await voidTicketConfirmDialog.getByRole('button', { name: 'OK' }).click();

			await expect(
				locators.toast.getByText(
					`Ticket ${ticketNumber} deleted successfully.`,
				),
			).toBeVisible();
		}
	}

	/**
	 * Void the current ticket on screen with a specific reason
	 */
	@When('I void the current open ticket with reason {string}')
	public async voidTicketWithProvidedReason(reason: string) {
		return this.voidTicket(reason);
	}

	/* -------------------------------- BDD steps ------------------------------- */
}
