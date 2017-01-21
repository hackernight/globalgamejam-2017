import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';
class Game extends Phaser.State {


    create() {
        this.player = new PlayerBody(this.game);
        this.gun = this.game.add.weapon(30, 'projectile');
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

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
            this.enemies.add(new EnemyPointy(this.game, this.player.x - 20, this.player.y - 200 - i));
        }
        this.game.input.onDown.add(() => {
            this.shoot();
        });
    }

    update() {
        this.game.physics.arcade.overlap(this.enemies, this.gun.bullets, this.bulletCollision, null, this);
    }

    bulletCollision(enemy, bullet) {
        enemy.kill();
        bullet.kill();
    }

    shoot() {
        this.gun.fire(this.player);
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
