import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';
import Projectile from '../prefabs/projectile';

class Game extends Phaser.State {

    create() {
<<<<<<< HEAD
        new PlayerBody(this.game);
        this.right = new PlayerArm(this.game, 0);
        this.left = new PlayerArm(this.game, 180);
=======
        this.projectiles = [];
        this.player = new PlayerBody(this.game);
        const right = new PlayerArm(this.game, 0);
        const left = new PlayerArm(this.game, 180);
>>>>>>> b787b6b9b040cac5f252e8a5c89015ae5f47ab6c
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
<<<<<<< HEAD
        this.input.onDown.add(this.endGame, this);

        this.game.input.gamepad.start();

        this.pad1 = this.game.input.gamepad.pad1;

        
=======
        this.game.input.onDown.add(() => {
            this.shoot();
        });
>>>>>>> b787b6b9b040cac5f252e8a5c89015ae5f47ab6c
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

    shoot() {
        console.log("I shot");
        this.projectiles.push(new Projectile(this.game, this.player.x, this.player.y));
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
