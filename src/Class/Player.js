import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite{

    playeridle = null;
    playerstartwalk = null;
    playerwalk = null;
    playerjump = null;
    playerfall = null;

    constructor(scene, x, y, config) {
        super(scene, x, y, config.key);

        this.walk = 0;
        this.jump = 0;
        this.scene = scene;


        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.setScale(.15)

        this.playeridle = this.scene.anims.create({
            key: 'player-idle',
            frames: 'player',
            repeat: -1,
            duration: 600,
        });

        this.playerstartjump = this.scene.anims.create({
            key: 'player-start-jump',
            frames: this.scene.anims.generateFrameNumbers('player-jump', { start: 0, end: 5 }),
            repeat: 0,
            duration: 1000,
        });

        this.playerjump = this.scene.anims.create({
            key: 'player-jump',
            frames: this.scene.anims.generateFrameNumbers('player-jump', { start: 6, end: 7 }),
            repeat: -1,
            duration: 1000,
        });

        this.playerstartfall = this.scene.anims.create({
            key: 'player-start-fall',
            frames: this.scene.anims.generateFrameNumbers('player-fall', { start: 0, end: 1 }),
            repeat: -1,
            duration: 500,
        });


        this.playerfall = this.scene.anims.create({
            key: 'player-start-fall',
            frames: this.scene.anims.generateFrameNumbers('player-fall', { start: 2, end: 8 }),
            repeat: -1,
            duration: 1000,
        });


        this.playerstartwalk = this.scene.anims.create({
            key: 'player-start-walk',
            frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 0, end: 3 }),

            // frameRate: 17,
            repeat: 0,
            duration: 500,
        });

        this.playerwalk = this.scene.anims.create({
            key: 'player-walk',
            frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 9, end: 16 }),

            // frameRate: 17,
            repeat: -1,
            duration: 2000,
        });

        const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
        });


    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        let keys = this.keys;
        let pad = Phaser.Input.Gamepad.Gamepad;

        if (this.scene.input.gamepad.total) {
            pad = this.scene.input.gamepad.getPad(0);
        }

        if(this.body.velocity.y !== 0){
            if(this.body.velocity.y > 0){
                this.anims.play("player-start-fall", true);
            }else{
                this.anims.play("player-jump", true);
            }
            if(keys.right.isDown || pad.right){
                this.setFlipX(false);
                this.body.setVelocityX(150);
            } else if (keys.left.isDown || pad.left){
                this.setFlipX(true);
                this.body.setVelocityX(-150);
            }
        }else if((keys.up.isDown || pad.up)){
            if(this.jump !== 1){
                this.anims.play("player-start-jump", true);
            }
        }else if((keys.right.isDown || pad.right) || (keys.left.isDown || pad.left)){
            if((keys.up.isDown || pad.up)){
                this.jump = 1;
                this.body.setVelocityY(-700)
                if(keys.right.isDown || pad.right){
                    this.setFlipX(false);
                    this.body.setVelocityX(150);
                }else{
                    this.setFlipX(true);
                    this.body.setVelocityX(-150);
                }
            }else{
                this.jump = 0;
            }
            if(this.walk !== 1){
                this.anims.play("player-start-walk", true);
                if(keys.right.isDown || pad.right){
                    this.setFlipX(false);
                    this.body.setVelocityX(150);
                }else{
                    this.setFlipX(true);
                    this.body.setVelocityX(-150);
                }
            } else {
                this.anims.play("player-walk", true);
                if(keys.right.isDown || pad.right){
                    this.setFlipX(false);
                    this.body.setVelocityX(200);
                }else{
                    this.setFlipX(true);
                    this.body.setVelocityX(-200);
                }
            }
        } else {
            this.jump = 0;
            this.walk = 0;
            this.body.setVelocityX(0);
            this.anims.play("player-idle", true);
        }

        this.on('animationcomplete', function (sprite)
        {
            if (sprite.key === 'player-start-jump'){
                if(this.jump !== 1){
                    this.jump = 1;
                    this.body.setVelocityY(-700)
                }
            }
            if (sprite.key === 'player-start-walk'){
                if(this.walk !== 1){
                    this.walk = 1;
                }
            }
        });
    }
}
