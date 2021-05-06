import Phaser from 'phaser'
import {fullscreen} from "../helpers/fullscreen";

export default class TitleScene extends Phaser.Scene {

    //----------------------------------------------------------------------------
    //---------------------------A Modifier---------------------------------------

    timeout = 4000; //A partir de quand le fog disparait avec nom de l'event
    speedfog = 0.005; //Vitesse disparition fog
    backgroundColor = 0xc6e0f5; //Couleur du fond format 0x
    fogColor = 0xffffff; //Couleur fog format 0x

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

        this.load.image('ryoko', 'assets/images/Title/AfficheRyoko.png');
        this.load.image('totem2', 'assets/images/Title/Totem 2.PNG');
        this.load.image('totem3', 'assets/images/Title/Totem 3.PNG');
        this.load.image('totem4', 'assets/images/Title/Totem 4.PNG');

        this.load.image('sit0', 'assets/images/Title/Totem 1-1.PNG');
        this.load.image('sit1', 'assets/images/Title/Totem 1-2.PNG');
        this.load.image('sit2', 'assets/images/Title/Totem 1-3.PNG');

        this.load.image('letterA', 'assets/images/Title/TYPO TITRE/A.PNG');
        this.load.image('letterC', 'assets/images/Title/TYPO TITRE/C.PNG');
        this.load.image('letterD', 'assets/images/Title/TYPO TITRE/D.PNG');
        this.load.image('letterE', 'assets/images/Title/TYPO TITRE/E.PNG');
        this.load.image('letterI', 'assets/images/Title/TYPO TITRE/I.PNG');
        this.load.image('letterL', 'assets/images/Title/TYPO TITRE/L.PNG');
        this.load.image('letterO', 'assets/images/Title/TYPO TITRE/O.PNG');
        this.load.image('letterP', 'assets/images/Title/TYPO TITRE/P.PNG');
        this.load.image('letterS', 'assets/images/Title/TYPO TITRE/S.PNG');
        this.load.image('letterV', 'assets/images/Title/TYPO TITRE/V.PNG');
        this.load.image('letterX', 'assets/images/Title/TYPO TITRE/X.PNG');

        this.load.image('clouds1', 'assets/images/Title/Nuages/clouds1.PNG');
        this.load.image('clouds2', 'assets/images/Title/Nuages/clouds2.PNG');

        this.load.audio("title_sound", "assets/audio/Title/Ludovico Einaudi - Experience.mp3")
    }

    create() {
        fullscreen(this);

        //Background Color
        this.backgroundColorTitle();


        //Totem background
        let totemfond = this.add.image(0, 0, "totemfond").setOrigin(0);
        totemfond.setDisplaySize(this.game.canvas.width,this.game.canvas.height);

        //Cloud image size
        let imageBaseWidth = 4961;
        let imageBaseHeight = 3508;

        //Cloud 1
        this.cloud1 = this.add.tileSprite(this.game.canvas.width / 2, 100,imageBaseWidth, imageBaseHeight, 'clouds1');
        this.cloud1.setScale(.6);

        //Cloud 2
        this.cloud2 = this.add.tileSprite(this.game.canvas.width / 2, 150,imageBaseWidth, imageBaseHeight, 'clouds2');
        this.cloud2.setScale(.6);

        //Totem 2
        this.totem2 = this.add.image(this.totem2x, 0, "totem2").setOrigin(0);
        this.totem2.setScale(this.totem2scale);
        this.totem2.y = this.totem2.y + (this.game.canvas.height - this.totem2.displayHeight);
        this.totem2.y = this.totem2.y + this.totem2.displayHeight; // On ait disparaitre le totem 2 en bas de l'écran

        //Totem 3
        this.totem3 = this.add.image(this.totem3x, 0, "totem3").setOrigin(0);
        this.totem3.setScale(this.totem3scale, .19);
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

        //TITLE
        let startTitlex = 400;
        let startTitley = 60;
        let scaleTitle = .4;

        this.letterL = this.add.image(startTitlex, startTitley, "letterL").setScale(scaleTitle + .1).setAlpha(0);
        this.letterE1 = this.add.image(startTitlex + 20, startTitley, "letterE").setScale(scaleTitle - .05).setAlpha(0);
        this.letterS1 = this.add.image(startTitlex + 40, startTitley, "letterS").setScale(scaleTitle + .1).setAlpha(0);
        this.letterD1 = this.add.image(startTitlex + 100, startTitley, "letterD").setScale(scaleTitle + .1).setAlpha(0);
        this.letterI1 = this.add.image(startTitlex + 120, startTitley, "letterI").setScale(scaleTitle - .05).setAlpha(0);
        this.letterX = this.add.image(startTitlex + 140, startTitley, "letterX").setScale(scaleTitle + .1).setAlpha(0);
        this.letterV = this.add.image(startTitlex + 200, startTitley, "letterV").setScale(scaleTitle + .1).setAlpha(0);
        this.letterI2 = this.add.image(startTitlex + 220, startTitley, "letterI").setScale(scaleTitle - .05).setAlpha(0);
        this.letterE2 = this.add.image(startTitlex + 240, startTitley, "letterE").setScale(scaleTitle - .05).setAlpha(0);
        this.letterS2 = this.add.image(startTitlex + 260, startTitley, "letterS").setScale(scaleTitle + .1, scaleTitle + .2).setAlpha(0);
        this.letterD2 = this.add.image(startTitlex + 20, startTitley + 70, "letterD").setScale(scaleTitle + .1).setAlpha(0);
        this.letterE3 = this.add.image(startTitlex + 50, startTitley + 70, "letterE").setScale(scaleTitle - .05).setAlpha(0);
        this.letterP = this.add.image(startTitlex + 110, startTitley + 60, "letterP").setScale(scaleTitle + .1).setAlpha(0);
        this.letterI3 = this.add.image(startTitlex + 130, startTitley + 60, "letterI").setScale(scaleTitle).setAlpha(0);
        this.letterC = this.add.image(startTitlex + 150, startTitley + 60, "letterC").setScale(scaleTitle).setAlpha(0);
        this.letterA = this.add.image(startTitlex + 170, startTitley + 60, "letterA").setScale(scaleTitle).setAlpha(0);
        this.letterS3 = this.add.image(startTitlex + 190, startTitley + 60, "letterS").setScale(scaleTitle + .1, scaleTitle + .2).setAlpha(0);
        this.letterS4 = this.add.image(startTitlex + 210, startTitley + 60, "letterS").setScale(scaleTitle).setAlpha(0);
        this.letterO = this.add.image(startTitlex + 230, startTitley + 60, "letterO").setScale(scaleTitle).setAlpha(0);

        //Fog
        this.fogcreate();

        //Ryoko
        this.ryoko = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "ryoko")
            .setOrigin(.5);
        this.ryoko.setScale(.3);

        setTimeout(() => {
            this.timer = true;
        }, this.timeout);

        //Démarre le son
        this.bgSound = this.sound.add('title_sound');
        this.bgSound.loop = true;
        this.bgSound.play();

        //text clignotant
        this.blinkText = this.add.text(
            530,
            175,
            "Appuyer sur un bouton pour commencer",
            {
                "font": "20px Blossom",
                "fill": "#000000",
            })
            .setOrigin(.5)
            .setInteractive( { useHandCursor: true  })
            .setAlpha(0)
            .setStroke('#ffffff', 1)
            .setShadow(2, 2, '#333333', 2, true, false);

        this.titleChapters = [];
        this.titleChapters.push(this.titleTexts(190, "La Naissance"));
        this.titleChapters.push(this.titleTexts(225, "La Vie en Bleu"));
        this.titleChapters.push(this.titleTexts(260, "La vie en Rose "));
        this.titleChapters.push(this.titleTexts(295, "Je vois la Vie en Cube"));
        this.titleChapters.push(this.titleTexts(330, "Expérimenter la Vie"));
        this.titleChapters.push(this.titleTexts(365, "Une Vie Classique"));
        this.titleChapters.push(this.titleTexts(400, "Une Vie Surréaliste"));
        this.titleChapters.push(this.titleTexts(435, "Une Vie Symbolique"));
        this.titleChapters.push(this.titleTexts(470, "La Joie de Vivre"));
        this.titleChapters.push(this.titleTexts(505, "Fin de Vie"));

    }

    update(){
        if(this.timer===true){
            this.fogkiller();
            if(this.fog.alpha <= .8){
                this.totemTimeline(this.totem1, this.totem1FloatingDuration, this.totem1pxFloating, this.totem1speedApparition);
                this.totemTimeline(this.totem2, this.totem2FloatingDuration, this.totem2pxFloating, this.totem2speedApparition);
                this.totemTimeline(this.totem3, this.totem3FloatingDuration, this.totem3pxFloating, this.totem3speedApparition);
                this.totemTimeline(this.totem4, this.totem4FloatingDuration, this.totem4pxFloating, this.totem4speedApparition);
                this.titleTimeline();
            }
        }
        let testIfChaptersAppear = this.titleChapters.filter((t)=> t.active === true);
        if(testIfChaptersAppear.length > 0){
            this.navigateTitle();
        }
        this.cloud1.x += 0.3;
        this.cloud2.x += 0.1;
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
        this.ryoko.destroy();
        if (this.fog.alpha !== 0) {
            this.fog.setAlpha(this.fog.alpha - this.speedfog)
        }
        if (this.fog.alpha <= 0 && this.fog.active !== 0) {
            this.fog.setActive(false).setVisible(false);
            this.timer = false;
        }
    }

    blinkPlay(){
        this.tweens.add({
            targets: this.blinkText,
            alpha: {
                from: .5,
                to: 1,
            },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
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

    titleTimeline(){
        let timeline = this.tweens.createTimeline();

        //LES
        timeline.add({
            targets: this.letterL,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterE1,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterS1,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        //DIX
        timeline.add({
            targets: this.letterD1,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterI1,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterX,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        //VIES
        timeline.add({
            targets: this.letterV,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterI2,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterE2,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterS2,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        //DE
        timeline.add({
            targets: this.letterD2,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterE3,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        //PICASSO
        timeline.add({
            targets: this.letterP,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterI3,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterC,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterA,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterS3,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterS4,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400
        });

        timeline.add({
            targets: this.letterO,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 400,
            onComplete: () => {
                this.blinkPlay();
                this.hideTotem3();
            }
        });

        timeline.play();
    }

    hideTotem3(){
        this.input.gamepad.once('down',  () => {
            this.blinkText.destroy();
            this.tweens.killTweensOf(this.totem3)
            this.tweens.add({
                targets: this.totem3,
                y: this.game.canvas.height,
                ease: 'Linear',
                duration: 1000,
            });
            this.titleTextsPop();
        }, this);
        this.input.keyboard.once('keydown',  () => {
            this.blinkText.destroy();
            this.tweens.killTweensOf(this.totem3)
            this.tweens.add({
                targets: this.totem3,
                y: this.game.canvas.height,
                ease: 'Linear',
                duration: 1000,
            });
            this.titleTextsPop();
        }, this);
    }

    titleTexts(y, text){
        return this.add.text(
            this.game.canvas.width/2 + 50,
            y,
            text,
            {
                "font": "30px Blossom",
                "fill": "#000000",
            })
            .setOrigin(.5)
            .setAlpha(0)
            .setActive(false)
    }

    titleTextsPop(){
        let testIfChaptersAppear = this.titleChapters.filter((t)=> t.active === true);
        if(testIfChaptersAppear.length === 0) {
            this.titleChapters[0].setActive(true)
            let timeline = this.tweens.createTimeline();
            this.titleChapters.forEach((t, i) => {
                if (i > 0) {
                    timeline.add({
                        targets: t,
                        alpha: {
                            from: 0,
                            to: .5
                        },
                        duration: 400,
                    })
                } else {
                    timeline.add({
                        targets: t,
                        alpha: {
                            from: 0,
                            to: 1
                        },
                        duration: 400,
                    })
                }
            });
            timeline.play();
        }
    }

    navigateTitle(){
        let indexActive = this.titleChapters.map(e => e.active).indexOf(true);
        this.input.keyboard.once('keydown', event => {
            switch (event.key) {
                case "ArrowDown":
                    if(indexActive >= 0 && indexActive < this.titleChapters.length - 1){
                        this.titleChapters[indexActive].active = false;
                        this.titleChapters[indexActive].alpha = .5;

                        this.titleChapters[indexActive + 1].active = true;
                        this.titleChapters[indexActive + 1].alpha = 1;
                    }
                    break;
                case "ArrowUp":
                    if(indexActive > 0 && indexActive <= this.titleChapters.length - 1){
                        this.titleChapters[indexActive].active = false;
                        this.titleChapters[indexActive].alpha = .5;

                        this.titleChapters[indexActive - 1].active = true;
                        this.titleChapters[indexActive - 1].alpha = 1;
                    }
                    break;
                default:
            }
        });

        this.input.gamepad.once('down', (pad, button) => {
            switch (button.index) {
                case 13:
                    if(indexActive >= 0 && indexActive < this.titleChapters.length - 1){
                        this.titleChapters[indexActive].active = false;
                        this.titleChapters[indexActive].alpha = .5;

                        this.titleChapters[indexActive + 1].active = true;
                        this.titleChapters[indexActive + 1].alpha = 1;
                    }
                    break;
                case 12:
                    if(indexActive > 0 && indexActive <= this.titleChapters.length - 1){
                        this.titleChapters[indexActive].active = false;
                        this.titleChapters[indexActive].alpha = .5;

                        this.titleChapters[indexActive - 1].active = true;
                        this.titleChapters[indexActive - 1].alpha = 1;
                    }
                    break;
                default:
            }
        });
    }
}

