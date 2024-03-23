<template>
  <div>
    <AppHeader />
    <UContainer class="main">
      <SearchSection />
      <SearchFilters
        :libraries-count="librariesCount"
        :page-number="pageNumber"
        :total-pages="totalPages"
      />
      <LibraryList
        :libraries="libraries"
        :is-loading="isLoading"
      />
    </UContainer>
  </div>
</template>
<script setup lang="ts">
  import SearchFilters from '~/components/SearchFilters.vue';
  import { useLibrariesStore } from '~/store/libraries';
  import { storeToRefs } from 'pinia';
  import debounce from 'lodash.debounce';

  const librariesStore = useLibrariesStore();
  const { libraries, librariesCount, searchQuery, pageNumber, totalPages, isLoading } = storeToRefs(librariesStore);
  await callOnce(librariesStore.loadLibraries);

  watch(
    [searchQuery, pageNumber],
    debounce(async () => {
      await librariesStore.loadLibraries();
    }, 500),
  );
</script>

<style lang="scss" scoped>
  $module: 'main';
  .#{$module} {
    padding: 16px 32px;
  }
</style>
