import type { FormattedLibrary } from '~/types/libraries';
import data from '../data/data.json';
import libraries from '../vuejs-libraries.json';
import { cacheAndGetLibraries, getPrefetchedLibraries } from '~/scripts/update-libraries';

export const fetchLibs = async (): Promise<FormattedLibrary[]> => {
  const preformattedLibraries = getPrefetchedLibraries(libraries);

  await cacheAndGetLibraries(preformattedLibraries);
  return data as FormattedLibrary[];
};
