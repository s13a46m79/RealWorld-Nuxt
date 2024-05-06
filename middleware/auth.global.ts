export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return

  if(to.path == '/signin') return
  if(to.path == '/signup') return
  
  const code = await useFetch('/api/auth/me', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('token')
    })
  }).then((res) => {
    return res.data.value?.code
  })

  if(code == 200) {
    return
  } else {
    localStorage.removeItem('token')
    return navigateTo('/signin')
  }

})