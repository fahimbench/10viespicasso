import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, config) {
        super(scene, x, y, config.key);

        this.scene = scene;
        this.lastAnim = null;
        this.vel = 200;

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
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

        const keys = this.keys;
        let animationName = 'player-idle';

        if (keys.left.isDown) {
            this.body.setVelocityX(-this.vel);
            this.setFlipX(true);
        } else if (keys.right.isDown) {
            this.body.setVelocityX(this.vel);
            this.setFlipX(false);
        }

        if (keys.up.isDown) {
            this.body.setVelocityY(-this.vel);
        } else if (keys.down.isDown) {
            this.body.setVelocityY(this.vel);
        }

        // TODO: Clean this up
        if (keys.up.isDown || keys.down.isDown || keys.left.isDown || keys.right.isDown) {
            animationName = "player-idle";
        } else {
            animationName = 'player-idle';
        }

        if(this.lastAnim !== animationName) {
            this.lastAnim = animationName;
            this.anims.play(animationName, true);
        }
    }
}
