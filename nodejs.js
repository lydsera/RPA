// 引入 RobotJS 库
const robot = require('robotjs');



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

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
            robot.mouseClick()
            robot.typeString(temp[0]);
        }else if(msg.indexOf("=enter=")>-1){ 
            robot.setKeyboardDelay(1500);
            robot.keyTap("enter");
        }

    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



 