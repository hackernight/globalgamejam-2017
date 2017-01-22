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

    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    var text = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    this.game.input.gamepad.start();

    this.pad1 = this.game.input.gamepad.pad1;
    if (this.pad1.connected) {
        this.addButtons();
    }
    this.pad1.addCallbacks(this, {
        onConnect: this.addButtons
    });

    this.music = this.game.sound.play('music-gameover', 0.4);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }

  addButtons() {
        this.xButton = this.pad1.getButton(Phaser.Gamepad.XBOX360_X);

        if (!!this.xButton) {
            this.xButton.onDown.add(this.restartGame, this);
        }
  }

  update() {}

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
