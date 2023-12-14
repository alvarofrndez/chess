<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { socketStore } from '@/stores/socket.js'

const sk = socketStore()

function connetToServer(){
  sk.initSocket()
}

connetToServer()
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <RouterView />
  <FooterComponent></FooterComponent>
</template>

<style lang='scss'>
  @import '@/assets/style.scss';
</style>
