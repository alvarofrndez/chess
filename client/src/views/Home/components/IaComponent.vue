<script setup>
    import goToComponent from './goToComponent.vue';
</script>

<template>
    <section class='wrapper'>
        <article class='container'>
            <h3>La ia juega también</h3>
            <div class='container-go-to'>
                <goToComponent class='go-to' path='/tournaments' name='torneos'/>
            </div>
        </article>
    </section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper{
        // display
        @include flex();

        // decoration
        background-image: url('/src/assets/images/ia-chess.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        .container{
            width: calc(100% - 2.5rem);
            height: calc(100% - 2.5rem);

            // display
            @include flex(column, flex-end, flex-start);

            h3{
                color: $h-c-white !important;
            }

            .container-go-to{
                // size
                width: 100%;
                height: 100%;

                // display
                @include flex(column, flex-start, flex-end);

                .go-to{
                    background-color: $h-c-white;
                }
            }
        }
    }
</style>