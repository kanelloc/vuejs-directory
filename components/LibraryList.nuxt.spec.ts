import { mountSuspended } from '@nuxt/test-utils/runtime';
import { LibraryList } from '#components';
import { describe, expect, it } from 'vitest';
import { LIBRARIES_MOCKS } from '~/mocks/libraries';

describe('Libraries list', async () => {
  it('Should render the libraries list correctly', async () => {
    const component = await mountSuspended(LibraryList, { props: { libraries: LIBRARIES_MOCKS, isLoading: false } });
    const libraries_list_items = component.findAllComponents('[data-ci="libraries-list-item"]');
    expect(libraries_list_items.length).toBe(LIBRARIES_MOCKS.length);
  });
});
