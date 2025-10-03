import { resolve } from 'node:path';

import allure from 'allure-commandline';
import { copy, emptyDir, pathExists } from 'fs-extra';

import { constants } from './const';
import { test as teardown } from './steps/fixtures';

teardown('Report: Generate Allure report', async () => {
	const { allureResultsDir, allureReportDir, allureReportGenerationTimeout } =
		constants.PlaywrightConfig;

	const resultsHistoryDir = resolve(allureResultsDir, 'history');
	const reportHistoryDir = resolve(allureReportDir, 'history');

	const [isResultsDirExists, isReportDirExists] = await Promise.all([
		pathExists(allureResultsDir),
		pathExists(allureReportDir),
	]);

	// skip report generation if allure-results directory does not exist
	if (!isResultsDirExists) {
		console.info(
			'allure-results directory does not exist, skipping report generation',
		);
		return;
	}

	// if there is an existing allure-report directory, retain the last run history
	// https://allurereport.org/docs/history-and-retries/#how-to-enable-history
	if (isReportDirExists) {
		await copy(reportHistoryDir, resultsHistoryDir);
	}

	// generate the Allure report
	const childProcess = allure(['generate', '--clean']);
	await new Promise((resolve) => {
		const generationTimeoutId = setTimeout(() => {
			console.error('Allure report generation timed out');
			resolve(undefined); // intentionally silent the error
		}, allureReportGenerationTimeout);

		childProcess.on('exit', (exitCode) => {
			clearTimeout(generationTimeoutId);

			console.info(
				`Allure report generation is finished with code ${exitCode}`,
			);

			resolve(undefined);
		});
	});

	// cleanup allure-results directory after generation
	await emptyDir(allureResultsDir);
});
