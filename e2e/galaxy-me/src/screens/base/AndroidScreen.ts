import { SelectorHelper } from '#helpers';
import { type Selector } from '#types';
import { logDebug, logInfo } from '#utils';

import { BaseScreen } from './BaseScreen';

/**
 * Android Base Screen Object
 * Provides Android-specific functionality and selector strategies
 */
export abstract class AndroidScreen extends BaseScreen {
	/**
	 * Get Android-specific selector
	 * Prioritizes resource ID for better performance
	 */
	protected getSelector(id: string): Selector {
		return {
			android: SelectorHelper.androidResourceId(id),
			ios: '', // Not used for Android
		};
	}

	/**
	 * Android-specific: Press back button
	 */
	protected async pressBack(): Promise<void> {
		logInfo('Pressing Android back button');
		await driver.pressKeyCode(4); // KEYCODE_BACK
	}

	/**
	 * Android-specific: Press home button
	 */
	protected async pressHome(): Promise<void> {
		logInfo('Pressing Android home button');
		await driver.pressKeyCode(3); // KEYCODE_HOME
	}

	/**
	 * Android-specific: Press enter/return key
	 */
	protected async pressEnter(): Promise<void> {
		logInfo('Pressing Android enter key');
		await driver.pressKeyCode(66); // KEYCODE_ENTER
	}

	/**
	 * Android-specific: Hide keyboard
	 */
	protected async hideKeyboard(): Promise<void> {
		try {
			if (await driver.isKeyboardShown()) {
				logInfo('Hiding Android keyboard');
				await driver.hideKeyboard();
			}
		} catch (error) {
			logDebug('Keyboard already hidden or not available');
		}
	}

	/**
	 * Android-specific: Open notifications
	 */
	protected async openNotifications(): Promise<void> {
		logInfo('Opening Android notifications');
		await driver.openNotifications();
	}

	/**
	 * Android-specific: Get current activity
	 */
	protected async getCurrentActivity(): Promise<string> {
		const activity = await driver.getCurrentActivity();
		logDebug(`Current activity: ${activity}`);
		return activity;
	}

	/**
	 * Android-specific: Get current package
	 */
	protected async getCurrentPackage(): Promise<string> {
		const packageName = await driver.getCurrentPackage();
		logDebug(`Current package: ${packageName}`);
		return packageName;
	}

	/**
	 * Android-specific: Start activity
	 */
	protected async startActivity(
		appPackage: string,
		appActivity: string,
	): Promise<void> {
		logInfo(`Starting activity: ${appPackage}/${appActivity}`);
		await driver.startActivity(appPackage, appActivity);
	}

	/**
	 * Android-specific: Scroll using UiScrollable
	 * Scrolls to find text in a scrollable view
	 */
	protected async scrollToText(text: string): Promise<void> {
		logInfo(`Scrolling to text: ${text}`);
		await driver.execute('mobile: scroll', {
			strategy: 'accessibility id',
			selector: text,
		});
	}

	/**
	 * Android-specific: Swipe using coordinates
	 */
	protected async swipeByCoordinates(
		startX: number,
		startY: number,
		endX: number,
		endY: number,
		duration: number = 1000,
	): Promise<void> {
		logDebug('Android swipe by coordinates', { startX, startY, endX, endY });
		await driver.touchAction([
			{ action: 'press', x: startX, y: startY },
			{ action: 'wait', ms: duration },
			{ action: 'moveTo', x: endX, y: endY },
			'release',
		]);
	}

	/**
	 * Android-specific: Long press element
	 */
	protected async longPress(
		selector: Selector | string,
		duration: number = 1000,
	): Promise<void> {
		const element = await this.findElement(selector);
		logInfo(`Long pressing element for ${duration}ms`);
		await element.touchAction([
			{ action: 'press' },
			{ action: 'wait', ms: duration },
			'release',
		]);
	}
}
