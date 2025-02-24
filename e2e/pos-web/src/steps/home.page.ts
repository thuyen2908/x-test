import { Fixture } from 'playwright-bdd/decorators';

import { constants, PageId } from '#const';

import { xPage } from './x.page';

export
@Fixture('homePage')
class HomePage extends xPage {
	override open() {
		return this.page.goto(constants.PageUrl[PageId.HOME]);
	}

	/* -------------------------------- BDD steps ------------------------------- */
}
