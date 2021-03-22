var allPoly = [];
var allMark = [];

function createLocationMarker(map) {
  // Add markers, pop-ups and else.
  var marker = L.marker([0, 0], {
    draggable: true,
  }).addTo(map);
  marker.bindPopup("<b>I am a guide marker!</b>");

  // Pythagore is our friend now
  marker.on("dragend", function (e) {
    var distMin = null;
    var closestMarker = null;
    var posMarker = marker.getLatLng();
    allMark.forEach(element => {
      let distTemp = posMarker.distanceTo(element.getLatLng())
      if(distMin == null || distTemp < distMin) {
        distMin = distTemp;
        closestMarker = element;
      }
    });
    marker.getPopup().setContent(closestMarker._popup._content);
  });
}

function parsemark(map){
    $.ajax({
      dataType: 'json',
      url: '/data/markers.json',
      success: function(data){
        for(var i = 0; i < 70; ++i){
          var point = L.marker(data.features[i].geometry.coordinates,{/*option*/ opacity: 0}).addTo(map);
          point.bindPopup("<b>"+data.features[i].properties.name);
          allMark.push(point);
        }
      }
    });
  }

function parsepolygon(map){
  $.ajax({
    dataType: 'json',
    url: '/data/polygons.json',
    success: function(data){
      console.log(data.features[0].geometry.coordinates);
      for(var i = 0; i < 17; ++i){
        var polygon = L.polygon(data.features[i].geometry.coordinates,{/*option*/ opacity: 1});
        polygon.bindPopup("<b>"+data.features[i].properties.name);
        allPoly.push(polygon);
        $('#tickmap').append("<input type='checkbox' name='markersCheckbox' id='" + i + "' class='polygonesLayers'> <label for='markers'>" + i/*`${data.features[i].properties.name}`*/ + "</label>")
      }
      $('.polygonesLayers').change(function f(){
        var id = this.id;
        if(this.checked){
          allPoly[id].addTo(map);
        }
        else{
          allPoly[id].remove();
        }
      })
    }
  });
}



