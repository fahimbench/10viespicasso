import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super({key: 'title'});
    }

    preload(){

    }

    create() {
        this.addfog();
    }


    addfog() {
        let {width, height} = this.game.scale;
        this.add.rectangle(0, 0, width, height, 0x000000)

    }
}

