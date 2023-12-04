<script setup>
import { RouterLink } from 'vue-router';
import { socketStore } from '@/stores/socket.js'

const sk = socketStore()
</script>

<template>
    <header>
        <!-- <img alt='Vue logo' class='logo' src='@/assets/logo.svg' width='125' height='125' /> -->
        <div class='wrapper'>
            <nav>
                <RouterLink to='/'>Home</RouterLink>
                <RouterLink to='/about'>About</RouterLink>
            </nav>
            <div class='online'>
                <label>online {{ sk.online }}</label>
            </div>
        </div>
    </header>
</template>

<style scoped>
</style>