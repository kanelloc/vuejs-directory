import { mountSuspended } from '@nuxt/test-utils/runtime';
import { AppHeader } from '#components';
import { describe, expect, it } from 'vitest';

describe('AppHeader', async () => {
  it('Should render the App header title correctly', async () => {
    const component = await mountSuspended(AppHeader);
    const headerTitle = component.get('[data-ci="header-title"]');
    expect(headerTitle.text()).toBe('Vue js Directory');
  });

  it('Should render the App header buttons correctly', async () => {
    const component = await mountSuspended(AppHeader);
    const headerTitle = component.get('[data-ci="header-buttons"]');
    const buttons = headerTitle.findAllComponents('button');

    const anchor = headerTitle.find('[data-ci="header-github"]');
    expect(buttons.length).toBe(2);
    expect(anchor.attributes('href')).toBe('https://github.com/kanelloc/vuejs-directory');
  });
});
