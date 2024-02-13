<script setup>
    import goToComponent from './goToComponent.vue';

</script>

<template>
    <section class='wrapper'>
        <article class='top'>
            <div class='container'>
                <h1>Llega a lo mas alto del ranking</h1>
            </div>
        </article>
        <article class='bot'>
            <div class='container'>
                <goToComponent class='go-to' path='/ranking' name='ranking'/>
            </div>
        </article>
    </section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper{
        // position
        position: relative;

        // display
        @include flex(column);

        // decoration
        background-color: transparent !important;

        .top, .bot{
            // position
            position: absolute;

            // display
            @include flex();

            // decoration
            border-radius: 25px;

            .container{
                width: calc(100% - 5rem);
                height: calc(100% - 5rem);

                // display
                @include flex(row, flex-start);
            }
        }

        .top{
            // size
            width: 100%;
            height: 50%;

            // position
            top: 0;

            // decoration
            background-color: $h-c-white;
        }

        .bot{
            // size
            width: 100%;
            height: 60%;

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

            // decoration
            background-image: url('/src/assets/images/podium-chess.jpg');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
</style>