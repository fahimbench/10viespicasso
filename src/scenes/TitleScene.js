import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {

    //----------------------------------------------------------------------------
    //---------------------------A Modifier---------------------------------------

    timeout = 1000; //A partir de quand le fog disparait avec nom de l'event
    speedfog = 0.005; //Vitesse disparition fog
    backgroundColor = 0xc6e0f5; //Couleur du fond format 0x
    fogColor = 0x000000; //Couleur fog format 0x

    totem1speedApparition = 900; //Vitesse Apparition totem 1
    totem1x = 0; //Position x totem 1
    totem1scale = .23; //Scale size totem 1
    totem1FloatingDuration = 3000; //Durée flottement totem 1
    totem1pxFloating= 6; //Nbr pixel de flottement totem 1

    totem2speedApparition = 1200; //Vitesse Apparition totem 2
    totem2x = 150; //Position x totem 2
    totem2scale = .23; //Scale size totem 2
    totem2FloatingDuration = 5000; //Durée flottement totem 2
    totem2pxFloating= 5; //Nbr pixel de flottement totem 2

    totem3speedApparition = 1000; //Vitesse Apparition totem 3
    totem3x = 370; //Position x totem 3
    totem3scale = .20; //Scale size totem 3
    totem3FloatingDuration = 6000; //Durée flottement totem 3
    totem3pxFloating= 8; //Nbr pixel de flottement totem 3

    totem4speedApparition = 1500; //Vitesse Apparition totem 4
    totem4x = 600; //Position x totem 4
    totem4scale = .20; //Scale size totem 4
    totem4FloatingDuration = 4000; //Durée flottement totem 4
    totem4pxFloating= 5; //Nbr pixel de flottement totem 4

    //-------------------------En dessous on touche plus---------------------------
    //-----------------------------------------------------------------------------

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
        this.totem2 = this.add.image(this.totem2x, 0, "totem2").setOrigin(0);
        this.totem2.setScale(this.totem2scale);
        this.totem2.y = this.totem2.y + (this.game.canvas.height - this.totem2.displayHeight);
        this.totem2.y = this.totem2.y + this.totem2.displayHeight; // On ait disparaitre le totem 2 en bas de l'écran



        //Totem 3
        this.totem3 = this.add.image(this.totem3x, 0, "totem3").setOrigin(0);
        this.totem3.setScale(this.totem3scale);
        this.totem3.y = this.totem3.y + (this.game.canvas.height - this.totem3.displayHeight);
        this.totem3.y = this.totem3.y + this.totem3.displayHeight; // On ait disparaitre le totem 3 en bas de l'écran


        //Totem 4
        this.totem4 = this.add.image(this.totem4x, 0, "totem4").setOrigin(0);
        this.totem4.setScale(this.totem4scale);
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

        this.totem1 = this.add.sprite(this.totem1x, 0, 'sit0').setOrigin(0);
        this.totem1.setScale(this.totem1scale);
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
            if(this.fog.alpha <= .8){
                this.totemTimeline(this.totem1, this.totem1FloatingDuration, this.totem1pxFloating, this.totem1speedApparition);
                this.totemTimeline(this.totem2, this.totem2FloatingDuration, this.totem2pxFloating, this.totem2speedApparition);
                this.totemTimeline(this.totem3, this.totem3FloatingDuration, this.totem3pxFloating, this.totem3speedApparition);
                this.totemTimeline(this.totem4, this.totem4FloatingDuration, this.totem4pxFloating, this.totem4speedApparition);
            }
        }
    }

    backgroundColorTitle() {
        let rect = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
        let graphics = this.add.graphics({ fillStyle: { color: this.backgroundColor } });
        graphics.fillRectShape(rect);
    }

    fogcreate() {
        let rect = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
        let graphics = this.add.graphics({ fillStyle: { color: this.fogColor } });
        graphics.fillRectShape(rect);
        this.fog = graphics;
    }

    fogkiller() {
        if (this.fog.alpha !== 0) {
            this.fog.setAlpha(this.fog.alpha - this.speedfog)
        }
        if (this.fog.alpha <= 0 && this.fog.active !== 0) {
            this.fog.setActive(false).setVisible(false);
            this.timer = false;
        }
    }

    totemTimeline(totem, totemfloatingduration, totempxfloating, totemspeed){
        let timeline = this.tweens.createTimeline();

        timeline.add({
            targets: totem,
            y: this.game.canvas.height - totem.displayHeight,
            ease: 'Linear',
            duration: totemspeed,
        });

        timeline.add({
            targets: totem,
            y: this.game.canvas.height - totem.displayHeight + totempxfloating,
            ease: 'Linear',
            duration: totemfloatingduration,
            yoyo: true,
            repeat: -1
        });

        timeline.play();
    }

}

