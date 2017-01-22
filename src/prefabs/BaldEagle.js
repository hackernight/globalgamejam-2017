
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class BaldEagle extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
    super(game, x, y, 'BaldEagle');
    this.anchor.setTo(.25,.25);
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    const scale = 0.30;
    this.scale.setTo(scale, scale);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default BaldEagle;
