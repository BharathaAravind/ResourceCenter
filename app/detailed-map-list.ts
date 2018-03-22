var frameModule =require("ui/frame");
var mapsModule = require("nativescript-google-maps-sdk");
var latitude =  39.1710032;
var longitude = -86.5171975;
var zoom = 15;
var minZoom = 0;
var maxZoom = 22;
var bearing = 0;
var tilt = 0;
var padding = [40, 40, 40, 40];
var observable = require("data/observable");

var pageData = new observable.Observable();

exports.onNavigatingToMap = function(args) {
    var page = args.object;
    pageData.set("latitude", latitude);
    pageData.set("longitude", longitude);
    pageData.set("zoom", zoom);
    
    var gotData=page.navigationContext;
    
    console.log(gotData.param1);
    console.log(gotData.param2);

    args.object.bindingContext = pageData;

}

exports.onMapReady = function(args) {
    var mapView = args.object;
    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(39.1710032, -86.5171975);
    marker.title = "Wells Library";
    marker.userData = { index : 1};
    mapView.addMarker(marker);

    // Disabling zoom gestures
    mapView.settings.zoomGesturesEnabled = false;

}

exports.onMarkerSelect = function(args) {
     console.log("Clicked on " +args.marker.title);
}


exports.onNavBtnTap = function(){
    // This code will be called only in Android.
    console.log("Navigation button tapped!");
    var navigationOptions={
        moduleName:'main-page',
        clearHistory: true,
    }
    
    frameModule.topmost().navigate(navigationOptions);
}
