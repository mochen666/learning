实现代码如下：

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(fn) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const self = this
    function resolve(value) {
        if (self.status === PENDING) {
            self.value = value
            self.status = FULFILLED
            setTimeout(() => {
                self.onFulfilledCallbacks.forEach(cb => cb(self.value))
            })
        }
    }
    function reject(reason) {
        if (self.status === PENDING) {
            self.reason = reason
            self.status = FULFILLED
            setTimeout(() => {
                self.onRejectedCallbacks.forEach(cb => cb(self.reason))
            })
        }
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        //如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
        reject(new TypeError('循环引用'));
    }
    // 可以省略
    else if (x instanceof Promise) {
        // 如果 x 为 Promise ，则使 promise 接受 x 的状态
        // 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
        if (x.status === PENDING) {
            x.then((y) => {
                resolvePromise(promise2, y, resolve, reject);
            }, (reason) => {
                reject(reason)
            })
        } else {
            // 如果 x 处于执行态，用相同的值执行 promise
            // 如果 x 处于拒绝态，用相同的据因拒绝 promise
            x.then(resolve, reject)
        }
    }
    else if (x && (typeof x === 'function' || typeof x === 'object')) {
        // x 为对象或函数
        let called
        try {
            let then = x.then
            if (typeof then === 'function') {
                // 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
                // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
                // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                then.call(x, function(y) {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, function(r) {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                // 如果 then 不是函数，以 x 为参数执行 promise
                resolve(x)
            }
        } catch(e) {
            if (called) return
            called = true
            reject(e)
        }
    }
    else {
        resolve(x)
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw Error(reason) }

    const self = this
    let newPromise
    if (this.status === PENDING) {
        return newPromise = new Promise(function(resolve ,reject) {
            self.onFulfilledCallbacks.push(function(value) {
                try {
                    const x = onFulfilled(value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.onRejectedCallbacks.push(function(reason) {
                try {
                    const x = onRejected(reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    // 成功态
    if (this.status === FULFILLED) {
        return newPromise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    const x = onFulfilled(self.value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    // 失败态
    if (this.status === REJECTED) {
        return newPromise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    const x = onRejected(this.reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}

// finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。
// 这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
Promise.prototype.finally = function (callback) {
    return this.then(
        value => Promise.resolve(callback()).then(() => value),
        reason => Promise.resolve(callback()).then(() => throw reason)
    )
}

new Promise(function() {
    resolve(111)
}).then(function(value) {
    return value
})
```