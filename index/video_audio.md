# 视频和音频内容

一个音频/视频文件包含两部分：编码器（codec）和媒体容器（container）

- 像 MP3、MP4、WebM这些术语叫做容器格式

## 媒体文件的内容

- 定义了构成媒体文件的音频轨道和视频轨道的储存结构，其中还包含描述这个媒体文件的元数据，以及用于编码的编码译码器等等

- 一个格式为 WebM 的电影包含视频轨道，音频轨道和文本轨道，其中视频轨道包含一个主视频轨道和一个可选的 Angle 轨道；音频轨道包含英语和西班牙语的音频轨道，还有一个英语评论的音频轨道；文字轨道包含英语和西班牙语的字幕轨道
- 为了编解码器（codec）编码媒体，容器中的音频和视频轨道以适合的格式保存。音频轨道和视频轨道使用不同的格式。每个音频轨道都使用音频编解码器 (en-US)进行编码，而视频轨道则使用视频编解码器进行编码

> 不同的浏览器支持不同的视频和音频格式，以及不同的容器格式。浏览器并不全支持相同的 codecs，所以你得使用几个不同格式的文件来兼容不同的浏览器

- 可以参考[Choosing the right container](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#choosing_the_right_container) in [Media container formats (file types)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers)来选择最适合的容器格式，同样的，参考[Choosing a video codec](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#choosing_a_video_codec) in [Web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)和[Choosing an audio codec](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs#choosing_an_audio_codec) in [Web audio codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs)选择编码格式

- 将 src 属性从 `<video>` 标签中移除，转而将它放在几个单独的标签 `<source>` 当中，浏览器将会检查 `<source>` 标签，并且播放第一个与其自身 codec 相匹配的媒体。你的视频应当包括 WebM 和 MP4 两种格式，这两种在目前已经足够支持大多数平台和浏览器。

- 每个 `<source>` 标签页含有一个 type 属性，这个属性是可选的，但是建议你添加上这个属性 — 它包含了视频文件的 MIME types ，同时浏览器也会通过检查这个属性来迅速的跳过那些不支持的格式。如果你没有添加 type 属性，浏览器会尝试加载每一个文件，直到找到一个能正确播放的格式，这样会消耗掉大量的时间和资源。

- 可以在这里[（HTML 媒体格式支持 (en-US)）](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)查看有关 [MIME types](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type) 的支持

- `<audio>` 标签与 `<video>` 标签的使用方式几乎完全相同，有一些细微的差别

## 音轨增删事件

你可以监控媒体元素中的音频轨道，当音轨被添加或删除时，你可以通过监听相关事件来侦测到。具体来说，通过监听 AudioTrackList (en-US) 对象的 addtrack 事件（即 HTMLMediaElement.audioTracks 对象），你可以及时对音轨的增加做出响应

```js
  const mediaElem = document.querySelector("video");
  mediaElem.audioTracks.onaddtrack = function(event) {
    audioTrackAdded(event.track);
  }
```

## 显示音轨文本

给那些听不懂音频语言的人们提供一个音频内容的副本岂不是一件很棒的事情吗？所以，感谢 HTML5 `<video>` 使之成为可能，有了 WebVTT 格式，你可以使用 `<track>` 标签

- “副本”的意思是指，用文本记录下音频的内容。

### WebVTT

WebVTT 是一个格式，用来编写文本文件，这个文本文件包含了众多的字符串，这些字符串会带有一些元数据，它们可以用来描述这个字符串将会在视频中显示的时间，甚至可以用来描述这些字符串的样式以及定位信息。这些字符串叫做 cues。可以根据不同的需求来显示不同的样式，最常见的如下：

- 常见样式
  - subtitles：添加翻译字幕
  - captions：同步翻译对白，或是描述一些有重要信息的声音
  - timed descriptions：将文字转换为音频

- 一个典型的 WebVTT 文件

  ```WebVTT
  WEBVTT

  1
  00:00:22.230 --> 00:00:24.606
  第一段字幕

  2
  00:00:30.739 --> 00:00:34.074
  第二段

    ...
  ```

- 需要做的工作
  - 以 .vtt 后缀名保存文件
  - 用 `<track>` 标签链接 .vtt 文件， `<track>` 标签需放在 `<audio>` 或 `<video>` 标签当中，同时需要放在所有 `<source>` 标签之后。使用 `kind` 属性来指明是哪一种类型，如 `subtitles` 、 `captions` 、 `descriptions`。然后，使用 `srclang` 来告诉浏览器你是用什么语言来编写的 `subtitles`

    ```html
      <video controls>
        <source src="example.mp4" type="video/mp4">
        <source src="example.webm" type="video/webm">
        <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
      </video>
    ```

- 文本轨道会使你的网站更容易被搜索引擎抓取到 （SEO）， 由于搜索引擎的文本抓取能力非常强大，使用文本轨道甚至可以让搜索引擎通过视频的内容直接链接

## Codec

编解码器（从“coder-decoder”派生的混合词）是对数据流进行编码或解码的程序、算法或设备。给定的编解码器知道如何处理特定的编码或压缩技术。
