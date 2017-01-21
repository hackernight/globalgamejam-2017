
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class PlayerArm extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
    super(game, x, y, 'playerArm');
    this.anchor.setTo(0.5, 0.5);
    // this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {
    this.angle += 1;
  }

}

export default PlayerArm;
