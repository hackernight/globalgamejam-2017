//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyZepplin extends Phaser.Sprite {

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

        super(game, x, y, 'enemyZepplin');
        this.visible = false;
        this.animations.add('die');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setCircle(40, this.width/2 - 40, this.height/2 - 40);

        this.player = player;
        const scale = 0.15;
        this.scale.setTo(scale, scale);
        this.anchor.setTo(0.5, 0.5);
        this.health = 2;

        this.targetX = this.player.x;
        this.targetY = this.player.y;
        this.refreshrate = (this.game.rnd.integerInRange(1, 4)) / 2;

        this.game.time.events.loop(Phaser.Timer.SECOND * this.refreshrate, () => {
            this.makeMove();
        }, this);

        game.add.existing(this);
        this.visible = true;
        //and start out with a move, even if we're a slow balloon
        //this.makeMove();
    }

    //Code ran on each frame of game
    update() {

    }

    randomDirection(max) {
        let num = this.game.rnd.integerInRange(0, max);
        num = num - (max/2);
        return num;
    }

    makeMove() {

        let courseChange1 = this.randomDirection(200);
        let courseChange2 = this.randomDirection(100);

        this.targetY = this.targetY + courseChange1;
        this.targetX = this.targetX + courseChange2;

        if (this.targetX > this.game.world.width || this.targetX < 0 || this.targetY > this.game.world.height || this.targetY < 0 ||
          (this.game.rnd.integerInRange(0, 4) ==0)){
            //suddenly focus on player again
            this.targetX = this.player.x;
            this.targetY = this.player.y;
        }

        this.game.physics.arcade.moveToXY(this, this.targetX, this.targetY, 50);

        //if (this.movementAction == "Random"){
        //  this.body.velocity.x = 0;
        //    this.body.velocity.y = 0;
        //    this.y+=10;
        //    this.movementAction = "Focused";
        //  }
        //else {
        //    this.game.physics.arcade.moveToObject(this, this.Player,120);

        //}

    }


}

export default EnemyZepplin;
