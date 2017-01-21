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
        // Art
        this.game.load.image('enemyPointy', 'assets/enemy-pointy.png');
        this.game.load.image('enemyBalloon', 'assets/AngryBalloon.png');
        this.game.load.image('playerArm', 'assets/wavyman-arm.png');
        this.game.load.image('playerBody', 'assets/wavyman-body.png');
        this.game.load.image('projectile', 'assets/projectile.png');

        // Sound
        this.game.load.audio('fire1', 'assets/Blip_Fire.ogg');
        this.game.load.audio('fire2', 'assets/Blip_Fire2.ogg');
        this.game.global.fireSounds = ['fire1', 'fire2'];
        this.game.load.audio('kill1', 'assets/KillEnemy.ogg');
        this.game.load.audio('kill2', 'assets/KillEnemy1.ogg');
        this.game.global.killSounds = ['kill1', 'kill2'];
        this.game.load.audio('death1', 'assets/PlayerDeath.ogg');
        this.game.load.audio('death2', 'assets/PlayerDeath2.ogg');
        this.game.global.deathSounds = ['death1', 'death2'];

        // Music
        this.game.load.audio('music-intro', 'assets/song__1_.ogg');
        this.game.load.audio('music-level', 'assets/level.ogg');
        this.game.load.audio('music-gameover', 'assets/game_over.ogg');

    }

    onLoadComplete() {
        this.ready = true;
    }
}

export default Preloader;
