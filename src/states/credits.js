class Credits extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    let message = 'Made in St. Louis for Global Game Jam 2017\nEvan Cobb\nSam Jantz\nMark Hall\nPeter Zylka\nBecky Asbury';

    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    var text = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
    text.anchor.set(0.5);

    this.input.onDown.add(this.restartGame, this);
    this.music = this.game.sound.play('music-intro', 0.4);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }

  update() {}

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

  shutdown() {
      this.music.stop();
  }

}

export default Credits;
