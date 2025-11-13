import { type Platform, type Size } from '#types';

/**
 * Device Configuration Interface
 */
export interface DeviceConfig {
	name: string;
	platform: Platform;
	version: string;
	resolution: Size;
	isEmulator?: boolean;
	udid?: string;
}

/**
 * Pre-configured device profiles
 * Add or modify devices as needed for your test environment
 */
export const DEVICE_CONFIGS: Record<string, DeviceConfig> = {
	/* ========================================================================
	 * Android Devices
	 * ======================================================================== */

	// Android Emulators
	'pixel-7': {
		name: 'Pixel 7',
		platform: 'android',
		version: '13',
		resolution: { width: 1080, height: 2400 },
		isEmulator: true,
	},

	'pixel-8': {
		name: 'Pixel 8',
		platform: 'android',
		version: '14',
		resolution: { width: 1080, height: 2400 },
		isEmulator: true,
	},

	'galaxy-s23': {
		name: 'Samsung Galaxy S23',
		platform: 'android',
		version: '13',
		resolution: { width: 1080, height: 2340 },
		isEmulator: true,
	},

	'galaxy-s24': {
		name: 'Samsung Galaxy S24',
		platform: 'android',
		version: '14',
		resolution: { width: 1080, height: 2340 },
		isEmulator: true,
	},

	/* ========================================================================
	 * iOS Devices
	 * ======================================================================== */

	// iOS Simulators
	'iphone-15': {
		name: 'iPhone 15',
		platform: 'ios',
		version: '17.0',
		resolution: { width: 1179, height: 2556 },
		isEmulator: true,
	},

	'iphone-15-pro': {
		name: 'iPhone 15 Pro',
		platform: 'ios',
		version: '17.0',
		resolution: { width: 1179, height: 2556 },
		isEmulator: true,
	},

	'iphone-14': {
		name: 'iPhone 14',
		platform: 'ios',
		version: '16.0',
		resolution: { width: 1170, height: 2532 },
		isEmulator: true,
	},

	'iphone-14-pro': {
		name: 'iPhone 14 Pro',
		platform: 'ios',
		version: '16.0',
		resolution: { width: 1179, height: 2556 },
		isEmulator: true,
	},

	'ipad-pro-12': {
		name: 'iPad Pro 12.9-inch',
		platform: 'ios',
		version: '17.0',
		resolution: { width: 2048, height: 2732 },
		isEmulator: true,
	},
};

/**
 * Get device configuration by name
 */
export function getDeviceConfig(deviceName: string): DeviceConfig | undefined {
	return DEVICE_CONFIGS[deviceName];
}

/**
 * Get all devices for a specific platform
 */
export function getDevicesByPlatform(platform: Platform): DeviceConfig[] {
	return Object.values(DEVICE_CONFIGS).filter(
		(device) => device.platform === platform,
	);
}

/**
 * Get all Android devices
 */
export function getAndroidDevices(): DeviceConfig[] {
	return getDevicesByPlatform('android');
}

/**
 * Get all iOS devices
 */
export function getIOSDevices(): DeviceConfig[] {
	return getDevicesByPlatform('ios');
}

/**
 * Get default device for platform
 */
export function getDefaultDevice(platform: Platform): DeviceConfig {
	return platform === 'android'
		? DEVICE_CONFIGS['pixel-7']!
		: DEVICE_CONFIGS['iphone-15']!;
}
