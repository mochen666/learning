什么是柯里化？
> 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。

柯里化的作用和特点：
- 参数复用
- 提前返回
- 延迟执行

```js
function curry(fn, args) {
    const length = fn.length
    args = args || []
    return function() {
        args = args.concat(Array.prototype.slice.call(arguments))
        if (args.length < length) {
            return curry.call(this, fn, args)
        }
        return fn.apply(this, args)
    }
}

// 测试代码
function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

multi(2)(3)(4);
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);
```

