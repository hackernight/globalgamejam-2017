class Gun extends Phaser.Weapon {

  //initialization code in the constructor
  constructor(game) {
    super(game);
    this.bulletKey = 'projectile';
    game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {
      this.x += 15;
      console.log("I updated");
      if (!this.inWorld) {
          this.destroy();
      }
  }

}

export default Gun;
