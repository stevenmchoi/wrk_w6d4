Window.prototype.$l = function(selector) {
  let nodeList = document.body.querySelectorAll(selector);
  nodeList = Array.from(nodeList);
  return nodeList;
};

window.$l = $l;
