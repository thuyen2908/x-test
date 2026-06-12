import { resolve } from 'node:path';

import { type APIRequestContext } from '@playwright/test';
import { ensureFile, writeJson } from 'fs-extra/esm';

import { PageId, UserRole } from '#types';

import { constants } from './const';
import { env } from './env';
import { test as setup } from './steps/fixtures';

const __dirname = import.meta.dirname;

async function requestJSON<T>(
	request: APIRequestContext,
	method: 'GET' | 'POST',
	path: string,
	options: {
		data?: unknown;
		token?: string;
		ipAddress?: string;
	} = {},
) {
	const { host: apiHost, xsoftsSecretKey } = env.apiConfig;
	if (!apiHost) throw new Error('Missing PW_API_HOST_PINK in environment.');
	if (!xsoftsSecretKey) {
		throw new Error('Missing PW_XSOFTS_SECRET_KEY_PINK in environment.');
	}

	const response = await request.fetch(`${apiHost}${path}`, {
		method,
		data: options.data,
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'XSOFTS-SECRET-KEY': xsoftsSecretKey,
			...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
			...(options.ipAddress ? { 'X-Client-IP': options.ipAddress } : {}),
		},
	});

	if (!response.ok()) {
		throw new Error(
			`${method} ${path} failed with ${response.status()}: ${await response.text()}`,
		);
	}

	return response.json() as Promise<T>;
}

setup('Authentication: Admin role', async ({ testConfig, request }) => {
	setup.setTimeout(30_000);

	const authStorage = resolve(
		__dirname,
		'..',
		constants.AuthStorage[UserRole.ADMIN],
	);
	await ensureFile(authStorage);

	const timezone = testConfig.timezone;
	const deviceTimeZone = timezone;
	const loginResponse = await requestJSON<Record<string, any>>(
		request,
		'POST',
		`/users/login?_ts=${Date.now()}`,
		{
			data: {
				userName: testConfig.adminEmail,
				password: testConfig.adminPassword,
				timezone,
				ipAddress: '',
				isCheckTimeZone: true,
				isRequiredProfile: true,
				deviceTimeZone,
			},
		},
	);

	const token = loginResponse.token;
	if (!token) throw new Error('Login API did not return a token.');

	const ipAddress = loginResponse.ipAddress ?? '';
	const authHeaders = { token, ipAddress };
	const [businessDayResponse, companyProfileResponse, queueGroups, roleSetups] =
		await Promise.all([
			requestJSON<{ data: unknown }>(
				request,
				'GET',
				`/business-day/get-current-business-day?_ts=${Date.now()}`,
				authHeaders,
			),
			requestJSON<{ data: unknown }>(
				request,
				'GET',
				`/company-profile/get-company-profile?_ts=${Date.now()}`,
				authHeaders,
			),
			requestJSON<unknown[]>(
				request,
				'GET',
				`/queue-group/get-data-lookup?_ts=${Date.now()}`,
				authHeaders,
			),
			requestJSON<unknown[]>(
				request,
				'GET',
				`/api/role/get-data-lookup?_ts=${Date.now()}`,
				authHeaders,
			),
		]);

	const origin = new URL(constants.PageUrl[PageId.HOME]).origin;
	const expire = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

	await writeJson(
		authStorage,
		{
			cookies: [],
			origins: [
				{
					origin,
					localStorage: [
						{ name: 'user', value: JSON.stringify(loginResponse) },
						{
							name: 'companyProfile',
							value: JSON.stringify(companyProfileResponse.data),
						},
						{ name: 'ipAddress', value: JSON.stringify(ipAddress) },
						{ name: 'expire', value: JSON.stringify(expire) },
						{
							name: 'posProfile',
							value: JSON.stringify(loginResponse.posProfile),
						},
						{ name: 'xDevice', value: JSON.stringify('WEB') },
						{
							name: 'dataStorage',
							value: JSON.stringify({
								businessDay: businessDayResponse.data,
								roleSetups,
								queueGroups,
							}),
						},
					],
				},
			],
		},
		{ spaces: 2 },
	);
});
