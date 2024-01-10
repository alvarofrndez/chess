import { defineStore } from 'pinia'
import { ref } from 'vue'

export const loaderStore = defineStore('loader', () => {
    let loading = ref(false)
    let searching = ref(false)

    function setTrue(){
        loading.value != true ? loading.value = true : null
    }

    function setFalse(){
        loading.value != false ? loading.value = false : null
    }

    return {loading, searching, setTrue, setFalse}
})