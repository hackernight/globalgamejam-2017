class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create(gameWon) {
    let message = 'Gameover';
    if (gameWon){
      message = "Success"; //"Officer Waverton can finally rest, his partner's brutal murder avenged."
    }
    else {
      message = "Failure"; //"Officer Waverton failed in his quest for justice.  The city remains in danger from the Gang of 99."
    }

    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, message, {
      font: '42px Arial', fill: '#ffffff', align: 'center', wordWrap: true
    });
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    this.input.onDown.add(this.restartGame, this);
    this.music = this.game.sound.play('music-gameover', 0.4);
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

export default Menu;
