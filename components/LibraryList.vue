<template>
  <div class="flex flex-wrap">
    <div
      v-for="library in libraries"
      :key="library.githubUrl"
      class="w-full lg:w-1/2 p-2"
    >
      <LibraryListItem :library="library" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { FormattedLibrary } from '~/types/libraries';

  type Props = {
    libraries: FormattedLibrary[];
    isLoading: boolean;
  };

  defineProps<Props>();
</script>
