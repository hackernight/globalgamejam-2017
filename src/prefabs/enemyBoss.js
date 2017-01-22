//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyBoss extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, player) {
        const minimumEdgeBuffer = 100;
        let x = game.rnd.integerInRange(minimumEdgeBuffer, game.world.width / 2 - minimumEdgeBuffer);
        if (x > game.world.width / 4) {
            x += game.world.width / 2;
        }
        let y = game.rnd.integerInRange(minimumEdgeBuffer, game.world.height / 2 - minimumEdgeBuffer);
        if (y > game.world.height / 4) {
            y += game.world.height / 2;
        }
        //one dimension has to be the min/max of the length/width to spawn offscreen
        let offscreenEdge = game.rnd.integerInRange(1, 4);
        if (offscreenEdge == 1) {
            x = -minimumEdgeBuffer;
        }
        if (offscreenEdge == 2) {
            x = game.world.width + minimumEdgeBuffer;
        }
        if (offscreenEdge == 3) {
            y = -minimumEdgeBuffer;
        }
        if (offscreenEdge == 4) {
            y = game.world.height + minimumEdgeBuffer;
        }

        super(game, x, y, 'enemyBoss');
        this.visible = false;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setSize(this.width - 100, this.height - 300, 50, 60);

        this.animations.add('die');

        this.player = player;
        this.scale.set(0.6);
        this.anchor.set(0.5);

        this.health = 4;
        this.lastHealth = this.health;
        this.frameAnimation = 10;
        this.currentAnimation = 0;

        this.targetX = this.player.x;
        this.targetY = this.player.y;
        this.refreshrate = (this.game.rnd.integerInRange(1, 4)) / 2;

        this.game.time.events.loop(Phaser.Timer.SECOND * this.refreshrate, () => {
            this.makeMove();
        }, this);
        game.add.existing(this);
        this.visible = true;
    }

    update() {
        if (this.currentAnimation === this.frameAnimation) {
            this.frame = 0;
            this.currentAnimation = 0;
        }

        if (this.frame === 1) {
            this.currentAnimation++;
        }

        if (this.lastHealth !== this.health) {
            this.frame = 1;
        }
        this.lastHealth = this.health;
    }

    makeMove() {
        this.targetX = this.player.x;
        this.targetY = this.player.y;

        this.game.physics.arcade.moveToXY(this, this.targetX, this.targetY, 50);
    }

}

export default EnemyBoss;
