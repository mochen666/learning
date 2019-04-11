/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns {Function}
 */
function debounce(fn, delay = 100) {
    let timer
    return function(...args) {
        timer && clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function throttle(fn, delay = 100) {
    let timer
    return function(...args) {
        if (timer) return

        timer = setTimeout(() => {
            fn.apply(this, args)
            clearTimeout(timer)
        }, delay)
    }
}