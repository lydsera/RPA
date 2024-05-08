let fs=require('fs')


// 读取文件
fs.readFile('C:/Users/10485/Desktop/tmp.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件出错:', err);
      return;
    }
    
    // 将文件内容拆分成行数组
    const lines = data.split('\n');
    
    // 选择特定的一行（例如第3行，索引从0开始）
    const desiredLine = lines[2]; // 这里选择第3行
    
    console.log('指定行的内容:', desiredLine);
});