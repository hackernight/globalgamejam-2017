
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class StaticPositionBalloon extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
  	var enemies = ['enemyVillain','enemyZepplin','enemyAviator']
    super(game, x, y, game.rnd.pick(enemies));
    this.anchor.setTo(.5,.5);
    this.up = false;
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    const scale = 0.15;
    this.scale.setTo(scale, scale);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default StaticPositionBalloon;
