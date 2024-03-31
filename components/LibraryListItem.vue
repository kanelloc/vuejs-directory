<template>
  <UCard
    class="libraries-list-item bg-white dark:bg-gray-700"
    data-ci="libraries-list-item"
  >
    <div class="lg:h-36 mb-4">
      <ULink
        class="font-extrabold text-base mb-2 hover:underline"
        data-ci="list-item-gh"
        :to="library.githubUrl"
        target="_blank"
      >
        {{ library.fullName }}
      </ULink>
      <p
        class="font-normal text-sm mt-2 mb-2"
        data-ci="list-item-description"
      >
        {{ library.description }}
      </p>
    </div>
    <div>
      <UTooltip
        v-if="library.githubUrl && library.starsCount"
        text="Go to repository page"
      >
        <UButton
          icon="i-heroicons-star-solid"
          :label="`${library.starsCount}`"
          :to="library.githubUrl"
          target="_blank"
          variant="ghost"
          color="gray"
          data-ci="list-item-stars"
        />
      </UTooltip>
      <UTooltip
        v-if="library.githubUrl && library.openIssuesCount"
        text="Go to repository issues"
      >
        <UButton
          icon="i-heroicons-wrench-screwdriver-solid"
          :label="`${library.openIssuesCount}`"
          :to="`${library.githubUrl}/issues`"
          target="_blank"
          variant="ghost"
          color="gray"
          data-ci="list-item-issues"
        />
      </UTooltip>
      <UTooltip
        v-if="library.githubUrl && library.forks"
        text="Go to repository forks"
      >
        <UButton
          icon="i-heroicons-share"
          :label="`${library.forks}`"
          :to="`${library.githubUrl}/forks`"
          target="_blank"
          variant="ghost"
          color="gray"
          data-ci="list-item-forks"
        />
      </UTooltip>

      <UTooltip
        v-if="library.downloads"
        text="Weekly downloads"
      >
        <UButton
          icon="i-heroicons-globe-alt"
          :label="library.downloads.toLocaleString()"
          :to="`https://www.npmjs.com/package/${library.npmPackageName}`"
          target="_blank"
          variant="ghost"
          color="gray"
          data-ci="list-item-downloads"
        />
      </UTooltip>
      <UTooltip
        v-if="library.modified"
        text="Latest update"
      >
        <UButton
          icon="i-heroicons-calendar-days-16-solid"
          :label="$dayjs(library.modified).fromNow()"
          :to="`https://www.npmjs.com/package/${library.npmPackageName}`"
          target="_blank"
          variant="ghost"
          color="gray"
          data-ci="list-item-downloads"
        />
      </UTooltip>
    </div>
  </UCard>
</template>

<script setup lang="ts">
  import type { FormattedLibrary } from '~/types/libraries';

  type Props = {
    library: FormattedLibrary;
  };

  defineProps<Props>();
</script>
<style lang="scss" scoped>
  $module: 'libraries-list-item';
  .#{$module} {
    margin-bottom: 1rem;
    p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
  }
</style>
