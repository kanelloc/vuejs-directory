export type LibraryStatic = {
  githubUrl: string;
  npmPackageName: string;
};

export type PreFetchedLibrary = {
  owner: string;
  libraryName: string;
  npmPackageName: string;
};

export type FormattedLibrary = GithubResponse & {
  downloads: number;
  npmPackageName: string;
};

export type GithubResponse = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  starsCount: number;
  forks: number;
  openIssuesCount: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  topics: string[];
  githubUrl: string;
};

export type NpmResponse = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};
