var modal = document.getElementById("myModal");
var img = document.getElementById("photocamp");
var modalImg = document.getElementById("img01");
let startDate = document.getElementById("start-booking");
let endDate = document.getElementById("end-booking");

setMinStartDate();

startDate.addEventListener('input', setMinEndDate);

function setMinStartDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  startDate.min = today;

}

function setMinEndDate(e) {
  // Set min date
  endDate.min = e.target.value;
}

img.onclick = function () {
  modal.style.display = "block";

  modalImg.src = this.src;

}

var span = document.getElementsByClassName("close")[0];


span.onclick = function () {
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
    center: ol.proj.fromLonLat([13.503021929827879, 46.32231094618193]),
    zoom: 18
  })
});


//review show
function showReview() {
  let x = document.getElementById("review-form");
  if (x.style.display === "none") {
    x.style.display = "block";

  } else {
    x.style.display = "none";
  }
}