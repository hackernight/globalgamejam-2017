import PlayerBody from '../prefabs/playerBody';
import PlayerArm from '../prefabs/playerArm';
import EnemyAviator from '../prefabs/enemyAviator';
import EnemyVillain from '../prefabs/enemyVillain';
import EnemyBoss from '../prefabs/enemyBoss';
import EnemyZepplin from '../prefabs/enemyZepplin';
import Heart from '../prefabs/heart';
import TiledBG from '../prefabs/tiledBG';

class Game extends Phaser.State {

    create() {
        this.game.time.slowMotion = 1.0 //clear any lingering slow-mo
        this.canAcceptInput = false;
        this.background = new TiledBG(this.game);
        const health = 3;
        this.hearts = [];
        this.player = new PlayerBody(this.game, health);
        this.balloonsToSpawn = 20;
        this.balloonsToKill = 20;
        let scorestartingX = this.game.world.centerX + (this.game.world.centerX / 3);
        this.balloonsAtLargeText = this.game.add.text(scorestartingX, 50,
            "Balloons At Large: " + this.balloonsToKill, {
                font: "65px Arial",
                fill: "#ff0044",
                stroke: 0x333333,
                strokeThickness: 5,
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
            this.game.time.slowMotion = 4.0;
            this.game.time.events.add(Phaser.Timer.SECOND * 3, () =>{  this.game.time.slowMotion = 1.0;
              this.endGame();}, this);


        });

        this.enemies = this.game.add.group();

        const initialSpawnCount = 1;
        for (let i = 0; i < initialSpawnCount; ++i) {
            this.spawnEnemy();
        }

        this.game.time.events.repeat(Phaser.Timer.SECOND, this.balloonsToSpawn - 1 - initialSpawnCount, this.spawnEnemy, this);

        this.pad1 = this.game.input.gamepad.pad1;

        this.music = this.game.sound.play('music-level', 0.4);
        this.music.loop = true;
        //wait 2 seconds before we accept input, or it goes stright to credits after end of game
        this.game.time.events.add(Phaser.Timer.SECOND * .5, () =>{this.canAcceptInput = true}, this);
    }

    update() {
        if (this.player.health > 0 && this.canAcceptInput == true){
        if (this.game.global.controlSettings.isChangingLeftAngle()) {
            this.left.setTargetAngle(this.game.global.controlSettings.newLeftAngle());
        }

        if (this.game.global.controlSettings.isChangingRightAngle()) {
            this.right.setTargetAngle(this.game.global.controlSettings.newRightAngle());
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
    }

    getAngle(X, Y) {
        return Phaser.Math.radToDeg(Phaser.Math.angleBetween(0, 0, X, Y));
    }

    bulletCollision(enemy, bullet) {
        this.enemyDeath(enemy);
        const key = this.game.rnd.pick(this.game.global.killSounds);
        this.game.sound.play(key, 0.4);
        bullet.kill();
    }

    playerEnemyCollision(player, enemy) {
        this.game.time.slowMotion = 2.0;
        player.damage(1);
        this.background.tint = 0xff0000;
        this.game.time.events.add(Phaser.Timer.SECOND * .1, () => {
            this.background.tint = 0xffffff
        }, this);
        const deadHeart = this.hearts.pop();
        deadHeart.destroy();
        const key = this.game.rnd.pick(this.game.global.deathSounds);
        this.game.sound.play(key, 0.4);
        this.enemyDeath(enemy);
    }

    enemyDeath(enemy) {
        enemy.damage(1);
        if (enemy.health <= 1) {

          this.game.time.slowMotion = 4.0;
          if (this.player.health > 0){
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () =>{  this.game.time.slowMotion = 1.0}, this);
          }
            const anim = enemy.animations.play('die', 12, false);
            enemy.body.checkCollision.none = true;
            anim.onComplete.add(() => {
                enemy.kill();
                this.balloonsToKill = this.balloonsToKill - 1;
                this.balloonsAtLargeText.text = "Balloons At Large: " + this.balloonsToKill;
                if (this.balloonsToKill == 0) {
                    this.endGame();
                }

                if (this.balloonsToKill == 1) {
                    console.log("Spawning boss!");
                    this.enemies.add(new EnemyBoss(this.game, this.player));
                }
            });
        }
    }

    endGame() {
        this.balloonsAtLargeText.text = "";
        const wipeScreen = !(this.player.health > 0);
        this.game.state.start('gameover', wipeScreen, false, (this.balloonsToKill <= 0), (this.player.health > 0));
    }

    spawnEnemy() {
        const enemies = [EnemyAviator, EnemyVillain, EnemyZepplin];
        const classToSpawn = this.game.rnd.pick(enemies);
        this.enemies.add(new classToSpawn(this.game, this.player));
    }

    render() {}

    shutdown() {
        this.music.stop();
    }


}

export default Game;
