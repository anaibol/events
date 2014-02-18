jQuery(document).ready(function($) {
  var tid = setInterval(function() {
    if (document.readyState !== 'complete') return;
    clearInterval(tid);

    function MarkerClip(map) {

      this.map = map;

      var theClip = this;

      function onMapChange() {
        theClip.updateMarkers();
      }

      map.addCallback('panned', onMapChange);
      map.addCallback('zoomed', onMapChange);
      map.addCallback('centered', onMapChange);
      map.addCallback('extentset', onMapChange);

      map.addCallback('resized', function() {
        markerDiv.style.width = map.dimensions.x + 'px';
        markerDiv.style.height = map.dimensions.y + 'px';
        theClip.updateMarkers();
      });

      this.updateMarkers = function() {
        for (var i = 0; i < this.markers.length; i++) {
          this.updateMarkerAt(i);
        }
      };

      this.markers = [];
      this.markerLocations = [];
      this.markerOffsets = [];

      this.addMarker = function(element, location, offset) {
        if (!offset) {
          offset = new MM.Point(element.offsetWidth / 2, element.offsetHeight / 2);
        }
        map.parent.appendChild(element);
        this.markers.push(element);
        this.markerLocations.push(location);
        this.markerOffsets.push(offset);
        this.updateMarkerAt(this.markers.length - 1);
      };

      this.updateMarkerAt = function(index) {
        var point = map.locationPoint(this.markerLocations[index]),
          offset = this.markerOffsets[index],
          element = this.markers[index];
        element.style.left = (point.x - offset.x) + 'px';
        element.style.top = (point.y - offset.y) + 'px';
      };

      var createdMarkerCount = 0;

      this.createDefaultMarker = function() {
        var marker = document.createElement('div');
        marker.id = map.parent.id + '-marker-' + createdMarkerCount;
        marker.className = 'marker';
        createdMarkerCount++;
        return marker;
      };

    }

    var x = window.pos.latitude;
    var y = window.pos.longitude;
    var z = 15;
    loc = new MM.Location(x, y);

    var layer = new MM.StamenTileLayer("toner");
    var map = new MM.Map("map", layer);

    map.setCenterZoom(new MM.Location(37.7, -122.4), 12);

    map.setCenterZoom(loc, z);

    var markerClip = new MarkerClip(map);

    var marker = markerClip.createDefaultMarker();
    marker.title = loc.toString();
    markerClip.addMarker(marker, loc);

    window.onresize = function() {
      map.setSize(container.offsetWidth, container.offsetHeight);
    };


  }, 1000);


});