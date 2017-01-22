
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class OfficerWaverton extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
    super(game, x, y, 'officerWaverton');
    this.width = (this.game.height/this.height) * this.width;
    this.height = this.game.height;
  	this.anchor.setTo(0,.5);

  	this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default OfficerWaverton;
