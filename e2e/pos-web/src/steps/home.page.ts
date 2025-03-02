import { expect } from '@playwright/test';
import { Fixture, When } from 'playwright-bdd/decorators';

import { constants } from '#const';
import { PageId } from '#types';

import { TicketViewPage } from './ticket-view.page';
import { xPage } from './x.page';

export
@Fixture('homePage')
class HomePage extends xPage {
	override open() {
		return this.page.goto(constants.PageUrl[PageId.HOME]);
	}

	/**
	 * A list of this page specific locators
	 */
	public override get locators() {
		const { page } = this;

		const employeeList = page.locator('div.xQueueList');

		return {
			...super.locators,

			employeeList,
			employee: (employeeName: string) =>
				employeeList.getByText(employeeName, { exact: true }),
		};
	}

	/* -------------------------------- BDD steps ------------------------------- */

	@When('I select the {string} employee')
	public async selectEmployee(employeeName: string) {
		const { locators } = this;

		const employee = locators.employee(employeeName);
		await employee.click();

		await expect(locators.pageName).toHaveText(TicketViewPage.TITLE);
	}
}
