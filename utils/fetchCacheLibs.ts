import type { FormattedLibrary } from '~/types/libraries';
import path from 'node:path';
import jsonfile from 'jsonfile';

const CACHED_LIBRARIES_RESULTS = path.join('data', 'vuejs-libraries-cached.json');

/**
 * Fetches libraries from cache if it exists, otherwise fetches data from the web and caches the result
 */
export const fetchLibs = async (): Promise<FormattedLibrary[]> => {
  console.warn('Fetching libraries from cache');
  const libraries = await getLibrariesFromCache();
  console.warn('Fetched libraries from cache', libraries);
  return libraries;
};

const getLibrariesFromCache = async (): Promise<FormattedLibrary[]> => {
  return jsonfile.readFile(CACHED_LIBRARIES_RESULTS);
};
