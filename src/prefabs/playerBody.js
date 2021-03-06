//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class PlayerBody extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, hp) {
        super(game, game.world.centerX, game.world.centerY, 'playerBody');
        this.anchor.set(0.5);
        this.health = hp;
        this.maxHealth = hp;
        this.scale.set(0.35);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
    }

    //Code ran on each frame of game
    update() {

    }

}

export default PlayerBody;
