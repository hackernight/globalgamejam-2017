
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class MidArmSection extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, parentAngle, sectionChildren) {
    super(game, x, y, 'midArmSection');
    this.angle = parentAngle;
    this.parentAngle = parentAngle;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(.5,.5); 
    this.pivot.x = -this.width/2;
    this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {

  }

  changeBase(X,Y,parentAngle) {
  	console.log("X: " + X + "   Y: " + Y)
  	this.x = X;
  	this.y = Y;
  	this.parentAngle = parentAngle;
  }

}

export default MidArmSection;
