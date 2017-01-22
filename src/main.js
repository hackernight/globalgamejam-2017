import Boot from './states/boot';
import Controls from './states/controls';
import Credits from './states/credits';
import Game from './states/game';
import Gameover from './states/gameover';
import Menu from './states/menu';
import Preloader from './states/preloader';
import SplashScreen from './states/splashScreen';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'globalgamejam-2017-game');

game.state.add('boot', new Boot());
game.state.add('controls', new Controls());
game.state.add('credits', new Credits());
game.state.add('game', new Game());
game.state.add('gameover', new Gameover());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('splashScreen', new SplashScreen());

game.state.start('boot');
