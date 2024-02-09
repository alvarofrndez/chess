import { defineStore } from 'pinia'

export const globalStore = defineStore('global', () => {
    // const url = 'http://localhost:3080/api'
    const API_URL = 'http://localhost:3080/api/';

  
    return { API_URL }
})