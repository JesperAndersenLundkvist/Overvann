function initMap() {
	// Init the map to the 'map' div
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 59.128321, lng: 10.223086},
	  zoom: 15
	});

	
	// Initialize the drawing toolbar
	var drawingManager = new google.maps.drawing.DrawingManager({
	  drawingMode: google.maps.drawing.OverlayType.POLYGON,
	  drawingControl: true,
	  drawingControlOptions: {
		position: google.maps.ControlPosition.TOP_CENTER,
		drawingModes: ['polygon']
	  },
	  markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
	  circleOptions: {
		fillColor: '#ffff00',
		fillOpacity: 1,
		strokeWeight: 5,
		clickable: false,
		editable: true,
		zIndex: 1
	  }
	});
	drawingManager.setMap(map);
	
	// Var for storing the area
	var areal = 0;
	
	// Listen for event when the polygon has been drawn completely
	google.maps.event.addListener(drawingManager, "polygoncomplete", function(event){
		// get the area in square meters
		areal = google.maps.geometry.spherical.computeArea(event.getPath());
		console.log('area drawn was: ', areal);
	});

	$( "#beregn" ).click(function() {
		var intensitet = $('#intensitet').val();
		var avrenningsfaktor = $('#avrenningsfaktor').val();
		var klimafaktor = $('#klimafaktor').val();
		
		var vannmengde = avrenningsfaktor * (areal/10000) * intensitet * klimafaktor; 
		alert("Avrenningen fra feltet blir " + vannmengde.toFixed(2) + " l/s");
	});	
	
}
// rain intensety data from:
// https://cms.met.no/site/2/klimaservicesenteret/dimensjonerende-nedb%C3%B8r/ivf-verdier-fra-et-utvalg-m%C3%A5lestasjoner/_attachment/7180?_ts=150b8ee01e5