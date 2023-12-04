<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue';
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
</template>

<style scoped>
</style>
