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
	},
);

When('I click on the functions', async ({ page }) => {
	await page.locator('.pageName').getByText('FUNCTIONS').click();
});

When(
	'I select the {string} on the Daily Task',
	async ({ page }, task: string) => {
		await page.locator('.dailyTask').getByText(task, { exact: true }).click();
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
			.locator('span.pageName')
			.getByText(screenName)
			.last();

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

When(
	'I select the change charge action {string}',
	async ({ page }, action: string) => {
		const actionElement = page
			.locator('ul.xCharge__tax--action li')
			.getByText(action);
		await expect(actionElement).toHaveText(action);
		await actionElement.click();
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

When('I close the popup dialog', async ({ page }) => {
	await page.locator('button[title="Close"]').click();
});

Then('I should see the tax amount non-zero', async ({ page }) => {
	const chargeTax = page.locator('.xCharge__taxes');

	await expect(chargeTax).not.toContainText('0.00');
	await expect(chargeTax).not.toHaveText('$0.00');
});

When(
	'I select the {string} payment type',
	async ({ page }, paymentType: string) => {
		const paymentTypeButton = page
			.locator('.paymentType')
			.getByText(paymentType, { exact: true });
		await expect(paymentTypeButton).toBeVisible();

		await paymentTypeButton.click();
	},
);

When(
	'I select the {string} payment type on the payment ticket dialog',
	async ({ page }, paymentType: string) => {
		const paymentTypeButton = page
			.locator('ul.xPayment__type li')
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
			.locator('.xTicketItems__wrap')
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
	async ({ page }, adding: string) => {
		const buttonElement = page.locator('.xCharge').getByText(adding);
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

		await expect(
			page.locator('.xTicketFunctions__payment--input'),
		).toContainText(number);
	},
);

When(
	'I fill the last 4 digits of card number {string} on the payment ticket dialog',
	async ({ page }, number: string) => {
		for (const digit of number) {
			await page
				.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
				.click();
		}

		await expect(page.locator('.xPayment__numpad--main ')).toContainText(
			number,
		);
	},
);

When(
	'I click on the {string} button in the add tip dialog',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.xTicketFunctions__btn')
			.getByText(button);
		await expect(buttonElement).toBeVisible();
		await buttonElement.click();
	},
);

Then(
	'I should see the employee {string} visible in the split tip dialog',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.xSplitTip__item--content')
			.getByText(employee, { exact: true });
		await expect(employeeElement).toHaveText(employee);
	},
);

Then(
	'I should see the total tip {string} visible in the split tip dialog',
	async ({ page }, tip: string) => {
		const tipElement = page
			.locator('.xSplitTip__numpad--tip')
			.getByText(tip, { exact: true });
		await expect(tipElement).toHaveText(tip);
	},
);

When(
	'I click on the {string} button in the split tip dialog',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.xSplitTip__numpad--btn')
			.getByText(button);
		await expect(buttonElement).toBeVisible();
		await buttonElement.click();
	},
);

Then(
	'I should see the payment history amount {string} visible',
	async ({ page }, amount: string) => {
		const amountElement = page
			.locator('.xPayment__history--price')
			.getByText(amount, { exact: true });
		await expect(amountElement).toHaveText(amount);
	},
);

Then(
	'I should see the payment Gift history {string} visible',
	async ({ page }, paymentGift: string) => {
		const trimmedGift = paymentGift.trim();
		const lastSpaceIndex = trimmedGift.lastIndexOf(' ');
		const expectedName =
			lastSpaceIndex > -1 ? trimmedGift.slice(0, lastSpaceIndex) : trimmedGift;
		const expectedAmount =
			lastSpaceIndex > -1 ? trimmedGift.slice(lastSpaceIndex + 1) : '';
		let paymentGiftElement = page
			.locator('ul.xTicketFunctions__payment--list li')
			.filter({
				has: page.locator('span.name', { hasText: expectedName }),
			});
		if (expectedAmount) {
			paymentGiftElement = paymentGiftElement.filter({
				has: page.locator('span.amt', { hasText: expectedAmount }),
			});
		}
		await expect(paymentGiftElement).toBeVisible();
		await expect(paymentGiftElement.locator('span.name')).toContainText(
			expectedName,
		);
		if (expectedAmount) {
			await expect(paymentGiftElement.locator('span.amt')).toContainText(
				expectedAmount,
			);
		}
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
			.locator('.xTicketFunsSplitTip__techs')
			.getByText(employee, { exact: true });

		await expect(employeeElement).toHaveText(employee);
	},
);

When(
	'I select the employee {string} in the split tip screen',
	async ({ page }, employee: string) => {
		const employeeElement = page
			.locator('.xTicketFunsSplitTip__list--nickName')
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
			.locator('.xTicketFunctions__payment--sums')
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
	const comboBox = customerSearch.getByRole('combobox');
	await expect(comboBox).toBeVisible();
	const trimmedCustomer = customer.trim();
	await comboBox.fill(trimmedCustomer);

	const digitsOnly = trimmedCustomer.replace(/\D/g, '');
	const formattedPhone =
		digitsOnly.length === 10
			? `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
			: undefined;

	const options = page.locator('.MuiAutocomplete-option');
	await expect(options.first()).toBeVisible();

	const phoneOption = formattedPhone
		? options.filter({
				has: page.locator('.phone', { hasText: formattedPhone }),
			})
		: undefined;

	const targetOption =
		phoneOption && (await phoneOption.count()) > 0
			? phoneOption.first()
			: options
					.filter({
						has: page.locator('.MuiListItemText-root', {
							hasText: trimmedCustomer,
							exact: true,
						}),
					})
					.first();

	await expect(targetOption).toBeVisible();
	await targetOption.click();
});

When('I redeem my loyalty points', async ({ page }) => {
	await page.locator('.xLoyalty__item').click();
});

When(
	'I click on the {string} button in the split tip screen',
	async ({ page }, button: string) => {
		const buttonElement = page.locator('ul.xTicketFunsSplitTip__btns li', {
			hasText: button,
		});

		await expect(buttonElement).toBeVisible();
		await buttonElement.click();
	},
);

Then('I should see all split tips non-zero', async ({ page }) => {
	const tipValues = page.locator(
		'.xTicketFunsSplitTip__list dl:has(dt:text("Tip:")) dd',
	);
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
		const employeeItem = page
			.locator('ul.xTicketFunsSplitTip__list > li')
			.filter({
				has: page.locator('span.xTicketFunsSplitTip__list--nickName', {
					hasText: employeeName,
				}),
			});
		const tipValue = employeeItem
			.locator('dl')
			.filter({ has: page.locator('dt', { hasText: 'Tip:' }) })
			.locator('dd');
		await expect(tipValue).toHaveText('$0.00');
	},
);

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
			.getByText(customer, { exact: true })
			.last();
		await expect(customerElement).toHaveText(customer);
	},
);

Then('I should see the new customer icon', async ({ page }) => {
	await expect(
		page.locator('[data-testid="NewCustomerIconIcon"]').last(),
	).toBeVisible();
});

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
		const keyLocator =
			digit === '.'
				? page.locator('button.key:has(span.text-dot)')
				: page.locator(`button.key:has(span.text-num:has-text("${digit}"))`);

		await keyLocator.click();
	}
});

When(
	'I enter the amount {string} on the second numpad',
	async ({ page }, amount: string) => {
		for (const digit of amount) {
			const keyLocator =
				digit === '.'
					? page.locator('button.key:has(span.text-dot).last()')
					: page
							.locator(`button.key:has(span.text-num:has-text("${digit}"))`)
							.last();

			await keyLocator.click();
		}
	},
);

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
			.locator('.xTicketFunctions__payment--list li')
			.last();

		await expect(paymentHistoryElement).toBeVisible();
		await expect(paymentHistoryElement).toContainText(paymentHistory);
	},
);
Then(
	'I should see the payment history {string} visible in payment tab',
	async ({ page }, paymentHistory: string) => {
		const paymentHistoryElement = page
			.locator('.xPayment__history--info')
			.last();

		await expect(paymentHistoryElement).toBeVisible();
		await expect(paymentHistoryElement).toContainText(paymentHistory);
	},
);

When(
	'I select the payment history {string}',
	async ({ page }, paymentHistory: string) => {
		const paymentHistoryElement = page
			.locator('.xTicketFunctions__payment--history li')
			.last();

		await expect(paymentHistoryElement).toBeVisible();
		await expect(paymentHistoryElement).toContainText(paymentHistory);

		await paymentHistoryElement.click();
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
	const input = page.locator('.xTicketFunctions__req').locator('[name="note"]');
	await input.fill(note);
	await expect(input).toHaveValue(note);
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
		const today = new Date();
		const formattedToday = today
			.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
			.replace(/\//g, '/'); // e.g., 06/18/2025

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
		const radioButton = page.getByRole('radio', {
			name,
			exact: true,
		});

		await expect(radioButton).toBeChecked();
	},
);

Then(
	'I should see the {string} option is active',
	async ({ page }, discount: string) => {
		const discountElement = page
			.locator('.listDiscount__commission li')
			.getByText(discount);
		await expect(discountElement).toBeVisible();
		await expect(discountElement).toHaveClass(/active/);
	},
);

Then(
	'I should see the {string} discount type is active',
	async ({ page }, type: string) => {
		const discountElement = page
			.locator('ul.xTicketFunctions__type li')
			.getByText(type);
		await expect(discountElement).toBeVisible();
		await expect(discountElement).toHaveClass(/active/);
	},
);

When('I select the {string} discount type', async ({ page }, type: string) => {
	const discountElement = page
		.locator('ul.xTicketFunctions__type li')
		.getByText(type);
	await expect(discountElement).toHaveText(type);
	await discountElement.click();
});

Then('I should see the discount sorted correctly', async ({ page }) => {
	const discountItems = page.locator('.listDiscount__item ul li p');
	const count = await discountItems.count();

	const texts: string[] = [];

	for (let i = 0; i < count; i++) {
		texts.push((await discountItems.nth(i).innerText()).trim());
	}
	const expectedOrder = [
		'Open Discount',
		'$3 Off',
		'$5 Off',
		'5% Off',
		'10% Off',
		'20% Off',
	];

	await expect(texts).toEqual(expectedOrder);
});

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
	'I should see the discount ticket detail {string} in my cart',
	async ({ page }, discount: string) => {
		const discountElement = page.locator('.TicketDiscount');
		await expect(discountElement).toContainText(discount);
	},
);

Then('I should see {string} in my cart', async ({ page }, charge: string) => {
	const parenIndex = charge.indexOf('(');
	const dollarIndex = charge.indexOf('$');

	let label = charge;
	let amount: string | undefined;

	if (parenIndex > 0 && charge.includes(')', parenIndex)) {
		label = charge.slice(0, parenIndex).trim();
		amount = charge.slice(parenIndex).trim();
	} else if (dollarIndex > 0) {
		label = charge.slice(0, dollarIndex).trim();
		amount = charge.slice(dollarIndex).trim();
	}

	const chargeItem = page
		.locator('ul.xCharge li')
		.filter({ has: page.locator('span', { hasText: label }) });

	await expect(chargeItem).toBeVisible();
	await expect(chargeItem.locator('span').first()).toHaveText(label);

	if (amount) {
		await expect(chargeItem.locator('span').nth(1)).toContainText(amount);
	} else {
		await expect(chargeItem).toContainText(charge);
	}
});

Then(
	'I should see the {string} absorption type in my cart',
	async ({ page }, type: string) => {
		const typeElement = page
			.locator('.xTicketItems__discount--title')
			.getByText(type);
		await expect(typeElement).toContainText(type);
	},
);

When(
	'I select the discount absorb type {string}',
	async ({ page }, type: string) => {
		const typeElement = page
			.locator('ul.listDiscount__commission li')
			.getByText(type);
		await expect(typeElement).toHaveText(type);
		await typeElement.click();
	},
);

When(
	'I click on the {string} button on the header',
	async ({ page }, button: string) => {
		const buttonElement = page.locator('.xBtn').getByText(button);
		await expect(buttonElement).toHaveText(button);
		await buttonElement.click();
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
	const headerMenu = page.locator('[data-testid="MenuHeaderIconIcon"]');
	await expect(headerMenu).toBeVisible();
	await headerMenu.click();
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
	await page.waitForTimeout(5000);
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

		// Validate the provided time slot
		if (!rowIndex) {
			throw new Error(
				`Time slot "${timeSlot}" is not valid. Valid options are: ${Object.keys(timeSlotMap).join(', ')}`,
			);
		}

		// Find the row corresponding to the time slot (using nth which is 0-based)
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
			.locator('.e-appointment .event-details')
			.filter({ hasText: customerName })
			.first();
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

When('I click on the scale icon', async ({ page }) => {
	await page.locator('.triangle').click();
});

When('I filter the employee {string}', async ({ page }, employee: string) => {
	const filterElement = page.getByRole('tab', { name: 'Filter' });
	await expect(filterElement).toBeVisible();

	await filterElement.click();

	const employeeBox = page.locator('.box-employee-filter').getByText(employee);
	await expect(employeeBox).toBeVisible();
	await employeeBox.click();
});

Then(
	'I should see the time slot {string} booked',
	async ({ page }, timeSlot: string) => {
		const appointmentElement = page
			.locator('.e-appointment .event-cellTime')
			.filter({ hasText: timeSlot })
			.first();
		await expect(appointmentElement).toBeVisible();
		await expect(appointmentElement).toContainText(timeSlot);
	},
);

When(
	'I select the time slot {string} booked',
	async ({ page }, timeSlot: string) => {
		const appointmentElement = page
			.locator('.e-appointment .event-cellTime')
			.filter({ hasText: timeSlot })
			.last();
		await expect(appointmentElement).toBeVisible();
		await expect(appointmentElement).toContainText(timeSlot);

		await appointmentElement.click();
	},
);

When(
	'I click on the {string} button on the header appointment',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.xMainContent')
			.getByRole('button', { name: button });
		await buttonElement.click();
	},
);

When(
	'I click on the {string} button on the right panel',
	async ({ page }, button: string) => {
		const buttonElement = page
			.locator('.btn-wrapper-z-version .wapper-box-btn')
			.getByRole('button', { name: button });
		await expect(buttonElement).toBeVisible();
		await buttonElement.click();
	},
);

Then(
	'I should see the text points used {string} visible',
	async ({ page }, points: string) => {
		const [labelPart, valuePart] = points.split(':');
		const label = (labelPart || points).trim();
		const value = valuePart ? valuePart.trim() : undefined;

		let item = page
			.locator('ul.xLoyalty__cal--list li')
			.filter({ has: page.locator('span', { hasText: label }) });

		if (value) {
			item = item.filter({
				has: page.locator('span', { hasText: value }),
			});
		}

		await expect(item.first()).toBeVisible();
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

Then('I should see the ticket function menu', async ({ page }) => {
	const ticketFunctionMenu = page.locator('ul.xTicketFunctions__menu');
	await expect(ticketFunctionMenu).toBeVisible();
});

When(
	'I select the function {string} on the menu',
	async ({ page }, menu: string) => {
		const menuElement = page
			.locator('ul.xTicketFunctions__menu li')
			.getByText(menu, { exact: true });
		await expect(menuElement).toBeVisible();
		await menuElement.click();
	},
);

When('I select the group {string}', async ({ page }, group: string) => {
	const groupElement = page
		.locator('ul.xCharge__tax--action li')
		.getByText(group, { exact: true });
	await expect(groupElement).toBeVisible();
	await groupElement.click();
});

When(
	'I select the {string} employee in the list item employee',
	async ({ page }, employee: string) => {
		const employeeElement = page
			//.locator('ul.emp_layout_queue li.xEmployeeItem .nickName')
			.locator('li.xEmployeeItem')
			.getByText(employee, { exact: true });
		await expect(employeeElement).toBeVisible();
		await employeeElement.click();
	},
);

Then(
	'I should see a ticket functions title {string}',
	async ({ page }, title: string) => {
		const titleElement = page
			.locator('.xTicketFunctions__title')
			.getByText(title);
		await expect(titleElement).toBeVisible();
	},
);

When('I select the {string} on the menu', async ({ page }, menu: string) => {
	const menuElement = page
		.locator('ul.xTicketFunctions__menu li')
		.getByText(menu);
	await expect(menuElement).toBeVisible();
	await menuElement.click();
});

When('I click on search', async ({ page }) => {
	const searchIcon = page.locator('[data-testid="XSearchIcon"]');
	await searchIcon.click({ force: true });
	await page.waitForTimeout(5000);
});

Then(
	'I should see the selected {string} tab on the Home page',
	async ({ page }, tab: string) => {
		const tabElement = page.locator('button.MuiTab-root.Mui-selected', {
			hasText: tab,
		});

		await expect(tabElement).toBeVisible();
		await expect(tabElement).toHaveAttribute('aria-selected', 'true');
		await page.waitForTimeout(5000);
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

		const confirmDialog = page
			.locator('div[role="dialog"]')
			.filter({
				has: page.locator('#draggable-dialog-title', {
					hasText: 'Confirm Validate Time',
				}),
			})
			.last();

		if (await confirmDialog.count()) {
			const confirmButton = confirmDialog
				.locator('button.MuiButton-containedPrimary.button_dialog_options')
				.filter({ hasText: /confirm/i })
				.first();

			if (await confirmButton.count()) {
				await confirmButton.click({ force: true });
				await page.waitForTimeout(200);
			}
		}
		// If no dialog is visible, this step completes without doing anything
	},
);

Then(
	'I should see the gift card balance {string} visible',
	async ({ page }, balance: string) => {
		const balanceRow = page
			.locator('.xTicketFunsGiftCard__info > span')
			.filter({
				has: page.locator('span', { hasText: 'BALANCE' }),
			});
		await expect(balanceRow.first()).toBeVisible();

		const balanceValue = balanceRow.first().locator('span').last();
		await expect(balanceValue).toContainText(balance.trim());
	},
);

Then(
	'I should see the card value {string} visible',
	async ({ page }, value: string) => {
		const cardValue = page.locator('.xTicketFunsGiftCard__info > span').filter({
			has: page.locator('span', { hasText: 'CARD VALUE' }),
		});
		await expect(cardValue.first()).toBeVisible();

		const balanceValue = cardValue.first().locator('span').last();
		await expect(balanceValue).toContainText(value.trim());
	},
);

When('I select the type {string}', async ({ page }, type: string) => {
	const combobox = page.locator('.xFlex-select');
	await combobox.click();

	const typeElement = page.locator('ul.MuiMenu-list').getByText(type);
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
	'I should see the last ticket of payment {string}',
	async ({ page }, amount: string) => {
		const lastPaymentCell = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="paymentTotal"]', { hasText: amount })
			.last();

		await expect(lastPaymentCell).toBeVisible();
		await lastPaymentCell.scrollIntoViewIfNeeded();
		await expect(lastPaymentCell).toContainText(amount);
	},
);

Then(
	'I should see the last ticket of Cash payment {string}',
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
		await matchingRow.scrollIntoViewIfNeeded();

		const methodCell = matchingRow.locator('[data-field="paymentMethod"]');
		const amountCell = matchingRow.locator('[data-field="paymentTotal"]');

		await expect(methodCell).toHaveText('Cash');
		await expect(amountCell).toHaveText(amount);
	},
);

When(
	'I click on the last row for payment {string} to expand details',
	async ({ page }, amount: string) => {
		const lastPaymentCell = page
			.locator('.MuiDataGrid-virtualScrollerContent')
			.locator('.MuiDataGrid-row')
			.locator('[data-field="paymentTotal"]', { hasText: amount })
			.last();
		await expect(lastPaymentCell).toBeVisible();
		await lastPaymentCell.scrollIntoViewIfNeeded();
		await lastPaymentCell.click();
	},
);

When(
	'I click the avatar in the last row with Cash payment {string} to expand details',
	async ({ page }, amount: string) => {
		const targetRow = page
			.locator(
				`.MuiDataGrid-row:has([data-field="paymentMethod"]:text("Cash")):has([data-field="paymentTotal"]:text("${amount}"))`,
			)
			.last();
		await targetRow.scrollIntoViewIfNeeded();
		await expect(targetRow).toBeVisible();

		const avatarCell = targetRow.locator('[data-field="avatar"]');
		await expect(avatarCell).toBeVisible();
		await avatarCell.click();
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
	const today = new Date();
	const formattedToday = today.toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}); // Example: "07/03/2025"

	const datePickers = page.locator('button.btn-range-calendar');

	await expect(datePickers).toHaveCount(2);
	await expect(datePickers).toHaveText([formattedToday, formattedToday]);
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
	'I click button clock in for employee {string}',
	async ({ page }, employeeNickname: string) => {
		const targetRow = page.locator('.MuiDataGrid-row').filter({
			has: page.locator('.MuiDataGrid-cell[data-field="nickName"]', {
				hasText: employeeNickname,
			}),
		});

		const clockInButton = targetRow.locator('button', {
			hasText: 'CLOCK IN',
		});

		await expect(targetRow.first()).toBeVisible();
		await clockInButton.first().scrollIntoViewIfNeeded();
		await expect(clockInButton.first()).toBeVisible();
		await clockInButton.first().click();
	},
);

Then(
	'I should see the first ticket with total {string}',
	async ({ page }, amount: string) => {
		const totalElement = page
			.locator('.MuiDataGrid-row')
			.locator('[data-field="ticketTotals"]', { hasText: amount })
			.first();
		await expect(totalElement).not.toHaveText('Ticket Totals');
		await expect(totalElement).toContainText(amount);
		await expect(totalElement).toBeVisible();
	},
);

Then(
	'I should see the turn number for {string} is 0.0',
	async ({ page }, name: string) => {
		const employeeItem = page.locator('li.xEmployeeItem').filter({
			has: page.locator('.nickName', { hasText: name }),
		});
		await expect(employeeItem).toBeVisible();

		const turnLabel = employeeItem.locator('.MuiChip-label', {
			hasText: /C\s*=\s*0\.0/,
		});
		await expect(turnLabel.first()).toBeVisible();
	},
);

Then(
	'I should see the turn number for {string} is 1.0',
	async ({ page }, name: string) => {
		const employeeItem = page.locator('li.xEmployeeItem').filter({
			has: page.locator('.nickName', { hasText: name }),
		});
		await expect(employeeItem).toBeVisible();

		const turnLabel = employeeItem.locator('.MuiChip-label', {
			hasText: /C\s*=\s*1\.0/,
		});
		await expect(turnLabel.first()).toBeVisible();
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

When('I click on refresh', async ({ page }) => {
	await page.locator('[data-testid="RefreshOutlinedIconIcon"]').click();
});

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
		await expect(row).toBeVisible();

		const turnCell = row.locator('td', {
			has: page.locator('.MuiChip-label', { hasText: '-1.00' }),
		});
		await expect(turnCell.first()).toBeVisible();
	},
);

Then(
	'I should see the Auto Turn 20.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('tr').filter({
			has: page.locator(`[title="${name}"]`),
		});
		await expect(row).toBeVisible();

		const turnCell = row.locator('td', {
			has: page.locator('.MuiChip-label', { hasText: '20.00' }),
		});
		await expect(turnCell.first()).toBeVisible();
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
	'I should see the Turn 20.00 for {string}',
	async ({ page }, name: string) => {
		const row = page.locator('td').filter({
			has: page.getByTitle(name),
		});
		const turnLabel = row
			.locator('.MuiChip-root', { hasText: 'Turn' })
			.locator('.MuiChip-label', { hasText: '20.00' });
		await expect(turnLabel).toBeVisible();
	},
);

Then('I should see the store logo on the receipt', async ({ page }) => {
	await expect(page.locator('img[alt="PINK NAILS"]')).toBeVisible();
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
	const today = new Date();
	const formattedToday = today
		.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
		.replace(/\//g, '/');

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
		const itemsContainer = page
			.locator('.render-bill div[style*="margin-top: 16px;"]', {
				has: page.locator('div', { hasText: 'Item Name' }),
			})
			.first();
		const serviceRow = itemsContainer
			.locator('div[style*="display: flex; flex-direction: row;"]')
			.last();
		const qtyCell = serviceRow.locator('div').first();
		await expect(qtyCell).toHaveText(qty);
	},
);

Then(
	'I should see the service name {string} on the receipt',
	async ({ page }, item: string) => {
		const itemsContainer = page
			.locator('.render-bill div[style*="margin-top: 16px;"]', {
				has: page.locator('div', { hasText: 'Item Name' }),
			})
			.first();
		const serviceRow = itemsContainer
			.locator('div[style*="display: flex; flex-direction: row;"]')
			.last();
		const serviceName = serviceRow.locator('div').nth(1);
		await expect(serviceName).toHaveText(item);
	},
);

Then(
	'I should see the technician name {string} on the receipt',
	async ({ page }, name: string) => {
		const itemsContainer = page
			.locator('.render-bill div[style*="margin-top: 16px;"]', {
				has: page.locator('div', { hasText: 'Item Name' }),
			})
			.first();
		const serviceRow = itemsContainer
			.locator('div[style*="display: flex; flex-direction: row;"]')
			.last();
		const technicianName = serviceRow.locator('div').nth(2);
		await expect(technicianName).toHaveText(name);
	},
);

Then(
	'I should see the service price {string} on the receipt',
	async ({ page }, price: string) => {
		const itemsContainer = page
			.locator('.render-bill div[style*="margin-top: 16px;"]', {
				has: page.locator('div', { hasText: 'Item Name' }),
			})
			.first();
		const serviceRow = itemsContainer
			.locator('div[style*="display: flex; flex-direction: row;"]')
			.last();
		const priceCell = serviceRow.locator('div').nth(3);
		await expect(priceCell).toHaveText(price);
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
		const cashAmountCell = cashRow.locator('td').nth(2);
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

Then('I should see the Payroll Date default to today', async ({ page }) => {
	const today = new Date();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = today.getDate();
	const year = today.getFullYear();
	const dayPattern = day < 10 ? `0?${day}` : `${day}`;
	const dateRangePattern = new RegExp(
		`^${month}/${dayPattern}/${year}\\s-\\s${month}/${dayPattern}/${year}$`,
	);

	const payrollRow = page
		.locator('.render-bill table')
		.locator('tr', {
			has: page.locator('td', { hasText: 'Payroll Date' }),
		})
		.first();
	const payrollValueCell = payrollRow.locator('td').nth(1);

	await expect(payrollValueCell).toHaveText(dateRangePattern);
});

Then(
	'I should see the # of Work Days is {int}',
	async ({ page }, numberDay: number) => {
		const workDaysRow = page
			.locator('.render-bill table')
			.locator('tr', {
				has: page.locator('td', { hasText: '# of Work Days' }),
			})
			.first();
		const workDaysValueCell = workDaysRow.locator('td').nth(1);

		await expect(workDaysValueCell).toHaveText(numberDay.toString());
	},
);

Then(
	'I should see the {string} on the single payroll',
	async ({ page }, detail: string) => {
		const normalizedDetail = detail.trim();
		const match = normalizedDetail.match(/^(.+?)\s+([()$].+)$/);

		if (!match) {
			throw new Error(
				`Unable to parse detail "${detail}". Expected format "<label> <value>"`,
			);
		}

		const rawLabel = match[1];
		const rawValue = match[2];

		if (!rawLabel || !rawValue) {
			throw new Error(
				`Unable to parse detail "${detail}" into label and value components`,
			);
		}

		const labelText = rawLabel.trim();
		const valueText = rawValue.trim();

		const detailRow = page
			.locator('.render-bill table')
			.locator('tr', {
				has: page.locator('td', { hasText: labelText }),
			})
			.filter({
				has: page.locator('td', { hasText: valueText }),
			})
			.first();

		await expect(detailRow).toBeVisible();

		const cells = detailRow.locator('td');
		await expect(cells.first()).toHaveText(labelText);
		await expect(cells.nth(1)).toHaveText(valueText);
	},
);

Then(
	'I should see the header Daily Details on the single payroll',
	async ({ page }) => {
		const header = page
			.locator('.render-bill table')
			.locator('tr', {
				has: page.locator('th', { hasText: 'Daily Details' }),
			})
			.first();
		await expect(header).toBeVisible();
	},
);

Then(
	'I should see the Daily Details subheaders on the single payroll',
	async ({ page }) => {
		const subHeaderRow = page
			.locator('.render-bill table.details-payroll tr')
			.first();
		const expectedHeaders = [
			'Date',
			'Day',
			'Total Sales',
			'Net Comm',
			'NC Tip',
			'Total Payout',
		];
		await expect(subHeaderRow).toBeVisible();
		await expect(subHeaderRow.locator('td')).toHaveText(expectedHeaders);
	},
);

Then(
	'I should see the {string} of daily details',
	async ({ page }, detail: string) => {
		const normalizedDetail = detail.trim();
		const match = normalizedDetail.match(/^(.+?)\s+"(.+)"$/);
		if (!match) {
			throw new Error(
				`Unable to parse daily detail "${detail}". Expected format "<label> "<value>""`,
			);
		}

		const rawLabel = match[1];
		const rawValue = match[2] || '';

		if (!rawLabel || !rawValue) {
			throw new Error(
				`Unable to parse daily detail "${detail}" into label and value components`,
			);
		}

		const labelText = rawLabel.trim();
		const valueText = rawValue.trim();

		const columnIndexByLabel: Record<string, number> = {
			Date: 0,
			Day: 1,
			'Total Sales': 2,
			'NC Tip': 4,
			'Total Payout': 5,
		};

		const columnIndex = columnIndexByLabel[labelText];
		if (columnIndex === undefined) {
			throw new Error(`Unsupported daily detail label "${labelText}"`);
		}

		const totalsRow = page
			.locator('.render-bill table.details-payroll tr')
			.nth(1);
		await expect(totalsRow).toBeVisible();

		const targetCell = totalsRow.locator('td').nth(columnIndex);
		await expect(targetCell).toHaveText(valueText);
	},
);

When(
	'I click on the function {string} payment',
	async ({ page }, option: string) => {
		const functionButton = page
			.locator('ul.xTicketFunctions__payment--option li')
			.getByText(option);
		await expect(functionButton).toBeVisible();
		await functionButton.click();
	},
);

Then(
	'I should see the card price amount {string} visible',
	async ({ page }, amount: string) => {
		const cardPrice = page.locator(
			'.xTicketFunctions__payment--sums dl:has(dt:text("CD/TOT")) dd',
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
				'.xTicketFunctions__payment--sums dl:has(dt:text("AMT DUE")) dd',
			),
		).toContainText(amount);
	},
);

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
