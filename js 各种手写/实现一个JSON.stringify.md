JSON.stringify 的基本用法
```js
JSON.stringify(value[, replacer [, space]])：
```

- Boolean | Number| String 类型会自动转换成对应的原始值。
- undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
- 不可枚举的属性会被忽略
- 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。

```js
function jsonStringify(obj) {
    const type = typeof obj
    if (type !== 'object') {
        if (test === 'function') {
            return undefined
        }
        if (obj === null) {
            return 'null'
        }
        if (['boolean', 'number'].includes(test)) {
            return '"' + obj + '"'
        }
        return obj
    }
    
    let json = []
    for (let key in obj) {
        let str = Array.isArray(obj) ? '' : '"' + key + '":'
        str += String(jsonStringify(obj[key]))
        json.push(str)
    }
    if (Array.isArray(obj)) {
        return '[' + String(json) + ']'
    } else {
        return '{' + String(json) + '}'
    }
}
```