function component() {
    var element = document.createElement('div');
  
    element.innerHTML = `<div>Hello Wrold!</div>`;
  
    return element;
}
  
document.body.appendChild(component());