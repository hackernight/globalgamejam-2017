
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class PlayerBody extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game) {
    super(game, game.world.centerX, game.world.centerY, 'playerBody');
    this.anchor.setTo(0.5, 0.5);
    this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default PlayerBody;
