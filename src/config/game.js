import Phaser from 'phaser'
// import TitleScene from "../scenes/TitleScene";
import GuernicaScene from "../scenes/GuernicaScene";

const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#ffffff',
    input: {
        gamepad: true
    },
    scale: {
        parent: '#game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:1920,
        height:1080,
        min: {
            width:426,
            height:240,
        },
    },
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: true
        }
    },
    scene: [GuernicaScene]
};

export default config
