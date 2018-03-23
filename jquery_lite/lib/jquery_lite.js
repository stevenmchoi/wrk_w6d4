/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1)

Window.prototype.$l = function(selector) {
  if (selector instanceof HTMLElement) {
    return new DomNodeCollection([selector]);
  } else {
    let nodeList = document.body.querySelectorAll(selector);
    nodeList = Array.from(nodeList);
    return new DomNodeCollection(nodeList);
  }
};

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(argument) {
    this.fnArr = [];

    document.addEventListener("DOMContentLoaded", function(event) {
      argument();
    });
    if (typeof f === 'function') {
      if (document.readyState !== 'loading') {
        argument()
      } else {
        this.fnArr.push(argument);
      }
    } else {
      this.HTMLElementArr = argument;
    }
  }

  html(string) {
    if (string || string === "") {
      this.HTMLElementArr.forEach(el => el.innerHTML = string);
    } else {
      return this.HTMLElementArr[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(argument) {
    if (argument instanceof DomNodeCollection) {
      this.HTMLElementArr.forEach(thisEl => {
        argument.HTMLElementArr.forEach(argEl => thisEl.innerHTML += argEl.outerHTML);
      });
    } else if (argument instanceof HTMLElement) {
      this.HTMLElementArr.forEach(el => el.innerHTML += argument.outerHTML);
    } else {
      this.HTMLElementArr.forEach(el => el.innerHTML += argument);
    }
  }

  attr(attrName, val) {
    if (val === undefined) {
      return this.HTMLElementArr[0].getAttribute(attrName);
    } else if (val === null) {
      this.HTMLElementArr.forEach(el => {
        el.removeAttribute(attrName);
      })
    } else {
      this.HTMLElementArr.forEach(el => {
        el.setAttribute(attrName, val);
      });
    }
  }

  addClass(className){
    this.HTMLElementArr.forEach(el => {
      let classes = el.getAttribute('class').split(' ');
      classes.push(className);
      el.setAttribute('class', classes.join(' '));
    })
  }

  removeClass(className) {
    this.HTMLElementArr.forEach(el => {
      let classes = el.getAttribute('class').split(' ');
      const index = classes.indexOf(className);
      if (index > -1) {
          classes.splice(index, 1);
      }
      el.setAttribute('class', classes.join(' '));
    })
  }

  children() {
    let children = [];
    this.HTMLElementArr.forEach(el => {
      children = children.concat(Array.from(el.children));
    });

    return new DomNodeCollection(children);
  }

  parent() {
    let parents = [];

    this.HTMLElementArr.forEach(el => {
      if (!parents.includes(el.parentNode)) {
        parents.push(el.parentNode);
      }
    });

    return new DomNodeCollection(parents);
  }

  find(selector) {
    let descendants = [];

    this.HTMLElementArr.forEach(el => {
      descendants = descendants.concat(Array.from(el.querySelectorAll(selector)));
    });

    return new DomNodeCollection(descendants);
  }

  remove() {
    this.HTMLElementArr.forEach(el => {
      el.remove();
    })

    this.HTMLElementArr = [];
  }

  on(eventTypes, callback) {
    let types = eventTypes.split(' ');
    this.HTMLElementArr.forEach(el => {
      types.forEach(type => {
        el.addEventListener(type, callback);
      });
      el['callback'] = callback;
    });
  }

  off(eventTypes) {
    let types = eventTypes.split(' ');
    this.HTMLElementArr.forEach(el => {
      types.forEach(type => {
        el.removeEventListener(type, el['callback']);
      });
    });
  }
}

module.exports = DomNodeCollection;


/***/ })
/******/ ]);