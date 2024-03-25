import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LIBRARIES_MOCKS } from '~/mocks/libraries';
import { fetchNPMData } from '~/scripts/update-libraries';

// Mocking $fetch globally
//@ts-ignore
global.$fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Fetch cache libs', async () => {
  it('Should fetch the correct number of downloads', async () => {
    const mockResponse = {
      downloads: 4827535,
      start: '2024-03-18',
      end: '2024-03-24',
      package: 'vue',
    };

    //@ts-ignore
    global.$fetch.mockResolvedValue(mockResponse);
    const response = await fetchNPMData(LIBRARIES_MOCKS[0].npmPackageName);
    expect(response).to.deep.equal(mockResponse);
  });
});
