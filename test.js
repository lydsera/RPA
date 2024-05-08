const robot=require('robotjs')
let pos=robot.getMousePos()
robot.mouseToggle("down","middle")
robot.moveMouse(pos.x,pos.y+50)
setTimeout(() => {
    robot.mouseToggle("up","middle")
    robot.moveMouse(pos.x,pos.y)
}, 1000);

