export default function throttle(func, wait, mustRun) {
  var timeout,
    startTime = new Date()
  return function () {
    var context = this,
      args = arguments,
      curTime = new Date
    clearTimeout(timeout)
    if (curTime - startTime >= mustRun) {
      func, apply(context, args)
      startTime = curTime
    } else {
      timeout = setTimeout(func, wait)
    }
  }
}