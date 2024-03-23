<template>
  <div class="search-filters">
    <h4 class="font-bold">{{ librariesCount }} entries</h4>
    <div class="search-filters__pagination">
      <UButton
        icon="i-ant-design-caret-left-filled"
        size="xs"
        color="primary"
        variant="solid"
        :trailing="false"
        @click="previous"
      />
      {{ pageNumber }} of {{ totalPages }}
      <UButton
        icon="i-ant-design-caret-right-filled"
        size="xs"
        color="primary"
        variant="solid"
        :trailing="false"
        @click="next"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useLibrariesStore } from '~/store/libraries';

  type Props = {
    librariesCount: number;
    pageNumber: number;
    totalPages: number;
  };
  const props = defineProps<Props>();

  const librariesStore = useLibrariesStore();
  const { setPageNumber } = librariesStore;

  const next = () => {
    setPageNumber(Math.min(props.pageNumber + 1, props.totalPages));
  };

  const previous = () => {
    setPageNumber(Math.max(props.pageNumber - 1, 1));
  };
</script>

<style lang="scss" scoped>
  $module: 'search-filters';
  .#{$module} {
    margin-top: 1em;
    margin-bottom: 2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__pagination {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
  }
</style>
