<script setup>
  import { socketStore } from '@/stores/socket.js'

  // stores
  const sk_s = socketStore()


</script>

<template>
  <main>
    <RouterLink to='/play'>Empieza a jugar</RouterLink>
    <div class='online'>
      <label>online {{ sk_s.online }}</label>
    </div>
  </main>
</template>


<style scoped>
  main{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>