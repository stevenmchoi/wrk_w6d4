const DomNodeCollection = require('./dom_node_collection')

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
