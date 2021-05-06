import Phaser from 'phaser'
import TitleScene from "../scenes/TitleScene";
// import GuernicaScene from "../scenes/GuernicaScene";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    input: {
        gamepad: true
    },
    scale: {
        parent: '#game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:960,
        height:540,
        min: {
            width:426,
            height:240,
        },
    },
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            debug: true
        }
    },
    scene: [TitleScene]
};

export default config
