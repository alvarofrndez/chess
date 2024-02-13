<script setup>
    import { socketStore } from '@/stores/socket.js'
    import goToComponent from './goToComponent.vue';

    // stores
    const sk_s = socketStore()
</script>

<template>
    <section class='wrapper'>
        <div class='container'>
            <article class='title'>
                <h1>Juega contra <span>{{ sk_s.online - 1}}</span></h1>
                <h1>jugadores</h1>
            </article>
            <article class='subtitle'>
                <goToComponent path='/play' name='jugar'/>
                <h3>o gana a tus amigos en partidas personalizadas</h3>
            </article>
        </div>
    </section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper{

        // display
        @include flex();

        // decoration
        background-image: url('/src/assets/images/home-chess-tablero.png');
        background-position: center;
        background-size: fill;
        background-repeat: no-repeat;
        background-color: transparent !important;
        overflow: hidden;

        .container{
            // size
            width: calc(100% - 5rem);
            height: calc(100% - 5rem);

            // display
            @include flex(column, flex-start, space-between);

            .title{

                // animation
                animation: appear 1s forwards;

                @keyframes appear {
                    from{
                        transform: translateX(-100%);
                    }
                }

                h1{
                    span{
                        // margin
                        padding: .3rem;

                        // decoration
                        font-size: $h-f-text-title !important;
                        color: $h-c-white-light !important;
                        background-color: $h-c-black;
                        border-radius: 15px;
                    }
                }
            }

            .subtitle{
                // size
                width: 100%;
                
                // display
                @include simpleGrid(flex-end, flex-end);

                // decoration
                overflow: hidden;

                // animation
                animation: appear-sub 1s forwards;

                @keyframes appear-sub {
                    from{
                        transform: translateX(100%);
                    }
                }
                .go-to{
                    background-color: $h-c-white;
                }

                h3{
                    text-align: end;
                    width: 60%;
                    transform: translateX(60%);
                }
            }
        }
    }
</style>