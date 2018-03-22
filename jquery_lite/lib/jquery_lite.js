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
  constructor(HTMLElementArr) {
    this.HTMLElementArr = HTMLElementArr;
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
    switch (argument) {
      case DomNodeCollection:
        this.HTMLElementArr.forEach(thisEl => {
          arguments.HTMLElementArr.forEach(argEl => thisEl.innerHTML.appendChild(argEl.outerHTML));
        });
        break;
      case HTMLElement:
        this.HTMLElementArr.forEach(el => el.innerHTML.appendChild(argument.outerHTML));
        break;
      default:
        this.HTMLElementArr.forEach(el => el.innerHTML.appendChild(argument));
    }
  }

  attr(attrName, value) {
    if (value === undefined) {
      return this.HTMLElementArr.find(el => el.attributes.name === attrName).value;
    } else if (value === null) {
      this.HTMLElementArr.forEach(el => {
        el.removeAttribute(attrName);
      })
    } else {
      this.HTMLElementArr.forEach(el => {
        el.setAttribute(attrName, value);
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
}

module.exports = DomNodeCollection;


/***/ })
/******/ ]);