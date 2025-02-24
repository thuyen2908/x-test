import { defineParameterType } from 'playwright-bdd';

import { PageId } from '#const';

const pageIds = Object.values(PageId);
defineParameterType({
	name: 'pageId',
	regexp: new RegExp(pageIds.join('|')),
	transformer: (page) => page as PageId,
});

export type TimesheetAction = 'in' | 'out';
defineParameterType({
	name: 'timesheetAction',
	regexp: /in|out/,
	transformer: (action) => action as TimesheetAction,
});
