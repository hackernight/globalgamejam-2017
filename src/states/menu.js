import MenuText from '../prefabs/menuText';
import BackgroundImage from '../prefabs/backgroundImage';

class Menu extends Phaser.State {

    create() {
        new BackgroundImage(this.game, 'introscreen');
        new MenuText(this.game, this.game.height * 0.2, 'Detective Waverton and the 99 Red Balloons');
        const startText = new MenuText(this.game, this.game.height * 0.5, 'Shoot to start!');
        const startY = startText.y;

        var tween = this.game.add.tween(startText).to({
            y: startY + 50
        }, 500, Phaser.Easing.Exponential.Out, true, 0, -1);

        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
        tween.yoyo(true);

        this.game.input.onDown.add(() => {
            this.startGame();
        });

        this.game.input.gamepad.start();

        this.pad1 = this.game.input.gamepad.pad1;

        if (this.pad1.connected) {
            this.addButtons();
        }
        this.pad1.addCallbacks(this, {
            onConnect: this.addButtons
        });

        this.music = this.game.sound.play('music-intro', 0.4);
        this.music.loop = true;
    }

    onDown(button, value) {
        this.startGame();
    }

    addButtons() {
        this.leftTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        this.rightTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

        if (!!this.leftTrigger) {
            this.leftTrigger.onDown.add(this.onDown, this);
        }
        if (!!this.rightTrigger) {
            this.rightTrigger.onDown.add(this.onDown, this);
        }
    }


    update() {}

    startGame() {
        this.game.state.start('game');
    }

    shutdown() {
        if (!!this.leftTrigger) {
            this.leftTrigger.onDown.removeAll();
        }
        if (!!this.rightTrigger) {
            this.rightTrigger.onDown.removeAll();
        }
        this.music.stop();
    }

}

export default Menu;
