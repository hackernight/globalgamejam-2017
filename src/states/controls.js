
class Controls extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    let text1 = this.add.text(this.game.world.centerX, this.game.height * 0.2,
      'We recommend using an Xbox 360 controller\nfor the optimal WWIAFTM experience', style);
    text1.anchor.set(0.5);

    let text2 = this.add.text(this.game.world.centerX, this.game.height * 0.4,
      'Xbox Controller\nMove arms: L/R stick\nFire: L/R Trigger', style);
    text2.anchor.set(0.5);

    let text3 = this.add.text(this.game.world.centerX, this.game.height * 0.7,
        'Keyboard\nFlail arms wildly: F\nFire left: 1\nFire right: 2', style);
    text3.anchor.set(0.5);

    this.music = this.game.sound.play('music-intro', 0.4);

  }

  update() {
    if (this.game.global.controlSettings.shouldShootRight() || this.game.global.controlSettings.shouldShootLeft() ||
      this.game.global.controlSettings.isPressingX() || this.game.global.controlSettings.isPressingA() ||
      this.game.global.controlSettings.isChangingRightAngle() || this.game.global.controlSettings.isChangingLeftAngle()) {
        this.game.state.start('menu');
    }


  }


  shutdown() {
      this.music.stop();
  }

}

export default Controls;
