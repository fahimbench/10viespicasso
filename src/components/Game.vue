<template>
    <ion-phaser
            id="game"
            v-bind:game.prop="game"
            v-bind:initialize.prop="initialize"
    />
</template>

<script>
    import configGame from '../config/game'

    export default {
        name: 'Game',
        data() {
            return {
                initialize: true,
                game: configGame
            }
        }
    }
</script>
