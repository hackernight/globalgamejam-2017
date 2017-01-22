import MenuText from '../prefabs/menuText';
import BackgroundImage from '../prefabs/backgroundImage';

class Menu extends Phaser.State {

    create() {
        new BackgroundImage(this.game, 'introscreen');
        new MenuText(this.game, this.game.height * 0.2, 'Detective Waverton and the 99 Red Balloons');
        const startText = new MenuText(this.game, this.game.height * 0.5, 'Shoot to start!');
        const startY = startText.y;
        this.canAcceptInput = false;


        const style = {
            font: '24px Arial',
            fill: '#ffffff',
            stroke: 0x333333,
            strokeThickness: 5,
            align: 'center'
        };
        const credittext = this.add.text(this.game.width * 0.5, this.game.height * 0.9,
                  'Press X to view credits\n Press A to configure controls', style);
        credittext.anchor.setTo(0.5, 0.5);



        var tween = this.game.add.tween(startText).to({
            y: startY + 50
        }, 500, Phaser.Easing.Exponential.Out, true, 0, -1);

        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
        tween.yoyo(true);


        this.game.input.gamepad.start();

        this.pad1 = this.game.input.gamepad.pad1;

        if (this.pad1.connected) {
            //this.addButtons();
        }

      this.game.global.controlSettings =  {
          item: this.game.input.gamepad.pad1,
          shouldShootRight: () => {return this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)
                                                      },
          shouldShootLeft: () => {return this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)
                                                      },
          isPressingOther: () => {return this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_X)
                                                      }
                                                    };
//wait 2 seconds before we accept input, or it goes stright to credits after end of game
        this.game.time.events.add(Phaser.Timer.SECOND * 2, () =>{this.canAcceptInput = true}, this);

        this.music = this.game.sound.play('music-intro', 0.4);
        this.music.loop = true;
    }

    update() {
      if (this.canAcceptInput == true){
      if (this.game.global.controlSettings.shouldShootRight() || this.game.global.controlSettings.shouldShootLeft()) {
          this.startGame();
      }
        if (this.game.global.controlSettings.isPressingOther()) {
            this.game.state.start('credits');
        }
    }
  }

    startGame() {
        this.game.state.start('game');
    }

    shutdown() {
        this.music.stop();
    }

}

export default Menu;
