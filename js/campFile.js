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

// map code
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });