import Phaser from 'phaser'
import {fullscreen} from "../helpers/fullscreen";
import Player from "../Class/Player";

export default class GuernicaScene extends Phaser.Scene {

    score = 0;
    wingame = 0;

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

        this.load.image('mask', 'assets/images/Levels/GUERNICA/mask.png');

        this.load.spritesheet("player", "assets/images/Character/Statique/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
        this.load.spritesheet("player-walk", "assets/images/Character/Avancer/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
        this.load.spritesheet("player-jump", "assets/images/Character/Sauter/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
        this.load.spritesheet("player-fall", "assets/images/Character/Tomber/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
    }

    create(){
        fullscreen(this);

        this.physics.world.setBounds(0, 0, 3200, 1200, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 3200, 1200);
        this.cameras.main.setSize(this.game.canvas.width,this.game.canvas.height);
        this.cameras.main.setZoom(1.6) //2

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
        }).setScale(1.2);

        this.guernica = this.make.image({
            x: 0,
            y: 0,
            key: 'guernicabg',
            add: true
        }).setOrigin(0);

        this.signe = []
        this.signe.push(this.add.sprite(0,0,"guernica1").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica2").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica3").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica4").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica5").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica6").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica7").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica8").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica9").setOrigin(0).setVisible(false));
        this.signe.push(this.add.image(0,0,"guernica10").setOrigin(0).setVisible(false));

        this.guernica.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);

        this.player = new Player(this, 0, 1200, {key: 'player'});
        this.cameras.main.startFollow(this.player);
        let rectarr = [];
        rectarr.push(this.add.rectangle(75, 765, 350, 141).setOrigin(0).setName("0"));
        rectarr.push(this.add.rectangle(733,   202, 247, 203).setOrigin(0).setName("1"));
        rectarr.push(this.add.rectangle(1660, 954, 75, 68).setOrigin(0).setName("2"));
        rectarr.push(this.add.rectangle(2535, 884, 619, 211).setOrigin(0).setName("3"));
        rectarr.push(this.add.rectangle(907, 0, 560, 180).setOrigin(0).setName("4"));
        rectarr.push(this.add.rectangle(1110, 266, 395, 250).setOrigin(0).setName("5"));
        rectarr.push(this.add.rectangle(2609, 209, 484, 373).setOrigin(0).setName("6"));
        rectarr.push(this.add.rectangle(2095, 218, 281, 251).setOrigin(0).setName("7"));
        rectarr.push(this.add.rectangle(1608, 1044, 282, 134).setOrigin(0).setName("8"));
        rectarr.push(this.add.rectangle(280, 170, 291, 241).setOrigin(0).setName("9"));

        this.rectsigne = this.physics.add.staticGroup();
        for(let i = 0; i < rectarr.length; i++){
            this.rectsigne.add(rectarr[i])
        }

        this.createPlatforms();

        this.player.body.checkCollision.up = false;
    }

    update(){
        this.spotlight.x = this.player.x;
        this.spotlight.y = this.player.y;

        this.physics.overlap(this.rectsigne, this.player, this.activateSign, null, this);
        this.win()
    }

    activateSign(player, rect){
        const id = parseInt(rect.name);
        if(this.signe[id].visible === false){
            this.signe[id].setVisible(true)
            this.score += 1;
        }
    }

    win(){
        if(this.score === 1 && this.wingame !== 1){
            const ratio = (1200 / this.game.canvas.width).toFixed(1);
            const pos = (this.game.canvas.height - (1200 * ratio)) / 2;
            if(this.cameras.main.y >= pos && this.cameras.main.zoom <= ratio){
                if(this.spotlight.scale < 30){
                    this.spotlight.setScale(this.spotlight.scale + 0.2);
                }else{
                    this.guernica.clearMask();
                    this.guernica2.destroy();
                    this.wingame = 1;
                }
            }else{
                this.cameras.main.setPosition(0, this.cameras.main.y < pos ? this.cameras.main.y + .8 : pos)
                this.cameras.main.setZoom(this.cameras.main.zoom > ratio ? this.cameras.main.zoom - 0.005  : ratio)
            }
        }
    }

    createPlatforms(){
        this.lines = this.physics.add.staticGroup();
        let rect = this.add.rectangle(150, 1150, 350, 1).setOrigin(0)
        this.lines.add(rect)

        this.physics.add.collider(this.lines, this.player, this.collider, this.collider, this)


    }

    collider(p){
        const downKey = this.player.scene.input.keyboard.addKey("down");
        let pad = Phaser.Input.Gamepad.Gamepad;

        if (this.player.scene.input.gamepad.total) {
            pad = this.player.scene.input.gamepad.getPad(0);
        }

        if(downKey.isDown || pad.down){
            return false;
        }
        if(p.body.onFloor()) {
            return false;
        }

    }
}

