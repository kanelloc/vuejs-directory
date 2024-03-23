<template>
  <div class="search-section">
    <UInput
      v-model="searchQuery"
      size="xl"
      name="q"
      placeholder="Search libraries..."
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          v-show="searchQuery"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="searchQuery = null"
        />
      </template>
    </UInput>
  </div>
</template>
<script setup lang="ts">
  import { useLibrariesStore } from '~/store/libraries';

  const librariesStore = useLibrariesStore();
  const { searchQuery } = storeToRefs(librariesStore);
</script>

<style lang="scss" scoped>
  $module: 'search-section';
  .#{$module} {
    padding-top: 2em;
    &__input {
      width: 100%;
    }
  }
</style>
