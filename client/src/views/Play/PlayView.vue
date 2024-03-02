<script setup>
import BoardComponent from '@/components/BoardComponent.vue';
import ArticleGameComponent from './components/ArticleGame/ArticleGameComponent.vue';

</script>

<template>
    <section class='container-play'>
        <ArticleGameComponent type="-1"></ArticleGameComponent>
        <BoardComponent class='board'></BoardComponent>
        <ArticleGameComponent type="1"></ArticleGameComponent>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-play{
        // size
        width: 100%;

        // display
        @include flex(row, center, center, 5rem);
    }

</style>