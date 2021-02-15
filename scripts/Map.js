function drawMap() {
  // Variables
  var mapSW = L.LatLng(-79.1, -180),
    mapNE = L.LatLng(79.1, 180),
    bounds = L.LatLngBounds(mapSW, mapNE);

  // Declare Map Object
  var map = L.map("map").setView([0, 0], 1);

  // Reference the Tiles
  L.tileLayer("./media/MapTiles/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 4,
    continuousWorld: true,
    noWrap: true,
    crs: L.CRS.Simple,
    bounds: [
      [-79.1, -176],
      [79.1, 176],
    ],
    maxBoundViscosity: 1.0,
  }).addTo(map);

  // Proper map display
  map.fitBounds([
    [
      [-128, -128],
      [128, 128],
    ],
  ]);
  map.setMaxBounds([
    [-79.1, -176],
    [79.1, 176],
  ]);

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
