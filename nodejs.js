// 引入 RobotJS 库
const robot = require('robotjs');
const {spawn,exec} = require('child_process')

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

var open = function(url,browserName){
    exec('start '+browserName+' '+url,function(err,stdout,stderr){
    if(err){
    console.log(err)
    }
})
}

// 配置 socket.io 以允许跨域
const io = socketIo(server, {
    cors: {
        origin: "*",  // 这里可以设置为具体的来源地址，例如 http://localhost:8000
        methods: ["GET", "POST"]
    }
});

// 指定一个目录来提供静态文件（比如 HTML 文件）
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        console.log('Message: ' + msg);
        if(msg.indexOf("=move=")>-1){
            let temp=msg.split("=move=")
            robot.moveMouse(temp[0], temp[1])
        }else if(msg.indexOf("=click=")>-1){
            robot.mouseClick()
        }else if(msg.indexOf("=input=")>-1){
            let temp=msg.split("=input=")
            robot.typeString(temp[0]);
        }else if(msg.indexOf("=enter=")>-1){ 
            robot.setKeyboardDelay(1500);
            robot.keyTap("enter");
        }
        else if(msg.indexOf("=toggleDown=")>-1){ 
            robot.mouseClick()
            robot.keyTap("down")
            robot.keyTap("down")
        }
        else if(msg.indexOf("=tap=")>-1){ 
            let temp=msg.split("=tap=")
            robot.keyTap(temp[0]);
        }
        else if(msg.indexOf("=doubletap=")>-1){ 
            let temp=msg.split("=doubletap=")
            robot.keyTap(temp[0],temp[1]);
        }
        else if(msg.indexOf("=openFile=")>-1){
            let args=msg.split("=openFile=")
            let pythonProcess = spawn('python', ['openfile.py'], { stdio: 'pipe' });
            pythonProcess.stdin.write(JSON.stringify(args));
            pythonProcess.stdin.end();
        }
        else if(msg.indexOf("=openURL=")>-1){
            console.log(1)
            let args=msg.split("=openURL=")
            // console.log(args[0])
            open(args[0],"msedge")
        }
        else if(msg.indexOf("=getLineFromFile=")){
            console.log(2)
            let temp=msg.split("=getLineFromFile=")
            let fs=require('fs')
            // 读取文件
            setTimeout(() => {
                fs.readFile(temp[1], 'utf8', (err, data) => {
                  if (err) {
                  console.error('读取文件出错:', err);
                  return;
                  }
                  // 将文件内容拆分成行数组
                  const lines = data.split(/\r?\n/);
                  for (let index = temp[0]; lines[index]!=null; index++) {
                      robot.typeString(lines[index])
                      robot.keyTap('tab')
                  }                
                });
              }, 2000);
        }
        
        
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function toggleDown()
{
    let pos=robot.getMousePos()
    robot.mouseToggle("down","middle")
    robot.moveMouse(pos.x,pos.y+50)
    await sleep(1000)
    robot.mouseToggle("up","middle")
    robot.moveMouse(pos.x,pos.y)
    
    
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



 