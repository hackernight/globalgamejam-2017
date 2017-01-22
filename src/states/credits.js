class Credits extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.pageid = 1;
    let message = 'Made in St. Louis for Global Game Jam 2017';

    var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    this.text = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
    this.text.anchor.set(0.5);

    this.input.onDown.add(this.restartGame, this);
    this.music = this.game.sound.play('music-intro', 0.4);

    this.game.time.events.loop(Phaser.Timer.SECOND * 2, () => {
          this.nextPage();
    }, this);
  }

  nextPage(){
    this.pageid = this.pageid + 1;
    if (this.pageid == 2) {
      this.text.text = "Evan Cobb - Coding, Art"
    }
    if (this.pageid == 3) {
      this.text.text = "D.J. Flippybit (Sam Jantz) - Music, Art"
    }
    if (this.pageid == 4) {
      this.text.text = "D.J. Bald Eagle (Mark Hall) - Project Management, Art, Story"
    }
    if (this.pageid == 5) {
      this.text.text = "Peter Zylka - Coding"
    }
    if (this.pageid == 6) {
      this.text.text = "Becky Asbury - Coding, Story"
    }
    if (this.pageid == 7) {
      this.text.text = "Jokes 2 Far thanks you for playing!"
    }
    if (this.pageid > 7) {
      this.restartGame();
    }
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
