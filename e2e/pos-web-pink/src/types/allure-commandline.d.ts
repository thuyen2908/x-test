/**
 * This library provides no type definitions, so we create a basic one for it.
 * The future of Typescript support is being discussed here:
 * https://github.com/allure-framework/allure-npm/issues/42
 */
declare module 'allure-commandline' {
	import type { ChildProcess } from 'node:child_process';

	export default function allure(options: string[]): ChildProcess;
}
