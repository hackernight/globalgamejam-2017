
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class MidArmSection extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, parentAngle, sectionChildren) {
    super(game, x, y, 'midArmSection');
    this.wobbledyFactor=16;
    this.angle = parentAngle;
    this.parentAngle = parentAngle;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(.5,.5);
    this.pivot.x = -this.width/2;
    this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {
  	if(this.body.angularVelocity != 0) {
  		this.body.angularVelocity += this.smallestAngle(this.parentAngle, this.angle) - (Math.pow(this.body.angularVelocity,2) / (this.body.angularVelocity*this.wobbledyFactor)) - Math.sign(this.body.angularVelocity) * 2;
 	} else {
		this.body.angularVelocity += this.smallestAngle(this.parentAngle,this.angle);
 	}
  	console.log("first: " + (this.parentAngle - this.angle));
  	console.log("second: " + (Math.pow(this.body.angularVelocity,2) / (this.body.angularVelocity*8)));
  }

  smallestAngle(a1, a2) {
  	var returnAngle = a1-a2;
  	if(returnAngle >= 180) {
  		return returnAngle - 360;
  	} else if (returnAngle <= -180) {
  		return returnAngle + 360;
  	}
  	return returnAngle;
  }

  changeBase(X,Y,parentAngle) {
  	//console.log("X: " + X + "   Y: " + Y)
  	this.x = X;
  	this.y = Y;
  	this.parentAngle = parentAngle;
  }

}

export default MidArmSection;
