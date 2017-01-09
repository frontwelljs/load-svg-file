'use strict'

class TestEnvironment { // eslint-disable-line no-unused-vars
  static disablePromise () {
    if (Promise) {
      TestEnvironment.__Promise = Promise
      Promise = null // eslint-disable-line no-global-assign
    }
  }

  static enablePromise () {
    if (!Promise) {
      Promise = TestEnvironment.__Promise // eslint-disable-line no-global-assign
    }
  }

  static getPromise () {
    if (!Promise) {
      return TestEnvironment.__Promise
    }

    return Promise
  }
}

class Container { // eslint-disable-line no-unused-vars
  static __getSvgContent () {
    return '<!--?xml version="1.0" encoding="UTF-8"?--><svg xmlns="http://www.w3.org/2000/svg">' +
      '<symbol id="doc" viewBox="0 0 685 776"><path d="M597.6 124H233.7c-35.5 0-64.2 26-64.2 58.2v659.6c0 ' +
      '32.1 28.7 58.2 64.2 58.2h556.6c35.5 0 64.2-26 64.2-58.2v-485zM298 362.8h206v38.8H298zm428.2 ' +
      '426.8H297.9v-38.8h428.2zm0-97H297.9v-38.8h428.2zm0-97H297.9v-38.8h428.2zm0-97H297.9v-38.8h428.2z" ' +
      'transform="translate(-169.5 -124)"></path></symbol></svg>'
  }

  static __getContainer () {
    const elements = document.querySelectorAll('body > div')

    for (let i = 0, element; (element = elements[i++]);) {
      if (element.id === '') {
        return element
      }
    }

    return null
  }

  static exists () {
    return Container.__getContainer() !== null
  }

  static clear () {
    if (Container.exists()) {
      const el = Container.__getContainer()

      el.parentNode.removeChild(el)
    }
  }

  static hasClass (_class) {
    if (!Container.exists()) {
      return false
    }

    return Container.__getContainer().className === _class
  }

  static isVisible () {
    if (!Container.exists()) {
      return false
    }

    return Container.__getContainer().offsetParent !== null
  }

  static containsSvg () {
    if (!Container.exists()) {
      return false
    }

    const content = Container.__getContainer().innerHTML.trim()

    return content === Container.__getSvgContent()
  }

  static check (doneCallback) {
    const checkCallback = () => Container.exists()

    const id = setInterval(() => {
      if (checkCallback() === true) {
        doneCallback()
        clearInterval(id)
      }
    },
    0
    )
  }
}
