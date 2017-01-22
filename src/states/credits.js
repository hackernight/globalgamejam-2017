import Flippybit from '../prefabs/flippyBit';
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
    if(this.flippyBit) {
      this.flippyBit.destroy();
    }

    this.pageid = this.pageid + 1;
    if (this.pageid == 2) {
      this.text.text = "Evan Cobb\n\nCoding, Art"
    }
    if (this.pageid == 3) {
      this.flippyBit = new Flippybit(this.game, this.game.world.centerX, this.game.world.centerY-150);
      this.text.text = "D.J. Flippybit (Sam Jantz)\n\nMusic, Art"
    }
    if (this.pageid == 4) {
      this.text.text = "D.J. Bald Eagle (Mark Hall)\n\nProject Management, Art, Story"
    }
    if (this.pageid == 5) {
      this.text.text = "Peter Zylka\n\nCoding, Art"
    }
    if (this.pageid == 6) {
      this.text.text = "Becky Asbury\n\nCoding, Story"
    }
    if (this.pageid == 7) {
      this.text.text = "Jokes 2 Far thanks you for playing!\n\nCheck out our other game jam titles:\nBrushie Brushie\n&\nRussian Judge Redemption"
    }

    if (this.pageid > 7) {
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () =>{this.restartGame();}, this);

    }
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }

  update() {

      if (this.game.global.controlSettings.shouldShootRight() || this.game.global.controlSettings.shouldShootLeft() ||
        this.game.global.controlSettings.isPressingX() || this.game.global.controlSettings.isPressingA() ||
        this.game.global.controlSettings.isChangingRightAngle() || this.game.global.controlSettings.isChangingLeftAngle()) {
          this.game.state.start('menu');
        }

  }

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

  shutdown() {
      this.music.stop();
  }

}

export default Credits;
