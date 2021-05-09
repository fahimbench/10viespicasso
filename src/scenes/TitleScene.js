import Phaser from 'phaser'
import {fullscreen} from "../helpers/fullscreen";
import PreloaderScene from "./PreloaderScene";

export default class TitleScene extends Phaser.Scene {

    //----------------------------------------------------------------------------
    //---------------------------A Modifier---------------------------------------

    timeout = 5000; //A partir de quand le fog disparait avec nom de l'event
    speedfog = 0.005; //Vitesse disparition fog
    backgroundColor = 0xc6e0f5; //Couleur du fond format 0x
    fogColor = 0xffffff; //Couleur fog format 0x

    totem1speedApparition = 900; //Vitesse Apparition totem 1
    totem1x = 50; //Position x totem 1
    totem1scale = .40; //Scale size totem 1
    totem1FloatingDuration = 3000; //Durée flottement totem 1
    totem1pxFloating= 6; //Nbr pixel de flottement totem 1

    totem2speedApparition = 1200; //Vitesse Apparition totem 2
    totem2x = 300; //Position x totem 2
    totem2scale = .45; //Scale size totem 2
    totem2FloatingDuration = 5000; //Durée flottement totem 2
    totem2pxFloating= 10; //Nbr pixel de flottement totem 2

    totem3speedApparition = 1000; //Vitesse Apparition totem 3
    totem3x = 750; //Position x totem 3
    totem3scale = .40; //Scale size totem 3
    totem3FloatingDuration = 6000; //Durée flottement totem 3
    totem3pxFloating= 8; //Nbr pixel de flottement totem 3

    totem4speedApparition = 1500; //Vitesse Apparition totem 4
    totem4x = 1150; //Position x totem 4
    totem4scale = .40; //Scale size totem 4
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
        this.scene.add("preloader", PreloaderScene, false);

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
        this.cloud1 = this.add.tileSprite(this.game.canvas.width / 2, 300,imageBaseWidth, imageBaseHeight, 'clouds1');
        this.cloud1.setScale(.8);

        //Cloud 2
        this.cloud2 = this.add.tileSprite(this.game.canvas.width / 2, 450,imageBaseWidth, imageBaseHeight, 'clouds2');
        this.cloud2.setScale(.8);

        //Totem 2
        this.totem2 = this.add.image(this.totem2x, 0, "totem2").setOrigin(0);
        this.totem2.setScale(this.totem2scale);
        this.totem2.y = this.totem2.y + (this.game.canvas.height - this.totem2.displayHeight);
        this.totem2.y = this.totem2.y + this.totem2.displayHeight; // On ait disparaitre le totem 2 en bas de l'écran

        //Totem 3
        this.totem3 = this.add.image(this.totem3x, 0, "totem3").setOrigin(0);
        this.totem3.setScale(this.totem3scale,.35);
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
        let startTitlex = 750;
        let startTitley = 130;
        let scaleTitle = 1.3;

        this.letterL = this.add.image(startTitlex, startTitley, "letterL").setScale(scaleTitle + .1).setVisible(false);
        this.letterE1 = this.add.image(startTitlex + 45, startTitley, "letterE").setScale(scaleTitle - .4).setVisible(false);
        this.letterS1 = this.add.image(startTitlex + 90, startTitley, "letterS").setScale(scaleTitle + .1).setVisible(false);
        this.letterD1 = this.add.image(startTitlex + 200, startTitley, "letterD").setScale(scaleTitle + .1).setVisible(false);
        this.letterI1 = this.add.image(startTitlex + 255, startTitley, "letterI").setScale(scaleTitle - .4).setVisible(false);
        this.letterX = this.add.image(startTitlex + 300, startTitley, "letterX").setScale(scaleTitle + .1).setVisible(false);
        this.letterV = this.add.image(startTitlex + 400, startTitley, "letterV").setScale(scaleTitle + .1).setVisible(false);
        this.letterI2 = this.add.image(startTitlex + 445, startTitley, "letterI").setScale(scaleTitle - .4).setVisible(false);
        this.letterE2 = this.add.image(startTitlex + 490, startTitley, "letterE").setScale(scaleTitle - .4).setVisible(false);
        this.letterS2 = this.add.image(startTitlex + 535, startTitley, "letterS").setScale(scaleTitle + .1, scaleTitle + .2).setVisible(false);
        this.letterD2 = this.add.image(startTitlex + 80, startTitley + 170, "letterD").setScale(scaleTitle + .1).setVisible(false);
        this.letterE3 = this.add.image(startTitlex + 140, startTitley + 170, "letterE").setScale(scaleTitle - .4).setVisible(false);
        this.letterP = this.add.image(startTitlex + 250, startTitley + 170, "letterP").setScale(scaleTitle + .1).setVisible(false);
        this.letterI3 = this.add.image(startTitlex + 305, startTitley + 170, "letterI").setScale(scaleTitle).setVisible(false);
        this.letterC = this.add.image(startTitlex + 360, startTitley + 170, "letterC").setScale(scaleTitle).setVisible(false);
        this.letterA = this.add.image(startTitlex + 415, startTitley + 170, "letterA").setScale(scaleTitle).setVisible(false);
        this.letterS3 = this.add.image(startTitlex + 460, startTitley + 170, "letterS").setScale(scaleTitle + .1, scaleTitle + .2).setVisible(false);
        this.letterS4 = this.add.image(startTitlex + 505, startTitley + 170, "letterS").setScale(scaleTitle).setVisible(false);
        this.letterO = this.add.image(startTitlex + 560, startTitley + 170, "letterO").setScale(scaleTitle).setVisible(false);

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
            780,
            390,
            "Appuyer sur un bouton pour commencer",
            {
                "font": "40px Blossom",
                "fill": "#000000",
            })
            .setOrigin(0)
            .setInteractive( { useHandCursor: true  })
            .setVisible(false)
            .setStroke('#ffffff', 1)
            .setShadow(2, 2, '#333333', 2, true, false);

        const ytitle = 440;
        const ydecalage = 65;

        this.titleChapters = [];
        this.titleChapters.push(this.titleTexts(ytitle, "La Naissance"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage), "La Vie en Bleu"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*2), "La vie en Rose "));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*3), "Je vois la Vie en Cube"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*4), "Expérimenter la Vie"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*5), "Une Vie Classique"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*6), "Une Vie Surréaliste"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*7), "Une Vie Symbolique"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*8), "La Joie de Vivre"));
        this.titleChapters.push(this.titleTexts(ytitle + (ydecalage*9), "Fin de Vie"));

        // this.scene.start('guernica')
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
            visible: 1,
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
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterE1,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterS1,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        //DIX
        timeline.add({
            targets: this.letterD1,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterI1,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterX,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        //VIES
        timeline.add({
            targets: this.letterV,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterI2,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterE2,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterS2,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        //DE
        timeline.add({
            targets: this.letterD2,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterE3,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        //PICASSO
        timeline.add({
            targets: this.letterP,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterI3,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterC,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterA,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterS3,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterS4,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400
        });

        timeline.add({
            targets: this.letterO,
            // alpha: {
            //     from: 0,
            //     to: 1
            // },
            visible: 1,
            duration: 400,
            onStart: () => {
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
            this.game.canvas.width/2 + 90,
            y,
            text,
            {
                "font": "55px Blossom",
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

    swapScene(index){
        if(this.changeScene === 1){
            let scene = ["","","","","","","","guernica","","",];
            this.game.sound.stopAll();
            this.scene.start("preloader", {name: scene[index]});
            this.scene.stop(this)
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
                case "Enter":
                    if(this.changeScene !== 1){
                        this.changeScene = 1;
                        this.swapScene(indexActive);
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
                case 0:
                    if(this.changeScene !== 1){
                        this.changeScene = 1;
                        this.swapScene(indexActive);
                    }
                    break;
                default:
            }
        });
    }
}

