import { mountSuspended } from '@nuxt/test-utils/runtime';
import { LibraryListItem } from '#components';
import { describe, expect, it } from 'vitest';
import { LIBRARIES_MOCKS } from '~/mocks/libraries';

describe('Libraries list item', async () => {
  it('Should render the library item name and description', async () => {
    const component = await mountSuspended(LibraryListItem, { props: { library: LIBRARIES_MOCKS[0] } });
    const gh = component.find('[data-ci="list-item-gh"]');
    const description = component.find('[data-ci="list-item-description"]');
    // const stars = component.find('[data-ci="list-item-stars"]');
    expect(gh.text()).toBe(LIBRARIES_MOCKS[0].fullName);
    expect(description.text()).toBe(LIBRARIES_MOCKS[0].description);
  });

  it('Should render the library item buttons', async () => {
    const component = await mountSuspended(LibraryListItem, { props: { library: LIBRARIES_MOCKS[0] } });
    const stars = component.find('[data-ci="list-item-stars"]');
    const issues = component.find('[data-ci="list-item-issues"]');
    const forks = component.find('[data-ci="list-item-forks"]');
    const downloads = component.find('[data-ci="list-item-downloads"]');
    expect(stars.text()).toBe(`${LIBRARIES_MOCKS[0].starsCount}`);
    expect(issues.text()).toBe(`${LIBRARIES_MOCKS[0].openIssuesCount}`);
    expect(forks.text()).toBe(`${LIBRARIES_MOCKS[0].forks}`);
    expect(downloads.text()).toBe(`${LIBRARIES_MOCKS[0].downloads}`);
  });
});
