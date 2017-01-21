class MenuText extends Phaser.Text {

    constructor(game, y, text) {
        const style = {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center'
        };
        super(game, game.width * 0.5, y, text, style);
        this.anchor.setTo(0.5, 0.5);
        game.add.existing(this);
    }

    update() {}

}

export default MenuText;
