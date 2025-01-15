import { defineParameterType } from 'playwright-bdd';

import { PageId } from '#typings';

const pageIds = Object.values(PageId);

defineParameterType({
	name: 'pageId',
	regexp: new RegExp(pageIds.join('|')),
	transformer: (page) => page,
});
