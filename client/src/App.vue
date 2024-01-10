<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import { socketStore } from '@/stores/socket.js'
import { loaderStore } from '@/stores/loader.js'
import { toastStore } from '@/stores/toast.js'

const sk = socketStore()
const loader = loaderStore()
const toast = toastStore()

function connetToServer(){
  sk.initSocket()
}

connetToServer()
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <RouterView />
  <FooterComponent></FooterComponent>
  <LoaderComponent v-if='loader.loading'/>
  <ToastComponent v-if='toast.showing'/>
</template>

<style lang='scss'>
  @import '@/assets/style.scss';
</style>
