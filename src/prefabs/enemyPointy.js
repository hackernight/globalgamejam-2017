//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyPointy extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, activeProjectiles) {
        super(game, x, y, 'enemyPointy');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.activeProjectiles = activeProjectiles;
        game.add.existing(this);

        this.body.onOverlap = new Phaser.Signal();
        this.body.onOverlap.addOnce(() => {
            this.kill();
        });
    }

    //Code ran on each frame of game
    update() {
        for (const projectile of this.activeProjectiles) {
            this.game.physics.arcade.overlap(this, projectile);
        }
    }

}

export default EnemyPointy;
