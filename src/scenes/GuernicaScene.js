import Phaser from 'phaser'
import {fullscreen} from "../helpers/fullscreen";
import Player from "../Class/Player";

export default class GuernicaScene extends Phaser.Scene {

    constructor() {
        super({key: 'guernica'});
    }

    preload(){
        this.load.image('guernicabg', 'assets/images/Levels/GUERNICA/guernica.PNG');
        this.load.image('guernicabg2', 'assets/images/Levels/GUERNICA/guernica2.PNG');

        this.load.image('guernica1', 'assets/images/Levels/GUERNICA/l enfant.PNG');
        this.load.image('guernica2', 'assets/images/Levels/GUERNICA/la colombe.PNG');
        this.load.image('guernica3', 'assets/images/Levels/GUERNICA/la fleur.PNG');
        this.load.image('guernica4', 'assets/images/Levels/GUERNICA/la jambe boiteuse.PNG');
        this.load.image('guernica5', 'assets/images/Levels/GUERNICA/la lampe.PNG');
        this.load.image('guernica6', 'assets/images/Levels/GUERNICA/le cheval.PNG');
        this.load.image('guernica7', 'assets/images/Levels/GUERNICA/le cri.PNG');
        this.load.image('guernica8', 'assets/images/Levels/GUERNICA/le fantome.PNG');
        this.load.image('guernica9', 'assets/images/Levels/GUERNICA/le poignard.PNG');
        this.load.image('guernica10', 'assets/images/Levels/GUERNICA/le taureau.PNG');

        this.load.image('mask', 'assets/images/Levels/GUERNICA/mask.PNG');

        this.load.spritesheet("player", "assets/images/Character/Statique/spritesheet.png", {"frameWidth": 445, "frameHeight": 915});
        this.load.spritesheet("player-walk", "assets/images/Character/Avancer/spritesheet.png", {"frameWidth": 630, "frameHeight": 915});
        this.load.spritesheet("player-jump", "assets/images/Character/Sauter/spritesheet.png", {"frameWidth": 618, "frameHeight": 915});
        this.load.spritesheet("player-fall", "assets/images/Character/Tomber/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
    }

    create(){
        fullscreen(this);

        this.physics.world.setBounds(0, 0, 3200, 1200, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 3200, 1200);
        this.cameras.main.setSize(this.game.canvas.width,this.game.canvas.height);
        this.cameras.main.setZoom(.8)



        this.guernica2 = this.make.image({
            x: 0,
            y: 0,
            key: 'guernicabg2',
            add: true
        }).setOrigin(0);

        this.spotlight = this.make.image({
            x: 0,
            y: 0,
            key: 'mask',
            add: false
        });

        this.guernica = this.make.image({
            x: 0,
            y: 0,
            key: 'guernicabg',
            add: true
        }).setOrigin(0);

        this.guernica1 = this.add.image(0,0,"guernica1").setOrigin(0)
        this.guernica2 = this.add.image(0,0,"guernica2").setOrigin(0)
        this.guernica3 = this.add.image(0,0,"guernica3").setOrigin(0)
        this.guernica4 = this.add.image(0,0,"guernica4").setOrigin(0)
        this.guernica5 = this.add.image(0,0,"guernica5").setOrigin(0)
        this.guernica6 = this.add.image(0,0,"guernica6").setOrigin(0)
        this.guernica7 = this.add.image(0,0,"guernica7").setOrigin(0)
        this.guernica8 = this.add.image(0,0,"guernica8").setOrigin(0)
        this.guernica9 = this.add.image(0,0,"guernica9").setOrigin(0)
        this.guernica10 = this.add.image(0,0,"guernica10").setOrigin(0)

        this.guernica.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);

        this.player = new Player(this, 0, 3200, {key: 'player'});
        this.cameras.main.startFollow(this.player);
    }

    update(){
        this.spotlight.x = this.player.x;
        this.spotlight.y = this.player.y;
    }

}

