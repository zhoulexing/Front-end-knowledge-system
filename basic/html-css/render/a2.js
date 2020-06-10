console.log("c");
var c = document.querySelector("#c");
c.innerHTML = "c";
c.style.color = "red";
var style = window.getComputedStyle(c, null);
c.style.width = "80%";
style = window.getComputedStyle(c, null);