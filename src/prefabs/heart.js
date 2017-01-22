
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Heart extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
    super(game, x, y, 'heart');
    game.add.existing(this);
    this.animations.add('pump');
    this.animations.play('pump', 20, true);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Heart;
