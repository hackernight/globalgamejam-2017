//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyPointy extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, player) {
        super(game, x, y, 'enemyBalloon');
        game.add.existing(this);
        this.Player = player;
        const scale = 0.15;
        this.scale.setTo(scale, scale);
        this.anchor.setTo(0.5,0.5);

        this.movementAction = "Random";
        this.targetX = player.x;
        this.targetY = player.y;
          console.log( this.targetX, this.targetY);

        //this.tween = game.add.tween(this).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

         //  When the tween loops it decides what move to make
         //this.tween.onLoop.add(this.makeMove, this);

    }

    //Code ran on each frame of game
    update() {

      this.makeMove();
    }

    makeMove(){
      console.log("MakeMove called", this.targetX, this.targetY);

      let courseChange = this.game.rnd.integerInRange(0, 100);
      courseChange = courseChange - 50;

      this.targetY = this.targetY + courseChange;
      this.targetX = this.targetX + courseChange;

      this.game.physics.arcade.moveToXY(this, this.targetX, this.targetY, 120);

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

export default EnemyPointy;
