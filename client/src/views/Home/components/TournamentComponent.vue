<script setup>
    import goToComponent from './goToComponent.vue';

</script>

<template>
    <section class='wrapper'>
        <article class='container'>
            <h3>Juega torneos y gana una cantidad mayor de puntos y premios</h3>
        </article>
        <article class='bot'>
            <div class='container'>
                <goToComponent class='go-to' path='/tournaments' name='torneos'/>
            </div>
        </article>
    </section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper{
        // display
        @include flex(column, space-between);

        // decoration
        background-image: url('/src/assets/images/tournament-chess.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        .container{
            // size
            width: calc(100% - 5rem);
            height: calc(100% - 5rem);

            // display
            @include flex(column, flex-end, center);
            align-self: flex-end;

            h3{
                // margin
                margin-right: 2.5rem !important;
                padding: .5rem !important;

                // decoration
                background-color: $h-c-white-light;
                writing-mode: vertical-rl;
                text-align: center;
                border-radius: 15px;
            }
        }

        .bot{
            // position
            bottom: 0;

            // display
            @include flex();
            .container{
                // display
                @include flex(column, flex-start, flex-end);

                .go-to{
                    background-color: $h-c-white-light;
                }
            }
        }
    }
</style>