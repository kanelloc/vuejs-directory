import type { FormattedLibrary } from '~/types/libraries';
import data from '../data/data.json';

export const fetchLibs = (): FormattedLibrary[] => {
  return data as FormattedLibrary[];
};
