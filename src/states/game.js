import PlayerBody from '../prefabs/playerBody';

class Game extends Phaser.State {

  create() {
    new PlayerBody(this.game);

    this.input.onDown.add(this.endGame, this);
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
