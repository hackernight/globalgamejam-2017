import MenuText from '../prefabs/menuText';
import BackgroundImage from '../prefabs/backgroundImage';
import OfficerWaverton from '../prefabs/OfficerWaverton';
import StaticPositionBalloon from '../prefabs/staticPositionBalloon';

class Menu extends Phaser.State {

    create() {
        //new BackgroundImage(this.game, 'introscreen');
        this.officerWaverton = new OfficerWaverton(this.game, 0, this.game.height * .5);
        this.balloon1 = new StaticPositionBalloon(this.game, this.game.width/2 + Math.random() * (this.game.width/2), Math.random() * this.game.height);
        this.balloon2 = new StaticPositionBalloon(this.game, this.game.width/2 + Math.random() * (this.game.width/2), Math.random() * this.game.height);
        this.balloon3 = new StaticPositionBalloon(this.game, this.game.width/2 + Math.random() * (this.game.width/2), Math.random() * this.game.height);


        new MenuText(this.game, this.game.height * 0.2, 'Officer Waverton and the Luft Balloons');
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
                  'Press X to view credits\n Press A for input options', style);
        credittext.anchor.setTo(0.5, 0.5);



        var tween = this.game.add.tween(startText).to({
            y: startY + 50
        }, 500, Phaser.Easing.Exponential.Out, true, 0, -1);

        var tween = this.game.add.tween(this.balloon1).to({
            y: startY + 30
        }, Math.random() * 500 + 500, Phaser.Easing.Exponential.Out, true, 0, -1);

        var tween = this.game.add.tween(this.balloon2).to({
            y: startY + 30
        }, Math.random() * 500 + 500, Phaser.Easing.Exponential.Out, true, 0, -1);

        var tween = this.game.add.tween(this.balloon3).to({
            y: startY + 30
        }, Math.random() * 500 + 500, Phaser.Easing.Exponential.Out, true, 0, -1);


        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
        tween.yoyo(true);

        this.setupControls(true);

//wait 2 seconds before we accept input, or it goes stright to credits after end of game
        this.game.time.events.add(Phaser.Timer.SECOND * .5, () =>{this.canAcceptInput = true}, this);

        this.music = this.game.sound.play('music-intro', 0.4);
        this.music.loop = true;
    }

    update() {
      if (this.canAcceptInput == true){
        //console.log(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X), this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y));
      if (this.game.global.controlSettings.shouldShootRight() || this.game.global.controlSettings.shouldShootLeft() ||
          this.game.global.controlSettings.isChangingRightAngle() || this.game.global.controlSettings.isChangingLeftAngle()) {
          this.startGame();
      }
      if (this.game.global.controlSettings.isPressingX()) {
            this.game.state.start('credits');
      }
      if (this.game.global.controlSettings.isPressingA()) {
            this.game.state.start('controls');
      }
    }
  }

    startGame() {
        this.game.state.start('game');
    }

    shutdown() {
        this.officerWaverton.destroy();
        this.balloon1.destroy();
        this.balloon2.destroy();
        this.balloon3.destroy();

        this.music.stop();
    }

    spawnEnemy() {
        const enemies = [EnemyAviator, EnemyVillain, EnemyZepplin];
        const classToSpawn = this.game.rnd.pick(enemies);
        this.enemies.add(new classToSpawn(this.game, this.player));
    }

    setupControls(useController){

              this.game.input.gamepad.start();

              this.pad1 = this.game.input.gamepad.pad1;

      //console support is super flaky, so we're just going to assume this is always there for the purposes of the demo
              if (useController == true) {

                  //console.log("WE are connected!");
                        this.game.global.controlSettings =  {
                            item: this.game.input.gamepad.pad1,
                            shouldShootRight: () => {return (this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) ||
                                                            this.game.input.keyboard.isDown(Phaser.Keyboard.ONE) ||
                                                            this.game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_1))
                                                                        },
                            shouldShootLeft: () => {return (this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)||
                                                            this.game.input.keyboard.isDown(Phaser.Keyboard.TWO) ||
                                                            this.game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_2))
                                                                        },
                            isPressingX: () => {return (this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_X)||
                                                          this.game.input.keyboard.isDown(Phaser.Keyboard.X))
                                                                        },
                            isPressingA: () => {return (this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)||
                                                          this.game.input.keyboard.isDown(Phaser.Keyboard.A))
                                                                        },
                            isChangingRightAngle: () => {return (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) != 0 ||
                                                              this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) != 0 ||
                                                              this.game.input.keyboard.isDown(Phaser.Keyboard.F))
                                                                        },
                            newRightAngle: () => {if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
                                                  return (this.game.rnd.integerInRange(0, 360));
                                                  }
                                                else {
                                                  return (Phaser.Math.radToDeg(Phaser.Math.angleBetween(0,0,
                                                                        this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X),
                                                                        this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y))))
                                                    }
                                                                      },
                          isChangingLeftAngle: () => {return (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) != 0 ||
                                                            this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) != 0 ||
                                                            this.game.input.keyboard.isDown(Phaser.Keyboard.F))

                                                                      },
                          newLeftAngle: () => {if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
                                                return (this.game.rnd.integerInRange(0, 360));
                                                }
                                              else {
                                                    return (Phaser.Math.radToDeg(Phaser.Math.angleBetween(0,0,
                                                                      this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X),
                                                                      this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y))))
                                                    }
                                              }
                                                                      };
              }
    }

}

export default Menu;
