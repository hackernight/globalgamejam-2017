import CenteredSprite from '../prefabs/centeredSprite';

class SplashScreen extends Phaser.State {

    create() {
        const splash = new CenteredSprite(this.game, 'stl');
        splash.alpha = 0;
        const tween = this.game.add.tween(splash).to(
            {alpha: 1},
            1500,
            Phaser.Easing.Linear.In,
            true
        ).yoyo(true, 1000);

        tween.onComplete.add(() => {
            this.game.state.start('menu');
        });
    }

}

export default SplashScreen;
