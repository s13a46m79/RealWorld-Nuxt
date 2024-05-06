<template>
  <div>
    <AppBanner />
    <button 
      class="w-fit bg-green-500 mx-0 md:mx-32 mt-10 px-5 rounded-lg text-white hover:bg-green-600"
      @click="navigateTo('/create')"> Create Feed </button>
    <div class="flex px-0 mt-10 flex-col md:flex-row md:px-32 lg:flex-row">
      <div class="h-full w-full flex-auto mr-5">
        <FeedContainer />
      </div>
      <div class="h-96 w-full md:w-96">
        <TagContainer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeedContainer from '~/components/Feeds/FeedContainer.vue';
import TagContainer from '~/components/Tags/TagContainer.vue';
</script>
