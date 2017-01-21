//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyPointy extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y) {
        super(game, x, y, 'enemyPointy');
        this.game.add.existing(this);
    }

    //Code ran on each frame of game
    update() {

    }

}

export default EnemyPointy;
