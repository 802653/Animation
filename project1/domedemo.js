var htmlElements = "";
for (var i = 0; i < array.length; i++) {
   htmlElements += '<div class="box"></div>';
}
var container = document.getElementById("container");
container.innerHTML = htmlElements;