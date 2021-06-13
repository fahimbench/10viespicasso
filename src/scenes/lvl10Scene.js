import Phaser from 'phaser'
import {fullscreen} from "../helpers/fullscreen";
import Player from "../Class/Player";
import TitleScene from "./TitleScene";

export default class Lvl10Scene extends Phaser.Scene {

    constructor() {
        super({key: 'lvl10'});
    }

    preload(){
        this.scene.add("title", TitleScene, false);
        this.load.image('lvl10bg', 'assets/images/Levels/LVL10/Lvl 10.jpg');

        this.load.spritesheet("player", "assets/images/Character/Statique/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
        this.load.spritesheet("player-walk", "assets/images/Character/Avancer/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
        this.load.spritesheet("player-jump", "assets/images/Character/Sauter/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
        this.load.spritesheet("player-fall", "assets/images/Character/Tomber/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
    }

    create(){
        fullscreen(this);

        this.physics.world.setBounds((this.game.canvas.width - 1110) / 2, 0, 1110, 859, true, true, true, true);
        this.cameras.main.setBounds(160, 0, 1110, 859);
        this.cameras.main.setSize(this.game.canvas.width,this.game.canvas.height);
        this.cameras.main.setZoom(this.game.canvas.height/859) //2

        this.guernica = this.make.image({
            x: (this.game.canvas.width - 1110) / 2,
            y: 0,
            key: 'lvl10bg',
            add: true
        }).setOrigin(0);

        this.player = new Player(this, this.game.canvas.width / 2, this.game.canvas.height / 2, {key: 'player'});
        this.cameras.main.startFollow(this.player);

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.right = false
        this.player.body.checkCollision.left = false
    }

    update() {
        this.exit()
    }

    exit(){
        const enterKey = this.player.scene.input.keyboard.addKey("enter");
        let pad = Phaser.Input.Gamepad.Gamepad;

        if (this.player.scene.input.gamepad.total) {
            pad = this.player.scene.input.gamepad.getPad(0);
        }

        if((enterKey.isDown || pad.A)){
            this.scene.remove(this)
            this.scene.start("title")
        }
    }
}

