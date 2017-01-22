import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyAviator from '../prefabs/enemyAviator';
import EnemyVillain from '../prefabs/enemyVillain';
import EnemyBoss from '../prefabs/enemyBoss';
import EnemyZepplin from '../prefabs/enemyZepplin';
import Heart from '../prefabs/heart';

class Game extends Phaser.State {

    create() {
        const health = 3;
        this.hearts = [];
        this.player = new PlayerBody(this.game, health);
        this.balloonsToSpawn = 9;
        this.balloonsToKill = 9;
        let scorestartingX = this.game.world.centerX + (this.game.world.centerX / 3);
        this.balloonsAtLargeText = this.game.add.text(scorestartingX, 50,
            "Balloons At Large: " + this.balloonsToKill, {
                font: "65px Arial",
                fill: "#ff0044",
                align: "center"
            });
        this.balloonsAtLargeText.anchor.set(0.5);


        for (let i = 0; i < health; ++i) {
            this.hearts.push(new Heart(this.game, i * 90, 0));
        }

        this.player.enableBody = true;
        this.player.physicsBodyType = Phaser.Physics.ARCADE;

        this.rightGun = this.game.add.weapon(30, 'projectile');
        this.rightGun.fireRate = 1000;
        this.rightGun.onFire.add(() => {
            const key = this.game.rnd.pick(this.game.global.fireSounds);
            this.game.sound.play(key, 0.4);
        });
        this.leftGun = this.game.add.weapon(30, 'projectile');
        this.leftGun.fireRate = 1000;
        this.leftGun.onFire.add(() => {
            const key = this.game.rnd.pick(this.game.global.fireSounds);
            this.game.sound.play(key, 0.4);
        });


        this.right = new PlayerArm(this.game, 0, this.rightGun);
        this.left = new PlayerArm(this.game, 180, this.leftGun);
        this.player.events.onKilled.add(() => {
            this.right.kill();
            this.left.kill();
            this.rightGun.destroy();
            this.leftGun.destroy();

            this.endGame();
        });

        this.enemies = this.game.add.group();

        this.game.time.events.loop(Phaser.Timer.SECOND, this.spawnEnemy, this);

        const enemyCount = 5;
        for (let i = 0; i < enemyCount; ++i) {

            this.spawnEnemy();

        }

        this.pad1 = this.game.input.gamepad.pad1;

        this.music = this.game.sound.play('music-level', 0.4);
        this.music.loop = true;
    }

    update() {
        if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) != 0 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) != 0) {
            this.left.setTargetAngle(this.getAngle(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X), this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)));
        }

        if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) != 0 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) != 0) {
            this.right.setTargetAngle(this.getAngle(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X), this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y)));
        }
        if (this.game.global.controlSettings.shouldShootRight()) {
            this.right.fireGun();
        }
        if (this.game.global.controlSettings.shouldShootLeft()) {
            this.left.fireGun();
        }

        this.game.physics.arcade.overlap(this.enemies, this.right.gun.bullets, this.bulletCollision, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.left.gun.bullets, this.bulletCollision, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.player, this.playerEnemyCollision, null, this);
    }

    getAngle(X, Y) {
        return Phaser.Math.radToDeg(Phaser.Math.angleBetween(0, 0, X, Y));
    }

    bulletCollision(enemy, bullet) {
        this.enemyDeath(enemy);
        const key = this.game.rnd.pick(this.game.global.killSounds);
        this.game.sound.play(key, 0.4);
        bullet.kill();
        this.balloonsToKill = this.balloonsToKill - 1;
        this.balloonsAtLargeText.text = "Balloons At Large: " + this.balloonsToKill;
        if (this.balloonsToKill == 0) {
            this.endGame();
        }
    }

    playerEnemyCollision(player, enemy) {
        this.enemyDeath(enemy);
        const key = this.game.rnd.pick(this.game.global.deathSounds);
        this.game.sound.play(key, 0.4);
        player.damage(1);
        const deadHeart = this.hearts.pop();
        deadHeart.destroy();
    }

    enemyDeath(enemy) {
        const anim = enemy.animations.play('die', 12, false);
        enemy.body.checkCollision.none = true;
        anim.onComplete.add(() => {
            console.log("ded");
            enemy.damage(1)
        });
    }

    endGame() {
        this.balloonsAtLargeText.text = "";
        this.game.state.start('gameover', false, true, (this.balloonsToKill <= 0));
    }

    spawnEnemy() {
        const enemies = [EnemyAviator, EnemyBoss, EnemyVillain, EnemyZepplin];
        this.balloonsToSpawn = this.balloonsToSpawn - 1;
        if (this.balloonsToSpawn > -1) {
            const classToSpawn = this.game.rnd.pick(enemies);
            this.enemies.add(new classToSpawn(this.game, this.player));
        }
    }

    render() {}

    shutdown() {
        this.music.stop();
    }


}

export default Game;
