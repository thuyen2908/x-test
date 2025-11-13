import { type Selector } from '#types';

import { PlatformHelper } from './platform.helper';

/**
 * Selector Helper
 * Provides utilities for cross-platform element selectors
 */
export class SelectorHelper {
	/**
	 * Get platform-specific selector from a Selector object
	 *
	 * @example
	 * const selector = { android: 'resourceId', ios: '~accessibilityId' };
	 * const actualSelector = SelectorHelper.getSelector(selector); // Returns the appropriate one
	 */
	static getSelector(selector: Selector | string): string {
		if (typeof selector === 'string') {
			return selector;
		}

		const platformSelector = PlatformHelper.isAndroid()
			? selector.android
			: selector.ios;

		if (!platformSelector) {
			throw new Error(
				`Selector not defined for platform: ${PlatformHelper.platform}`,
			);
		}

		return platformSelector;
	}

	/**
	 * Build Android resource ID selector
	 *
	 * @example
	 * SelectorHelper.androidResourceId('com.xsofts.galaxyme:id/login_button')
	 * // Returns: 'android=new UiSelector().resourceId("com.xsofts.galaxyme:id/login_button")'
	 */
	static androidResourceId(resourceId: string): string {
		return `android=new UiSelector().resourceId("${resourceId}")`;
	}

	/**
	 * Build Android text selector
	 *
	 * @example
	 * SelectorHelper.androidText('Login')
	 * // Returns: 'android=new UiSelector().text("Login")'
	 */
	static androidText(text: string): string {
		return `android=new UiSelector().text("${text}")`;
	}

	/**
	 * Build Android text contains selector
	 *
	 * @example
	 * SelectorHelper.androidTextContains('Log')
	 * // Returns: 'android=new UiSelector().textContains("Log")'
	 */
	static androidTextContains(text: string): string {
		return `android=new UiSelector().textContains("${text}")`;
	}

	/**
	 * Build Android description selector (content-desc)
	 *
	 * @example
	 * SelectorHelper.androidDescription('Login Button')
	 * // Returns: 'android=new UiSelector().description("Login Button")'
	 */
	static androidDescription(description: string): string {
		return `android=new UiSelector().description("${description}")`;
	}

	/**
	 * Build Android className selector
	 *
	 * @example
	 * SelectorHelper.androidClassName('android.widget.Button')
	 * // Returns: 'android=new UiSelector().className("android.widget.Button")'
	 */
	static androidClassName(className: string): string {
		return `android=new UiSelector().className("${className}")`;
	}

	/**
	 * Build iOS accessibility ID selector
	 *
	 * @example
	 * SelectorHelper.iosAccessibilityId('loginButton')
	 * // Returns: '~loginButton'
	 */
	static iosAccessibilityId(id: string): string {
		return `~${id}`;
	}

	/**
	 * Build iOS predicate string selector
	 *
	 * @example
	 * SelectorHelper.iosPredicateString('label == "Login"')
	 * // Returns: '-ios predicate string:label == "Login"'
	 */
	static iosPredicateString(predicate: string): string {
		return `-ios predicate string:${predicate}`;
	}

	// /**
	//  * Build iOS class chain selector
	//  *
	//  * @example
	//  * SelectorHelper.iosClassChain('**/XCUIElementTypeButton[\`label == "Login"\`]')
	//  * // Returns: '-ios class chain:**/XCUIElementTypeButton[\`label == "Login"\`]'
	//  */
	// static iosClassChain(chain: string): string {
	// 	return `-ios class chain:${chain}`;
	// }

	/**
	 * Build selector by text (cross-platform)
	 *
	 * @example
	 * SelectorHelper.byText('Login')
	 * // Android: 'android=new UiSelector().text("Login")'
	 * // iOS: '-ios predicate string:label == "Login"'
	 */
	static byText(text: string): string {
		return PlatformHelper.isAndroid()
			? SelectorHelper.androidText(text)
			: SelectorHelper.iosPredicateString(`label == "${text}"`);
	}

	/**
	 * Build selector by partial text (cross-platform)
	 *
	 * @example
	 * SelectorHelper.byPartialText('Log')
	 * // Android: 'android=new UiSelector().textContains("Log")'
	 * // iOS: '-ios predicate string:label CONTAINS "Log"'
	 */
	static byPartialText(text: string): string {
		return PlatformHelper.isAndroid()
			? SelectorHelper.androidTextContains(text)
			: SelectorHelper.iosPredicateString(`label CONTAINS "${text}"`);
	}

	/**
	 * Build selector by accessibility ID (cross-platform)
	 * Works with content-desc on Android, accessibilityId on iOS
	 *
	 * @example
	 * SelectorHelper.byAccessibilityId('loginButton')
	 * // Returns: '~loginButton' (works on both platforms)
	 */
	static byAccessibilityId(id: string): string {
		return `~${id}`;
	}

	/**
	 * Build XPath selector (works on both platforms)
	 *
	 * @example
	 * SelectorHelper.byXPath('//android.widget.Button[@text="Login"]')
	 */
	static byXPath(xpath: string): string {
		return xpath.startsWith('//') ? xpath : `//${xpath}`;
	}

	/**
	 * Build selector by class name (cross-platform)
	 *
	 * @example
	 * SelectorHelper.byClassName('android.widget.Button')
	 * // or on iOS:
	 * SelectorHelper.byClassName('XCUIElementTypeButton')
	 */
	static byClassName(className: string): string {
		return `~${className}`;
	}

	/**
	 * Create a cross-platform selector object
	 *
	 * @example
	 * const selector = SelectorHelper.createSelector(
	 *   'com.xsofts.galaxyme:id/login_button',  // Android resource ID
	 *   'loginButton'  // iOS accessibility ID
	 * );
	 */
	static createSelector(
		androidSelector: string,
		iosSelector: string,
	): Selector {
		return {
			android: androidSelector,
			ios: iosSelector,
		};
	}
}
