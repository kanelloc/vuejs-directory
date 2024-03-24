<template>
  <div
    class="sticky top-0 z-20 border-t border-transparent shadow-sm shadow-gray-200 backdrop-blur-md dark:shadow-gray-600"
  >
    <div class="flex items-center justify-between px-4 py-2 md:px-8">
      <div
        class="h-12 items-center gap-2 flex"
        data-ci="header-title"
      >
        <VueIcon />
        <h1 class="text-xl font-bold hidden md:flex">Vue js Directory</h1>
      </div>
      <div
        class="flex items-center justify-end gap-1 md:gap-2 babis"
        data-ci="header-buttons"
      >
        <UButton
          :loading="colorModeLoading"
          :icon="themeIcon"
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="toggle"
        />
        <UButton
          icon="i-ant-design-github-filled"
          size="sm"
          color="primary"
          square
          variant="solid"
        />
        <UButton
          icon="i-ant-design-plus-outlined"
          size="sm"
          color="primary"
          variant="solid"
          label="Add Library"
          :trailing="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();

  const toggle = () => {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
  };

  const themeIcon = computed(() => {
    return colorMode.preference === 'light' ? 'i-ant-design-moon-filled' : 'i-ant-design-sun-filled';
  });

  const colorModeLoading = computed(() => {
    return colorMode.preference !== 'light' && colorMode.preference !== 'dark';
  });
</script>
