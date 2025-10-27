export const executeOnce = (fn) => {
    let called = false
    return function (...args){
        if (called) return
        called = true
        return fn(...args)
    }
}