export const fullscreen = function(phaser) {
        const FKey = phaser.input.keyboard.addKey('F');

        FKey.on('down',  () => {

            if (phaser.scale.isFullscreen)
            {
                phaser.scale.stopFullscreen();
            }
            else
            {
                phaser.scale.startFullscreen();
            }

        }, this);
};
