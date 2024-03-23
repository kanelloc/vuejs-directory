import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchNPMData } from '~/utils/fetchCacheLibs';
import { LIBRARIES_MOCKS } from '~/mocks/libraries';

// Mocking $fetch globally
//@ts-ignore
global.$fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Fetch cache libs', async () => {
  it('Should fetch the correct number of downloads', async () => {
    const mockResponse = {
      downloads: 1200,
      start: '2024-01-01',
      end: '2024-01-07',
      package: 'your-package',
    };

    //@ts-ignore
    global.$fetch.mockResolvedValue(mockResponse);
    const response = await fetchNPMData(LIBRARIES_MOCKS[0].npmPackageName);
    expect(response).to.deep.equal(mockResponse);
  });
});
