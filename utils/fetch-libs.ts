import type { FormattedLibrary } from '~/types/libraries';
import data from '../data/vuejs-libraries-cached.json';

export const fetchLibs = (): FormattedLibrary[] => {
  return data as FormattedLibrary[];
};
