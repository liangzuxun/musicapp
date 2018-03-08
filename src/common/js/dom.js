export const Dom = {
  g(name) {
    return Array.prototype.slice.call(document.querySelectorAll(name))
  },
  css(dom, key, value) {
    dom.style[key] = value
    return this
  },
  attr(dom, key, value) {
    dom.setAttribute(key, value)
    return this
  },
}