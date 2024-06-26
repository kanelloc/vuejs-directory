import jsonfile from 'jsonfile';
import path from 'node:path';
import { createRequire } from 'node:module';

const libraries = createRequire(import.meta.url)(`../vuejs-libraries.json`);

const CACHED_LIBRARIES_RESULTS = path.join('data', 'data.json');

const fetchGithubData = async (owner, libraryName) => {
  const data = await fetch(`https://api.github.com/repos/${owner}/${libraryName}`);
  const response = await data.json();
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

export const fetchNPMData = async libraryName => {
  const [downloadsResponse, registryResponse] = await Promise.all([
    fetch(`https://api.npmjs.org/downloads/point/last-week/${libraryName}`),
    fetch(`https://registry.npmjs.org/${libraryName}`),
  ]);

  const [registryData, downloadsData] = await Promise.all([registryResponse.json(), downloadsResponse.json()]);
  return {
    modified: registryData.time.modified,
    downloads: downloadsData.downloads,
    start: downloadsData.start,
    end: downloadsData.end,
    package: downloadsData.package,
  };
};

const fetchExtraData = async (owner, libraryName, npmPackageName) => {
  const [githubData, npmData] = await Promise.all([fetchGithubData(owner, libraryName), fetchNPMData(npmPackageName)]);
  return {
    ...githubData,
    downloads: npmData.downloads,
    modified: npmData.modified,
    npmPackageName,
  };
};

const cacheAndGetLibraries = async prefetchedLibraries => {
  const results = await Promise.all(
    prefetchedLibraries.map(async lib => {
      return fetchExtraData(lib.owner, lib.libraryName, lib.npmPackageName);
    }),
  );
  await jsonfile.writeFile(CACHED_LIBRARIES_RESULTS, results);
  return results;
};

const getPrefetchedLibraries = libraries => {
  return libraries.map(lib => {
    return { ...splitGithubURL(lib.githubUrl), npmPackageName: lib.npmPackageName };
  });
};

const splitGithubURL = url => {
  const parts = url.split('/');
  const owner = parts[3];
  const libraryName = parts[4];
  return { owner, libraryName };
};

const preformattedLibraries = getPrefetchedLibraries(libraries);

cacheAndGetLibraries(preformattedLibraries);
