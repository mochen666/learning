`new` 操作做了几件事：
- 创建一个新对象
- 将这个空对象的原型（__proto__），指向构造函数的 prototype 属性
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象），执行构造函数中的代码（为这个对象添加属性）
- 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回新对象的引用


```js
function New(fn) {
    let obj = {}
    obj.__proto__ = fn.prototype
    
    const result = fn.apply(obj, Array.prototype.slice.call(arguments, 1))
    
    if ((typeof result === 'object' || typeof ret === "function") && result !== null) {
        return result
    }
    return result
}

var obj = New(A, 1, 2);
// equals to
var obj = new A(1, 2);
```