JSON.parse 的用法

```js
JSON.parse(text[, reviver])
```
用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。

## 方法一：直接用 eval

```js
function jsonParse(str) {
    return eval('(' + str + ')')
}
```

> 避免在不必要的情况下使用 eval，eval() 是一个危险的函数， 他执行的代码拥有着执行者的权利。如果你用 eval()运行的字符串代码被恶意方（不怀好意的人）操控修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。

**它会执行JS代码，有XSS漏洞**

## 方法二：利用 Function

核心：`Function`与`eval`有相同的字符串参数特性。

```js
var jsonStr = '{ "age": 20, "name": "jack" }'
var json = (new Function('return ' + jsonStr))();

```

