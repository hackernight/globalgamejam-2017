//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class PlayerArm extends Phaser.Sprite {
    //initialization code in the constructor
    constructor(game, angle) {
        super(game, game.world.centerX, game.world.centerY, 'playerArm');
        this.anchor.setTo(0.5, 0.5);
        this.pivot.x = -55;
        this.angle = angle;
        this.game.add.existing(this);
    }

    //Code ran on each frame of game
    update() {
    }

    setTargetAngle(angleIn) {
        this.angle = angleIn;
    }
}

export default PlayerArm;
