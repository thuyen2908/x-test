import { test as base, createBdd } from 'playwright-bdd';

import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { xPage } from './x.page';

interface Fixtures {
	xPage: xPage;
	loginPage: LoginPage;
	homePage: HomePage;
}

export const test = base.extend<Fixtures>({
	xPage: ({ page }, use) => use(new xPage(page)),
	loginPage: async ({ page }, use) => use(new LoginPage(page)),
	homePage: ({ page }, use) => use(new HomePage(page)),
});

export const { Given, When, Then } = createBdd(test);
