import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { constants } from '#const';
import type { PageId } from '#types';

const { When, Then } = createBdd();

Then(
	'I should be redirected to {pageId} page',
	async ({ page }, pageId: PageId) => {
		const pageUrl = constants.PageUrl[pageId];

		await page.waitForURL(pageUrl);
		await expect(page).toHaveURL(pageUrl);
	},
);

Then(
	'I should see the employee {string} in the employee list',
	async ({ page }, employeeName: string) => {
		const employeeList = page.locator('div.xQueueList');

		await expect(
			employeeList.getByText(employeeName, { exact: true }),
		).toBeVisible();
	},
);

Then(
	'I should see the {string} screen',
	async ({ page }, screenName: string) => {
		const screenTitle = page
			.locator('p.MuiTypography-body1.pageName')
			.getByText(screenName, { exact: true });

		await expect(screenTitle).toBeVisible();
	},
);

Then(
	'I should see the {string} service',
	async ({ page }, serviceName: string) => {
		const service = page
			.locator('li.ItemService')
			.getByText(serviceName, { exact: true });
		await expect(service).toBeVisible();
	},
);

When(
	'I add the {string} service to my cart',
	async ({ page }, serviceName: string) => {
		const service = page
			.locator('li.ItemService')
			.getByText(serviceName, { exact: true });

		await service.click();
	},
);

Then(
	'I should see my cart showing {int} item added',
	async ({ page }, itemCount: number) => {
		const itemCountElement = page.locator(
			'svg[data-testid="LocalPrintshopIcon"] + span',
		);

		await expect(itemCountElement).toBeVisible();

		expect(itemCountElement).toHaveText(itemCount.toString());
	},
);

When('I click on the {string} button', async ({ page }, buttonText: string) => {
	const button = page.getByRole('button', { name: buttonText, exact: true });
	await expect(button).toBeVisible();

	await button.click();
});

Then(
	'I should see the text {string} visible',
	async ({ page }, text: string) => {
		await expect(page.getByText(text, { exact: true })).toBeVisible();
	},
);

Then(
	'I should see the button with id {string} visible',
	async ({ page }, buttonId: string) => {
		await expect(page.locator(`button#${buttonId}`)).toBeVisible();
	},
);

When(
	'I click on the element with id {string}',
	async ({ page }, elementId: string) => {
		const element = page.locator(`#${elementId}`);

		await expect(element).toBeVisible();

		await element.click();
	},
);

Then(
	'I should see a popup dialog with title {string}',
	async ({ page }, dialogTitle: string) => {
		const dialogTitleElement = page.locator('.MuiDialogTitle-root');

		await expect(dialogTitleElement).toBeVisible();
		await expect(dialogTitleElement).toHaveText(dialogTitle);
	},
);

Then(
	'I should see a popup dialog with content {string}',
	async ({ page }, content: string) => {
		const dialogContentElement = page.locator('.MuiDialogContent-root');

		await expect(dialogContentElement).toBeVisible();
		await expect(dialogContentElement).toHaveText(content);
	},
);

When(
	'I click on the {string} button in the popup dialog',
	async ({ page }, buttonText: string) => {
		const dialog = page.locator('div[role="dialog"]');

		const button = dialog.getByRole('button', {
			name: buttonText,
			exact: true,
		});
		await expect(button).toBeVisible();

		await button.click();
	},
);

Then('I should see the tax amount non-zero', async ({ page }) => {
	const chargeTax = page.locator('.xCharge__taxes');

	await expect(chargeTax).not.toContainText('0.00');
	await expect(chargeTax).not.toHaveText('$0.00');
});

When(
	'I select the {string} payment type',
	async ({ page }, paymentType: string) => {
		const paymentTypeButton = page
			.locator('.xPayment__type')
			.getByText(paymentType, { exact: true });
		await expect(paymentTypeButton).toBeVisible();

		await paymentTypeButton.click();
	},
);

When('I click on the item {string} button', async ({ page }, item: string) => {
	const itemButton = page.locator('.xMultiple').getByText(item);
	await expect(itemButton).toBeVisible();

	await itemButton.click();
});

When(
	'I select the {string} service in the dialog',
	async ({ page }, service: string) => {
		const serviceButton = page
			.locator('div.xMultiple__wrap')
			.locator('li.xTicketItems')
			.getByText(service, { exact: true });
		await expect(serviceButton).toBeVisible();

		await serviceButton.click();
	},
);

When(
	'I select the {string} employee in the dialog',
	async ({ page }, employee: string) => {
		const employeeButton = page
			.locator('.xEmployeeItem')
			.getByText(employee, { exact: true });
		await expect(employeeButton).toBeVisible();

		await employeeButton.click();
	},
);

When(
	'I click on the {string} button in the dialog',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.xMultiple__wrap')
			.getByRole('button', { name: button });

		await expect(buttonElement).toBeVisible();

		await buttonElement.click();
	},
);

Then(
	'I should see the {string} employee in my cart',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('ul.xTicketItemList')
			.getByText(employee);
		await expect(employeeElement).toContainText(employee);
	},
);

Then(
	'I should see multiple {string} employees in my cart',
	async ({ page }, employee: string) => {
		const employeeElements = await page
			.locator('li.xTicketItems')
			.getByText(employee)
			.all();

		expect(employeeElements.length).toBeGreaterThan(1);
	},
);

Then('I should see the {string} name', async ({ page }, name: string) => {
	const nameElement = page.locator('.xPayment__card--input').getByText(name);
	await expect(nameElement).toContainText(name);
});

When(
	'I fill the Gift card with {string}',
	async ({ page }, giftCardNumber: string) => {
		for (const digit of giftCardNumber) {
			await page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}

		await expect(page.locator('.xPayment__card--input').nth(0)).toContainText(
			giftCardNumber,
		);
	},
);

When(
	'I click on the adding {string} button',
	async ({ page }, button: string) => {
		const buttonElement = page.locator('.xCharge').getByText(button);
		await expect(buttonElement).toBeVisible();

		await buttonElement.click();
	},
);

When('I fill {string} from the numpad', async ({ page }, amount: string) => {
	for (const digit of amount) {
		await page
			.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
			.click();
	}

	const OKButton = page.getByRole('button', { name: 'OK' });

	await OKButton.click();
});

Then('I should see {string} tip in my cart', async ({ page }, tip: string) => {
	const tipElement = page.locator('ul.xCharge').getByText(tip);

	await expect(tipElement).toContainText(tip);
});

When(
	'I fill the last 4 digits of card number {string}',
	async ({ page }, number: string) => {
		for (const digit of number) {
			await page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}

		await expect(page.locator('.xPayment__card--number-digits')).toContainText(
			number,
		);
	},
);

When('I click on the Select customer', async ({ page }) => {
	page.locator('.TicketSearch__customer').click();
});

Then(
	'I should see the loyalty program {string} visible',
	async ({ page }, program: string) => {
		const loyaltyProgram = page.locator(
			'#mui-component-select-loyaltyProgramId',
		);
		await loyaltyProgram.waitFor({ state: 'attached' });
		await expect(loyaltyProgram).toHaveText(program);
	},
);

Then(
	'I should see the employee {string} visible in the split tip screen',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.xSplitTip__employee')
			.getByText(employee, { exact: true });

		await expect(employeeElement).toHaveText(employee);
	},
);

Then(
	'I should see the text {string} visible in the split tip screen',
	async ({ page }, text: string) => {
		const textElement = page
			.locator('.xPayment__numpad.xSplitTip')
			.getByText(text, { exact: true });

		await expect(textElement).toContainText(text);
	},
);

Then(
	'I should see the total tip {string} visible in the split tip screen',
	async ({ page }, totalTip: string) => {
		const totalTipElement = page
			.locator('.xPayment__numpad.xSplitTip')
			.locator('.xSplitTip__numpad--tip')
			.getByText(totalTip);

		await expect(totalTipElement).toContainText(totalTip);
	},
);

When(
	'I fill the new customer name {string}',
	async ({ page }, name: string) => {
		const firstName = page.locator('input[name="firstName"]');
		await firstName.fill(name);

		await expect(firstName).toHaveValue(name);
	},
);

When('I fill the new customer phone', async ({ page }) => {
	const cellPhone = page.locator('input[name="cellPhone"]');
	const rawPhone = Math.floor(
		1000000000 + Math.random() * 9000000000,
	).toString();
	const formattedPhone = `(${rawPhone.substring(0, 3)}) ${rawPhone.substring(3, 6)}-${rawPhone.substring(6)}`;

	await cellPhone.fill(rawPhone);

	await expect(cellPhone).toHaveValue(formattedPhone);
});

Then(
	'I should see a new customer {string} on ticket',
	async ({ page }, name: string) => {
		const customerElement = page
			.locator('.TicketSearch__customer .mainTitle')
			.getByText(name);
		await expect(customerElement).toHaveText(name);
	},
);

When('I add the {string} customer', async ({ page }, customer: string) => {
	const customerSearch = page.locator('.xTicketCustomer');
	await customerSearch.click();
	page.waitForTimeout(10000);
	await customerSearch.getByRole('combobox').fill(customer);

	const selectCustomer = page
		.locator('li.MuiListItemText-root.name')
		.getByText(customer, { exact: true });
	await selectCustomer.click();
});

When('I redeem my loyalty points', async ({ page }) => {
	await page.locator('.xLoyalty__item').click();
	await page.locator('.xLoyalty__btn').getByText('OK').click();
});

When(
	'I click on the {string} button in the split tip screen',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.xPayment__numpad.xSplitTip')
			.getByRole('button', { name: button });

		await expect(buttonElement).toBeVisible();

		await buttonElement.click();
	},
);

Then('I should see all split tips non-zero', async ({ page }) => {
	const tipValues = page
		.locator('.xSplitTip__employee')
		.locator('.tip.row')
		.locator('span.value');
	const allTips = await tipValues.allTextContents();
	expect(allTips).not.toContain('0.00');
	expect(allTips.every((tip) => !tip.includes('0.00'))).toBeTruthy();
});

When(
	'I click on the {string} label in the header',
	async ({ page }, label: string) => {
		const labelElement = page
			.locator('.xHeader__content')
			.getByText(label, { exact: true });

		await expect(labelElement).toBeVisible();

		await labelElement.click();
	},
);

When(
	'I click on the {string} button in the waiting page',
	async ({ page }, buttonText: string) => {
		const buttonElement = page
			.locator('.xWaitingList__btn')
			.getByRole('button', { name: buttonText });
		await buttonElement.click();
	},
);

Then(
	'I should see the service {string} in my cart',
	async ({ page }, service: string) => {
		const serviceElement = page
			.locator('.xTicketItems__content')
			.getByText(service, { exact: true });
		await expect(serviceElement).toHaveText(service);
	},
);

Then(
	'I should see the duration {string} in my cart',
	async ({ page }, duration: string) => {
		const durationElement = page
			.locator('.appt-duration')
			.getByText(duration, { exact: true });
		await expect(durationElement).toHaveText(duration);
	},
);

Then(
	'I should see the employee {string} for all items in a package in my cart',
	async ({ page }, employee: string) => {
		const elements = await page
			.locator('.childService')
			.getByText(employee, { exact: true })
			.all();

		for (const element of elements) {
			await expect(element).toHaveText(employee);
		}
	},
);

Then(
	'I should see the customer {string} in the waiting list',
	async ({ page }, customer: string) => {
		const customerElement = page
			.locator('div[data-field="customerInfo"]')
			.getByText(customer, { exact: true });
		await expect(customerElement).toHaveText(customer);
	},
);

Then(
	'I should see the service {string} in the waiting list',
	async ({ page }, service: string) => {
		const serviceElement = page
			.locator('div[data-field="categoryNames"]')
			.getByText(service, { exact: true });
		await expect(serviceElement).toHaveText(service);
	},
);

Then(
	'I should see the technician {string} in the waiting list',
	async ({ page }, technician: string) => {
		const technicianElement = page
			.locator('div[data-field="technicianNickNames"]')
			.getByText(technician, { exact: true });
		await expect(technicianElement).toHaveText(technician);
	},
);

When('I enter the amount {string}', async ({ page }, amount: string) => {
	for (const digit of amount) {
		await page
			.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
			.click();
	}
});

Then(
	'I should see the employee {string} in the ticket',
	async ({ page }, employee: string) => {
		const headerContent = page.locator('.xHeader__content');

		await expect(headerContent).toContainText(employee);
	},
);

When('I select the {string} label', async ({ page }, label: string) => {
	const giftCardOption = page
		.locator('ul.xTimeSheet li')
		.filter({ has: page.locator('span.label', { hasText: label }) });

	await expect(giftCardOption).toBeVisible();
	await giftCardOption.click();
});

When('I enter password with PIN {string}', async ({ page }, pin: string) => {
	for (const digit of pin) {
		await page
			.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
			.click();
	}
});

Then(
	'I should see the gift number {string} visible',
	async ({ page }, number: string) => {
		const giftNumberElement = page
			.locator('.giftCard__content')
			.getByText(number, { exact: true });

		await expect(giftNumberElement).toBeVisible();
	},
);

When('I select the title {string}', async ({ page }, name: string) => {
	const nameElement = page.locator('.xPayment__card--input').getByText(name);
	await expect(nameElement).toContainText(name);
	await nameElement.click();
});

Then(
	'I should see the payment history {string} visible',
	async ({ page }, paymentHistory: string) => {
		const paymentHistoryElement = page
			.locator('.xPayment__history--nameType')
			.getByText(paymentHistory);
		await expect(paymentHistoryElement).toHaveText(paymentHistory);
	},
);

Then(
	'I should see the number {string} visible',
	async ({ page }, number: string) => {
		const numberElement = page
			.locator('.BalanceLayout__content--number')
			.getByText(number, { exact: true });

		await expect(numberElement).toBeVisible();
	},
);

Then(
	'I should see the payment price {string}',
	async ({ page }, price: string) => {
		const priceElement = page
			.locator('.xPayment__history--price')
			.getByText(price);
		await expect(priceElement).toHaveText(price);
	},
);

When(
	'I click on the total price of {string}',
	async ({ page }, service: string) => {
		const serviceContainer = page
			.locator('.xTicketItems__info')
			.filter({ has: page.locator('.itemName', { hasText: service }) });

		await serviceContainer.locator('.xTicketItems__total').click();
	},
);

When('I change the price to {string}', async ({ page }, price: string) => {
	await page.locator('input#itemNumbers\\.amount').clear();
	await page.locator('input#itemNumbers\\.amount').fill(price);
});

When(
	'I change the quantity to {string}',
	async ({ page }, quantity: string) => {
		await page.locator('input#itemNumbers\\.qty').clear();
		await page.locator('input#itemNumbers\\.qty').fill(quantity);
	},
);

When('I enter a note {string}', async ({ page }, note: string) => {
	await page.locator("[placeholder='Enter your note']").fill(note);
	await page.getByRole('button', { name: 'Save' }).click();
});

Then(
	'I should see the total price {string} visible',
	async ({ page }, price: string) => {
		await expect(page.locator('.xTicketItems__total .price')).toContainText(
			price,
		);
	},
);

Then(
	'I should see the first type {string} in the gift card detail list',
	async ({ page }, type: string) => {
		const firstTypeCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="giftCardLogType"]');

		await expect(firstTypeCell).toHaveAttribute('title', type);
	},
);

Then(
	'I should see the note {string} visible',
	async ({ page }, note: string) =>
		await expect(page.locator('.xTicketItems__note')).toContainText(note),
);

Then(
	'I should see the loyalty phone {string} visible',
	async ({ page }, phone: string) => {
		const loyaltyPhoneElement = page
			.locator('.Bloyalty__phone')
			.getByText(phone, { exact: true });

		await expect(loyaltyPhoneElement).toBeVisible();
	},
);

Then(
	'I should see the first type {string} in the loyal detail list',
	async ({ page }, type: string) => {
		const firstTypeCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="type"]');

		await expect(firstTypeCell).toHaveAttribute('title', type);
	},
);

Then(
	'I should see the title contain {string} visible',
	async ({ page }, name: string) => {
		const titleElement = page
			.locator('.BalanceLayout__title span')
			.getByText(name);

		await expect(titleElement).toBeVisible();
		await expect(titleElement).toContainText(name);
	},
);

Then(
	'I should see the {string} option is checked',
	async ({ page }, name: string) => {
		const radioButton = page.getByLabel(name);

		await expect(radioButton).toBeChecked();
	},
);

When('I select the discount {string}', async ({ page }, discount: string) => {
	const discountElement = page
		.locator('.MuiListItem-gutters')
		.getByText(discount);
	await expect(discountElement).toHaveText(discount);
	await discountElement.click();
});

When('I select the type {string} option', async ({ page }, type: string) => {
	const typeElement = page.locator('.xFlex-select');
	await typeElement.click();
	await page.locator('#menu-typeDiscount').getByText(type).click();
});

Then(
	'I should see the discount type {string} visible',
	async ({ page }, type: string) => {
		const discountTypeElement = page
			.locator('.MuiListItemText-primary')
			.first()
			.getByText(type);
		await expect(discountTypeElement).toHaveText(type);
	},
);

When(
	'I enter the discount amount {string}',
	async ({ page }, amount: string) => {
		await page.locator('input#priceAmount').fill(amount);
	},
);

Then(
	'I should see the {string} discount in my cart',
	async ({ page }, discount: string) => {
		const discountElement = page
			.locator('.xTicketItems__discount--title')
			.getByText(discount);
		await expect(discountElement).toContainText(discount);
	},
);

Then(
	'I should see the {string} absorption type in my cart',
	async ({ page }, type: string) => {
		const typeElement = page
			.locator('.xTicketItems__discount--title')
			.getByText(type);
		await expect(typeElement).toContainText(type);
	},
);

Then(
	'I should see discount {string} in my cart',
	async ({ page }, amount: string) => {
		const amountDiscount = page
			.locator('.xTicketItems__discount--price')
			.getByText(amount);
		await expect(amountDiscount).toContainText(amount);
	},
);

When(
	'I enter the discount percent {string}',
	async ({ page }, percent: string) => {
		await page.locator('#pricePercent').fill(percent);
	},
);

Then('I should see the discount ticket non-zero', async ({ page }) => {
	const discountTicket = page.locator('ul.xCharge li.MuiListItem-root').nth(1);

	await expect(discountTicket).not.toContainText('0.00');
	await expect(discountTicket).not.toHaveText('$0.00');
});

Then(
	'I should see the {string} category',
	async ({ page }, category: string) => {
		const categoryElement = page
			.locator('button.MuiButtonBase-root')
			.getByText(category, { exact: true });
		await expect(categoryElement).toHaveText(category);
	},
);

When('I select the {string} category', async ({ page }, category: string) => {
	const categoryElement = page
		.locator('button.MuiButtonBase-root')
		.getByText(category, { exact: true });
	await expect(categoryElement).toHaveText(category);
	await categoryElement.click();
});

Then(
	'I should see the number card {string} visible',
	async ({ page }, number: string) => {
		const numberElement = page.locator('.numberCard').getByText(number);
		await expect(numberElement).toHaveText(number);
	},
);

When('I remove the tax', async ({ page }) => {
	const deleteTax = page.locator(
		'button:has(svg[data-testid="XDeleteBoldIcon"])',
	);

	await expect(deleteTax).toBeVisible();
	await deleteTax.click();
});

Then('I should see the tax display {string}', async ({ page }, tax: string) => {
	const taxAmount = page.locator('.xCharge__taxes');
	await expect(taxAmount).toHaveText(tax);
});

When('I select the reason {string}', async ({ page }, reason: string) => {
	const reasonElement = page
		.locator('.xVoid')
		.getByText(reason, { exact: true });
	await expect(reasonElement).toHaveText(reason);
	await reasonElement.click();
});

Then(
	'I should see a second popup dialog with title {string}',
	async ({ page }, dialogTitle: string) => {
		const dialogTitleElement = page.locator('.MuiDialogTitle-root').last();

		await expect(dialogTitleElement).toBeVisible();
		await expect(dialogTitleElement).toHaveText(dialogTitle);
	},
);

When('I back to HOME page', async ({ page }) => {
	await page.locator('.xHeader__top--left').click();
});

Then(
	'I should see the employee {string} in my cart',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.xTicketItems__wrap')
			.getByText(employee);
		await expect(employeeElement).toContainText(employee);
	},
);

When('I click on the header menu', async ({ page }) => {
	await page.locator('.xHeader__menu').click();
});

When(
	'I select the {string} label in the menu list',
	async ({ page }, label: string) => {
		const labelElement = page.locator('ul.xMenu__link').getByText(label);
		await expect(labelElement).toHaveText(label);
		await labelElement.click();
	},
);

Then(
	'I should see the employee {string} in the popup dialog',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.refund__content')
			.getByText(employee);
		await expect(employeeElement).toHaveText(employee);
	},
);

Then(
	'I should see the {string} service with status wait',
	async ({ page }, service: string) => {
		const serviceWithWaitStatus = page
			.locator('.xTicketItems__wrap', {
				hasText: service,
			})
			.filter({ has: page.locator('.status:text("W")') });

		await expect(serviceWithWaitStatus).toBeVisible();
	},
);

Then(
	'I should not see the service {string} in my cart',
	async ({ page }, service: string) => {
		const serviceElement = page
			.locator('.xTicketItems__content')
			.getByText(service, { exact: true });
		await expect(serviceElement).toHaveCount(0);
	},
);

When(
	'I click the status of {string} to change done',
	async ({ page }, service: string) => {
		const serviceContainer = page
			.locator('.xTicketItems__wrap')
			.filter({ hasText: service });

		const waitStatusElement = serviceContainer.locator('.status:text("W")');
		await expect(waitStatusElement).toBeVisible();

		await waitStatusElement.click();
	},
);

Then(
	'I should see the {string} service with status done',
	async ({ page }, service: string) => {
		const serviceWithWaitStatus = page
			.locator('.xTicketItems__wrap', {
				hasText: service,
			})
			.filter({ has: page.locator('.status.done:text("D")') });

		await expect(serviceWithWaitStatus).toBeVisible();
	},
);

When(
	'I click on the more menu for payment history of {string}',
	async ({ page }, paymentMethod: string) => {
		const paymentHistoryItem = page
			.locator('.xPayment__history--list li')
			.filter({ hasText: paymentMethod });

		await paymentHistoryItem.locator('button[aria-label="more"]').click();
	},
);

Then('I should see the tooltip remove', async ({ page }) => {
	const tooltipElement = page.locator(
		'.xPayment__history--tooltip.active .label:has-text("Remove")',
	);
	await expect(tooltipElement).toBeVisible();
});

When('I click on the tooltip remove', async ({ page }) => {
	const tooltipElement = page.locator(
		'.xPayment__history--tooltip.active .label:has-text("Remove")',
	);
	await tooltipElement.click();
});

Then(
	'I should see the text {string} in the payment history',
	async ({ page }, text: string) => {
		const paymentHistoryItem = page
			.locator('.xPayment__history--scroll')
			.filter({ hasText: text });

		await expect(paymentHistoryItem).toBeVisible();
	},
);

When('I search for {string}', async ({ page }, text: string) => {
	await page.locator('input[placeholder="Search…"]').fill(text);
});

Then(
	'I should see the last ticket of customer {string}',
	async ({ page }, customerInfo: string) => {
		const lastCustomerCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="customerInfo"]', { hasText: customerInfo })
			.last();

		await expect(lastCustomerCell).toBeVisible();
		await lastCustomerCell.scrollIntoViewIfNeeded();

		const title = await lastCustomerCell.getAttribute('title');
		expect((title || '').trim()).toBe(customerInfo.trim());
	},
);

When(
	'I click on the last row for customer {string} to expand details',
	async ({ page }, customerInfo: string) => {
		const resultRow = page.locator('.MuiDataGrid-row').filter({
			has: page.locator('[data-field="customerInfo"]', {
				hasText: customerInfo,
			}),
		});
		const lastRow = resultRow.last();
		await lastRow.scrollIntoViewIfNeeded();
		await lastRow.click();
	},
);

Then(
	'I should see the {string} button visible',
	async ({ page }, text: string) => {
		const button = page.locator('.MuiStack-root').getByText(text);
		await expect(button).toBeVisible();
	},
);

When('I click on the adjust tip icon', async ({ page }) => {
	await page.locator('.xPayment__history--listBtn').click();
});

Then(
	'I should see the payment price contain amount {string}',
	async ({ page }, amount: string) => {
		const priceElement = page.locator('.xPayment__history--price');
		await expect(priceElement).toContainText(amount);
	},
);

When(
	'I double click on the time slot at {string}',
	async ({ page }, timeSlot: string) => {
		await page.waitForLoadState('networkidle', { timeout: 60000 });
		await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

		// Dynamically generate time slot map
		const timeSlotMap: Record<string, number> = {};
		for (let hour = 0; hour < 24; hour++) {
			const hour12 = hour % 12 === 0 ? 12 : hour % 12;
			const period = hour < 12 ? 'AM' : 'PM';
			const label = `${hour12.toString().padStart(2, '0')}:00 ${period}`;
			timeSlotMap[label] = hour + 1;
		}

		const rowIndex = timeSlotMap[timeSlot];

		if (!rowIndex) {
			throw new Error(
				`Time slot "${timeSlot}" is not valid. Valid options are: ${Object.keys(timeSlotMap).join(', ')}`,
			);
		}

		const targetRow = page
			.locator('#scheduler_table tbody tr')
			.nth(rowIndex - 1);
		const targetCell = targetRow.locator('td.e-work-cells');

		await expect(targetCell).toBeVisible({ timeout: 60000 });
		await targetCell.scrollIntoViewIfNeeded();
		await targetCell.dblclick();
	},
);

When(
	'I select the {string} label in the expanded list',
	async ({ page }, label: string) => {
		const labelElement = page
			.locator('div.xMenu__link span')
			.filter({ hasText: label });
		await labelElement.click();
	},
);

When(
	'I select the {string} employee from the technician dropdown',
	async ({ page }, employee: string) => {
		await page.locator('.MuiInputBase-root ').click();
		await page.waitForSelector('ul.MuiAutocomplete-listbox', {
			state: 'visible',
		});

		const option = page
			.locator('li.MuiAutocomplete-option')
			.filter({ hasText: employee });

		await expect(option).toBeVisible();
		await option.click();
	},
);

Then('I should see the title {string}', async ({ page }, employee: string) => {
	const employeeElement = page.locator('.header-title').getByText(employee);
	await expect(employeeElement).toContainText(employee);
});

Then(
	'I should see the duration {string}',
	async ({ page }, duration: string) => {
		const durationElement = page.locator(
			'.appt-duration .MuiListItemText-primary',
		);
		await expect(durationElement).toBeVisible();
		await expect(durationElement).toContainText(duration);
	},
);

When(
	'I select the first ticket with total {string}',
	async ({ page }, total: string) => {
		const ticketElement = page
			.locator('.MuiDataGrid-row')
			.first()
			.filter({
				has: page.locator('[data-field="ticketTotals"]', { hasText: total }),
			});

		await ticketElement.click();
	},
);

When('I select the {string} tab', async ({ page }, tab: string) => {
	const tabElement = page.getByRole('tab', { name: tab });
	await tabElement.click();
});

Then(
	'I should see the text {string} in the ticket adjustment screen',
	async ({ page }, text: string) => {
		const element = page.locator('.xMainContent').getByText(text);
		await expect(element).toBeVisible();
	},
);

Then(
	'I should see the customer {string} booked',
	async ({ page }, customerName: string) => {
		const appointmentElement = page
			.locator('.e-appointment .event-cellTime')
			.last();
		await expect(appointmentElement).toBeVisible();
		await expect(appointmentElement).toContainText(customerName);
	},
);

Then(
	'I should see the {string} label in the expanded list',
	async ({ page }, label: string) => {
		const labelElement = page
			.locator('div.xMenu__link li')
			.filter({ hasText: label });
		await expect(labelElement).toBeVisible();
	},
);

When(
	'I click on the title {string} in the ticket adjustment screen',
	async ({ page }, text: string) => {
		const element = page.locator('.xFixTicket__main--option').getByText(text);
		await element.click();
	},
);

Then(
	'I should see the package item {string} in my cart',
	async ({ page }, service: string) => {
		const servicePackageItem = page
			.locator('.ServicePackageItem .xTicketItems__name')
			.getByText(service);
		await expect(servicePackageItem).toBeVisible();
		await expect(servicePackageItem).toHaveText(service);
	},
);

Then('I should see the detail {string}', async ({ page }, detail: string) => {
	const itemDetail = page.locator('.xTicketItems__detail').getByText(detail);

	await expect(itemDetail).toContainText(detail);
});

Then(
	'I should see multiple {string} details',
	async ({ page }, detail: string) => {
		const itemDetails = await page
			.locator('.xTicketItems__detail')
			.getByText(detail)
			.all();

		expect(itemDetails.length).toBeGreaterThan(1);
	},
);

Then(
	'I should see a popup dialog containing the title {string}',
	async ({ page }, title: string) => {
		const dialogTitle = page.locator('#alert-dialog-title').getByText(title);
		await expect(dialogTitle).toBeVisible();
		await expect(dialogTitle).toContainText(title);
	},
);

When(
	'I click on the charge item {string} in the ticket adjustment screen',
	async ({ page }, button: string) => {
		const buttonItem = page
			.locator('.xFixTicket__main--chargeItem')
			.getByText(button);
		await buttonItem.click();
	},
);

Then(
	'I should see the charge display {string}',
	async ({ page }, charge: string) => {
		const chargedItem = page
			.locator('.xFixTicket__main--chargeItem')
			.getByText(charge);
		await expect(chargedItem).toContainText(charge);
	},
);

When(
	'I select the service {string} in my cart',
	async ({ page }, service: string) => {
		const serviceElement = page
			.locator('.xTicketItems__content')
			.getByText(service, { exact: true });
		await serviceElement.click();
	},
);

Then('I should see the check icon', async ({ page }) => {
	const checkIcon = page.locator('[data-testid="XCheckIcon"]');
	await expect(checkIcon).toBeVisible();
});

When(
	'I click on the action {string} button',
	async ({ page }, button: string) => {
		const buttonItem = page
			.locator('.xFixTicket__action--btn')
			.getByText(button);
		await buttonItem.click();
	},
);

When(
	'I select the employee {string} in the ticket adjustment screen',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.ListItemEmployee__wrap')
			.getByText(employee, { exact: true });
		await expect(employeeElement).toBeVisible();
		await employeeElement.click();
	},
);

When('I select the employee {string}', async ({ page }, employee: string) => {
	const employeeElement = page
		.locator('.MuiDataGrid-main')
		.getByText(employee, { exact: true });
	await expect(employeeElement).toBeVisible();
	await employeeElement.click();
});

Then(
	'I verify all single payroll details for Owner View are displayed correctly',
	async ({ page }) => {
		const fields = [
			'Payroll Date:',
			'Technician Name:',
			'Payroll Type:',
			'# of Work Days:',
			'Sale Summary',
			'Total:',
			'Product:',
			'Service:',
			'Service Deductions',
			'Item Discount:',
			'Ticket Discount:',
			'Item Supply Fee:',
			'Ticket Supply Fee:',
			'Loyalty Redemption:',
			'Other Deductions',
			'Daily Maintenance Fee:',
			'Credit Card Fee:',
			'Tax Withheld on Cash:',
			'Pay Calculations',
			'Net Total Sale:',
			'Product Commission:',
			'Service Commission:',
			'Net Commission:',
			'Net Non-Cash Tip (100.00%):',
			'Check (50.00%):',
			'Cash (50.00%):',
			'Pay 1:',
			'Pay 2:',
			'Total Payout:',
			'Gross Profit:',
		];
		const card = page.locator('.MuiCard-root.render-bill');

		for (const label of fields) {
			const fieldLocator = card.getByText(label.trim(), { exact: false });
			await expect(fieldLocator).toBeVisible();
		}
	},
);

Then(
	'I should see the categories displayed correctly in check-in',
	async ({ page }) => {
		const expectedCategories = ['MANI & PEDI', 'FULL SET & FILL IN'];

		const categoryElements = page.locator('[role="tablist"] span');
		await expect(categoryElements).toHaveCount(expectedCategories.length);

		for (let i = 0; i < expectedCategories.length; i++) {
			const categoryName = await categoryElements.nth(i).innerText();
			expect(categoryName.trim()).toBe(expectedCategories[i]);
		}
	},
);

When(
	'I click on the {string} button in the create new customer dialog',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.customDialogAction')
			.getByRole('button', { name: button });
		await buttonElement.click();
	},
);

When(
	'I select the booked of {string}',
	async ({ page }, customerName: string) => {
		const appointmentElement = page
			.locator('.e-appointment .event-cellTime')
			.last();
		await expect(appointmentElement).toBeVisible();
		await expect(appointmentElement).toContainText(customerName);
		await appointmentElement.click();
	},
);

Then(
	'I should see the services displayed correctly in check-in',
	async ({ page }) => {
		const expectedServices = [
			'Next Available Service',
			'Manicure',
			'Pedicure',
			'Cut cuticle',
			'Gel removal',
			'Acrylic removal',
			'Gel X',
			'Request price',
			'Combo 1',
			'Combo 2',
			'Supper combo',
		];

		const serviceElements = page.locator(
			'li.ItemService .ItemService__name span',
		);
		await expect(serviceElements).toHaveCount(expectedServices.length);

		for (let i = 0; i < expectedServices.length; i++) {
			const serviceName = await serviceElements.nth(i).innerText();
			expect(serviceName.trim()).toBe(expectedServices[i]);
		}
	},
);

Then(
	'I should see the technician name {string}',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('tr', { has: page.getByText('Technician Name:') })
			.locator('td:nth-child(2)');
		await expect(employeeElement).toBeVisible();
		await expect(employeeElement).toContainText(employee);
	},
);

Then(
	'I should see the payroll type {string}',
	async ({ page }, type: string) => {
		const typeElement = page
			.locator('tr', { has: page.getByText('Payroll type:') })
			.locator('td:nth-child(2)');
		await expect(typeElement).toBeVisible();
		await expect(typeElement).toContainText(type);
	},
);

Then(
	'I should see the time {string} in my cart',
	async ({ page }, time: string) => {
		const timeElement = page
			.locator('.dateBooking')
			.getByText(time, { exact: true });
		await expect(timeElement).toBeVisible();
		await expect(timeElement).toContainText(time);
	},
);

When(
	'I handle the Confirm Validate Time dialog if it appears',
	async ({ page }) => {
		// Wait a short time to ensure page is stable
		await page.waitForTimeout(500);

		// Check if any dialog is visible
		const dialogVisible = await page.locator('div[role="dialog"]').isVisible();

		if (dialogVisible === true) {
			// Look for the confirm button
			const confirmButton = page
				.locator('button.MuiButton-containedPrimary.button_dialog_options')
				.getByRole('button', { name: 'confirm', exact: true });
			await expect(confirmButton).toBeVisible();
			await confirmButton.click({ force: true });
		}
		// If no dialog is visible, this step completes without doing anything
	},
);

When('I select the type {string}', async ({ page }, type: string) => {
	const combobox = page.locator('div[role="combobox"]');
	await combobox.click();

	const typeElement = page.locator('li[role="option"]').getByText(type);
	await expect(typeElement).toBeVisible();
	await expect(typeElement).toContainText(type);
	await typeElement.click();
});

Then(
	'I should see the {string} button disable',
	async ({ page }, text: string) => {
		const buttonElement = page.getByRole('button', { name: text });
		await expect(buttonElement).toBeDisabled();
	},
);

When('I click on the {string} tab', async ({ page }, tab: string) => {
	const tabElement = page.getByRole('tab', { name: tab });
	await expect(tabElement).toBeVisible();
	await tabElement.click();
});

Then(
	'I should see the {string} button visible in the payroll',
	async ({ page }, text: string) => {
		const buttonElement = page
			.locator('.MuiBox-root')
			.getByRole('button', { name: text });
		await expect(buttonElement).toBeVisible();
	},
);

Then('I should see the service hint', async ({ page }) => {
	const serviceHint = page.locator('[data-testid="QuestionMarkIcon"]');
	await expect(serviceHint).toBeVisible();
});

Then(
	'I should see the hint details {string}',
	async ({ page }, text: string) => {
		const hintDetails = page.locator('.MuiTypography-root').getByText(text);
		await expect(hintDetails).toBeVisible();
		await expect(hintDetails).toContainText(text);
	},
);

Then('I should see the pin appointment', async ({ page }) => {
	const pinAppointment = page.locator('.xWaitingList__item--label');
	await expect(pinAppointment).toBeVisible();
});

Then(
	'I should not see the customer {string} in the waiting list',
	async ({ page }, customer: string) => {
		const customerElement = page
			.locator('div[data-field="customerInfo"]')
			.getByText(customer, { exact: true });
		await expect(customerElement).not.toBeVisible();
	},
);
