// d3.JSON ("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson")
// API key
const API_KEY = "pk.eyJ1IjoicmFjaGVsdHJpbmRsZSIsImEiOiJjazR6dzF4M2gwYzJ6M2RrN3V0aHd2ZjgwIn0.iaDQgA9cMpDMWjM_KRp77g";

var map = L.map("map", {
  center: [0, 0],
  zoom: 2.25
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var mapStyle = {
  color: "white",
  fillColor: "pink",
  fillOpacity: 0.5,
  weight: 1.5
};

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
function color(coordinates) {
  {
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function (data) {
  console.log(data.mag)


  L.geoJson(data, {
    style: function (features) {
      return {
        color: "gray",
        fillColor: color(features.geometry.coordinates),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
  }).addTo(map);
});

d3.json(link, function (data) {

  
  L.geoJson(data, {
    style: function (features) {
      return {
        color: "gray",
        fillColor: color(features.geometry.coordinates),
        fillOpacity: 0.5,
        weight: 1.5
      }
    },
    onEachFeature: function (features, layer) {
      layer.on({
        mouseover: function (event) {
          layer = event.target;
          style({
            fillOpacity: 0.9
          });
        },
        
        mouseout: function (event) {
          layer = event.target;
          style({
            fillOpacity: 0.5
          });
        },
        
        // click: function (event) {
        //   map.fitBounds(event.target.getBounds());
        // }
      });
      
      layer.bindPopup("<h1>" + "Magnitude:"+ features.properties.mag + "</h1> <hr> <h2>" + features.properties.place + "</h2>");
      console.log(features.properties.mag)
    }
  
}).addTo(map);
})

