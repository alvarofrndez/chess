import { defineStore } from 'pinia'
import { ref } from 'vue'

export const toastStore = defineStore('toast', () => {

    let text = ref('dasdas')
    let icon = ref('')
    let showing = ref(false)

    function show(text_, icon_){
        text.value = text_
        icon.value = icon_
        showing.value = true

        setTimeout(() => {
            showing.value = false
        },[3000])
    }
    
    return{text, icon, showing, show}
})