import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Draw, Modify, Select, Snap} from 'ol/interaction.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

var raster = new TileLayer({
  source: new OSM()
});

var vector = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  })
});

var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

var ExampleDraw = {
  Polygon: new Draw({
    source: vector.getSource(),
    type: 'Polygon'
  }), 
  init: function() {   
    map.addInteraction(this.Polygon);
    this.Polygon.setActive(true);  

  },  
};
ExampleDraw.init();
var snap = new Snap({
  source: vector.getSource()
});
map.addInteraction(snap);



function initializeStartButton() {
  var startDiv = document.getElementById("start");
  startDiv.addEventListener("click", function() 
  {
    var features = vector.getSource().getFeatures();
    features.forEach(function(feature) {
        console.log(feature.getGeometry().getCoordinates());
    });    
  });
}
initializeStartButton();
