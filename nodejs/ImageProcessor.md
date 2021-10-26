# Image Processor

## Repo
- images // 图像编解码库
- get-pixels // 获取图像像素
- gka // 是一款简单的、高效的帧动画生成工具，图片处理工具

## Compress
- <https://docsmall.com/image-compress>
- <https://tinypng.com/>

## Resize
```js
images('./Characters-127.png')
  .resize(409)
  .save('Characters-127-409.png', {
    quality: 100
  }) 
```

## Combine
```js
images(`bg_max_compress-0.png`)
  .draw(images(`Sapporo_Characters_12fps-0.png`), 0, 0)
  .save(`output-000.png`, {
    quality : 100
  });
```

## Generate Sprites

- <https://www.toptal.com/developers/css/sprite-generator>

- 指令合成精灵图

```js
const cmd = `gka ./${root}/${dirs[i]}/${secDirs[j]}/ -s -o ${tmpPath}/${secDirs[j]} --count 8`
exec(cmd, function(err, stdout, stderr) {}
```

## Gif To Png

- <https://www.freeconvert.com/gif-to-png>
- WPS 的图片查看器可看 gif 的详细帧，可保存所有帧
