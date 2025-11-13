import { SelectorHelper } from '#helpers';
import { type Selector } from '#types';
import { logDebug, logInfo } from '#utils';

import { BaseScreen } from './BaseScreen';

/**
 * iOS Base Screen Object
 * Provides iOS-specific functionality and selector strategies
 */
export abstract class IosScreen extends BaseScreen {
	/**
	 * Get iOS-specific selector
	 * Prioritizes accessibility ID for better performance
	 */
	protected getSelector(id: string): Selector {
		return {
			android: '', // Not used for iOS
			ios: SelectorHelper.iosAccessibilityId(id),
		};
	}

	/**
	 * iOS-specific: Swipe back gesture
	 * Simulates the edge swipe from left to go back
	 */
	protected async swipeBack(): Promise<void> {
		logInfo('Performing iOS swipe back gesture');
		const { width, height } = await driver.getWindowSize();
		await driver.touchAction([
			{ action: 'press', x: 10, y: height / 2 },
			{ action: 'wait', ms: 100 },
			{ action: 'moveTo', x: width / 2, y: height / 2 },
			'release',
		]);
	}

	/**
	 * iOS-specific: Shake device
	 */
	protected async shake(): Promise<void> {
		logInfo('Shaking iOS device');
		await driver.execute('mobile: shake');
	}

	/**
	 * iOS-specific: Lock device
	 */
	protected async lock(duration?: number): Promise<void> {
		logInfo(`Locking iOS device${duration ? ` for ${duration}ms` : ''}`);
		await driver.lock(duration);
	}

	/**
	 * iOS-specific: Unlock device
	 */
	protected async unlock(): Promise<void> {
		logInfo('Unlocking iOS device');
		await driver.unlock();
	}

	/**
	 * iOS-specific: Touch ID / Face ID simulation
	 */
	protected async performBiometricLogin(
		success: boolean = true,
	): Promise<void> {
		logInfo(`Performing biometric login: ${success ? 'success' : 'failure'}`);
		await driver.execute('mobile: sendBiometricMatch', { match: success });
	}

	/**
	 * iOS-specific: Get page source (XML)
	 */
	protected async getPageSource(): Promise<string> {
		const source = await driver.getPageSource();
		logDebug(`Page source length: ${source.length} characters`);
		return source;
	}

	/**
	 * iOS-specific: Scroll to text using predicate
	 */
	protected async scrollToText(
		text: string,
		maxScrolls: number = 10,
	): Promise<void> {
		logInfo(`Scrolling to text: ${text}`);

		for (let i = 0; i < maxScrolls; i++) {
			const element = await $(
				SelectorHelper.iosPredicateString(`label CONTAINS "${text}"`),
			);

			if (await element.isDisplayed()) {
				logDebug(`Found text after ${i} scrolls`);
				return;
			}

			// Scroll down
			const { width, height } = await driver.getWindowSize();
			await driver.touchAction([
				{ action: 'press', x: width / 2, y: height * 0.8 },
				{ action: 'wait', ms: 100 },
				{ action: 'moveTo', x: width / 2, y: height * 0.2 },
				'release',
			]);
		}

		throw new Error(`Text "${text}" not found after ${maxScrolls} scrolls`);
	}

	/**
	 * iOS-specific: Tap element at coordinates
	 */
	protected async tapAtCoordinate(x: number, y: number): Promise<void> {
		logInfo(`Tapping at coordinates: (${x}, ${y})`);
		await driver.touchAction({
			action: 'tap',
			x,
			y,
		});
	}

	/**
	 * iOS-specific: Long press element
	 */
	protected async longPress(
		selector: Selector | string,
		duration: number = 1000,
	): Promise<void> {
		const element = await this.findElement(selector);
		logInfo(`Long pressing element for ${duration}ms`);
		await element.touchAction([
			{ action: 'longPress', ms: duration },
			'release',
		]);
	}

	/**
	 * iOS-specific: Deep link navigation
	 */
	protected async openDeepLink(url: string): Promise<void> {
		logInfo(`Opening deep link: ${url}`);
		await driver.execute('mobile: deepLink', { url });
	}
}
