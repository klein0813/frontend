# Vue Router

## \$route 对象

当前路由信息对象

- **\$route.path**  
  字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
- **\$route.params**  
  一个 key/value 对象，包含了 动态片段 和 全匹配片段，
  如果没有路由参数，就是一个空对象
- **\$route.query**  
  一个 key/value 对象，表示 URL 查询参数。
  例如，对于路径 /foo?user=1，则有 \$route.query.user == 1，
  如果没有查询参数，则是个空对象
- **\$route.hash**  
  当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。锚点
- **\$route.fullPath**  
  完成解析后的 URL，包含查询参数和 hash 的完整路径
- **\$route.matched**  
  数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象
- **\$route.name**  
  当前路径名字
- **\$route.meta**  
  路由元信息

## \$router

全局的路由实例，是 router 构造方法的实例

- 全局挂载路由实例  
  `Vue.use(VueRouter)`
- 路由实例方法 push

```js
// 字符串
this.$router.push('home')
// 对象
this.$router.push({ path: 'home' })
// 命名的路由
this.$router.push({ name: 'user', params: { userId: 123 } })
// 带查询参数，变成 /register?plan=123
this.$router.push({ path: 'register', query: { plan: '123' } })
```

push 方法其实和 `<router-link :to="...">` 是等同的。

- 路由实例方法 go  
  `this.$router.go(-1) // 后退`
- 路由实例方法 replace

```js
//push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，
不会向 history 栈添加一个新的记录
<router-link to="/05" replace>05</router-link>

// 一般使用replace来做404页面
this.$router.replace('/')
```

- router.push(location)===window.history.pushState

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 } })
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })
```

- router.replace(location)===window.history.replaceState
- router.go(n)===window.history.go

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
// 前进 3 步记录
router.go(3)
```

## 链接

- <https://router.vuejs.org/zh/>
- <https://www.jianshu.com/p/fa0b5d919615>
