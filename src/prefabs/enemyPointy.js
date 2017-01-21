
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class EnemyPointy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game) {
    const minimumEdgeBuffer = 100;
    let x = game.rnd.integerInRange(minimumEdgeBuffer, game.world.width / 2 - minimumEdgeBuffer);
    if (x > game.world.width / 4) {
      x += game.world.width / 2;
    }
    let y = game.rnd.integerInRange(minimumEdgeBuffer, game.world.height / 2 - minimumEdgeBuffer);
    if (y > game.world.height / 4) {
      y += game.world.height / 2;
    }
    super(game, x, y, 'enemyPointy');
    this.game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default EnemyPointy;
