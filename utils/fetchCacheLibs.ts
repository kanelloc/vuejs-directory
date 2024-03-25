import type { FormattedLibrary } from '~/types/libraries';
import data from '../data/vuejs-libraries-cached.json';

/**
 * Fetches libraries from cache if it exists, otherwise fetches data from the web and caches the result
 */
export const fetchLibs = async (): Promise<FormattedLibrary[]> => {
  return data as FormattedLibrary[];
};
