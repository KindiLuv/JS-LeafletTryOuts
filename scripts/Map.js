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

function parsemarker(map, markersCheckbox){
  if (markersCheckbox.checked == true) {
    $.ajax({
      dataType: 'json',
      url: '/data/markers.json',
      success: function(data){
        for(var i = 0; i < 70; ++i){
          var point = L.marker(data.features[i].geometry.coordinates,{/*option*/ opacity: 1}).addTo(map);
          point.bindPopup("<b>"+data.features[i].properties.name);
        }
      }
    });
  }
  else {
    $.ajax({
      dataType: 'json',
      url: '/data/markers.json',
      success: function(data){
        for(var i = 0; i < 70; ++i){
          var point = L.marker(data.features[i].geometry.coordinates,{/*{option*/ opacity: 0}).addTo(map);
          point.bindPopup("<b>"+data.features[i].properties.name);
        }
      }
    });
  }
}

function parsepolygon(map, markersCheckbox){
  $.ajax({
    dataType: 'json',
    url: '/data/polygons.json',
    success: function(data){
      console.log(data.features[0].geometry.coordinates);
      for(var i = 0; i < 70; ++i){
        var polygon = L.polygon(data.features[i].geometry.coordinates,{/*option*/ opacity: 1}).addTo(map);
        polygon.bindPopup("<b>"+data.features[i].properties.name);
      }
    }
  });
}