<script setup>
import { userStore } from '@/stores/user';

// stores
const user = userStore()

// props
const {id_game} = defineProps(['id_game'])

const game = user.user.last_games.find(g => g.id == id_game);

function whoWinn(){
    // if(user.username == game.player1.name){
    //     if(game.winner == game.player.type){
    //     }
    // }else{
    // }
}
</script>

<template>
    <div class='game_card'>
        <span>
            {{ game.player1.name }}
        </span>
        <span>
            vs
        </span>
        <span>
            {{ game.player2.name }}
        </span>
        {{ whoWinn() }}
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/style.scss';

    .game_card{
        // size
        width: calc(100% - 10px);

        // display
        @include flex(row, flex-start, space-between);

        // margin
        padding: 5px;

        // decoration
        background-color: $h-c-black;
        border-radius: 10px;
    }
</style>