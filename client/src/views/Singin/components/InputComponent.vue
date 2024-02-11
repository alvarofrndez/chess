<script setup>
    const {value, type, error} = defineProps(['value', 'type', 'error'])
    const emits = defineEmits(['update:value'])
    
    function toCapitalLetter(data){
        /**
         * Convierte una cadena a capital letter
         */
        return data.charAt(0).toUpperCase() + data.slice(1)
    }

    function updateValue(new_value) {
        /**
         * Emite un evento para cambiar el valor del input en el padre
         */
        emits('update:value', new_value)
    }
</script>

<template>
    <div :class="'inputs-container-' + type">
        <div class='data-container'>
            <label :for='username'>{{toCapitalLetter(type)}}</label>
            <input :type="type == 'password' ? type : 'text'" :name='type' :id='type' :value='value' @input="(event) =>updateValue(event.target.value)">
        </div>
        <div :onclick='() => error.error = false' v-if='error.error' class='error-container'>
            <img src='src/assets/images/error.svg'/>
            <span class='error'>{{ error.message }}</span>
        </div>
    </div>
</template>

<style scoped lang='scss'>
    
</style>