<script setup>
    import { defineProps, ref } from 'vue'

    const { capture } = defineProps(['capture'])
    let piece = ref('')

    function setMove(){
        setPieceImage()
    }

    function setPieceImage(){
        if(capture.type == '-1')
            switch(capture.value){
                case 1:
                    piece.value = '/src/assets/images/peon-blanco.png'
                    break

                case 2:
                    piece.value = '/src/assets/images/alfil-blanco.png'
                    break

                case 3:
                    piece.value = '/src/assets/images/caballo-blanco.png'
                    break

                case 4:
                    piece.value = '/src/assets/images/torre-blanca.png'
                    break

                case 5:
                    piece.value = '/src/assets/images/reina-blanca.png'
                    break

                case 6:
                    piece.value = '/src/assets/images/rey-blanco.png'
                    break
            }
        else
            switch(capture.value){
                case 1:
                    piece.value = '/src/assets/images/peon-negro.png'
                    break

                case 2:
                    piece.value = '/src/assets/images/alfil-negro.png'
                    break

                case 3:
                    piece.value = '/src/assets/images/caballo-negro.png'
                    break

                case 4:
                    piece.value = '/src/assets/images/torre-negra.png'
                    break

                case 5:
                    piece.value = '/src/assets/images/reina-negra.png'
                    break

                case 6:
                    piece.value = '/src/assets/images/rey-negro.png'
                    break
            }
    }

    setMove()
</script>

<template>
    <li>
        <img :src='piece' alt='pieza de ajedrez'>
    </li>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    li{
        img{
            width: 20px;
            height: 20px;
        }
    }
</style>