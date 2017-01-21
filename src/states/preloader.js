class Preloader extends Phaser.State {

    constructor() {
        super();
        this.asset = null;
        this.ready = false;

    }

    preload() {
        //setup loading bar
        this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
        this.load.setPreloadSprite(this.asset);

        // Setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    update() {
        if (this.ready) {
            this.game.state.start('menu');
        }
    }

    loadResources() {
        // load your resources here
        this.game.load.image('enemyPointy', 'assets/enemy-pointy.png');
        this.game.load.image('playerArm', 'assets/wavyman-arm.png');
        this.game.load.image('playerBody', 'assets/wavyman-body.png');
        this.game.load.image('projectile', 'assets/projectile.png');
    }

    onLoadComplete() {
        this.ready = true;
    }
}

export default Preloader;
