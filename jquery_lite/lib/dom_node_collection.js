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
