function createLocationMarker(map) {
  // Add markers, pop-ups and else.
  var marker = L.marker([0, 0], {
    draggable: true,
  }).addTo(map);
  marker.bindPopup("<b>You are here</b>");

  // cheat to get easy lng and lat
  marker.on("dragend", function (e) {
    //alert(marker.getLatLng().toString());
    marker.getPopup().setContent(marker.getLatLng().toString());
  });
}

function parsemark(map){
  $.ajax({
    dataType: 'json',
    url: '/data/markers.json',
    success: function(data){
      console.log(data.features[0].geometry.coordinates);
      for(var int = 0; int < 70; ++int){
        var point = L.marker(data.features[int].geometry.coordinates,{/*option*/ visibility: visible, opacity: 0}).addTo(map);
        point.bindPopup("<b>"+data.features[int].properties.name);
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
      for(var int = 0; int < 70; ++int){
        var polygon = L.marker(data.features[int].geometry.coordinates,{/*option*/ opacity: 0}).addTo(map);
        polygon.bindPopup("<b>"+data.features[int].properties.name);
      }
    }
  });
}