class Menu extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        text.anchor.set(0.5);

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
