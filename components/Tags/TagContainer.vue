<template>
  <div class="w-full h-40 bg-gray-100 p-3 rounded">
    <p>Popular Tags</p>
    <div>
      <Tag />
    </div>
  </div>
</template>
<script setup lang="ts">
import Tag from '~/components/Tags/Tag.vue';
</script>