//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyPointy extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, activeProjectiles) {
        super(game, x, y, 'enemyPointy');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.activeProjectiles = activeProjectiles;
        game.add.existing(this);
    }

    //Code ran on each frame of game
    update() {
        for (const projectile of this.activeProjectiles) {
            if (projectile.alive) {
            console.log(this.activeProjectiles);
            this.game.physics.arcade.overlap(this, projectile, () => {
                this.destroy();
                projectile.destroy();
            });
        }
        else {
            console.log("I dead");
        }
        }
    }

}

export default EnemyPointy;
