
//Documentation for Phaser's (2.6.2) tile sprites:: phaser.io/docs/2.6.2/Phaser.TileSprite.html
class TiledBG extends Phaser.TileSprite {

  //initialization code in the constructor
  constructor(game) {
    super(game, 0, 0, game.world.width, game.world.height, 'tiledBG');
    game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default TiledBG;
