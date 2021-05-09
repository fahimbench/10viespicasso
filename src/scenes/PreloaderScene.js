import Phaser from 'phaser'
import GuernicaScene from "./GuernicaScene";

// import importRessources from '../helpers/ressources'
// import ressourcesJson from '../config/ressources'

export default class PreloaderScene extends Phaser.Scene{



    init(data){
        this.data = data;
        this.isComplete = 0;
    }

    constructor() {
        super({key: 'preloader'});
    }

    preload () {
        this.screenCenterX = this.game.canvas.width / 2
        this.screenCenterY = this.game.canvas.height / 2

        this.progressBar = this.add.graphics()
        this.progressBox = this.add.graphics()
        this.progressBox.fillStyle(0x000000, 0.8)
        this.progressBox.fillRect(this.screenCenterX - 160, this.screenCenterY + 100, 304, 34)

        this.percentText = this.make.text({
            x: this.screenCenterX,
            y: this.screenCenterY + 120,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(.5,.5)

        this.assetText = this.make.text({
            x: this.screenCenterX,
            y: this.screenCenterY + 70,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#000000'
            }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            this.percentText.setText(parseInt(value * 100) + '%')
            this.progressBar.clear()
            this.progressBar.fillStyle(0xffffff, 1)
            this.progressBar.fillRect(this.screenCenterX - 158, this.screenCenterY + 102, 300 * value, 30)
        })

        this.load.on('fileprogress', (file) => {
            console.log('Loading asset: ' + file.key)
            this.assetText.setText('Loading asset: ' + file.key)
        })

        this.load.on('complete', () => {

        });

        //Charge Scene and ressource
        switch (this.data.name) {
            case "guernica":
                this.scene.add("guernica", GuernicaScene, false);
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
                break;
            default:
        }

    }

    complete(nameScene){
        this.scene.start(nameScene)
    }

    create(){
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.percentText.destroy();
        this.assetText.destroy();
        setTimeout(() => {
            this.isComplete = 1;
        }, 1000)

    }

    update() {
        const enterKey = this.input.keyboard.addKey("enter");
        let pad = Phaser.Input.Gamepad.Gamepad;

        if (this.input.gamepad.total) {
            pad = this.input.gamepad.getPad(0);
        }
        pad;
        if(this.isComplete && (enterKey.isDown || pad.A)){
            this.complete(this.data.name)
        }
    }
}
