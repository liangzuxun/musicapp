; (function () {
  var MESSAGE = {}
  return {
    regist(type, fn) {
      if (typeof MESSAGE[type] === undefined) {
        MESSAGE[type] = [fn]
      } else {
        MESSAGE[type].push(fn)
      }
    },
    fire(type, ...args) {
      if (!MESSAGE[type]) {
        return
      }
      for (var i = 0; i < MESSAGE[type].length; i++) {
        MESSAGE[type][i].apply(this, args)
      }
    },
    remove(type, fn) {
      if (MESSAGE[type] instanceof Array) {
        var i = MESSAGE[type].length - 1
        for (; i >= 0; i--) {
          MESSAGE[type] === fn && MESSAGE[type].splice(i, 1)
        }
      }
    }
  }
})()