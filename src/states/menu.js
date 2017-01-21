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
    }

    onDown(button, value) {

        if (button.buttonCode === Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) {
            this.startGame();
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_LEFT_TRIGGER) {
            this.startGame();
        }

    }

    addButtons() {

        this.leftTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        this.rightTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

        this.leftTrigger.onDown.add(this.onDown, this);
        this.rightTrigger.onDown.add(this.onDown, this);
    }


    update() {}

    startGame() {
        if (!!this.leftTrigger) {
            this.leftTrigger.onDown.removeAll();
        }
        if (!!this.rightTrigger) {
            this.rightTrigger.onDown.removeAll();
        }
        this.game.state.start('game');
    }

}

export default Menu;
