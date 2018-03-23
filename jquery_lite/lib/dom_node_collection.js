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
