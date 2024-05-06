<template>
  <div class="w-full border-b pb-4 mt-3">
    <!-- Header -->
    <div class="flex justify-between">
      <div class="flex gap-3">
        <AvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarImage 
          src="https://i.pravatar.cc/100"
          alt="User Avatar"
        />
        <AvatarFallback
          class="h-full w-full bg-green-500 flex items-center justify-center text-white"
          :delay-ms="600">
          DF
        </AvatarFallback>
        </AvatarRoot>
        <div>
          <p class="text-[#5cb85c]">{{ prop.data.author.name }}</p>
          <p class="text-gray-400 text-xs">{{ prop.data.createdAt }}</p>
        </div>
      </div>
      <button 
        class="flex h-fit border border-[#5cb85c] text-sm px-2 justify-center items-center gap-1 text-[#5cb85c] rounded group hover:bg-[#5cb85c]"
        :class="{'bg-[#5cb85c] text-white': isLike}"
        @click="likeClick"  
      >
        <Icon name="uil:heart" class="text-[#5cb85c] group-hover:text-white" :class="{'text-white': isLike}"/>
        <p class="group-hover:text-white">{{ like }}</p>
      </button>
    </div>

    <!-- Body -->
    <div class="mt-5">
      <div class="font-bold text-lg">
        {{ prop.data.title }}
      </div>
      <div class="text-gray-400 text-md font-light">
        {{ prop.data.content }}
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 flex justify-between">
      <button class="text-gray-400 text-xs">Read more...</button>
      <button class="flex wrap gap-2">
        <div class="px-2 border rounded-lg text-gray-400 text-xs" v-for="tag in prop.data.tags">{{ tag }}</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import { Prisma } from '@prisma/client';

const FeedwithUser = Prisma.validator<Prisma.FeedDefaultArgs>()({
  include: {
    author: true,
  }
})
type FeedType = Prisma.FeedGetPayload<typeof FeedwithUser>

const prop = defineProps<{
  data: FeedType
}>()

const like = ref()
const isLike = ref(false)
const feedId = ref(prop.data.id)


// Get Like Count
fetch(`/api/feed/${feedId.value}/like`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `${localStorage.getItem('token')}`
  }
}).then((res) => {
  return res.json()
}).then((res) => {
  isLike.value = res.body.data.isLike
  like.value = res.body.data.count
})

const setLike = () => {
  $fetch(`/api/feed/${feedId}/like`, {
    method: 'POST',
    body: {
      feedId: feedId.value,
      userId: localStorage.getItem('userId')
    }
  }).then((res) => {
    if(res.code == 200) {
      like.value += 1
      isLike.value = true
    }      
  }).catch((err) => {
    console.log(err)
  })
}

const unsetLike = () => {
  $fetch(`/api/feed/${feedId}/like`, {
    method: 'DELETE',
    body: {
      feedId: feedId.value,
      userId: localStorage.getItem('userId')
    }
  }).then((res) => {
    if(res.code == 200) {
      like.value -= 1
      isLike.value = false
    }      
  }).catch((err) => {
    console.log(err)
  })
}

const likeClick = () => {
  if(isLike.value) 
    unsetLike()
  else
    setLike()
}


</script>