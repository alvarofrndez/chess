<script setup>
    import { defineProps, ref } from 'vue'

    const { move } = defineProps(['move'])
    let row = ref(0)
    let column = ref('')
    let piece = ref('')

    function setMove(){
        setPieceImage()
        setRow()
        setColumn()
    }

    function setPieceImage(){
        if(move.piece.type == '-1')
            switch(move.piece.value){
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
            switch(move.piece.value){
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

    function setRow(){
        switch(move.row){
            case 0:
                row.value = 8
                break

            case 1:
                row.value = 7
                break

            case 2:
                row.value = 6
                break

            case 3:
                row.value = 5
                break

            case 4:
                row.value = 4
                break

            case 5:
                row.value = 3
                break

            case 6:
                row.value = 2
                break

            case 7:
                row.value = 1
                break
        }
    }

    function setColumn(){
        switch(move.column){
            case 0:
                column.value = 'a'
                break

            case 1:
                column.value = 'b'
                break

            case 2:
                column.value = 'c'
                break

            case 3:
                column.value = 'd'
                break

            case 4:
                column.value = 'e'
                break

            case 5:
                column.value = 'f'
                break

            case 6:
                column.value = 'g'
                break

            case 7:
                column.value = 'h'
                break
        }
    }

    setMove()
</script>

<template>
    <li>
        <img :src='piece' alt='pieza de ajedrez'>
        <span>{{ row }}</span>
        <span>{{ column }}</span>
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