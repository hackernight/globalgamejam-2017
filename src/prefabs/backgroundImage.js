class BackgroundImage extends Phaser.Sprite {

    constructor(game, key) {
        super(game, game.world.centerX, game.world.centerY, key);
        this.anchor.setTo(0.5, 0.5);
        const ratio = this.findNeededRatio(game, this);
        this.scale.setTo(ratio, ratio);
        game.add.existing(this);
    }

    update() {}

    findNeededRatio(bigger, smaller) {
        const heightRatio = bigger.height / smaller.height;
        const widthRatio = bigger.width / smaller.width;
        return Math.max(heightRatio, widthRatio);
    }

}

export default BackgroundImage;
