<script setup>
    import { ref } from 'vue'

    // variables
    const webs_images = [
        {
            img: 'podium-chess.jpg',
            alt: 'proyecto 1'
        },
        {
            img: 'tournament-chess.jpg',
            alt: 'proyecto 2'
        },
        {
            img: 'ia-chess.jpg',
            alt: 'proyecto 3'
        },
    ]

    let index = ref(0)
    let interval = undefined
    let is_hovering = ref(false)


    function startCarrusel(){
        /**
         * Inicia el carrusel
         */
        interval = createInterval()
    }

    function createInterval(){
        /**
         * Crea un intervalo para el carrusel
         */
        return setInterval(() => {
            outRangePositive()
        }, 2500)
    }

    function increaseIndex(){
        /**
         * incrementa el indice en 1
         */
        clearInterval(interval)
        outRangePositive()
        interval = createInterval()
    }

    function decreaseIndex(){
        /**
         * decrementa el indice en 1
         */
        clearInterval(interval)
        outRangeNegative()
        interval = createInterval()
    }

    function outRangePositive(){
        /**
         * Commprueba si al incrementar se sale de los rangos el índice
         */
        if(index.value == 2)
            index.value = 0
        else
            index.value += 1
    }

    function outRangeNegative(){
        /**
         * Commprueba si al decrementar se sale de los rangos el índice
         */
        if(index.value == 2)
            index.value = 0
        else
            index.value += 1
    }

    function handleMouseEnter(){
        is_hovering.value = true
    }

    function handleMouseLeave(){
        is_hovering.value = false
    }

    startCarrusel()
</script>

<template>
    <div class='container' :onmouseenter="handleMouseEnter" :onmouseleave="handleMouseLeave">
        <a href='https://alvarofrndez.dev' target='_blank' class='wrapper'>
            <img :src="'/src/assets/images/' + webs_images[index].img" :alt='webs_images[index].value'>
        </a>
        <span class='back arrow' :onclick="decreaseIndex">&lt;</span>
        <span class='front arrow' :onclick="increaseIndex">></span>
        <div class='tempo'>
            <div v-for="(item, i) in webs_images" class='img-container' :key="i">
                <span></span>
                <span v-if="index == i" class='fill'></span>
            </div>
        </div>
        <aside v-if="is_hovering" id='information' :onmouseenter="handleMouseEnter">
            <span>
                Esta sección está dedicada a mis proyectos, 
                pulsa en ella para verlos o miralós en 
                <a href='https://alvarofrndez.dev' target='_blank'>alvarofrndez.dev</a> 
                o en mi github 
                <a href='https://github.com/alvarofrndez' target='_blank'>github.com/alvarofrndez</a>
            </span>
        </aside>
    </div>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .container{
        // size
        width: 100%;
        height: 100%;

        // position
        position: relative;
        
        // display
        @include flex(row, center, space-between);

        animation: appear 1s forwards;

        @keyframes appear {
            from{
                transform: scale(0);
            }to{
                transform: scale(1);
                z-index: 20;
            }
        }

        .wrapper{
            // size
            width: 100%;
            height: 100%;

            // display
            @include flex();

            // decoration
            overflow: hidden;
            border-radius: 25px;

            img{
                // size
                width: 100%;
                height: 100%;

                // decoration
                object-fit: cover;
                filter: grayscale(100%);
            }
        }

        .arrow{
            // size
            width: 30px;
            height: 30px;

            // position
            position: absolute;

            // display
            @include flex();

            // margin
            background-color: $h-c-white;

            // decoration
            border-radius: 50%;
            cursor: pointer;
        }

        .back{
            left: 2.5rem;
        }

        .front{
            right: 2.5rem;
        }

        .tempo{
            // position
            position: absolute;

            bottom: 1rem;
            left: 50%;

            // display
            @include flex(row, center, space-between, .5rem);

            // decoration
            transform: translateX(-50%);

            .img-container{
                // size
                width: 30px;
                height: 5px;

                // position
                position: relative;

                // display

                span{
                    // size
                    width: 100%;
                    height: 100%;

                    // position
                    position: absolute;

                    // decoration
                    border-radius: 5px;
                    background-color: $h-c-white;
                }

                .fill{
                    background-color: black;

                    animation: fill 2.5s linear;

                    @keyframes fill {
                        from{
                            width: 0;
                        }
                    }
                }
            }
        }

        #information{
            // size
            height: 100%;

            // position
            position: absolute;
            left: 50%;

            // display
            @include flex();

            // margin
            padding: 1rem;

            // decoration
            background-color: $h-c-black;
            border-radius: 25px 25px 0 0;
            transform: translateX(-50%) translateY(-90.5%);

            span{
                color: $h-c-gray !important;
                a{
                    color: $h-c-white-light !important;
                }
            }
        }
    }
</style>