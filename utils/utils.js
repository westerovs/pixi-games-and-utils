createRect = () => {
  const marker = new Graphics()
  marker.beginFill(0xfff000, 1)
  marker.drawRect(10, 10, 10, 10)
  marker.endFill()
  
  app.stage.addChild(marker)
}

createCirlce = () => {
  const marker = new Graphics()
  marker.beginFill(0xfff000, 1)
  marker.drawCircle(10, 10, 5)
  
  app.stage.addChild(marker)
}
