import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';

class Game extends Phaser.State {

  create() {
    new PlayerBody(this.game);
    const left = new PlayerArm(this.game, this.game.world.centerX + 48, this.game.world.centerY);
    // const right = new PlayerArm(this.game, this.game.world.centerX - 48, this.game.world.centerY);
    // console.log(this.pivot.x);
    this.input.onDown.add(this.endGame, this);
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
