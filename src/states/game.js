import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';

class Game extends Phaser.State {

    create() {
        new PlayerBody(this.game);
        const right = new PlayerArm(this.game, 0);
        const left = new PlayerArm(this.game, 180);
        for (let i = 0; i < 10; ++i) {
            new EnemyPointy(this.game);
        }
        this.input.onDown.add(this.endGame, this);
    }

    update() {

    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
