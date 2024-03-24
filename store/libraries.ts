import type { FormattedLibrary } from '~/types/libraries';

type State = {
  libraries: FormattedLibrary[];
  librariesCount: number;
  searchQuery: string | null;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
};

export const useLibrariesStore = defineStore('librariesStore', {
  state: (): State => ({
    libraries: [],
    librariesCount: 0,
    searchQuery: null,
    pageNumber: 1,
    totalPages: 0,
    pageSize: 20,
    isLoading: false,
  }),
  actions: {
    async loadLibraries() {
      try {
        this.isLoading = false;
        const response = await $fetch('/api/libraries', {
          query: { search: this.searchQuery, pageNumber: this.pageNumber, pageSize: this.pageSize },
        });
        console.warn('MPAMPIS', response);

        this.libraries = response.libraries;
        this.librariesCount = response.librariesCount;
        this.totalPages = Math.ceil(this.librariesCount / this.pageSize);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    setPageNumber(pageNumber: number) {
      this.pageNumber = pageNumber;
    },
  },
});
