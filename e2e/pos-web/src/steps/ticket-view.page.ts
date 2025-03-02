import { Fixture } from 'playwright-bdd/decorators';

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
		};
	}

	/* -------------------------------- BDD steps ------------------------------- */
}
