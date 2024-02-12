<script setup>
  import PlayComponent from './components/PlayComponent.vue'
  import RankingComponent from './components/RankingComponent.vue'
  import TournamentComponent from './components/TournamentComponent.vue'
  import IaComponent from './components/IaComponent.vue'
  import OtherComponent from './components/OtherComponent.vue'
  import PersonalComponent from './components/PersonalComponent.vue'

</script>

<template>
  <main>
    <section class='global-wrapper'>

      <article class='play-container'>
        <PlayComponent/>
      </article>

      <article class='ranking-container'>
        <RankingComponent/>
      </article>

      <article class='tournament-container'>
        <TournamentComponent/>
      </article>

      <article class='ia-container'>
        <IaComponent/>
      </article>

      <article class='other-container'>
        <OtherComponent/>
      </article>

      <article class='personal-container'>
        <PersonalComponent/>
      </article>

    </section>
  </main>
</template>


<style scoped lang='scss'>
  @import '@/assets/style.scss';

  main{
    // size
    width: 100%;
    height: 80%;

    // display
    @include flex();
    align-self: flex-start;

    // margin
    margin-top: $h-h-header;

    .global-wrapper{
      // size
      width: 80%;
      height: 100%;

      // display
      @include gridHome();

      .play-container, .ranking-container, .tournament-container, .ia-container, .other-container, .personal-container{
        // display
        @include flex();

        // decoration
        background-color: $h-c-white-light;
        border-radius: 15px;

        .wrapper{
          // size
          width: calc(100% - 10px);
          height: calc(100% - 10px);

          // decoration
          background-color: $h-c-white;
          border-radius: 10px;
        }
      }

      .play-container{
        // display
        grid-row: 1 / 4;
        grid-column: 1 / 7;

        // decoration
        background-color: transparent;
      }

      .ranking-container{
        // display
        grid-row: 1 / 4;
        grid-column: 7 / 10;
      }

      .tournament-container{
        // display
        grid-row: 1 / 4;
        grid-column: 10 / 13;
      }

      .ia-container{
        // display
        grid-row: 4 / 5;
        grid-column: 1 / 5;
      }

      .other-container{
        // display
        grid-row: 4 / 5;
        grid-column: 5 / 9;
      }

      .personal-container{
        // display
        grid-row: 4 / 5;
        grid-column: 9 / 13;
      }
    }
  }
</style>