# Web Workers

通过使用 Web Workers，Web 应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是 UI 线程）不会因此被阻塞/放慢

## 使用

- <span id="worker-vue2.x">vue2.x</span>

  ```js
  // web.worker.js
  self.addEventListener(
    'message',
    (e) => {
      self.postMessage('Unknown command: ' + data.msg)
      // self.close()
    },
    false,
  )

  // 使用此 worker
  import Worker from './web.worker.js'
  const worker = new Worker()

  // 发送信息到 worker
  worker.postMessage({ msg: 'stop' })

  // 监听来自 worker 的信息
  worker.onmessage = ({ data }) => {
    console.log('worker.onmessage', data)
  }
  ```
