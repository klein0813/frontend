# README.MD

[basis.md](./basis/nodejs.md)

## 命令

- renameSync - 文件重命名

```js
fs.renameSync(`${targetDir}/${files[i]}`, `${dist}/${files[i]}`);
```

- unlinkSync - 删除文件或符号链接

```js
fs.unlinkSync(currentPath)
```

- mkdirSync - 创建文件夹

```js
fs.mkdirSync(distPath)
```

- readdirSync - 读文件夹

```js
const secDirs = fs.readdirSync(`${root}/${dirs[i]}`)
for (let j = 0; j < secDirs.length; j++) {}
```

- existsSync - 路径是否存在

```js
fs.existsSync(distDir)
```

## 常用方法

- 执行 node 脚本

```js
  exec('node sprite-generator.js', function(err, stdout, stderr) {
    err && console.log(err)
    stdout && console.log(stdout)
  })
```

- 文件重命名

```js
fs.renameSync(`${targetDir}/${files[i]}`, `${dist}/${files[i]}`);
```

- 删除文件夹

```js
const fs = require('fs')
const path = require('path')

function delFile(path, reservePath) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path)
      files.forEach((file, index) => {
        let currentPath = path + "/" + file
        if (fs.statSync(currentPath).isDirectory()) {
          delFile(currentPath, reservePath)
        } else {
          fs.unlinkSync(currentPath)
        }
      })
      if (path != reservePath) {
        fs.rmdirSync(path)
      }
    } else {
      fs.unlinkSync(path)
    }
  }
}
```

- 判断当前路径是否是文件夹

```js
fs.statSync(path).isDirectory()
```
