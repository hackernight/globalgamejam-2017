class Menu extends Phaser.State {

  constructor() {
    super();
  }
  init(gameWon, stillAlive){
    this.gameWon = gameWon;
    this.stillAlive = stillAlive;

  }

  create() {
    let message = 'Gameover';
    if (this.gameWon==true){
      if (this.stillAlive==true){
          message = "Officer Waverton can finally rest,\n his partner's brutal murder avenged."
      }
      else {
          message = "Officer Waverton selflessly gave his life\nto ensure the Luftballoons wouldn't hurt\nanyone else, ever again"
      }
    }
    else {
      message = "Officer Waverton failed\n in his quest for justice.\n The city remains in fear\nof the Gang of 99."
    }

    message += "\n(Press X to continue)"

    var style = {
    font: "65px Arial",
    fill: "#ffffff",
    stroke: 0x333333,
    strokeThickness: 5,
    align: "center"
};
    var text = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    if (this.gameWon==true){
      this.music = this.game.sound.play('music-victory', 0.4);
    }
    else {
      this.music = this.game.sound.play('music-gameover', 0.4);
    }
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }


  update() {
if (this.game.global.controlSettings.isPressingX()){
  this.restartGame();
}

  }

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

  shutdown() {
      if (!!this.xButton) {
          this.xButton.onDown.removeAll();
      }
      this.music.stop();
  }

}

export default Menu;
