import type { EnumRuleConfig, UserConfig } from '@commitlint/types';
import { findWorkspaces } from 'find-workspaces';

const getScopes: EnumRuleConfig<string[]> = () => {
	const workspaces = findWorkspaces(process.cwd()) ?? [];

	const scopes = workspaces
		.map((workspace) => workspace.package.name.split('/').pop())
		.filter((scope) => scope != null);

	return [2, 'always', scopes];
};

export default {
	utils: { getScopes },
	rules: {
		'scope-enum': getScopes,
	},
} satisfies UserConfig;
