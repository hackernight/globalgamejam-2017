import MidArmSection from '../prefabs/midArmsection';
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class PlayerArm extends Phaser.Sprite {
    //initialization code in the constructor

    constructor(game, angle, gun) {
        super(game, game.world.centerX, game.world.centerY, 'playerArm');
        this.wobbledyFactor=8;
        this.springyFactor = 2;
        this.anchor.setTo(0.5, 0.5);
        this.pivot.x = -55;
        this.angle = angle;
        this.parentAngle = angle;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.gun = gun;
        this.nextSection = new MidArmSection(
          game,
          this.getTipX(),
          this.getTipY(),
          this.angle,
          this.gun,
          1
        );

        this.events.onKilled.add(() => {
            this.nextSection.kill();
        });
    }

    //Code ran on each frame of game
    update() {
      if(this.body.angularVelocity != 0) {
        this.body.angularVelocity += this.smallestAngle(this.parentAngle, this.angle) * this.springyFactor - (Math.pow(this.body.angularVelocity,2) / (this.body.angularVelocity*this.wobbledyFactor)) - Math.sign(this.body.angularVelocity) * 2;
      } else {
        this.body.angularVelocity += this.smallestAngle(this.parentAngle,this.angle) * this.springyFactor;
      }
      if(this.nextSection) {
        this.nextSection.changeBase(this.getTipX(), this.getTipY(), this.angle);
      }
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

    setTargetAngle(angleIn) {
        this.parentAngle = angleIn;
    }


    getTipX() {
      return (Math.cos(Phaser.Math.degToRad(this.angle)) * (this.width+25)) + this.x;
    }

    getTipY() {
      return (Math.sin(Phaser.Math.degToRad(this.angle)) * (this.width+25)) + this.y;
    }

    fireGun() {
      this.nextSection.fireGun();
    }
}

export default PlayerArm;
