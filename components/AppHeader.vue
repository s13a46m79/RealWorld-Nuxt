<template>
  <div class="w-full h-14">
    <div class="h-full flex items-center justify-between px-40">
      <h1 class="font-bold text-[#5cb85c] text-2xl">conduit</h1>
      <div class="flex gap-5">
        <client-only>
          <button @click="navigateTo('/')" :class="active === 'Home' ? 'text-black' : 'text-gray-400'">Home</button>
          <button v-show="username === ''" @click="navigateTo('/signin')" :class="active === 'SignIn' ? 'text-black' : 'text-gray-400'">Sign In</button>
          <button v-show="username === ''" @click="navigateTo('/signup')" :class="active === 'SignUp' ? 'text-black' : 'text-gray-400'">Sign Up</button>
          <HoverCardRoot v-model:open="hoverState">
            <HoverCardTrigger rel="noreferrer noopener">
              <p v-show="username">{{ username }}</p>
            </HoverCardTrigger>
            <HoverCardPortal>
              <HoverCardContent 
              class="bg-white p-3 rounded shadow-lg flex flex-col items-center gap-1
                    data-[side=bottom]:animate-slideUpAndFade
              ">
                <div>Profile</div>
                <button @click="logout" class="px-3 text-white rounded bg-red-500 hover:bg-red-800 active:ring ring-red-800">Logout</button>
              </HoverCardContent>
            </HoverCardPortal>
          </HoverCardRoot>
        </client-only>
      </div>
    </div>  
  </div>
</template>

<script setup lang="ts">
import { jwtDecode } from "jwt-decode"
import { useStorage } from '@vueuse/core'
import { HoverCardContent, HoverCardRoot, HoverCardPortal, HoverCardTrigger  } from "radix-vue";

const token = useStorage("token", null)
const username = ref("")
const hoverState = ref(false)
const route = useRoute()

watchEffect(() => {
  if(token.value) {
    const decoded: {username: string} = jwtDecode(token.value)
    username.value = decoded.username
  }
})

const active = ref("Home")

const logout = () => {
  localStorage.setItem("token", "")
  token.value = null
  username.value = ""
  console.log(token.value)
  navigateTo("/signin")
}

watchEffect(() => {
  if(route.path === "/") {
    active.value = "Home"
  } else if(route.path === "/signin") {
    active.value = "SignIn"
  } else if(route.path === "/signup") {
    active.value = "SignUp"
  }
})

</script>