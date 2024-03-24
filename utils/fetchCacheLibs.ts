import type {
  FormattedLibrary,
  GithubResponse,
  LibraryStatic,
  NpmResponse,
  PreFetchedLibrary,
} from '~/types/libraries';
import path from 'node:path';
import * as fs from 'fs';
import jsonfile from 'jsonfile';

const CACHED_LIBRARIES_RESULTS = path.join('data', 'vuejs-libraries-cached.json');

/**
 * Fetches libraries from cache if it exists, otherwise fetches data from the web and caches the result
 */
export const fetchLibs = async (libraries: LibraryStatic[]): Promise<FormattedLibrary[]> => {
  const preformattedLibraries = getPrefetchedLibraries(libraries);
  const cacheExists = await fileExists(CACHED_LIBRARIES_RESULTS);
  console.warn('cacheExists', cacheExists);
  return cacheExists ? await getLibrariesFromCache() : await cacheAndGetLibraries(preformattedLibraries);
};

const splitGithubURL = (url: string) => {
  const parts = url.split('/');
  const owner = parts[3];
  const libraryName = parts[4];
  return { owner, libraryName };
};

const getPrefetchedLibraries = (libraries: LibraryStatic[]): PreFetchedLibrary[] => {
  return libraries.map(lib => {
    return { ...splitGithubURL(lib.githubUrl), npmPackageName: lib.npmPackageName };
  });
};

const cacheAndGetLibraries = async (prefetchedLibraries: PreFetchedLibrary[]) => {
  const results = await Promise.all(
    prefetchedLibraries.map(async lib => {
      return fetchExtraData(lib.owner, lib.libraryName, lib.npmPackageName);
    }),
  );
  await jsonfile.writeFile(CACHED_LIBRARIES_RESULTS, results);
  return results;
};

const getLibrariesFromCache = async (): Promise<FormattedLibrary[]> => {
  return jsonfile.readFile(CACHED_LIBRARIES_RESULTS);
};

const fileExists = async (filePath: string) => {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const fetchExtraData = async (
  owner: string,
  libraryName: string,
  npmPackageName: string,
): Promise<FormattedLibrary> => {
  const [githubData, npmData] = await Promise.all([fetchGithubData(owner, libraryName), fetchNPMData(npmPackageName)]);
  return {
    ...githubData,
    downloads: npmData.downloads,
    npmPackageName,
  };
};

const fetchGithubData = async (owner: string, libraryName: string): Promise<GithubResponse> => {
  const response: any = await $fetch(`https://api.github.com/repos/${owner}/${libraryName}`);
  return {
    id: response.id,
    name: response.name,
    fullName: response.full_name,
    description: response.description,
    starsCount: response.stargazers_count,
    forks: response.forks,
    openIssuesCount: response.open_issues_count,
    license: response.license,
    topics: response.topics,
    githubUrl: response.html_url,
  };
};

export const fetchNPMData = async (libraryName: string): Promise<NpmResponse> => {
  const response: any = await $fetch(`https://api.npmjs.org/downloads/point/last-week/${libraryName}`);
  return {
    downloads: response.downloads,
    start: response.start,
    end: response.end,
    package: response.package,
  };
};
