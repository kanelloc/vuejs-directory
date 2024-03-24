<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: 'Vue.js Directory',
    meta: [{ name: 'Vue.js Directory', content: 'Vue.js libraries directory' }],
  });
</script>
