import CenteredSprite from '../prefabs/centeredSprite';

class Menu extends Phaser.State {

    init(gameWon) {
        this.gameWon = gameWon;
    }

    create() {
        let message = 'Gameover';
        let tween;
        if (this.gameWon === true) {
            message = "Officer Waverton can finally rest,\n his partner's brutal murder avenged."
            this.music = this.game.sound.play('music-victory', 0.4);
        } else {
            message = "Officer Waverton failed\n in his quest for justice.\n The city remains in danger\n from the Gang of 99."
            this.music = this.game.sound.play('music-gameover', 0.4);
            const wipeoutBG = new CenteredSprite(this.game, 'wipeout-bg');
            const wipeoutText = this.game.add.sprite(0, this.game.world.centerY, 'wipeout-text');
            wipeoutText.anchor.set(0.5);
            wipeoutText.x = -wipeoutText.width;
            tween = this.game.add.tween(wipeoutText).to({
                    x: this.game.world.centerX
                },
                1500,
                Phaser.Easing.Bounce.Out,
                true
            );
            tween.chain(this.createFadeoutTween(wipeoutBG), this.createFadeoutTween(wipeoutText));
        }

        message += "\n(Press X to continue)"

        if (!tween) {
            this.createText(message);
        } else {
            tween.onComplete.add(() => {
                this.createText(message);
            }, this);
        }
    }

    createFadeoutTween(object) {
        return this.game.add.tween(object).to(
            {alpha: 0.3},
            2000,
            Phaser.Easing.Linear.In,
            true
        );
    }

    createText(message) {
        const style = {
            font: "65px Arial",
            fill: "#ffffff",
            stroke: 0x333333,
            strokeThickness: 5,
            align: "center"
        };
        console.log(this.game);
        const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
        text.anchor.set(0.5);
        text.alpha = 0;
        this.game.add.tween(text).to(
            {alpha:1},
            2000,
            Phaser.Easing.Linear.In,
            true
        );
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
