export default class Dom {
  static hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className)
    }
    const nameArray = el.className.split(' ')
    return nameArray.indexOf(className) > -1
  }
  static addClass(el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      const newClass = el.className.split(' ').concat([className]).join(' ')
      el.className = newClass
    }
  }
  static removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else if (Dom.hasClass(el, className)) {
      const newClass = el.className.split(' ').filter(name => name !== className).join(' ')
      el.className = newClass
    }
  }
}
