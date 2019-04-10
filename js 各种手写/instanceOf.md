
```js
function instanceOf(left, right) {
    while (left.__proto__ !== null) {
        if (left.__proto__ === right.prototype) {
            return true
        } else {
            left = left.__proto__
        }
    }
    return false
}
```