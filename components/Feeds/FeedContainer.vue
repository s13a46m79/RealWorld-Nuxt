<template>
  <ClientOnly>
    <TabsRoot class="flex flex-col w-full" default-value="global">
      <TabsList class="relative shrink-0 flex border-b border-mauve6">
        <TabsIndicator class="absolute px-8 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300">
          <div class="bg-green-500 w-full h-full" />
        </TabsIndicator>
        <TabsTrigger
          class="bg-white px-5 h-[45px] w-80 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none  rounded-tl-md  hover:text-[#5cb85c] data-[state=active]:text-[#5cb85c] outline-none cursor-default"
          value="global"
        >
          Global Feed
        </TabsTrigger>
      </TabsList>
      <TabsContent
        class="grow p-5 bg-white rounded-b-md outline-none"
        value="global"
      >
        <Feed v-for="feed in feeds" :data="JSON.parse(JSON.stringify(feed))"/>
      </TabsContent>
    </TabsRoot>
    <PaginationRoot :total="feedsCount" :items-per-page="5" :sibling-count="2" show-edges :default-page="1" v-model:page="currentPage">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1 text-[#5cb85c]">
        <PaginationFirst class="w-9 h-9  flex items-center justify-center  disabled:opacity-50  focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded">
          <Icon name="radix-icons:double-arrow-left" />
        </PaginationFirst>
        <PaginationPrev class="w-9 h-9  flex items-center justify-center mr-4  disabled:opacity-50  focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded">
          <Icon name="radix-icons:chevron-left" />
        </PaginationPrev>
        <template v-for="(page, index) in items">
          <PaginationListItem v-if="page.type === 'page'" :key="index" class="w-9 h-9 border rounded  data-[selected]:bg-[#5cb85c] data-[selected]:text-white hover:bg-white/10 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1" :value="page.value">
            {{ page.value }}
          </PaginationListItem>
          <PaginationEllipsis v-else :key="page.type" :index="index" class="w-9 h-9 flex items-center justify-center">
            &#8230;
          </PaginationEllipsis>
        </template>
        <PaginationNext class="w-9 h-9  flex items-center justify-center  ml-4 disabled:opacity-50  focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded">
          <Icon name="radix-icons:chevron-right" />
        </PaginationNext>
        <PaginationLast class="w-9 h-9  flex items-center justify-center disabled:opacity-50  focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded">
          <Icon name="radix-icons:double-arrow-right" />
        </PaginationLast>
      </PaginationList>
    </PaginationRoot>
  </ClientOnly>
</template>

<script setup lang="ts">
import Feed from '~/components/Feeds/Feed.vue';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger,
  PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, 
  PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot
 } from 'radix-vue';
import { Prisma } from '@prisma/client';

const currentPage = ref(1);
const feeds = ref<Prisma.$FeedPayload[] | null>();
const feedsCount = ref();

Promise.all([
  useFetch(`/api/feed?page=${currentPage.value}`, { method: 'GET' }),
  useFetch(`/api/feed/count`, { method: 'GET' })
]).then(([feedRes, countRes]) => {
  if(feedRes.data.value?.code !== 200) 
    throw new Error('Failed to fetch data')

  if (countRes.data.value?.code !== 200)
    throw new Error('Failed to fetch feed count');

  feeds.value = feedRes.data.value?.body.data as Prisma.$FeedPayload[];
  feedsCount.value = countRes.data.value?.body.data;
})

watch(currentPage, () => {
  $fetch(`/api/feed?page=${currentPage.value}`, { method: 'GET' }).then((res) => {
    if(res.code !== 200) 
      throw new Error('Failed to fetch data')

    feeds.value = res.body.data as Prisma.$FeedPayload[];
  })
})

</script>