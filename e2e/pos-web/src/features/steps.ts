import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { constants } from '#const';
import type { PageId } from '#typings';

const { Given, When, Then } = createBdd();

Given('I am on the {pageId} page', async ({ page }, pageId: PageId) => {
	const pageUrl = constants.PageUrl[pageId];

	await page.goto(pageUrl);
});

When('I click link {string}', async ({ page }, name) => {
	await page.getByRole('link', { name }).click();
});

Then('I see in title {string}', async ({ page }, keyword) => {
	await expect(page).toHaveTitle(new RegExp(keyword));
});
