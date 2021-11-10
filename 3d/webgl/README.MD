# WebGL

- 简述

  - WebGL 引入了一个与 OpenGL ES 2.0 非常一致的 API
  - WebGL 2 API 引入了对大部分的 OpenGL ES 3.0 功能集的支持

- 渲染管线流程图

- ![渲染管线流程图](../../assets/webgl-render-piplineflow-chart.png)

  - 渲染管线的每一个环节都是一个带有某种功能的数字电路单元，只是有些支持可编程，有些不支持可编程，有些可以设置开启或关闭，有些完全不可设置
  - 对于顶点、片元着色器是可以编程的，这两个处理器可以执行编译后的着色器语言
  - GPU 深度检测功能是可设置的，默认是关闭的

- Example

```html
<!DOCTYPE html>
  <head>
    <title>Draw a point by webgl</title>
  </head>
  <body>
    <canvas id="webgl" width="500" height="500" style="background-color: blue;"></canvas>
    <script>
      const canvas = document.getElementById('webgl'); // 获取 canvas
      const gl = canvas.getContext('webgl'); // 获取 webgl

      // 顶点着色器源码
      const vertexShaderSource = '' +
        'void main() {' +
        //给内置变量gl_PointSize赋值像素大小
        '   gl_PointSize = 20.0;' +
        //顶点位置，位于坐标原点
        '   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);' +
        '}';
      // 片元着色器源码（片元着色器程序执行）
      const flagShaderSource = '' +
        'void main() {' +
        //定义片元颜色
        // 表示所有经过光栅化生成的没定义颜色的片元经过片元着色器处理后所有片元赋值红色得到一个个红色像素值
        '   gl_FragColor = vec4(1.0, 0.0 ,0.0, 1.0);' +
        '}';

      // 初始化着色器
      // 创建着色器对象
      const vertexShader = gl.createShader(gl.VERTEX_SHADER); // 创建顶点着色器对象
      const fragShader = gl.createShader(gl.FRAGMENT_SHADER); // 创建片元着色器
      // 引入着色器源码
      gl.shaderSource(vertexShader, vertexShaderSource); // 向顶点着色器引入源码
      gl.shaderSource(fragShader, fragShaderSource); // 向片元着色器引入源码
      // 编译着色器
      gl.compileShader(vertexShader); // 编译顶点着色器
      gl.compileShader(fragShader); // 编译片元着色器
      // 创建程序对象程序对象
      const program = gl.createProgram();
      // 附着着色器到程序对象
      gl.attachShader(program, vertexShader); // 附着顶点着色器到程序对象
      gl.attachShader(program, fragShader); // 附着片元着色器到程序对象
      // 链接程序对象
      gl.linkProgram(program);
      // 使用程序对象
      gl.useProgram(program);

      // 开始绘制，显示器显示结果
      gl.drawArrays(gl.POINTS, 0, 1);
    </script>
  </body>
</html>
```

- `attribute` 关键字

  - 目的是为了 javascript 可以调用相关的 WebGL API 把顶点相关数据从 javascript 传递给顶点着色器 attribute 声明的变量

  - 声明变量

  ```js
  const vertexShader = `
    attribute vec4 apos;
    void main () {
      gl_Position = apos;
    }
  `
  ```

  - 使用变量

  ```js
  // 顶点位置数据
  const data = new Float32Array([0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5])
  // 获取顶点着色器的位置变量 apos
  const aposLocation = gl.getAttribLocation(program, 'apos')
  // 创建显存缓冲区对象
  const buffer = gl.createBuffer()
  // 绑定缓冲区对象，激活缓冲区对象
  // target: number, buffer: WebGLBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  // 顶点数组 data 数据传入显卡缓冲区
  // target, size, usage
  // target, ArrayBuffer? srcData, usage
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  // 缓冲区内的数据按照规律传递给位置变量 apos
  // index, size, type, normalized, stride, offset
  gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0)
  // 允许数据传递
  gl.enableVertexAttribArray(aposLocation)
  ```

- `drawArrays` 整体执行顺序

  - ![drawArrays 整体执行顺序](../../assets/webgl-drawArrays-process-range.jpg)

## Basis

### WebGL 坐标系—投影

- canvas 画布宽高采用的是像素值定义，以显示器为准，WebGL 中顶点坐标的表示方法采用的是相对坐标，相对于 canvas 而言 WebGL 坐标系统，X 轴水平向右，也就是 canvas 画布的 width 表示的宽度方向
- WebGL 坐标系统，Y 轴竖直向上，也就是 canvas 画布的 height 表示的高度方向
- WebGL 坐标系统，Z 轴垂直 canvas 画布朝外
- WebGL 坐标系统坐标都限制在 -1.0~1.0 范围内，超出范围的会被剪裁掉
  - ![WebGL 坐标系](../../assets/webgl-coordinate-system.png)

### 平移变换

- 以沿着 X 轴平移 -0.4 为例：

  ```js
  new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0])
  ```

  - 将顶点的 x 坐标减 0.4，即人为完成计算
  - 通过遍历数组将修改顶点数据，js 代码在 CPU 上执行，即 CPU 完成计算
  - 在着色器中修改顶点坐标，着色器语言在 GPU 中执行，即 GPU 完成计算
    `gl_Position = vec4(apos.x - 0.4, apos.y apos.z, 1);`
  - `平移矩阵法` - 使用矩阵的乘法运算进行三维模型的平移、缩放、旋转、剪切等几何变换

- 平移矩阵法

  ```gl
  mat4 m4 = mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.4, 0.0, 0.0, 1.0);
  ...
  gl_Position = m4 * apos
  ```

  - 上述中 m4 即为平移矩阵
  - apos 是一个列向量，是一三维点的齐次坐标
  - `注意：`mat4 矩阵以列为先，m4 对应矩阵为

    ```txt
      1.0, 0.0, 0.0, -.4,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ```

- 缩放矩阵 - 缩小到 0.7

  ```txt
    0.7, 0.0, 0.0, 0.0,
    0.0, 0.7, 0.0, 0.0,
    0.0, 0.0, 0.7, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ```

- 平移矩阵 - 沿 x 正轴平移 0.4

  ```txt
    1.0, 0.0, 0.0, 0.4,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ```

### 旋转变换

![Webgl Cube Mark](../../assets/webgl_cube_mark.png)

- 着色器内置函数

  - `radians()`函数：角度值转化为弧度制，参数是浮点数 float
  - `cos(radian)`: 角度余弦值
  - `sin(radian)`: 角度正弦值

  ```txt
  若旋转角为 α, 向量 (x, y) 的长度为 1，有：

  x = cosα, y = sinα
  x1 = cos(α + β) = cosαcosβ - sinαsinβ
    = xcosβ - ysinβ
  y1 = sin(α + β) = sinαcosβ + cosαsinβ
    = xsinβ + ycosβ

  则二维空间中该向量的旋转矩阵为：

  cosβ, -sinβ
  sinβ, cosβ
  ```

- 三维绕 z 轴的旋转矩阵

  ```txt
  ctr,-str, 0.0, 0.0,
  str, ctr, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
  ```

### 顶点索引

- 在上一节中绘制一个立方体需要 24 个点，一个顶点重复列举了 3 次，造成数据重复
- 给每个点标记索引(如上一节图中标示)，再借助索引构建立方体，已解决数据重复问题
- `gl.drawElements` - 通过一个索引数组访问使用顶点数组中的顶点数据

  ```js
  const indexesData = new Uint8Array([
    0, 1, 2, 3, // LINE_LOOP, 绘制矩形
    4, 5, 6, 7, // LINE_LOOP, 绘制矩形
    // LINES，绘制缺的 4 条边
    0, 4,
    1, 5,
    2, 6,
    3, 7,
  ])
  const indexesBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENTS_ARRAY_BUFFER, indexesBuffer)
  gl.bufferData(gl.ELEMENTS_ARRAY_BUFFER, indexesData, gl.STATIC_DRAW)
  // ...
  gl.drawElements(gl.LINE_LOOP, 4, gl.UNSIGNED_BYTE, 0)
  gl.drawElements(gl.LINE_LOOP, 4, gl.UNSIGNED_BYTE, 4)
  gl.drawElements(gl.LINES, 8, gl.UNSIGNED_BYTE, 8)
  ```

  ![Webgl drawElements](../../assets/webgl_drawElements.png)

### varying 变量和颜色插值

- 一系列顶点通过顶点着色器逐顶点处理后，再经过图元装配、光栅化环节会得到原始未定义颜色的片元，然后经过片元着色器逐片元添加颜色，会得到一副图像
- 顶点颜色使用关键字 varying 实现的颜色插值计算
  ![Webgl Color Interpolation](../../assets/webgl_color_interpolation.png)

  - 线条插值效果

    ![Webgl Color Interpolation Line](../../assets/webgl_color_interpolation_line.jpg)

  - 三角形插值效果

    ![Webgl Color Interpolation Triangle](../../assets/webgl_color_interpolation_tra.jpg)

- 颜色线性插值

  - 给出两个点的像素值，GPU 自动内插出两点之间所有像素的值，这个过程是像素的线性插值过程
  - GLSL ES 语言的关键字 attribute 的作用就是声明一个可以接收顶点位置坐标、顶点颜色、顶点法向量等顶点数据的变量
  - 在顶点着色器中

  ```js
  // 顶点着色器代码
  attribute vec4 apos;
  attribute vec4 a_color;
  // varying 声明顶点颜色插值后变量
  varying vec4 v_color;
  void main () {
    gl_Position = apos;
    // 着色处理器会利用原始的两个颜色数据进行插值计算，计算出每一个片元对应的 RGBA 值
    v_color = a_color;
  }

  // 片元着色器代码
  // 定义片元着色器中的所有浮点型float数据的精度(不定义会报错)
  precision lowp float;
  // 把顶点着色器插值计算后得到的颜色值 v_color 传递给渲染流水线中处于顶点着色器后面的片元着色器
  varying vec4 v_color;
  void main () {
    // 把插值计算出的每一个片元的颜色值赋值给对应片元
    gl_FragColor = v_color;
  }

  // 给 a_color 赋值
  const colorData = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0])
  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW)
  // 获取顶点着色器中的 a_color 变量
  const colorAttrib = gl.getAttribLocation(program, 'a_color')
  gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(colorAttrib)
  ```

  - 两个独立的着色器单元可以理解为两个具有串联关系的处理器

  - 顶点位置、顶点颜色用一个缓冲区存储

    ```js
    const data = new Float32Array([
      0.5, 0.5,      // 第一个顶点位置
      1.0, 0.0, 0.0, // 第一个顶点颜色
      -.5, -.5,      // 第二个顶点位置
      0.0, 0.0, 1.0, // 第二个顶点颜色
    ])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.FLOAT, false, 0, 0)
    // 4 表示 data 数组一个元素占据的字节数
    // 倒数第二个参数 4*5 表示每 5 个元素是一个选择单元
    // 第 2 个参数 2 表示从 5 元素组成的一个选择单元中选择前 2 个作为顶点位置数据
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 5 * 4, 0)
    // 最后一个参数4*2表示5元素组成的一个选择单元中偏移2个元素
    // 第2个参数3表示从5元素组成的一个选择单元中选择后三个作为顶点颜色数据
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 5 * 4, 2 * 4)
    ```

  - 若将数据传入显卡缓冲区(gl.bufferData)，且未绑定新的缓冲区时，当前数据会覆盖上一次传入的数据

- attribute 限制变量于 CPU 中可通过 gl.getAttribLocation() 获取
- varying 限制变量沿着渲染管线在片元着色器中可使用

### 立方体（每个面一种颜色）

- GPU 开始绘制图形，默认的规则是后生成的像素覆盖前面生成的像素
- x，y 坐标对应的就是显示器平面，z 值就是深度信息
- `gl.enable()`：是 WebGL 的方法，开启某项功能
- `gl.DEPTH_TEST`：表示深度功能
- 36 个顶点位置，36 个顶点颜色
