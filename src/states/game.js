import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';

class Game extends Phaser.State {

    create() {
        new PlayerBody(this.game);
        this.right = new PlayerArm(this.game, 0);
        this.left = new PlayerArm(this.game, 180);
        for (let i = 0; i < 10; ++i) {
            new EnemyPointy(this.game);
        }
        this.input.onDown.add(this.endGame, this);

        this.game.input.gamepad.start();

        this.pad1 = this.game.input.gamepad.pad1;

        
    }

    dump() {
        console.log("LEFTX: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X));
        console.log("LEFTY: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y));
        console.log("RIGHTX: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));
        console.log("RIGHTY: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y));
    }

    update() {
      if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) != 0 ||
       this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) != 0) {
        this.dump();
      }
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
