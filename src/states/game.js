import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyPointy from '../prefabs/enemyPointy';
import Heart from '../prefabs/heart';

class Game extends Phaser.State {

    create() {
        const health = 3;
        this.hearts = [];
        this.player = new PlayerBody(this.game, health);

        for (let i = 0; i < health; ++i) {
            this.hearts.push(new Heart(this.game, i * 90, 0));
        }

        this.player.enableBody = true;
        this.player.physicsBodyType = Phaser.Physics.ARCADE;
        this.gun = this.game.add.weapon(30, 'projectile');
        this.right = new PlayerArm(this.game, 0, this.gun, this.shoot);
        this.left = new PlayerArm(this.game, 180, this.gun, this.shoot);
        this.player.events.onKilled.add(() => {
            this.right.kill();
            this.left.kill();
            this.gun.destroy();

            this.game.state.start('gameover', false, true);
        });

        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        this.game.time.events.loop(Phaser.Timer.SECOND, this.spawnEnemy, this);

        const enemyCount = 5;
        for (let i = 0; i < enemyCount; ++i) {

            this.spawnEnemy();

        }

        this.game.input.gamepad.start();

        this.pad1 = this.game.input.gamepad.pad1;

        this.addButtons();

        this.game.input.onDown.add(() => {
            this.shoot();
        });
        this.music = this.game.sound.play('music-level', 0.4);
    }

    dump() {
        //console.log("LEFTX: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X));
        //console.log("LEFTY: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y));
        //console.log("RIGHTX: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X));
        //console.log("RIGHTY: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y));
    }

    onDown(button, value) {
        if (button.buttonCode === Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) {
            this.right.fireGun();
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_LEFT_TRIGGER) {
            this.left.fireGun();
        }

    }

    addButtons() {
        this.leftTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        this.rightTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

        if (!!this.leftTrigger) {
            this.leftTrigger.onDown.add(this.onDown, this);
        }
        if (!!this.rightTrigger) {
            this.rightTrigger.onDown.add(this.onDown, this);
        }
    }

    update() {
        if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) != 0 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) != 0) {
            this.left.setTargetAngle(this.getAngle(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X), this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)));
        }

        if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) != 0 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) != 0) {
            this.right.setTargetAngle(this.getAngle(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X), this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y)));
        }
        this.game.physics.arcade.overlap(this.enemies, this.gun.bullets, this.bulletCollision, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.player, this.playerEnemyCollision, null, this);
    }

    getAngle(X, Y) {
        return Phaser.Math.radToDeg(Phaser.Math.angleBetween(0, 0, X, Y));
    }

    bulletCollision(enemy, bullet) {
        enemy.kill();
        const key = this.game.rnd.pick(this.game.global.killSounds);
        this.game.sound.play(key, 0.4);
        bullet.kill();
    }

    playerEnemyCollision(player, enemy) {
        enemy.kill();
        const key = this.game.rnd.pick(this.game.global.deathSounds);
        this.game.sound.play(key, 0.4);
        player.damage(1);
        const deadHeart = this.hearts.pop();
        deadHeart.destroy();
    }

    shoot() {
        this.gun.fire(this.player);
        const key = this.game.rnd.pick(this.game.global.fireSounds);
        this.game.sound.play(key, 0.4);
    }

    endGame() {
        this.game.state.start('gameover');
    }

    spawnEnemy() {
        this.enemies.add(new EnemyPointy(this.game, this.player));
    }


    shutdown() {
        if (!!this.leftTrigger) {
            this.leftTrigger.onDown.removeAll();
        }
        if (!!this.rightTrigger) {
            this.rightTrigger.onDown.removeAll();
        }
        this.music.stop();
    }

}

export default Game;
