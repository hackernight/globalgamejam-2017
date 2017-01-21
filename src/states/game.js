import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';
import Projectile from '../prefabs/projectile';

class Game extends Phaser.State {

    create() {
        new PlayerBody(this.game);
        const right = new PlayerArm(this.game, 0);
        const left = new PlayerArm(this.game, 180);
        for (let i = 0; i < 10; ++i) {
            new EnemyPointy(this.game);
        }
        this.game.input.onDown.add(() => {
            this.shoot();
        });
    }

    update() {

    }

    shoot() {
      console.log("I shot");
      new Projectile(this.game, 100, 100);
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
