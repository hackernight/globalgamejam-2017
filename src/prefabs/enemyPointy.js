//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyPointy extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, player) {
        super(game, x, y, 'enemyBalloon');
        game.add.existing(this);
        this.Player = player;
        const scale = 0.15;
        this.scale.setTo(scale, scale);
        this.anchor.setTo(0.5,0.5);
    }

    //Code ran on each frame of game
    update() {

      this.game.physics.arcade.moveToObject(this, this.Player,120);

    }


}

export default EnemyPointy;
