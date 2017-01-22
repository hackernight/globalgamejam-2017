
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class FlippyBit extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'flippyBit', frame);
    game.add.existing(this);
    this.animations.add('spin');
    this.animations.play('spin', 20, true);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default FlippyBit;
