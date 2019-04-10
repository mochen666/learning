## 一、实现 call

```js
Function.prototype.myCall = function(context) {
    context = context || window
    context.fn = this
    
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}
```

## 二、实现 apply

```js
Function.prototype.myApply = function(context, args) {
    context = context || window
    context.fn = this
    
    let result
    if (args) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
```

## 三、实现 bind
bind 的功能：
- 1、bind是用于绑定this指向的
- 2、bind方法会创建一个新的函数。当这个新函数被调用时，bind的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。
- 3、bind返回的绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略，同时调用时的参数被提供给模拟函数。

```js
Function.prototype.myBind = function(context) {
    context = context || window
    const fn = this
    let args = Array.prototype.slice.call(arguments, 1)
    
    function F() {}
    
    const newF = function() {
        args = args.concat(Array.prototype.slice.call(arguments))
        return fn.apply(this instanceof newF ? this : context, args)
    }
    
    F.prototype = fn.prototype
    newF.prototype = new F()
    
    return newF
}
```