<script setup>
  import { RouterView } from 'vue-router'
  import router from '@/router'
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import ToastComponent from '@/components/ToastComponent.vue';
  import { socketStore } from '@/stores/socket.js'
  import { loaderStore } from '@/stores/loader.js'
  import { toastStore } from '@/stores/toast.js'
  import { headerStore } from '@/stores/header.js'
  import { userStore } from '@/stores/user.js'

  const sk_s = socketStore()
  const loader_s = loaderStore()
  const toast_s = toastStore()
  const header_s = headerStore()
  const user_s = userStore()

  // functions
  async function isLoggued(){
    const result = await user_s.isLoggued()

    if(!result)
      router.push('/login')
    else if(result === null)
      toast_s.show('No se ha podido inicar sesión', 'error')
  }

  function connetToServer(){
    sk_s.initSocket()
  }

  isLoggued()
  connetToServer()
</script>

<template>
  <HeaderComponent v-if='!header_s.in_auth'/>
  <RouterView />
  <FooterComponent v-if='!header_s.in_auth'/>
  <LoaderComponent v-if='loader_s.loading'/>
  <ToastComponent v-if='toast_s.showing'/>
</template>

<style lang='scss'>
  @import '@/assets/style.scss';
</style>
