import CenteredSprite from '../prefabs/centeredSprite';

class Menu extends Phaser.State {

    init(gameWon) {
        this.gameWon = gameWon;
    }

    create() {
        let message = 'Gameover';
        if (this.gameWon === true) {
            message = "Officer Waverton can finally rest,\n his partner's brutal murder avenged."
            this.music = this.game.sound.play('music-victory', 0.4);
        } else {
            message = "Officer Waverton failed\n in his quest for justice.\n The city remains in danger\n from the Gang of 99."
            this.music = this.game.sound.play('music-gameover', 0.4);
            new CenteredSprite(this.game, 'wipeout-bg');
            const wipeoutText = this.game.add.sprite(0, this.game.world.centerY, 'wipeout-text');
            wipeoutText.anchor.set(0.5);
            wipeoutText.x = -wipeoutText.width;
            this.game.add.tween(wipeoutText).to(
                {x:this.game.world.centerX},
                1500,
                Phaser.Easing.Bounce.Out,
                true
            );
        }

        message += "\n(Press X to continue)"

        var style = {
            font: "65px Arial",
            fill: "#ffffff",
            stroke: 0x333333,
            strokeThickness: 5,
            align: "center"
        };
        var text = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
        text.anchor.set(0.5);
    }


    update() {
        if (this.game.global.controlSettings.isPressingX()) {
            this.restartGame();
        }
    }

    restartGame() {
        this.game.state.start('menu');
    }

    shutdown() {
        if (!!this.xButton) {
            this.xButton.onDown.removeAll();
        }
        this.music.stop();
    }

}

export default Menu;
