import { expect } from '@playwright/test';
import { createBdd, type DataTable } from 'playwright-bdd';

import { constants } from '#const';
import { type PageId } from '#types';

const { When, Then } = createBdd();

Then(
	'I should be redirected to {pageId} page',
	async ({ page }, pageId: PageId) => {
		const pageUrl = constants.PageUrl[pageId];

		await page.waitForURL(pageUrl);
		await expect(page).toHaveURL(pageUrl);
		await page.waitForTimeout(2000);
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
	'I should see the employee {string} in the payroll list',
	async ({ page }, employeeName: string) => {
		const employeeList = page.locator('div.MuiDataGrid-virtualScrollerContent');

		await expect(
			employeeList.getByText(employeeName, { exact: true }),
		).toBeVisible();
	},
);

Then(
	'I should not see the employee {string} in the ticket list',
	async ({ page }, employeeName: string) => {
		const employeeList = page.locator('ul.listUserInfos');

		await expect(
			employeeList.getByText(employeeName, { exact: true }),
		).not.toBeVisible();
	},
);

Then(
	'I should not see the employee {string} in the employee list',
	async ({ page }, employeeName: string) => {
		const employeeList = page.locator('div.xQueueList');

		await expect(
			employeeList.getByText(employeeName, { exact: true }),
		).not.toBeVisible();
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
			'svg[data-testid="PrintTicketIconIcon"] + span',
		);

		await expect(itemCountElement).toBeVisible();

		expect(itemCountElement).toHaveText(itemCount.toString());
	},
);

Then(
	'My cart should contain {string} item',
	async ({ page }, itemCount: string) => {
		const itemCountElement = page.locator(
			'svg[data-testid="PrintTicketIconIcon"] + span',
		);

		await expect(itemCountElement).toHaveText(itemCount.toString());
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
	'I should see the card price amount {string} visible',
	async ({ page }, amount: string) => {
		const cardPrice = page.locator(
			'.xPayment__total.xPayment__box dl:has(dt:text("Card Price")) dd',
		);

		await expect(cardPrice).toBeVisible();
		await expect(cardPrice).toContainText(amount);
	},
);

Then(
	'I should see the cash price amount {string} visible',
	async ({ page }, amount: string) => {
		await expect(
			page.locator(
				'.xPayment__total.xPayment__box dl:has(dt:text("Cash Price")) dd',
			),
		).toContainText(amount);
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
		await expect(dialogContentElement).toContainText(content);
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

Then(
	'I should see multiple {string} technicians in the waiting list',
	async ({ page }, technician: string) => {
		const technicianElements = await page
			.locator('div[data-field="technicianNickNames"]')
			.getByText(technician, { exact: true })
			.all();
		expect(technicianElements.length).toBeGreaterThan(1);
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

	await expect(tipElement).toHaveText(tip);
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

When(
	'I select the employee {string} in the split tip screen',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.xSplitTip__employee')
			.getByText(employee, { exact: true });
		await employeeElement.click();
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

When(
	'I add the phone number customer {string}',
	async ({ page }, PhoneCustomer: string) => {
		const customerSearch = page.locator('.TicketSearch__customer ');
		await customerSearch.click();
		//page.waitForTimeout(5000);
		await customerSearch.getByRole('combobox').fill(PhoneCustomer);

		const selectCustomer = page.locator('li.MuiAutocomplete-option').first();

		await selectCustomer.click();
	},
);
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

Then(
	'I should see the split tips amount for employee {string} is non-zero',
	async ({ page }, employee: string) => {
		const tipValues = page
			.locator('.xSplitTip__employee')
			.getByText(employee, { exact: true })
			.locator('.tip.row')
			.locator('span.value');
		const allTips = await tipValues.allTextContents();
		expect(allTips).not.toContain('0.00');
		expect(allTips.every((tip) => !tip.includes('0.00'))).toBeTruthy();
	},
);

Then(
	'I should see the split tips amount for employee {string} is zero',
	async ({ page }, employeeName) => {
		const employeeItem = page.locator('.xSplitTip__item').filter({
			has: page.locator(`.name:has-text("${employeeName}")`),
		});
		const tipValue = employeeItem.locator('.tip .value');
		await expect(tipValue).toHaveText('$0.00');
	},
);

When(
	'I click on the {string} label in the header',
	async ({ page }, label: string) => {
		const labelElement = page
			.locator('.xNavbar')
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

Then('My cart should contain {string}', async ({ page }, text: string) => {
	await expect(page.locator('.xTicketItems__content')).toContainText(text);
});

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
			.getByText(customer, { exact: true })
			.last();
		await expect(customerElement).toHaveText(customer);
	},
);

Then(
	'I should see the service {string} in the waiting list',
	async ({ page }, service: string) => {
		const serviceElement = page
			.locator('div[data-field="categoryNames"]')
			.getByText(service, { exact: true })
			.last();
		await expect(serviceElement).toHaveText(service);
	},
);

Then(
	'I should see the technician {string} in the waiting list',
	async ({ page }, technician: string) => {
		const technicianElement = page
			.locator('div[data-field="technicianNickNames"]')
			.getByText(technician, { exact: true })
			.last();
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
	'I should see the user info {string} in the ticket',
	async ({ page }, employee: string) => {
		const primaryTechnician = page.locator('.xHeader__content');

		await expect(primaryTechnician).toContainText(employee);
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
	'I should see the payment history amount {string} visible',
	async ({ page }, amount: string) => {
		const paymentHistoryElement = page
			.locator('.xPayment__history--price')
			.getByText(amount);
		await expect(paymentHistoryElement).toHaveText(amount);
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
		const priceElement = page.locator('.xTicketItems__total .price', {
			hasText: price,
		});
		await expect(priceElement).toBeVisible();
	},
);

Then(
	'I should see the first type {string} in the gift card detail list',
	async ({ page }, type: string) => {
		const firstTypeCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="giftCardLogType"]');

		await expect(firstTypeCell).toHaveAttribute('title', new RegExp(type));
		await expect(firstTypeCell).toContainText(type);
	},
);

Then(
	'I should see the first type {string} in the loyalty detail list',
	async ({ page }, type: string) => {
		const firstTypeCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="type"]');

		await expect(firstTypeCell).toHaveAttribute('title', new RegExp(type));
		await expect(firstTypeCell).toContainText(type);
	},
);

Then(
	'I should see the first amount {string} in the gift card detail list',
	async ({ page }, amount: string) => {
		const firstAmountCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="amount"]');

		await expect(firstAmountCell).toContainText(amount);
	},
);

Then(
	'I should see the first date is today in the gift card detail list',
	async ({ page }) => {
		const firstDateCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="createdAt"]');
		const formattedToday = await page.evaluate(() => {
			const today = new Date();
			return today.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			});
		});
		await expect(firstDateCell).toContainText(formattedToday);
	},
);

Then(
	'I should see the first date is not today in the gift card detail list',
	async ({ page }) => {
		const firstDateCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="createdAt"]');
		const formattedToday = await page.evaluate(() => {
			const today = new Date();
			return today.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			});
		});
		await expect(firstDateCell).not.toContainText(formattedToday);
	},
);

Then(
	'I should see the first date is today in the loyalty detail list',
	async ({ page }) => {
		const firstDateCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('.MuiDataGrid-cell[data-field="createdDate"]');
		const formattedToday = await page.evaluate(() => {
			const today = new Date();
			return today.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			});
		});
		await expect(firstDateCell).toContainText(formattedToday);
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
		.getByText(discount, { exact: true });
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

When('I add the tax', async ({ page }) => {
	const addTax = page.locator('button:has(svg[data-testid="XAddSquareIcon"])');

	await expect(addTax).toBeVisible();
	await addTax.click();
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
	'I should see the {string} service with status start',
	async ({ page }, service: string) => {
		const serviceWithStartStatus = page
			.locator('.xTicketItems__wrap', {
				hasText: service,
			})
			.filter({ has: page.locator('.status:text("S")') });

		await expect(serviceWithStartStatus).toBeVisible();
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

		const doneStatusElement = page
			.locator('.xTicketItems__actions')
			.getByRole('button', { name: 'Done' });
		await expect(doneStatusElement).toBeVisible();

		await doneStatusElement.click();
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

When('I click on refresh', async ({ page }) => {
	await page.locator('[data-testid="RefreshIcon"]').click();
});

When(
	'I filter the ticket type {string}',
	async ({ page }, ticketType: string) => {
		const ticketTypeSelect = page.locator('.xFlex-select');
		await expect(ticketTypeSelect).toBeVisible();
		await ticketTypeSelect.click();

		const option = page.getByRole('option', {
			name: ticketType,
			exact: true,
		});
		await expect(option).toBeVisible();
		await option.click();
	},
);

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
	await page.locator('input[placeholder="Search…"]').first().fill(text);
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
	'I click on the first row for technician {string} to expand details',
	async ({ page }, customerInfo: string) => {
		const resultRow = page.locator('.MuiDataGrid-row').filter({
			has: page.locator('[data-field="employeeInfo.nickName"]', {
				hasText: customerInfo,
			}),
		});
		const firstRow = resultRow.first();
		await firstRow.click();
	},
);

When(
	'I click on the first row for customer {string} to expand details',
	async ({ page }, customerInfo: string) => {
		const resultRow = page.locator('.MuiDataGrid-row').filter({
			has: page.locator('[data-field="customerInfo"]', {
				hasText: customerInfo,
			}),
			hasNot: page.locator('[data-color]:not([data-color="wait"])'),
		});
		const firstRow = resultRow.first();
		await firstRow.click();
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

		// Dynamically generate time slot map (e.g. Time interval 20 minutes)
		const timeSlotMap: Record<string, number> = {};
		let index = 1;
		for (let hour = 0; hour < 24; hour++) {
			for (const minute of [0, 20, 40]) {
				const hour12 = hour % 12 === 0 ? 12 : hour % 12;
				const period = hour < 12 ? 'AM' : 'PM';
				const minuteStr = minute.toString().padStart(2, '0');
				const label = `${hour12.toString().padStart(2, '0')}:${minuteStr} ${period}`;
				timeSlotMap[label] = index++;
			}
		}

		const rowIndex = timeSlotMap[timeSlot];

		const targetRow = page
			.locator('#scheduler_table tbody tr')
			.nth(rowIndex - 1);

		const targetCell = targetRow.locator('td.e-work-cells');

		await expect(targetCell).toBeVisible({ timeout: 60000 });

		await targetCell.scrollIntoViewIfNeeded();

		// Get the bounding box of the cell
		const box = await targetCell.boundingBox();
		if (!box) throw new Error('Could not get bounding box for target cell.');

		// Calculate right-bottom position
		const x = box.x + box.width - 5; // small padding from the edge
		const y = box.y + box.height - 5;

		// Double click at the bottom-right corner
		await page.mouse.click(x, y, { clickCount: 2 });
	},
);

When(
	'I select the {string} label in the expanded list',
	async ({ page }, label: string) => {
		const labelElement = page
			.locator('div.xMenu__link span')
			.getByText(label, { exact: true });

		await expect(labelElement).toBeVisible();
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

When(
	'I select the {string} employee from the technician dropdown in the dialog',
	async ({ page }, employee: string) => {
		// Scope to the dialog and select the technician dropdown by accessible name
		const dialog = page.getByRole('dialog');
		await dialog.getByRole('combobox', { name: /technician/i }).click();

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
		await labelElement.scrollIntoViewIfNeeded();
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
		const expectedCategories = [
			'MANI & PEDI',
			'FULL SET & FILL IN',
			'ADDITIONAL SERVICE',
		];

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
	'I should see the categories displayed correctly in ticket view',
	async ({ page }) => {
		const expectedCategories = [
			'MANI & PEDI',
			'FULL SET & FILL IN',
			'ADDITIONAL SERVICE',
			'GIFT CARD',
		];

		const categoryElements = page.locator('[role="tablist"] span');
		await expect(categoryElements).toHaveCount(expectedCategories.length);

		for (let i = 0; i < expectedCategories.length; i++) {
			const categoryName = await categoryElements.nth(i).innerText();
			expect(categoryName.trim()).toBe(expectedCategories[i]);
		}
	},
);

Then(
	'I should see all services in the first category displayed correctly',
	async ({ page }) => {
		const expectedServices = [
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
	'I should see all services in the second category displayed correctly',
	async ({ page }) => {
		const expectedServices = [
			'Full set',
			'Fill gel',
			'Gel polish',
			'French full set',
			'Taxable',
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
	'I should see all services in the third category displayed correctly',
	async ({ page }) => {
		const expectedServices = ['Ombre'];

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
	'I should see all services in the fourth category displayed correctly',
	async ({ page }) => {
		const expectedServices = [
			'Shampoo',
			'Gift card $100',
			'Any gift card',
			'Gift card $50',
			'Gift Card $199.50',
			'Custom Gift Card',
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
		const dialogVisible = await page
			.locator('div[role="dialog"]')
			.locator('#draggable-dialog-title')
			.isVisible();

		if (dialogVisible === true) {
			// Look for the confirm button
			const confirmButton = page
				.locator('button.MuiButton-containedPrimary.button_dialog_options')
				.filter({ hasText: 'confirm' });
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
	await expect(combobox).toContainText(type);
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
	const pinAppointment = page.locator('.xWaitingList__item--label').last();
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

Then(
	'I should see the employees displayed correctly in turn details',
	async ({ page }) => {
		const expectedEmployees = ['Addison', 'Anna', 'Avery', 'Emily', 'Jessica'];

		const employeeElements = page.locator('tbody tr td:first-child div[title]');
		await expect(employeeElements).toHaveCount(expectedEmployees.length);

		for (let i = 0; i < expectedEmployees.length; i++) {
			const employeeName = await employeeElements.nth(i).innerText();
			expect(employeeName.trim()).toBe(expectedEmployees[i]);
		}
	},
);

Then(
	'I should see the first ticket closed by {string}',
	async ({ page }, amount: string) => {
		const lastPaymentCell = page
			.locator('.MuiDataGrid-virtualScrollerContent')
			.locator('.MuiDataGrid-row')
			.locator('[data-field="closeUserInfo.nickName"]', { hasText: amount })
			.first();

		await expect(lastPaymentCell).toBeVisible();
		await expect(lastPaymentCell).toContainText(amount);
	},
);

Then(
	'I should see the first ticket of payment {string}',
	async ({ page }, amount: string) => {
		const lastPaymentCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="paymentTotal"]', { hasText: amount })
			.first();

		await expect(lastPaymentCell).toBeVisible();
		await expect(lastPaymentCell).toContainText(amount);
	},
);

Then(
	'I should see the first ticket of Cash payment {string}',
	async ({ page }, amount: string) => {
		const rows = page.locator('.MuiDataGrid-row');

		const matchingRow = rows
			.filter({
				has: page.locator('[data-field="paymentMethod"]', { hasText: 'Cash' }),
			})
			.filter({
				has: page.locator('[data-field="paymentTotal"]', { hasText: amount }),
			})
			.last();

		await expect(matchingRow).toBeVisible();

		const methodCell = matchingRow.locator('[data-field="paymentMethod"]');
		const amountCell = matchingRow.locator('[data-field="paymentTotal"]');

		await expect(methodCell).toHaveText('Cash');
		await expect(amountCell).toHaveText(amount);
	},
);

When(
	'I click on the first row for payment {string} to expand details',
	async ({ page }, amount: string) => {
		const lastPaymentCell = page
			.locator('.MuiDataGrid-virtualScrollerContent')
			.locator('.MuiDataGrid-row')
			.locator('[data-field="paymentTotal"]', { hasText: amount })
			.first();
		await expect(lastPaymentCell).toBeVisible();
		await lastPaymentCell.click();
	},
);

When('I select the {string} option', async ({ page }, option: string) => {
	const optionElement = page.locator('.MuiListItem-root').getByText(option);
	await expect(optionElement).toBeVisible();
	await expect(optionElement).toContainText(option);
	await optionElement.click();
});

When(
	'I select the last booking in the time slot at {string}',
	async ({ page }, time: string) => {
		const timeTrimmed = time.trim(); // e.g., "09:20 AM"
		// Find the last appointment in the time slot
		const appointmentDiv = page
			.locator(`.e-appointment:has-text("${timeTrimmed}")`)
			.last();
		await expect(appointmentDiv).toBeVisible();
		await expect(appointmentDiv).toContainText(timeTrimmed);
		await appointmentDiv.click();
	},
);

When('I drag the appointment from {string}', async ({ page }, time: string) => {
	const timeTrimmed = time.trim(); // e.g., "09:20 AM"
	const appointmentDiv = page
		.locator(`.e-appointment:has-text("${timeTrimmed}")`)
		.first();
	await expect(appointmentDiv).toBeVisible();
	await expect(appointmentDiv).toContainText(timeTrimmed);
	await appointmentDiv.dragTo(page.locator('.e-resource-area'));
});

When('I drop it to {string}', async ({ page }, time: string) => {
	const timeTrimmed = time.trim(); // e.g., "09:20 AM"
	const appointmentDiv = page
		.locator(`.e-appointment:has-text("${timeTrimmed}")`)
		.last();
	await expect(appointmentDiv).toBeVisible();
	await expect(appointmentDiv).toContainText(timeTrimmed);
	await appointmentDiv.drop(page.locator('.e-resource-area'));
});

Then(
	'I should see the color header for Any Technician displayed correctly',
	async ({ page }) => {
		// Locate the header element that contains "Any Technician"
		const header = page.locator(
			'.header-cover-full-data:has-text("Any Technician")',
		);

		// Assert the background color is as expected
		await expect(header).toHaveCSS('background-color', 'rgb(0, 0, 0)');
	},
);

Then(
	'I should see the color header for employee {string} displayed correctly',
	async ({ page }, employee: string) => {
		// Locate the header element that contains the employee name
		const header = page.locator(
			`.header-cover-full-data:has-text("${employee}")`,
		);
		// Assert the background color is as expected
		await expect(header).toHaveCSS('background-color', 'rgb(26, 84, 142)');
	},
);

Then('I should see the employees sorted correctly', async ({ page }) => {
	const employeeLocators = page.locator('.header-title');
	const employeeNames = await employeeLocators.allTextContents();

	// Define the expected list in correct order
	const expectedOrder = ['Any Technician', 'Bella', 'Addison', 'Anna'];

	// Assert actual matches expected exactly
	expect(employeeNames).toEqual(expectedOrder);
});

Then(
	'I should see the appointment status {string}',
	async ({ page }, status: string) => {
		const statusElement = page.locator('.box-option').getByText(status, {
			exact: true,
		});
		await expect(statusElement).toBeVisible();
		await expect(statusElement).toContainText(status);
	},
);

When('I select view {string}', async ({ page }, view: string) => {
	const viewButton = page.getByRole('button', { name: view });
	await expect(viewButton).toBeVisible();
	await viewButton.click();
});

Then(
	'I should see the start of the week as {string}',
	async ({ page }, day: string) => {
		const dayElement = page.locator('.e-header-day').first();
		await expect(dayElement).toBeVisible();
		await expect(dayElement).toContainText(day);
	},
);

When('I fill the start time {string}', async ({ page }, startTime: string) => {
	const startTimeInput = page
		.locator('.MuiInputBase-root')
		.nth(3)
		.locator('input');

	await expect(startTimeInput).toBeVisible();
	await startTimeInput.fill(startTime);
	await expect(startTimeInput).toHaveValue(startTime);
});

When('I fill the end time {string}', async ({ page }, endTime: string) => {
	const endTimeInput = page
		.locator('.MuiInputBase-root')
		.nth(5)
		.locator('input');

	await expect(endTimeInput).toBeVisible();
	await endTimeInput.fill(endTime);
	await expect(endTimeInput).toHaveValue(endTime);
});

When('I fill the reason block {string}', async ({ page }, reason: string) => {
	const reasonInput = page.locator('textarea[name="blockReason"]');
	await reasonInput.fill(reason);
});

When('I switch ON {string}', async ({ page }, labelName: string) => {
	const switchElement = page
		.locator('.MuiFormControlLabel-root')
		.filter({ hasText: labelName })
		.locator('input[type="checkbox"]');

	await switchElement.check();
	await expect(switchElement).toBeChecked();
});

Then(
	'I should see an employee row with:',
	async ({ page }, dataTable: DataTable) => {
		// Convert DataTable to a more usable format (key-value pairs)
		const expectedData = dataTable.rowsHash();

		// Find the row containing the employee name
		const employeeRow = page.locator('.MuiDataGrid-row').filter({
			has: page.locator('.MuiDataGrid-cell[data-field="fullName"]', {
				hasText: expectedData.fullName,
			}),
		});

		// Ensure the row exists
		await expect(employeeRow).toBeVisible();

		// Create a helper function to get cell text
		const getCellText = async (fieldName: string): Promise<string> => {
			const cell = employeeRow.locator(
				`.MuiDataGrid-cell[data-field="${fieldName}"]`,
			);
			return ((await cell.textContent()) || '').trim();
		};

		// Verify each field from the data table
		for (const [field, expectedValue] of Object.entries(expectedData)) {
			// Handle special cases
			if (field === 'isAddToApptBook') {
				// For boolean fields, check for the presence of the check icon
				const hasCheckIcon = await employeeRow
					.locator(
						'.MuiDataGrid-cell[data-field="employeeSalon.isAddToApptBook"] [data-testid="CheckIcon"]',
					)
					.isVisible();

				expect(hasCheckIcon).toBe(expectedValue.toLowerCase() === 'true');
				continue;
			}

			// Handle fields with nested properties
			if (field === 'apptSortOrder') {
				const actualValue = await getCellText('employeeSalon.apptSortOrder');
				expect(actualValue).toBe(expectedValue);
				continue;
			}

			// For regular fields
			const actualValue = await getCellText(field);
			expect(actualValue).toBe(expectedValue);
		}
	},
);

When(
	'I click on the remove item service {string}',
	async ({ page }, service: string) => {
		const serviceContainer = page
			.locator('.xTicketItems__info')
			.filter({ has: page.locator('.itemName', { hasText: service }) });

		await serviceContainer.locator('.xTicketItems__delete').click();
	},
);

Then('I should see the Ticket table displayed correctly', async ({ page }) => {
	const headers = [
		'Ticket#',
		'Customer',
		'Total Sale',
		'Payment',
		'Surcharge',
		'Card Fee',
		'Tip',
		'Tax',
		'Date',
		'Closed Time',
		'Closed By',
	];

	for (const header of headers) {
		const headerElement = page.locator(
			`.MuiDataGrid-columnHeaderTitleContainerContent:has-text("${header}")`,
		);
		await headerElement.scrollIntoViewIfNeeded();
		await expect(headerElement).toBeVisible();
		await expect(headerElement).toContainText(header);
	}
});

Then('I should see both date pickers default to today', async ({ page }) => {
	const formattedToday = await page.evaluate(() => {
		const today = new Date();
		return today.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}); // Example: "07/03/2025"

	const datePickers = page.locator('button.button-date-calendar');
	const datePickerValues = datePickers.filter({
		hasText: /\d{2}\/\d{2}\/\d{4}/,
	});

	await expect(datePickerValues).toHaveCount(2);
	await expect(datePickerValues).toHaveText([formattedToday, formattedToday]);
});

Then('I should see no results for invalid search', async ({ page }) => {
	const searchInput = page.locator('input[type="search"]');
	await searchInput.fill('zzzz');

	// Wait for grid to reflect search result
	const noRowsOverlay = page.locator('.MuiDataGrid-overlay'); // this is usually shown when no rows match
	await expect(noRowsOverlay).toBeVisible();
	await expect(noRowsOverlay).toContainText(/no rows|no results/i);
});

Then(
	'I should see the first Services-Products table displayed correctly',
	async ({ page }) => {
		const headers = ['Name', 'Total Net Price', 'Total Commission'];

		for (const header of headers) {
			const headerElement = page
				.locator('.MuiDataGrid-columnHeaderTitleContainerContent')
				.getByText(header, { exact: true });
			await expect(headerElement).toBeVisible();
			await expect(headerElement).toContainText(header);
		}
	},
);

Then(
	'I should see the fist Payments table displayed correctly',
	async ({ page }) => {
		const headers = ['Type', 'Total Sale', 'Tip'];

		for (const header of headers) {
			const headerElement = page
				.locator(
					`.MuiDataGrid-columnHeaderTitleContainerContent:has-text("${header}")`,
				)
				.first();
			await expect(headerElement).toBeVisible();
			await expect(headerElement).toContainText(header);
		}
	},
);

Then(
	'I should see the Transaction table displayed correctly',
	async ({ page }) => {
		const headers = [
			'Reference Id',
			'Trans Date',
			'Ticket #',
			'Trans #',
			'Trans Date',
			'Card Type',
			'Trans Type',
			'Last4',
			'Surcharge',
			'Cash Discount',
			'Tip',
			'Amount',
			'Action',
		];

		for (const header of headers) {
			const headerElement = page
				.locator('.MuiDataGrid-columnHeaderTitleContainerContent')
				.getByText(header, { exact: true });
			await expect(headerElement).toBeVisible();
			await expect(headerElement).toContainText(header);
		}
	},
);

Then(
	'I should see the Batch history table displayed correctly',
	async ({ page }) => {
		const headers = [
			'Batch Date',
			'Application',
			'Transactions Count',
			'Return Amount',
			'Sale Amount',
			'Total Amount',
			'Void Amount',
			'Transactions',
		];

		for (const header of headers) {
			const headerElement = page
				.locator('.MuiDataGrid-columnHeaderTitleContainerContent')
				.getByText(header, { exact: true });
			await expect(headerElement).toBeVisible();
			await expect(headerElement).toContainText(header);
		}
	},
);

Then('I should see the icon zoom out', async ({ page }) => {
	const zoomOutIcon = page.locator('[data-testid="ZoomOutIcon"]');
	await expect(zoomOutIcon).toBeVisible();
});

When('I click on the icon zoom out', async ({ page }) => {
	await page.locator('[data-testid="ZoomOutIcon"]').click();
});

When(
	'I click to clock in for employee {string}',
	async ({ page }, employeeNickname: string) => {
		const row = page.locator('.MuiDataGrid-row', {
			has: page.locator(
				`.MuiDataGrid-cell[data-field="nickName"]:has-text("${employeeNickname}")`,
			),
		});

		const clockInIcon = row.locator('[data-testid="ClockInIconIcon"]');

		await expect(row).toBeVisible();
		await clockInIcon.scrollIntoViewIfNeeded();
		await expect(clockInIcon).toBeVisible();
		await clockInIcon.click();
	},
);

Then(
	'I should see the first ticket with total {string}',
	async ({ page }, amount: string) => {
		const totalElement = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="ticketTotals"]', { hasText: amount })
			.first();
		await expect(totalElement).toBeVisible();
	},
);

Then(
	'I should see the turn number for {string} is 0.0',
	async ({ page }, name: string) => {
		const employeeItem = page.locator('li.xEmployeeItem', {
			has: page.getByText(name, { exact: true }),
		});

		const turnLabel = employeeItem.locator('.MuiChip-label', {
			hasText: 'Turn: 0.0',
		});
		await expect(turnLabel).toBeVisible();
	},
);

Then(
	'I should see the turn number for {string} is 1.0',
	async ({ page }, name: string) => {
		const employeeItem = page.locator('li.xEmployeeItem').filter({
			has: page.getByText(name, { exact: true }),
		});
		const turnLabel = employeeItem.getByText('Turn: 1.0', { exact: true });
		await expect(turnLabel).toBeVisible();
	},
);

Then(
	'I should see the Round 1 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const roundLabel = row
			.locator('.MuiChip-root', { hasText: 'Round' })
			.locator('.MuiChip-label', { hasText: '1' });
		await expect(roundLabel).toBeVisible();
	},
);

Then(
	'I should see the Round 0 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const roundLabel = row
			.locator('.MuiChip-root', { hasText: 'Round' })
			.locator('.MuiChip-label', { hasText: '0' });
		await expect(roundLabel).toBeVisible();
	},
);

Then(
	'I should see the Turn 1.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const turnLabel = row
			.locator('.MuiChip-root', { hasText: 'Turn' })
			.locator('.MuiChip-label', { hasText: '1.00' });
		await expect(turnLabel).toBeVisible();
	},
);

Then(
	'I should see the Turn 0.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const turnLabel = row
			.locator('.MuiChip-root', { hasText: 'Turn' })
			.locator('.MuiChip-label', { hasText: '0.00' });
		await expect(turnLabel).toBeVisible();
	},
);

Then(
	'I should see the Auto Turn 1.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('tr').filter({
			has: page.locator(`[title="${name}"]`),
		});
		const autoTurn = row.locator('td[turntype="AutoTicket"]', {
			hasText: '1.00',
		});
		await expect(autoTurn).toBeVisible();
	},
);

When(
	'I click on the queue {string} button',
	async ({ page }, queue: string) => {
		const queueButton = page.locator('.MuiButtonBase-root', { hasText: queue });
		await expect(queueButton).toBeVisible();
		await queueButton.click();
	},
);

Then(
	'I should see the toast message {string} visible',
	async ({ page }, message: string) => {
		const toastMessage = page.locator('.MuiAlert-message', {
			hasText: message,
		});
		await expect(toastMessage).toBeVisible();
	},
);

When(
	'I select the {string} service in my cart',
	async ({ page }, service: string) => {
		const serviceButton = page.locator('.xTicketItems__name', {
			hasText: service,
		});
		await expect(serviceButton).toBeVisible();
		await serviceButton.click();
	},
);

When(
	'I double click on the first turn detail for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('tr').filter({
			has: page.locator(`[title="${name}"]`),
		});
		const firstTurnDetail = row.locator('td').nth(1);
		await expect(firstTurnDetail).toBeVisible();
		await firstTurnDetail.dblclick();
	},
);

Then(
	'I should see the print button {string} visible',
	async ({ page }, button: string) => {
		const printButton = page.getByRole('button', { name: button });
		await expect(printButton).toBeVisible();
	},
);

Then(
	'I should see the Auto Turn -1.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('tr').filter({
			has: page.locator(`[title="${name}"]`),
		});
		const manualTurn = row.locator('td[turntype="Manual"]', {
			hasText: /-1\.00.*M/,
		});
		await expect(manualTurn).toBeVisible();
	},
);

Then(
	'I should see the Auto Turn 50.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('tr').filter({
			has: page.locator(`[title="${name}"]`),
		});
		const manualTurn = row.locator('td[turntype="Manual"]', {
			hasText: /50\.00.*M/,
		});
		await expect(manualTurn).toBeVisible();
	},
);

Then(
	'I should see the employee {string} listed first in the employee list',
	async ({ page }, employeeName: string) => {
		const firstEmployee = page
			.locator('div.xQueueList li.xEmployeeItem')
			.first();

		await expect(firstEmployee).toContainText(employeeName);
	},
);

Then(
	'I should see the employee {string} listed last in the employee list',
	async ({ page }, employeeName: string) => {
		const lastEmployee = page.locator('div.xQueueList li.xEmployeeItem').last();

		await expect(lastEmployee).toContainText(employeeName);
	},
);

Then(
	'I should see the Turn -1.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const turnLabel = row
			.locator('.MuiChip-root', { hasText: 'Turn' })
			.locator('.MuiChip-label', { hasText: '-1.00' });
		await expect(turnLabel).toBeVisible();
	},
);

Then(
	'I should see the Turn 50.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const turnLabel = row
			.locator('.MuiChip-root', { hasText: 'Turn' })
			.locator('.MuiChip-label', { hasText: '50.00' });
		await expect(turnLabel).toBeVisible();
	},
);

Then('I should see the store logo on the receipt', async ({ page }) => {
	await expect(page.locator('img[alt="BLUE SALON"]')).toBeVisible();
});

Then(
	'I should see the business info {string} on the receipt',
	async ({ page }, businessInfo: string) => {
		const businessInfoLocators = page.locator(
			'div[style*="text-align: center"][style*="flex-direction: column"] > span',
		);
		const actualTexts = await businessInfoLocators.allInnerTexts();
		const normalizedActual = actualTexts.join(' ').replace(/\s+/g, ' ').trim();
		const normalizedExpected = businessInfo.replace(/\s+/g, ' ').trim();
		expect(normalizedActual).toBe(normalizedExpected);
	},
);

Then('I should see the date is today on the receipt', async ({ page }) => {
	const dateCell = page
		.locator('table >> text=Date')
		.locator('xpath=following-sibling::td[1]');
	const receiptDateText = await dateCell.innerText();
	const formattedToday = await page.evaluate(() => {
		const today = new Date();
		return today.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	});
	expect(receiptDateText).toContain(formattedToday);
});

Then(
	'I should see the customer name {string} on the receipt',
	async ({ page }, customerName: string) => {
		const customerCell = page
			.locator('table >> text=Customer')
			.locator('xpath=following-sibling::td[1]');
		const receiptCustomerText = await customerCell.innerText();
		expect(receiptCustomerText).toContain(customerName);
	},
);

Then(
	'I should see the point {string} on the receipt',
	async ({ page }, point: string) => {
		const pointCell = page
			.locator('table >> text=Point')
			.locator('xpath=following-sibling::td[1]');
		const actualPoint = await pointCell.innerText();
		expect(actualPoint.trim()).toBe(point);
	},
);

Then(
	'I should see the service quantity {string} on the receipt',
	async ({ page }, qty: string) => {
		const serviceRow = page.locator('div[style*="display: flex"] >> nth=3');
		const qtyCell = serviceRow.locator('div').nth(0);
		await expect(qtyCell).toHaveText(qty);
	},
);

Then(
	'I should see the service name {string} on the receipt',
	async ({ page }, item: string) => {
		const serviceRow = page.locator('div[style*="display: flex"] >> nth=3');
		const serviceName = serviceRow.locator('div').nth(1);
		await expect(serviceName).toHaveText(item);
	},
);

Then(
	'I should see the technician name {string} on the receipt',
	async ({ page }, name: string) => {
		const serviceRow = page.locator('div[style*="display: flex"] >> nth=3');
		const technicianName = serviceRow.locator('div').nth(2);
		await expect(technicianName).toHaveText(name);
	},
);

Then(
	'I should see the service price {string} on the receipt',
	async ({ page }, price: string) => {
		const serviceRow = page.locator('div[style*="display: flex"] >> nth=3');
		const priceCell = serviceRow.locator('div').nth(3);
		await expect(priceCell).toHaveText(price);
	},
);

Then(
	'I should see the discount item name {string} on the receipt',
	async ({ page }, name: string) => {
		const discountItem = page.locator('div[style*="display: flex"] >> nth=4');
		const discountCell = discountItem.locator('div').nth(1);
		await expect(discountCell).toHaveText(name);
	},
);

Then(
	'I should see the discount item amount {string} on the receipt',
	async ({ page }, discount: string) => {
		const discountItem = page.locator('div[style*="display: flex"] >> nth=4');
		const discountCell = discountItem.locator('div').nth(3);
		await expect(discountCell).toHaveText(discount);
	},
);

Then(
	'I should see the discount ticket name {string} on the receipt',
	async ({ page }, name: string) => {
		const discountTicket = page.locator('tr', { hasText: name });
		await expect(discountTicket).toBeVisible();
	},
);

Then(
	'I should see the discount ticket amount {string} on the receipt',
	async ({ page }, amount: string) => {
		const discountTicket = page.locator('tr', { hasText: amount });
		await expect(discountTicket).toBeVisible();
	},
);

Then(
	'I should see the TIP amount {string} on the receipt',
	async ({ page }, tip: string) => {
		const tipCell = page
			.locator('tr', { hasText: 'TIP' })
			.locator('td', { hasText: tip });
		await expect(tipCell).toBeVisible();
	},
);

Then(
	'I should see the SUBTOTAL {string} on the receipt',
	async ({ page }, subtotal: string) => {
		const subtotalCell = page
			.locator('tr', { hasText: 'SUBTOTAL' })
			.locator('td', { hasText: subtotal });
		await expect(subtotalCell).toBeVisible();
	},
);

Then(
	'I should see the TAX {string} on the receipt',
	async ({ page }, tax: string) => {
		const taxCell = page
			.locator('tr', { hasText: 'TAX' })
			.locator('td', { hasText: tax });
		await expect(taxCell).toBeVisible();
	},
);

Then(
	'I should see the TOTAL {string} on the receipt',
	async ({ page }, total: string) => {
		const totalCell = page
			.locator('tr', { hasText: 'TOTAL' })
			.locator('td', { hasText: total })
			.last();
		await expect(totalCell).toBeVisible();
	},
);

Then(
	'I should see the CHANGE amount {string} on the receipt',
	async ({ page }, change: string) => {
		const changeCell = page
			.locator('tr', { hasText: 'CHANGE' })
			.locator('td', { hasText: change });
		await expect(changeCell).toBeVisible();
	},
);

Then(
	'I should see the payment label {string} on the receipt',
	async ({ page }, label: string) => {
		const paymentLabel = page.locator('p', { hasText: label });
		await expect(paymentLabel).toBeVisible();
	},
);

Then(
	'I should see the payment method {string} on the receipt',
	async ({ page }, method: string) => {
		const paymentMethod = page.locator('table >> td', { hasText: method });
		await expect(paymentMethod).toBeVisible();
	},
);

Then(
	'I should see the cash payment amount {string} on the receipt',
	async ({ page }, amount: string) => {
		const cashRow = page.locator('tr', { hasText: 'Cash' });
		const cashAmountCell = cashRow.locator('td').nth(1);
		await expect(cashAmountCell).toHaveText(amount);
	},
);

Then(
	'I should see the message {string} on the receipt',
	async ({ page }, msg: string) => {
		const message = page.locator('.render-bill', { hasText: msg });
		await expect(message).toBeVisible();
	},
);

Then(
	'I should see the tip guide {string} on the receipt',
	async ({ page }, msg: string) => {
		const message = page.locator('.render-bill', { hasText: msg });
		await expect(message).toBeVisible();
	},
);

Then('I should see the QR code on the receipt', async ({ page }) => {
	const qrCode = page.locator('.render-bill .e-qrcode');
	await expect(qrCode).toBeVisible();
});

When('I click on the sync appointment icon', async ({ page }) => {
	const syncAppt = page.locator('[data-testid="IconSyncApptIcon"]');
	await expect(syncAppt).toBeVisible();
	await syncAppt.click();
});

When(
	'I click on the function {string} payment',
	async ({ page }, option: string) => {
		const functionButton = page.locator('ul.xMultiple li').getByText(option);
		await expect(functionButton).toBeVisible();
		await functionButton.click();
	},
);

When('I click to show earning today', async ({ page }) => {
	const earningToday = page.locator('[data-testid="TechnicianEarningIcon"]');
	await expect(earningToday).toBeVisible();
	await earningToday.click();
});

When('I enter the password {string}', async ({ page }, password: string) => {
	for (const digit of password) {
		await page
			.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
			.click();
	}
	const confirmButton = page.getByRole('button', { name: 'CONFIRM' });
	await expect(confirmButton).toBeVisible();
	await confirmButton.click();
	await page.waitForTimeout(5000);
});

Then(
	'I should see the text {string} on the dialog',
	async ({ page }, text: string) => {
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible({ timeout: 10000 });

		if (text.includes('$')) {
			const parts = text.split('$');
			if (parts.length >= 2) {
				const label = parts[0]?.trim() || '';
				const amount = `$${parts[1]?.trim() || ''}`;

				const labelElement = dialog
					.locator('p')
					.getByText(label, { exact: true });
				const amountElement = dialog
					.locator('p')
					.getByText(amount, { exact: true });
				await expect(labelElement).toBeVisible();
				await expect(amountElement).toBeVisible();
				return;
			}
		}

		const textElement = dialog.locator('p').getByText(text);
		await expect(textElement).toBeVisible();
	},
);

Then(
	'I should see the loyalty program list displayed correctly',
	async ({ page }) => {
		await page.locator('#mui-component-select-loyaltyProgramId').click();
		const listbox = page.getByRole('listbox');
		await expect(listbox).toBeVisible();
		const options = page.getByRole('option');

		await expect(options).toHaveText([
			'=== NONE ===',
			'1 Point for $1',
			'2 Points = $1',
		]);
	},
);

Then('I should see the Payroll Date default to today', async ({ page }) => {
	// Calculate today's date in the browser context to ensure timezone consistency
	const formattedDate = await page.evaluate(() => {
		const today = new Date();
		const month = today.getMonth() + 1;
		const day = today.getDate();
		const year = today.getFullYear();
		return `${month}/${day}/${year}`;
	});

	const payrollDateRow = page
		.locator('table tbody tr')
		.filter({ hasText: 'Payroll Date' });
	const dateCell = payrollDateRow.locator('td').nth(1);

	await expect(dateCell).toBeVisible();
	const dateText = await dateCell.textContent();
	expect(dateText).toContain(formattedDate);
});

Then(
	'I should see the technician name {string} in the employee view',
	async ({ page }, technicianName: string) => {
		const technicianRow = page
			.locator('table tbody tr')
			.filter({ hasText: 'Technician' });
		const nameCell = technicianRow.locator('td').nth(1);

		await expect(nameCell).toBeVisible();
		await expect(nameCell).toHaveText(technicianName);
	},
);

Then(
	'I should see the payroll type {string} in the employee view',
	async ({ page }, payrollType: string) => {
		const typeRow = page
			.locator('table tbody tr')
			.filter({ hasText: 'Payroll Type' });
		const typeCell = typeRow.locator('td').nth(1);

		await expect(typeCell).toBeVisible();
		await expect(typeCell).toHaveText(payrollType);
	},
);

Then(
	'I should see the # of Work Days {string} in the employee view',
	async ({ page }, workDays: string) => {
		const workDaysRow = page
			.locator('table tbody tr')
			.filter({ hasText: '# of Work Days' });
		const workDaysCell = workDaysRow.locator('td').nth(1);

		await expect(workDaysCell).toBeVisible();
		await expect(workDaysCell).toHaveText(workDays);
	},
);
Then(
	'I should see the text {string} in the single payroll view',
	async ({ page }, text: string) => {
		const saleSummaryRow = page
			.locator('table tbody tr')
			.filter({ hasText: text });
		await expect(saleSummaryRow).toBeVisible();
	},
);

Then(
	'I should see the first Total {string} in the single payroll view',
	async ({ page }, amount: string) => {
		const totalRow = page
			.locator('table tbody tr')
			.filter({ hasText: 'Total' })
			.first();
		const amountCell = totalRow.locator('td').nth(1);

		await expect(amountCell).toBeVisible();
		await expect(amountCell).toHaveText(amount);
	},
);

Then(
	'I should see the detail {string} in the single payroll view',
	async ({ page }, detail: string) => {
		const colonIndex = detail.indexOf(':');
		if (colonIndex === -1) {
			throw new Error(
				`Invalid detail format: "${detail}". Expected format: "Label: Value"`,
			);
		}

		const label = detail.substring(0, colonIndex + 1).trim();
		const expectedValue = detail.substring(colonIndex + 1).trim();

		const detailRow = page
			.locator('table tbody tr')
			.filter({ hasText: label })
			.first();

		const valueCell = detailRow.locator('td').nth(1);

		await expect(valueCell).toBeVisible();
		await expect(valueCell).toContainText(expectedValue);
	},
);

Then(
	'I should see the Product {string} in the single payroll view',
	async ({ page }, amount: string) => {
		const productRow = page
			.locator('table tbody tr')
			.filter({ hasText: 'Product' })
			.nth(1);

		await expect(productRow).toBeVisible();
		await expect(productRow).toContainText(amount);
	},
);

Then(
	'I should see the Service {string} in the single payroll View',
	async ({ page }, amount: string) => {
		const serviceRow = page
			.locator('table tbody tr')
			.filter({ hasText: 'Service' });

		await expect(serviceRow).toBeVisible();
		await expect(serviceRow).toContainText(amount);
	},
);

Then(
	'I should see the second Total {string} in the single payroll view',
	async ({ page }, amount: string) => {
		const totalRow = page
			.locator('table tbody tr')
			.filter({ hasText: 'Total' })
			.nth(1);
		const amountCell = totalRow.locator('td').nth(1);

		await expect(amountCell).toBeVisible();
		await expect(amountCell).toHaveText(amount);
	},
);

Then(
	'I should see the text {string} in the employee view',
	async ({ page }, text: string) => {
		const divider = page.locator('div.text-divider').filter({ hasText: text });

		await expect(divider).toBeVisible();
		await expect(divider.locator('span.item-divider')).toHaveText(text);
	},
);

Then(
	'I should see the Reg Pay, NC Tip, Commission as {string} in employee view',
	async ({ page }, expectedValues: string) => {
		const values = expectedValues.split(' ');
		expect(values).toHaveLength(3);

		const [regPay, ncTip, commission] = values;

		const detailsTable = page.locator('table.details-payroll');
		const dataRow = detailsTable.locator('tbody tr').nth(1);

		await expect(dataRow).toBeVisible();

		// const totalSalesCell = dataRow.locator('td').nth(2);
		const regPayCell = dataRow.locator('td').nth(3);
		const ncTipCell = dataRow.locator('td').nth(4);
		const commissionCell = dataRow.locator('td').nth(5);

		// await expect(totalSalesCell).toHaveText(regHrs);
		await expect(regPayCell).toHaveText(regPay);
		await expect(ncTipCell).toHaveText(ncTip);
		await expect(commissionCell).toHaveText(commission);
	},
);

Then(
	'I should see the Total Sales, Net Comm, NC Tip, Total Payout as {string} in employee view',
	async ({ page }, expectedValues: string) => {
		const values = expectedValues.split(' ');
		expect(values).toHaveLength(4);

		const [totalSales, netComm, ncTip, totalPayout] = values;

		const detailsTable = page.locator('table.details-payroll');
		const dataRow = detailsTable.locator('tbody tr').nth(1);

		await expect(dataRow).toBeVisible();

		const totalSalesCell = dataRow.locator('td').nth(2);
		const netCommCell = dataRow.locator('td').nth(3);
		const ncTipCell = dataRow.locator('td').nth(4);
		const totalPayoutCell = dataRow.locator('td').nth(5);

		await expect(totalSalesCell).toHaveText(totalSales);
		await expect(netCommCell).toHaveText(netComm);
		await expect(ncTipCell).toHaveText(ncTip);
		await expect(totalPayoutCell).toHaveText(totalPayout);
	},
);

When('I fill the department name {string}', async ({ page }, name: string) => {
	const dialog = page.getByRole('dialog');

	const input = dialog.locator('input[name="name"]');

	await expect(input).toBeVisible();
	await expect(input).toBeEnabled();

	await input.fill(name);
	await expect(input).toHaveValue(name);
});

When('I select department type {string}', async ({ page }, type: string) => {
	const dialog = page.getByRole('dialog');

	const dropdown = dialog.getByRole('combobox', {
		name: /department type/i,
	});

	await expect(dropdown).toBeVisible();
	await dropdown.click();

	const option = page.getByRole('option', {
		name: new RegExp(`^${type}$`, 'i'),
	});

	await expect(option).toBeVisible();
	await option.click();

	await expect(dropdown).toHaveText(new RegExp(type, 'i'));
});

When('I click on refresh department', async ({ page }) => {
	await page.locator('[data-testid="ReplayIcon"]').click();
});

When(
	'I search department with keyword {string} and expect {int} results',
	async ({ page }, keyword: string, count: number) => {
		const input = page.locator('input[placeholder="Search…"]');
		const rows = page.locator('.MuiDataGrid-row');

		await expect(input).toBeVisible();

		await input.fill('');
		await input.click();
		await page.keyboard.type(keyword, { delay: 30 });

		await expect(rows).toHaveCount(count);
	},
);

When(
	'I click the {string} button in the dialog',
	async ({ page }, text: string) => {
		await page
			.getByRole('dialog')
			.getByRole('button', { name: new RegExp(`^${text}$`, 'i') })
			.click();
	},
);

When(
	'I double click on the department row {string}',
	async ({ page }, departmentName: string) => {
		const nameCell = page.locator(
			`.MuiDataGrid-cell[data-field="name"]:has-text("${departmentName}")`,
		);

		await expect(nameCell).toBeVisible();
		await nameCell.dblclick();
	},
);

When('I clear department search', async ({ page }) => {
	const input = page.locator('input[placeholder="Search…"]');
	await input.fill('');
	await input.dispatchEvent('input');
});

Then(
	'I should see department {string} in the list',
	async ({ page }, name: string) => {
		const departmentCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="name"]', { hasText: name })
			.first();

		await expect(departmentCell).toBeVisible();
		await expect(departmentCell).toContainText(name);
	},
);

Then('I should see the default filter set to Today', async ({ page }) => {
	const rangeDateCell = page.locator('p.pageDetail');

	const formattedToday = await page.evaluate(() => {
		const today = new Date();
		return today.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	});

	await expect(rangeDateCell).toBeVisible();
	await expect(rangeDateCell).toHaveText(
		`${formattedToday} - ${formattedToday}`,
	);
});

Then(
	'I should see the text {string} in the payroll summary',
	async ({ page }, text: string) => {
		const payrollSummary = page.locator('div.summary-title');

		await expect(payrollSummary).toBeVisible();
		await expect(payrollSummary).toHaveText(text);
	},
);

Then(
	'I should not see department {string} in the list',
	async ({ page }, name: string) => {
		const departmentCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="name"]', { hasText: name });

		await expect(departmentCell).toHaveCount(0);
	},
);

Then('department type should be {string}', async ({ page }, type: string) => {
	const deptTypeCell = page
		.locator('.MuiDataGrid-row')
		.first()
		.locator('[data-field="deptType"]');

	await expect(deptTypeCell).toContainText(type);
});

Then('I should see the department edit dialog', async ({ page }) => {
	await expect(page.getByRole('dialog')).toBeVisible();
});

Then(
	'The department name should be {string}',
	async ({ page }, name: string) => {
		await expect(
			page.getByRole('dialog').locator('input[name="name"]'),
		).toHaveValue(name);
	},
);

Then(
	'The department type should be {string}',
	async ({ page }, type: string) => {
		await expect(
			page
				.getByRole('dialog')
				.getByRole('combobox', { name: /department type/i }),
		).toHaveText(new RegExp(type, 'i'));
	},
);

Then(
	'I should see the {string} button visible on the header',
	async ({ page }, buttonText: string) => {
		const button = page
			.locator('div.xHeader__func_right')
			.filter({ hasText: buttonText });

		await expect(button).toBeVisible();
	},
);

When('I select the theme {string}', async ({ page }, theme: string) => {
	const themeItem = page
		.locator('.xChangeTheme--item')
		.filter({ hasText: theme });
	await expect(themeItem).toBeVisible();
	await themeItem.click();
});

Then(
	'I should see the theme {string} applied to the application',
	async ({ page }, theme: string) => {
		const themeBody = page.locator(`body[data-theme="${theme}"]`);
		await expect(themeBody).toBeVisible();
	},
);

When(
	'I fill the new Discount name {string}',
	async ({ page }, nameDC: string) => {
		const discountName = page.locator('input[name="discountName"]');
		await discountName.fill(nameDC);

		await expect(discountName).toHaveValue(nameDC);
	},
);

When('I fill the DisplayDC name {string}', async ({ page }, nameDP: string) => {
	const displayDCName = page.locator('input[name="displayName"]');
	await displayDCName.fill(nameDP);
	await expect(displayDCName).toHaveValue(nameDP);
});

When(
	'I fill the Amount Discount {string}',
	async ({ page }, amount: string) => {
		const AmountDC = page.locator('input[id="amount"]');
		await AmountDC.fill(amount);

		await expect(AmountDC).toHaveValue(amount);
	},
);

When(
	'I Select the Discount method {string}',
	async ({ page }, method: string) => {
		const DCMethod = page.locator('#mui-component-select-discountMethod');
		await DCMethod.click();
		const selectDCMethod = page
			.locator('li.MuiMenuItem-gutters')
			.getByText(method, { exact: true });
		await selectDCMethod.click();
	},
);
Then(
	'I should see the new Discount {string}, Amount {string}, in the Discounts list',
	async ({ page }, discountName: string, AmountDC: string) => {
		const DiscountNameCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="name"]', { hasText: discountName })
			.first();
		const DiscountAmountCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="amount"]', { hasText: AmountDC })
			.first();
		await expect(DiscountNameCell).toBeVisible();
		await expect(DiscountNameCell).toHaveText(discountName);
		await expect(DiscountAmountCell).toHaveText(AmountDC);
	},
);
When(
	'I click on the action {string} button for item {string}',
	async ({ page }, action: string, itemName: string) => {
		const row = page.locator(`.MuiDataGrid-row:has-text("${itemName}")`);
		const button = row.locator(`[aria-label="${action}"]`);
		await button.click();
	},
);

//////////////////////////////////////////////////////////////////////////POS > Customer/////////////////////////////////////////////////////////////////////////
When('I click on the Search customer', async ({ page }) => {
	const searchInput = page.getByPlaceholder('Search...');
	await expect(searchInput).toBeVisible({ timeout: 15000 });
	await searchInput.click();
});
When(
	'I search customer with keyword {string} and expect {int} results',
	async ({ page }, keyword: string, count: number) => {
		const input = page.getByPlaceholder(/search/i);
		const rows = page.locator('.MuiDataGrid-row');

		await expect(input).toBeVisible();

		await input.fill('');
		await input.click();
		await page.keyboard.type(keyword, { delay: 30 });

		await expect(rows).toHaveCount(count);
	},
);

When('I fill the {string} phone', async ({ page }, phone: string) => {
	const cellPhone = page.getByPlaceholder('Search...');

	await expect(cellPhone).toBeVisible({ timeout: 15000 });

	await cellPhone.fill(phone);

	const maskedValue = await cellPhone.inputValue();
	const digitsOnly = maskedValue.replace(/\D/g, '');

	expect(digitsOnly).toContain(phone);
});
Then(
	'I should see the customer name {string}',
	async ({ page }, name: string) => {
		const grid = page.locator('.MuiDataGrid-root');
		await expect(grid).not.toContainText('No results found', {
			timeout: 150000,
		});
		await expect(grid).toContainText(name);
	},
);

Then(
	'I should see the loyalty program default {string} visible',
	async ({ page }, program: string) => {
		const dialog = page.getByRole('dialog', { name: 'Create New Customer' });
		const loyaltyProgram = dialog.getByRole('combobox', {
			name: 'Loyalty Program',
		});
		await expect(loyaltyProgram).toContainText(program);
	},
);

When('I fill the {string} in search', async ({ page }, name: string) => {
	const searchInput = page.getByPlaceholder(/search/i);

	await expect(searchInput).toBeVisible({ timeout: 15000 });
	await searchInput.fill(name);
	await searchInput.press('Enter');
});

When(
	'I fill the new customer name {string} at new customer page',
	async ({ page }, name: string) => {
		const dialog = page.getByRole('dialog', { name: 'Create New Customer' });
		const firstNameInput = dialog.locator(
			'input[name="firstName"]:not([readonly])',
		);
		await expect(firstNameInput).toBeVisible();
		await firstNameInput.fill(name);
	},
);

When(
	'I click on the {string} button to save new customer',
	async ({ page }, buttonText: string) => {
		const dialog = page.getByRole('dialog');
		const button = dialog.getByRole('button', { name: buttonText });
		await expect(button).toBeVisible();
		await button.click();
	},
);

When('I click on the edit button on the customer profile', async ({ page }) => {
	const grid = page.locator('.MuiDataGrid-root');
	await expect(grid).toBeVisible({ timeout: 90000 });

	const firstRow = grid.locator('.MuiDataGrid-row').first();
	await expect(firstRow).toBeVisible({ timeout: 90000 });

	await firstRow.scrollIntoViewIfNeeded();
	await firstRow.hover();
	const editButton = firstRow.locator(
		'button:has(svg[data-testid="EditIcon"])',
	);

	await expect(editButton).toBeVisible({ timeout: 60000 });
	await editButton.click();
});

When(
	'I click on the delete button on the customer profile',
	async ({ page }) => {
		const grid = page.locator('.MuiDataGrid-root');
		await expect(grid).toBeVisible({ timeout: 90000 });

		const firstRow = grid.locator('.MuiDataGrid-row').first();
		await expect(firstRow).toBeVisible({ timeout: 90000 });

		await firstRow.scrollIntoViewIfNeeded();
		await firstRow.hover();

		const deleteButton = firstRow.locator(
			'button:has(svg[data-testid="DeleteIcon"])',
		);

		await expect(deleteButton).toBeVisible({ timeout: 60000 });
		await deleteButton.click();
	},
);

When(
	'I click on the {string} button at the customer profile',
	async ({ page }, buttonName: string) => {
		const tabButton = page.getByRole('tab', { name: buttonName });

		await expect(tabButton).toBeVisible({ timeout: 15000 });
		await tabButton.click();
	},
);

Then(
	'I should see the {string} on First Name',
	async ({ page }, firstName: string) => {
		await expect(page.getByLabel('First Name')).toHaveValue(firstName);
	},
);

When(
	'I input the note {string} into the note box',
	async ({ page }, note: string) => {
		const noteBox = page.locator('textarea[name="notes"]');

		await expect(noteBox).toBeVisible({ timeout: 15000 });
		await noteBox.fill(note);
	},
);

Then(
	'I should not see customer {string} in the list',
	async ({ page }, name: string) => {
		const departmentCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="name"]', { hasText: name });

		await expect(departmentCell).toHaveCount(0);
	},
);

When(
	'I fill the {string} field with value {string}',
	async ({ page }, fieldName: string, value: string) => {
		const fieldLocators: Record<string, string> = {
			'First Name': 'input[name="firstName"]',
			'Nick Name': 'input[name="nickName"]',
			'Non-cash tip': 'input[id="employeeSalon.nonCashTipPct"]',
			'Void Reason': 'input[name="reason"]',
			'Tax Name': 'input[name="name"]',
			'Value Tax': 'input[id="percent"]',
		};

		const selector = fieldLocators[fieldName];
		if (!selector) throw new Error(`Unknown field: ${fieldName}`);

		const input = page.locator(selector);
		await input.fill(value);
		await expect(input).toHaveValue(value);
	},
);

When(
	'I select the {string} with value {string}',
	async ({ page }, field: string, value: string) => {
		const fieldLocators: Record<string, string> = {
			'Job Title': '#mui-component-select-jobCodeId',
			'Payroll Type':
				'div[id="mui-component-select-employeeSalon.payrollType"]',
			'Role Tech': '#mui-component-select-roleId',
			'Non-cash Tip Option':
				'div[id="mui-component-select-employeeSalon.deductNonCashTip"]',
			'Default Queue Group For Appt':
				'div[id="mui-component-select-employeeSalon.defaultQueueGroupId"]',
		};

		const selector = fieldLocators[field];
		if (!selector) throw new Error(`Unknown field: ${field}`);

		const dropdown = page.locator(selector);
		await dropdown.click();

		const option = page
			.locator('li.MuiMenuItem-gutters')
			.getByText(value, { exact: true });
		await option.click();
	},
);
When(
	'I fill the Commission Services {string} with value {string} for the new employee',
	async ({ page }, field: string, value: string) => {
		const section = page.locator('.css-ch9uj1').filter({ hasText: field });
		const input = section.locator('input[type="text"]').first();
		await input.fill(value);
		await expect(input).toHaveValue(value);
	},
);
When('I switch ON {string} select all', async ({ page }, labelName: string) => {
	const switchElement = page
		.locator('.MuiBox-root')
		.filter({ hasText: labelName })
		.locator('input[aria-labelledby="check-all"]');

	await switchElement.check();
	await expect(switchElement).toBeChecked();
});
Then(
	'I should see the new Employee {string}, Role {string}, in the Employees list',
	async ({ page }, employeeName: string, roleid: string) => {
		const EmployeeNameCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="fullName"]', { hasText: employeeName })
			.first();
		const EmployeeRoleCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="roleId"]', { hasText: roleid })
			.first();
		await expect(EmployeeNameCell).toBeVisible();
		await expect(EmployeeNameCell).toHaveText(employeeName);
		await expect(EmployeeRoleCell).toBeVisible();
		await expect(EmployeeRoleCell).toHaveText(roleid);
	},
);
Then(
	'I should see the detail {string} in the payroll receipt',
	async ({ page }, detail: string) => {
		const colonIndex = detail.indexOf(':');
		if (colonIndex === -1) {
			throw new Error(
				`Invalid detail format: "${detail}". Expected format: "Label: Value"`,
			);
		}

		const label = detail.substring(0, colonIndex + 1).trim();
		const expectedValue = detail.substring(colonIndex + 1).trim();

		const payrollReceipt = page.locator('div.payroll-receipt-container');
		const detailRow = payrollReceipt
			.locator('div.detail-row')
			.filter({ hasText: label })
			.first();

		await expect(detailRow).toBeVisible();

		const valueSpan = detailRow.locator('span.value');
		await expect(valueSpan).toContainText(expectedValue);
	},
);

Then(
	'I should see the title {string} in the payroll receipt',
	async ({ page }, title: string) => {
		const payrollReceipt = page.locator('div.payroll-receipt-container');
		const sectionTitle = payrollReceipt
			.locator('div.section-title')
			.filter({ hasText: title });

		await expect(sectionTitle).toBeVisible();
		await expect(sectionTitle).toHaveText(title);
	},
);

Then(
	'I should see the first Total Commission {string} in the payroll receipt',
	async ({ page }, amount: string) => {
		const payrollReceipt = page.locator('div.payroll-receipt-container');
		const totalCommissionRows = payrollReceipt
			.locator('div.detail-row')
			.filter({ hasText: 'Total Commission:' });

		const firstTotalCommission = totalCommissionRows.first();
		const valueSpan = firstTotalCommission.locator('span.value');

		await expect(valueSpan).toBeVisible();
		await expect(valueSpan).toContainText(amount);
	},
);

Then(
	'I should see the second Total Commission {string} in the payroll receipt',
	async ({ page }, amount: string) => {
		const payrollReceipt = page.locator('div.payroll-receipt-container');
		const totalCommissionRows = payrollReceipt
			.locator('div.detail-row')
			.filter({ hasText: 'Total Commission:' });

		const secondTotalCommission = totalCommissionRows.nth(1);
		const valueSpan = secondTotalCommission.locator('span.value');

		await expect(valueSpan).toBeVisible();
		await expect(valueSpan).toContainText(amount);
	},
);

Then(
	'I should see the NC Tip as {string} in the payroll receipt',
	async ({ page }, expectedValues: string) => {
		const values = expectedValues.trim().split(/\s+/);
		if (values.length !== 1) {
			throw new Error(
				`Expected 1 space-separated values, got ${values.length}: "${expectedValues}"`,
			);
		}

		const [ncTip] = values;

		const payrollReceipt = page.locator('div.payroll-receipt-container');
		const dailyDetailsTable = payrollReceipt.locator(
			'table.daily-details-table',
		);
		const totalRow = dailyDetailsTable
			.locator('tbody tr')
			.filter({ hasText: 'Total' });

		await expect(totalRow).toBeVisible();

		const cells = totalRow.locator('td');

		// await expect(cells.nth(1)).toContainText(regHrs);
		await expect(cells.nth(2)).toContainText(ncTip);
		// await expect(cells.nth(3)).toContainText(ncTip);
	},
);

Then(
	'I should see the Total Sales, Net Comm, NC Tip as {string} in the payroll receipt',
	async ({ page }, expectedValues: string) => {
		// Parse the expected values (format: "$135.70 $54.62 $4.75")
		const values = expectedValues.trim().split(/\s+/);
		if (values.length !== 3) {
			throw new Error(
				`Expected 3 space-separated values, got ${values.length}: "${expectedValues}"`,
			);
		}

		const [totalSale, netComm, ncTip] = values;

		const payrollReceipt = page.locator('div.payroll-receipt-container');
		const dailyDetailsTable = payrollReceipt.locator(
			'table.daily-details-table',
		);
		const totalRow = dailyDetailsTable
			.locator('tbody tr')
			.filter({ hasText: 'Total' });

		await expect(totalRow).toBeVisible();

		const cells = totalRow.locator('td');

		await expect(cells.nth(1)).toContainText(totalSale);
		await expect(cells.nth(2)).toContainText(netComm);
		await expect(cells.nth(3)).toContainText(ncTip);
	},
);

Then(
	'I should see the detail {string} in the employee view',
	async ({ page }, detail: string) => {
		const lastSpaceIndex = detail.lastIndexOf(' ');
		if (lastSpaceIndex === -1) {
			throw new Error(
				`Invalid detail format: "${detail}". Expected format: "Label Value"`,
			);
		}

		const label = detail.substring(0, lastSpaceIndex).trim();
		const expectedValue = detail.substring(lastSpaceIndex + 1).trim();

		const employeeView = page.locator('div.MuiBox-root');
		const tableRow = employeeView
			.locator('table tbody tr')
			.filter({ hasText: label })
			.first();

		await expect(tableRow).toBeVisible();

		const valueCell = tableRow.locator('td').nth(1);
		await expect(valueCell).toBeVisible();
		await expect(valueCell).toContainText(expectedValue);
	},
);

Then(
	'I should see the {string} has value {string} in the ticket payment',
	async ({ page }, fieldLabel: string, expectedValue: string) => {
		const fieldMapping: Record<string, string> = {
			'Total Sale': 'totalSale',
			Payment: 'payment',
			Surcharge: 'surcharge',
			'Card Fee': 'cashDiscount',
			'Cash Discount': 'cashDiscount',
			Tip: 'tip',
			Tax: 'tax',
			'Closed By': 'closeUserInfo.nickName',
			'Close By': 'closeUserInfo.nickName',
			'Ticket Number': 'ticketNumber',
			'Customer Info': 'customerInfo',
			'Business Date': 'businessDate',
			'Close Time': 'closeTime',
			'Total Net Price': 'totalNetPrice',
			'Total Commission': 'totalCommission',
			Type: 'menuItemType',
			'Item Name': 'itemName',
			'Item Price': 'originalPrice',
			'Net Price': 'commissionPrice',
			Commission: 'commissionAmount',
			'Non-Cash Tip': 'nonCashTip',
			'Credit Card Fee': 'staffFee',
			'Total Ticket Discount': 'originalDiscount',
			'Discounts (Employee Absorbs)': 'commDiscount',
			'Loyalty (Employee Absorbs)': 'commLoyalty',
			'Loyalty Comm Type': 'commissionByTypeLoyalty',
			'Item Supply Fee': 'serviceChargeTotal',
			'Ticket Supply Fee': 'supplyCharge',
			'Item Disc $': 'itemDiscountPrice',
			'Item Disc %': 'itemDiscountPercent',
			'Ticket Disc $': 'ticketDiscountPrice',
			'Ticket Disc %': 'ticketDiscountPercent',
		};

		const dataField = fieldMapping[fieldLabel];

		if (!dataField) {
			throw new Error(
				`Unknown field label: "${fieldLabel}". Available fields: ${Object.keys(fieldMapping).join(', ')}`,
			);
		}

		const gridCell = page
			.locator(`.MuiDataGrid-row [role="gridcell"][data-field="${dataField}"]`)
			.first();

		await gridCell.scrollIntoViewIfNeeded();

		await expect(gridCell).toBeVisible({
			timeout: 5000,
		});

		const actualValue = await gridCell.textContent();
		const trimmedActualValue = actualValue?.trim() || '';

		await expect(gridCell).toHaveText(expectedValue, {
			timeout: 5000,
		});

		console.log(
			`✓ Validated "${fieldLabel}" (data-field: ${dataField}): Expected "${expectedValue}", Got "${trimmedActualValue}"`,
		);
	},
);

Then('Active button should be ON with value true', async ({ page }) => {
	const switchInput = page.locator('input[name="isActive"]');
	await expect(switchInput).toBeChecked();
	const value = await switchInput.getAttribute('value');
	expect(value).toBe('true');
});

When('I click on checkbox Active', async ({ page }) => {
	await page.locator('.MuiSwitch-sizeMedium ').click();
});
Then(
	'I should see the new {string} {string}, created at today, in the list',
	async ({ page }, field: string, value: string) => {
		const valueCell = page
			.locator('.MuiDataGrid-row')
			.locator(`[data-field="${field}"]`, { hasText: value })
			.first();

		const dateCell = page
			.locator('.MuiDataGrid-row')
			.first()
			.locator('[data-field="createdAt"]');

		const formattedToday = await page.evaluate(() => {
			const today = new Date();
			return today.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			});
		});

		await expect(dateCell).toContainText(formattedToday);
		await expect(valueCell).toBeVisible();
		await expect(valueCell).toHaveText(value);
		await expect(dateCell).toBeVisible();
	},
);
