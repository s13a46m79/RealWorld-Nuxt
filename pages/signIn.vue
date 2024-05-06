<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="text-center">
      <h1 class="text-4xl mt-5">Sign In</h1>
    </div>
    <ClientOnly>
      <Vueform 
        :loading="isLoading" 
        :endpoint="submit" 
        :disabled="data?.code === 200"
        size="lg" 
        class="w-full px-96 mt-5"
      >
        <StaticElement
          v-if="data?.code"
          name="success_message"
          :content="data?.body.message"
          tag="p"
          :class="(data?.code === 200 ? 'bg-[#5cb85c]' : 'bg-red-500') + ' text-white rounded p-3 text-center'"
        />
        <TextElement rules="required|email" name="email" placeholder="Email" />
        <TextElement input-type="password" rules="required" name="password" placeholder="Password" />
        <ButtonElement class="text-end" rules="required" name="submit" submits>
          Submit
        </ButtonElement>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { jwtDecode } from "jwt-decode"
const isLoading = ref(false)
const data = ref()

const submit = async (_FormData: any, form$: { data: any; }) => {
  isLoading.value = true
  await useFetch('/api/auth/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: form$.data,
  }).then((res) => {
    if(res.data.value) {
      if (res.data.value.token !== null) {
        localStorage.setItem('token', res.data.value.token)
        const decoded: {id: string} = jwtDecode(res.data.value.token)
        localStorage.setItem('userId', decoded.id)
      }
      data.value = res.data.value
      if(res.data.value.code === 200) {
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      }
    }
  }).finally(() => {
    isLoading.value = false
  })
}
</script>