import { Application, Graphics, Rectangle, Sprite, Texture } from "./js/libs/pixi.mjs";
import { assetsMap } from "./js/assetsMap.js";
// import { Tank } from "./js/Tank.js";
import { createMarker } from './js/utils/utils.js'
import { TweenManager, Tween } from "./js/utils/Tween.js"
import Part from './js/Part.js';

// Create the application
const gameSize = {
  w: 1366,
  h: 1366
}

const Anchor = {
  CENTER: [0.5, 0.5],
  T_L: [0, 0],
  T_R: [1, 0],
  B_L: [0, 1],
  B_R: [1, 1],
}

const app = new Application({
  view           : document.getElementById('canvas'), // экземпляр канвас эл-та
  width          : gameSize.w, // размеры канваса
  height         : gameSize.h, // размеры канваса
  backgroundColor: 0x111444,
});

class Game {
  constructor() {
    this.app = app
    this.init()
  }
  
  preload() {
    // подгружаем все спрайты
    assetsMap.forEach((value) => this.app.loader.add(value.name, value.url))
    this.app.loader.load(this.runGame) // когда всё загрузится, запускаем ф-цию которая стартанет игру
  }
  
  init() {
    this.preload()
  }
  
  runGame = () => {
    new Part(this.app,100, 100, Anchor.T_L, 'block1')
    new Part(this.app,350, 350, Anchor.CENTER, 'block1')
    new Part(this.app,600, 100, Anchor.T_R, 'block1')
    new Part(this.app,100, 600, Anchor.B_L, 'block1')
    new Part(this.app,600, 600, Anchor.B_R, 'block1')
  
  }
}

new Game()


























//
// const runGame = () => {
//   const marker = new Graphics();
//   marker.beginFill(0xff0000, 1);
//   marker.drawCircle(0, 0, 5);
//   marker.endFill();
//
//   const tank = new Tank();
//   app.stage.addChild(tank.view);
//   app.stage.addChild(marker);
//
//   app.stage.position.set(800 / 2, 800 / 2);
//
//   window["TANK"] = tank;
//
//   const tweenManager = new TweenManager(app.ticker);
//
//   const moveTank = ({data}) => {
//     const distanceToCenter = data.getLocalPosition(app.stage);
//     const distanceToTank   = data.getLocalPosition(tank.view);
//     const angle            = Math.atan2(distanceToTank.y, distanceToTank.x);
//
//     let callAmount = 2;
//     const move     = () => {
//       callAmount -= 1;
//       if (callAmount <= 0) {
//         tweenManager.createTween(tank, 3000, {x: distanceToCenter.x, y: distanceToCenter.y}, {
//           onStart : () => tank.startTracks(),
//           onFinish: () => tank.stopTracks()
//         });
//       }
//     }
//
//     tweenManager.createTween(tank, 1000, {towerDirection: angle}, {
//       onFinish: () => move()
//     });
//
//     tweenManager.createTween(tank, 2000, {bodyDirection: angle}, {
//       onStart : () => {
//         tank.startTracks();
//       },
//       onFinish: () => {
//         tank.stopTracks();
//         move();
//       }
//     });
//   };
//
//   app.stage.on("pointerdown", moveTank, undefined);
//   app.stage.interactive         = true;
//   app.stage.interactiveChildren = false;
//   app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
// };
//
// assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
// app.loader.load(runGame);
