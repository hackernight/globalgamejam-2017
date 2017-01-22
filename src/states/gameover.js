class Menu extends Phaser.State {

  constructor() {
    super();
  }
  init(gameWon){
    this.gameWon = gameWon;
  }

  create() {
    let message = 'Gameover';
    if (this.gameWon==true){
      message = "Officer Waverton can finally rest,\n his partner's brutal murder avenged."
    }
    else {
      message = "Officer Waverton failed\n in his quest for justice.\n The city remains in danger\n from the Gang of 99."
    }

    message += "\n(Press X to continue)"

    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    var text = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    this.music = this.game.sound.play('music-gameover', 0.4);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }


  update() {
if (this.game.global.controlSettings.isPressingOther()){
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
