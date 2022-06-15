import { Container, Sprite, Texture, Rectangle } from './libs/pixi.mjs';

const createSprite = (textureName, position = {x: 0, y: 0}, anchor = {x: 0.5, y: 0.5}) => {
  const sprite = new Sprite(Texture.from(textureName));
  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);
  return sprite;
};

export default class Part {
  constructor(app, x, y, anchor, sprite) {
    this.app = app
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.sprite = sprite
    
    this.block = null
    this.progress = 0
    this.startProgress = 0
    this.finishVal = 0
    this.angleTouchStart = null
    this.degreeAngle = null
    this.startTouches = null
    
    this.init()
  }
  
  init = () => {
    this.#create()
  }
  
  
  #create = () => {
    this.block = createSprite('block1', {x: this.positionPartX, y: this.positionPartY})
    this.block.interactive = true
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
  
    this.block.on('pointerdown', this.#touchStart)
    this.block.on('pointermove', this.#touchMove)
  
    this.app.stage.on('pointerup', this.#touchUp)
    this.app.stage.hitArea = new Rectangle(-0, -0, 1366, 1366);
  
    this.app.stage.interactive = true
  
    this.app.stage.addChild(this.block)
  }
  
  #touchStart = ({data}) => {
    this.block.isPressed = true

    this.startProgress = this.progress
    this.angleTouchStart = parseFloat(this.block.angle)

    // получаем первые координаты касания
    this.startTouches = {
      x: data.global.x,
      y: data.global.y
    }
  }
  
  #touchMove = (event) => {
    const {data} = event
    if (!this.block.isPressed) return
    console.log('pressed', this.block.isPressed)
  
    // if (!pointer.isDown || !this.startTouches) return
  
    // получаем координаты текущего касания
    const touch = {
      x: data.global.x,
      y: data.global.y
    }
  
    const anchorPosition = {
      x: this.block.position.x,
      y: this.block.position.y,
    }
  
    // вычисление угла
    let angleDistance = Math.atan2(
      (anchorPosition.x - touch.x) * (anchorPosition.y - this.startTouches.y)
      - (anchorPosition.y - touch.y) * (anchorPosition.x - this.startTouches.x),
    
      (anchorPosition.x - touch.x) * (anchorPosition.x - this.startTouches.x)
      + (anchorPosition.y - touch.y) * (anchorPosition.y - this.startTouches.y),
    )
    
    angleDistance *= -1
    this.degreeAngle = angleDistance * (180 / Math.PI)
  
    this.finishVal = Math.trunc(this.degreeAngle + this.angleTouchStart)
    this.block.angle = this.finishVal
  }
  
  #touchUp = () => {
    this.block.isPressed = false
    console.log(this.block.isPressed)
  }
}
