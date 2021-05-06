import Phaser from 'phaser'
import {fullscreen} from "../helpers/fullscreen";
import Player from "../Class/Player";

export default class GuernicaScene extends Phaser.Scene {

    constructor() {
        super({key: 'guernica'});
    }

    preload(){
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/guernica.PNG');

        this.load.image('guernica', 'assets/images/Levels/GUERNICA/l enfant.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/la colombe.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/la fleur.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/la jambe boiteuse.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/la lampe.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/le cheval.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/le cri.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/le fantome.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/le poignard.PNG');
        this.load.image('guernica', 'assets/images/Levels/GUERNICA/le taureau.PNG');

        this.load.spritesheet("player", "assets/images/Character/Statique/spritesheet.png", {"frameWidth": 445, "frameHeight": 915});
    }

    create(){
        fullscreen(this);

        this.physics.world.setBounds(0, 0, 3200, 1200, true, true, true, true);
        this.add.image(0, 0, 'guernica').setOrigin(0);
        this.cameras.main.setBounds(0, 0, 3200, 1200);
        this.cameras.main.setZoom(1.3);

        this.player = new Player(this, 0, 3200, {key: 'player'});

        this.cameras.main.startFollow(this.player);

    }

    update(){

    }

}

