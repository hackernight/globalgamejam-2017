import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';
import Projectile from '../prefabs/projectile';

class Game extends Phaser.State {

    create() {
        this.projectiles = [];
        this.player = new PlayerBody(this.game);
        const right = new PlayerArm(this.game, 0);
        const left = new PlayerArm(this.game, 180);
        for (let i = 0; i < 10; ++i) {
            // const minimumEdgeBuffer = 100;
            // let x = this.game.rnd.integerInRange(minimumEdgeBuffer, this.game.world.width / 2 - minimumEdgeBuffer);
            // if (x > this.game.world.width / 4) {
            //     x += this.game.world.width / 2;
            // }
            // let y = this.game.rnd.integerInRange(minimumEdgeBuffer, this.game.world.height / 2 - minimumEdgeBuffer);
            // if (y > this.game.world.height / 4) {
            //     y += this.game.world.height / 2;
            // }
            new EnemyPointy(this.game, this.player.x + 200 + i, this.player.y, this.projectiles);
        }
        this.game.input.onDown.add(() => {
            this.shoot();
        });
    }

    update() {
            const deadProjectiles = [];
            for (let i = 0; i < this.projectiles.length; i++) {
                if (!this.projectiles[i].alive) {
                    deadProjectiles.push(i);
                }
            }
            deadProjectiles.sort();
            deadProjectiles.reverse();
            for (const deaddie of deadProjectiles){
                //this.projectiles.remove(deaddie);
                this.projectiles.splice(deaddie, 1);
            }
    }

    shoot() {
        console.log("I shot");
        this.projectiles.push(new Projectile(this.game, this.player.x, this.player.y));
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
