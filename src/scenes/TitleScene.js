import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {

    timeout = 1000; //A partir de quand le fog disparait avec le logo
    speedfog = 0.002; //Vitesse disparition fog

    fog = null;
    timer = false;

    totem1 = null;
    totem2 = null;
    totem3 = null;
    totem4 = null;

    constructor() {
        super({key: 'title'});
    }

    preload(){
        this.load.image('totemfond', 'assets/images/Title/Totems de fond.PNG');
        this.load.image('totem2', 'assets/images/Title/Totem 2.PNG');
        this.load.image('totem3', 'assets/images/Title/Totem 3.PNG');
        this.load.image('totem4', 'assets/images/Title/Totem 4.PNG');

        this.load.image('sit0', 'assets/images/Title/Totem 1-1.PNG');
        this.load.image('sit1', 'assets/images/Title/Totem 1-2.PNG');
        this.load.image('sit2', 'assets/images/Title/Totem 1-3.PNG');

    }

    create() {
        //Background Color
        this.backgroundColorTitle();

        //Totem background
        let totemfond = this.add.image(0, 0, "totemfond").setOrigin(0);
        totemfond.setDisplaySize(this.game.canvas.width,this.game.canvas.height);

        //Totem 2
        this.totem2 = this.add.image(150, 0, "totem2").setOrigin(0);
        this.totem2.setScale(.23);
        this.totem2.y = this.totem2.y + (this.game.canvas.height - this.totem2.displayHeight);
        this.totem2.y = this.totem2.y + this.totem2.displayHeight; // On ait disparaitre le totem 2 en bas de l'écran



        //Totem 3
        this.totem3 = this.add.image(370, 0, "totem3").setOrigin(0);
        this.totem3.setScale(.20);
        this.totem3.y = this.totem3.y + (this.game.canvas.height - this.totem3.displayHeight);
        this.totem3.y = this.totem3.y + this.totem3.displayHeight; // On ait disparaitre le totem 3 en bas de l'écran


        //Totem 4
        this.totem4 = this.add.image(600, 0, "totem4").setOrigin(0);
        this.totem4.setScale(.18);
        this.totem4.y = this.totem4.y + (this.game.canvas.height - this.totem4.displayHeight);
        this.totem4.y = this.totem4.y + this.totem4.displayHeight; // On ait disparaitre le totem 4 en bas de l'écran

        //Totem 1 + Character animation
        this.anims.create({
            key: 'sit',
            frames: [
                { key: 'sit0' },
                { key: 'sit1' },
                { key: 'sit2' }
            ],
            frameRate: 4,
            repeat: -1
        });

        this.totem1 = this.add.sprite(0, 0, 'sit0').setOrigin(0);
        this.totem1.setScale(.23);
        this.totem1.y = this.totem1.y + (this.game.canvas.height - this.totem1.displayHeight); // On fout le totem 1 en bas
        this.totem1.y = this.totem1.y + this.totem1.displayHeight; // On ait disparaitre le totem 1 en bas de l'écran
        this.totem1.play('sit');

        //Fog
        this.fogcreate();

        setTimeout(() => {
            this.timer = true;
        }, this.timeout);
    }

    update(){
        if(this.timer===true){
            this.fogkiller();
            this.totem1animation();
            this.totem2animation();
            this.totem3animation();
            this.totem4animation();
        }
    }

    backgroundColorTitle() {
        let rect = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
        let graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        graphics.fillRectShape(rect);
    }

    fogcreate() {
        let rect = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
        let graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
        graphics.fillRectShape(rect);
        this.fog = graphics;
    }

    fogkiller() {
        if(this.fog.alpha !== 0){
            this.fog.setAlpha(this.fog.alpha - this.speedfog)
        }
        if(this.fog.alpha === 0 && this.fog.active !== 0){
            this.fog.setActive(false).setVisible(false)
        }
    }

    totem1animation(){
        this.tweens.add({
            targets: this.totem1,
            y: this.game.canvas.height - this.totem1.displayHeight,
            ease: 'Power1',
            duration: 500
        });
    }

    totem2animation(){
        this.tweens.add({
            targets: this.totem2,
            y: this.game.canvas.height - this.totem2.displayHeight,
            ease: 'Power1',
            duration: 2000
        });
    }

    totem3animation(){
        this.tweens.add({
            targets: this.totem3,
            y: this.game.canvas.height - this.totem3.displayHeight,
            ease: 'Power1',
            duration: 1000
        });
    }

    totem4animation(){
        this.tweens.add({
            targets: this.totem4,
            y: this.game.canvas.height - this.totem4.displayHeight,
            ease: 'Power1',
            duration: 3000
        });
    }

}

