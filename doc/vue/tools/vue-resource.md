# Http request

## Resource

Resource 服务可以在全局使用：Vue.resource，也可以在组件里面调用：this.\$resource，
方法调用格式如下：

```js
resource(url, [params], [actions], [options])
```

默认调用方法如下所示：

```js
get: {method:'GET'},
save: {method:'POST'},
query: {method:'GET'},
update: {method:'PUT'},
remove: {method:'DELETE'},
delete: {method:'DELETE'}
```

例：

```js
const resource = this.$resource(CONSTANT.RESOURCE.SEND_CAPTCHA)
resource.save(params).then(
  (response) => {
    // success callback
  },
  (response) => {
    // error callback
  },
)
```
