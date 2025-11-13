/**
 * Configuration Module Exports
 * Central export point for all configuration
 */

export { AppiumCapabilities } from './appium.config';
export {
	DEVICE_CONFIGS,
	type DeviceConfig,
	getAndroidDevices,
	getDefaultDevice,
	getDeviceConfig,
	getDevicesByPlatform,
	getIOSDevices,
} from './devices.config';
export { env } from './env.config';
