<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="text-center">
      <h1 class="text-4xl mt-5">Sign up</h1>
      <div class="mt-3 text-[#5cb85c]"><a href="/signin">Have an account?</a></div>
    </div>
    <ClientOnly>
      <Vueform 
        :loading="isLoading" 
        :endpoint="submit" 
        :disabled="data?.code === 201"
        size="lg" 
        class="w-full px-96 mt-5"
      >
        <StaticElement
          v-if="data?.code"
          name="success_message"
          :content="data.body?.message"
          tag="p"
          :class="(data?.code === 201 ? 'bg-[#5cb85c]' : 'bg-red-500') + ' text-white rounded p-3 text-center'"
        />
        <TextElement rules="required" name="username" placeholder="Username" />
        <TextElement input-type="email" rules="required|email" name="email" placeholder="Email" />
        <TextElement input-type="password" rules="required" name="password" placeholder="Password" />
        <ButtonElement class="text-end" rules="required" name="submit" submits>
          Submit
        </ButtonElement>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

const isLoading = ref(false)
const data = ref()

const submit = async (_FormData: any, form$: { data: any; }) => {
  isLoading.value = true
  data.value = await useFetch('/api/auth/register', {
    method: "POST",
    body: form$.data
  }).then((res) => {
    return res.data
  }).then(res => {
    isLoading.value = false
    console.log("Res: ", res.value)
    return res.value
  })

  if(data.value?.code === 201) {
    setTimeout(() => {
      navigateTo("/signin")
    }, 1000)
  }
}

</script>