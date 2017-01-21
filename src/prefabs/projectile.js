
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Projectile extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'projectile', frame);
    this.scale.setTo(5, 5);
    this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Projectile;
