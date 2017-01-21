
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Projectile extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'projectile', frame);
    this.scale.setTo(5, 5);
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {
      this.x += 15;
  }

}

export default Projectile;
