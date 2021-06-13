import Phaser from 'phaser'
import GuernicaScene from "./GuernicaScene";
import Lvl1Scene from "./lvl1Scene";
import Lvl2Scene from "./lvl2Scene";
import Lvl3Scene from "./lvl3Scene";
import Lvl4Scene from "./lvl4Scene";
import Lvl5Scene from "./lvl5Scene";
import Lvl6Scene from "./lvl6Scene";
import Lvl7Scene from "./lvl7Scene";
import Lvl9Scene from "./lvl9Scene";
import Lvl10Scene from "./lvl10Scene";

export default class PreloaderScene extends Phaser.Scene{
    init(data){
        this.data = data;
    }

    constructor() {
        super({key: 'preloader'});
    }

    preload () {
        //Charge Scene and ressource
        switch (this.data.name) {
            case "guernica":
                this.cameras.main.setBackgroundColor('#000000');

                this.scene.add("guernica", GuernicaScene, false);
                this.load.image('guernicabg', 'assets/images/Levels/LVL8/guernica.PNG');
                this.load.image('guernicabg2', 'assets/images/Levels/LVL8/guernica2.PNG');

                this.load.image('guernica1', 'assets/images/Levels/LVL8/l enfant.PNG');
                this.load.image('guernica2', 'assets/images/Levels/LVL8/la colombe.PNG');
                this.load.image('guernica3', 'assets/images/Levels/LVL8/la fleur.PNG');
                this.load.image('guernica4', 'assets/images/Levels/LVL8/la jambe boiteuse.PNG');
                this.load.image('guernica5', 'assets/images/Levels/LVL8/la lampe.PNG');
                this.load.image('guernica6', 'assets/images/Levels/LVL8/le cheval.PNG');
                this.load.image('guernica7', 'assets/images/Levels/LVL8/le cri.PNG');
                this.load.image('guernica8', 'assets/images/Levels/LVL8/le fantome.PNG');
                this.load.image('guernica9', 'assets/images/Levels/LVL8/le poignard.PNG');
                this.load.image('guernica10', 'assets/images/Levels/LVL8/le taureau.PNG');

                this.load.image('mask', 'assets/images/Levels/LVL8/mask.png');

                this.load.spritesheet("player", "assets/images/Character/Statique/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
                this.load.spritesheet("player-walk", "assets/images/Character/Avancer/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
                this.load.spritesheet("player-jump", "assets/images/Character/Sauter/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});
                this.load.spritesheet("player-fall", "assets/images/Character/Tomber/spritesheet.png", {"frameWidth": 773, "frameHeight": 915});

                break;
            case "lvl1":
                this.scene.add("lvl1", Lvl1Scene, false);
                break;
            case "lvl2":
                this.scene.add("lvl2", Lvl2Scene, false);
                break;
            case "lvl3":
                this.scene.add("lvl3", Lvl3Scene, false);
                break;
            case "lvl4":
                this.scene.add("lvl4", Lvl4Scene, false);
                break;
            case "lvl5":
                this.scene.add("lvl5", Lvl5Scene, false);
                break;
            case "lvl6":
                this.scene.add("lvl6", Lvl6Scene, false);
                break;
            case "lvl7":
                this.scene.add("lvl7", Lvl7Scene, false);
                break;
            case "lvl9":
                this.scene.add("lvl9", Lvl9Scene, false);
                break;
            case "lvl10":
                this.scene.add("lvl10", Lvl10Scene, false);
                break;
            default:
        }

    }

    complete(nameScene){
        this.scene.start(nameScene)
    }

    create(){
        switch (this.data.name) {
            case "guernica":
                this.instructionGuernica();
                break;
            case "lvl1":
                 this.scene.start("lvl1")
                break;
            case "lvl2":
                 this.scene.start("lvl2")
                break;
            case "lvl3":
                 this.scene.start("lvl3")
                break;
            case "lvl4":
                 this.scene.start("lvl4")
                break;
            case "lvl5":
                 this.scene.start("lvl5")
                break;
            case "lvl6":
                 this.scene.start("lvl6")
                break;
            case "lvl7":
                 this.scene.start("lvl7")
                break;
            case "lvl9":
                 this.scene.start("lvl9")
                break;
            case "lvl10":
                 this.scene.start("lvl10")
                break;
            default:
        }
    }

    instructionGuernica(){
        let startx = 450;
        let starty = 530;
        const words = String("Aidez Ryoko a trouver les dix symboles de l’oeuvre").split(" ");
        const decal = [0,130,270,320,500,570,650,830,900];
        for(let i=0;i<words.length;i++) {
            words[i] = this.add.text(
                startx + decal[i],
                starty,
                words[i],
                {
                    "font": "55px Blossom",
                    "fill": "#ffffff",
                }).setOrigin(0).setVisible(false).setAlpha(0)

            this.tweens.add({
                targets: words[i],
                y: words[i].y - 30,
                ease: 'Linear',
                alpha: {
                    from: 0,
                    to: 1
                },
                visible: 1,
                duration: 500,
                delay: 500 * (i),
                onComplete: () => {
                    if(i === words.length - 1){
                        setTimeout(() => {
                            this.complete(this.data.name)
                        }, 3000)
                    }
                }
            });
        }
    }


}
