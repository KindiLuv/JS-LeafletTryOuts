var allPoly = [];


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
        for(var i = 0; i < 70; ++i){
          var point = L.marker(data.features[i].geometry.coordinates,{/*option*/ opacity: 1}).addTo(map);
          point.bindPopup("<b>"+data.features[i].properties.name);
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



