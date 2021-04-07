var modal = document.getElementById("myModal");
var img = document.getElementById("photocamp");
var modalImg = document.getElementById("img01");

img.onclick = function(){
  modal.style.display = "block";
  
  modalImg.src = this.src;

}


var span = document.getElementsByClassName("close")[0];


span.onclick = function() { 
  modal.style.display = "none";
}