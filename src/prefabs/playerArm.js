import MidArmSection from '../prefabs/midArmsection';
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class PlayerArm extends Phaser.Sprite {
    //initialization code in the constructor

    constructor(game, angle, gun) {
        super(game, game.world.centerX, game.world.centerY, 'playerArm');
        this.anchor.setTo(0.5, 0.5);
        this.pivot.x = -55;
        this.angle = angle;
        this.game.add.existing(this);
        this.gun = gun;
        this.nextSection = new MidArmSection(
          game,
          this.getTipX(),
          this.getTipY(),
          this.angle,
          1
        );

        this.events.onKilled.add(() => {
            this.nextSection.kill();
        });
    }

    //Code ran on each frame of game
    update() {
    }

    setTargetAngle(angleIn) {
        this.angle = angleIn;
        this.nextSection.changeBase(this.getTipX(), this.getTipY(), this.angle)
    }

    getTipX() {
      return (Math.cos(Phaser.Math.degToRad(this.angle)) * (this.width+25)) + this.x;
    }

    getTipY() {
      return (Math.sin(Phaser.Math.degToRad(this.angle)) * (this.width+25)) + this.y;
    }

    fireGun() {
      this.gun.fireAngle = this.angle;
      this.gun.fireFrom.x = this.getTipX();
      this.gun.fireFrom.y = this.getTipY();

      this.gun.fire(this.player);
      const key = this.game.rnd.pick(this.game.global.fireSounds);
      this.game.sound.play(key, 0.4);
    }
}

export default PlayerArm;
