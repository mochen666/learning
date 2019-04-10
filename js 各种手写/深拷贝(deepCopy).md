## 一、最简单的实现

```js
JSON.parse(JSON.stringify(obj))
```

优势：
- 简单

缺点：
- 当参数值是 `undefined`、函数、Date 等类型时，都会被遗漏
- 无法解决循环引用的问题


## 二、递归版本的简单实现

```js
function deepCopy(obj) {
    if (typeof obj !== 'object') return obj
    
    let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key])
        }
    }
    return newObj
}
```

缺点：
- 无法解决循环引用的问题
- 递归爆栈

## 三、解决循环引用

解决方案：循环检测

> 设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可

```js
function deepCopy(obj, uniqueList) {
    if (typeof obj !== 'object') return obj
        
    let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    
    // 解决循环引用
    if (!uniqueList) uniqueList = []
    const cacheObj = find(uniqueList, obj)
    if (cacheObj) return cacheObj.target
    uniqueList.push({
        source: obj,
        target: newObj
    })
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key])
        }
    }
    return newObj
}

function find(uniqueList, obj) {
    return uniqueList.find(item => item.source === obj)
}
```

## 3、破解递归爆栈

解决方案：借助栈来实现

```js
function deepCopy(obj) {
    let newObj = Object.prototype.toString.call(currentObj) === '[object Array]' ? [] : {}
        
    let stack = [
        {
            parent: newObj,
            key: undefined,
            data: obj
        }
    ]
    
    while (stack.length) {
        const node = stack.pop()
        
        for (let key in node.data) {
            if (node.data.hasOwnProperty(key)) {
                if (typeof node.data[key] === 'object') {
                    stack.push({
                        parent: {},
                        key,
                        data: node.data[key]
                    })
                } else {
                    node.parent[key] = node.data[key]
                }
            }
        }
    }
    return newObj
}
```

## 4、解决拷贝 Symbol

Symbol 在 ES6 下才有，我们需要一些方法来检测出 Symbol 类型。
```js
Object.getOwnPropertySymbols(...)
```

注意：for...in、Object.keys、Object.getOwnPropertyNames() 均无法取出 Symbol属性
思路就是先查找有没有 Symbol 属性，如果查找到则先遍历处理 Symbol 情况，然后再处理正常情况

```js
function deepCopy(obj, uniqueList) {
    if (typeof obj !== 'object') return obj
        
    let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    
    // 解决循环引用
    if (!uniqueList) uniqueList = []
    const cacheObj = find(uniqueList, obj)
    if (cacheObj) return cacheObj.target
    uniqueList.push({
        source: obj,
        target: newObj
    })
    
    const symKeys = Object.getOwnPropertySymbols(obj)
    symKeys.forEach(symkey => {
        if (obj[symkey] && typeof obj[symkey] === 'object') {
            newObj[symkey] = deepCopy(obj[symkey])
        } else {
            newObj[symkey] = obj[symkey]
        }
    })
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key])
        }
    }
    return newObj
}

function find(uniqueList, obj) {
    return uniqueList.find(item => item.source === obj)
}
```

## 5、多种引用类型的拷贝

日期的拷贝
```js
function copyDate(date) {
    return new Date(date.getTime())
}
```

函数的拷贝
```js
function copyFunc(fn) {
    return new Function('return ' + fn)()
}
```

正则的拷贝
```js
function copyReg(reg) {
    return eval('(' + reg + ')')
}
```