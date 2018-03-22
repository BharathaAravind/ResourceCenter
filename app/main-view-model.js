"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
var mapsModule = require("nativescript-google-maps-sdk");
var segmentedBar = new segmentedBarModule.SegmentedBar();
var page;
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.myDataArray = [
            { title: "Slide 1", color: "#b3cde0", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/01.jpg" },
            { title: "Slide 2", color: "#6497b1", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/02.jpg" },
            { title: "Slide 3", color: "#005b96", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/03.jpg" },
            { title: "Slide 4", color: "#03396c", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/04.jpg" }
            /*{title:"Slide 5", color: "#011f4b", image: ""}*/
        ];
        _this.latitude = 39.1710032;
        _this.longitude = -86.5171975;
        _this.zoom = 15;
        _this.minZoom = 0;
        _this.maxZoom = 22;
        _this.bearing = 0;
        _this.tilt = 0;
        _this.padding = [40, 40, 40, 40];
        _this.selectedIndex = 0;
        _this.tabNames = ["Facebook", "Twitter", "Instagram"];
        _this.visibility1 = true;
        _this.visibility2 = false;
        _this.visibility3 = false;
        // Initialize default values.
        _this.eventTitle = "World Fair 2018";
        _this.selectedIndex = 0;
        _this.tab1 = _this.tabNames[0];
        _this.tab2 = _this.tabNames[1];
        _this.tab3 = _this.tabNames[2];
        return _this;
    }
    HelloWorldModel.prototype.myChangeEvent = function (args) {
        var changeEventText = "Page changed to index: " + args.index;
        console.log(changeEventText);
    };
    HelloWorldModel.prototype.onMapReady = function (args) {
        var mapView = args.object;
        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(39.1710032, -86.5171975);
        marker.title = "Wells Library";
        marker.userData = { index: 1 };
        mapView.addMarker(marker);
        // Disabling zoom gestures
        mapView.settings.zoomGesturesEnabled = false;
    };
    HelloWorldModel.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        console.log(this.selectedIndex);
        switch (this.selectedIndex) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
    };
    HelloWorldModel.prototype.onMarkerSelect = function (args) {
        console.log("Clicked on " + args.marker.title);
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLHNFQUF3RTtBQUd4RSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFlBQVksR0FBRyxJQUFJLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0FBRXpELElBQUksSUFBVSxDQUFDO0FBRWY7SUFBcUMsbUNBQVU7SUE0QjNDO1FBQUEsWUFDSSxpQkFBTyxTQVFWO1FBbENPLGlCQUFXLEdBQVE7WUFDdkIsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLDJGQUEyRixFQUFDO1lBQ3RJLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQywyRkFBMkYsRUFBQztZQUN0SSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsMkZBQTJGLEVBQUM7WUFDdEksRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLDJGQUEyRixFQUFDO1lBQ3RJLGtEQUFrRDtTQUNyRCxDQUFDO1FBQ00sY0FBUSxHQUFJLFVBQVUsQ0FBQztRQUN2QixlQUFTLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDeEIsVUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixhQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsYUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxhQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQixtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixjQUFRLEdBQUcsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBSTlDLGlCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBTXhCLDZCQUE2QjtRQUM3QixLQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO1FBQ3BDLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUNqQyxDQUFDO0lBRU8sdUNBQWEsR0FBckIsVUFBc0IsSUFBSTtRQUN0QixJQUFJLGVBQWUsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLG9DQUFVLEdBQWpCLFVBQWtCLElBQUk7UUFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUcsQ0FBQyxFQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxQiwwQkFBMEI7UUFDMUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDakQsQ0FBQztJQUVNLCtDQUFxQixHQUE1QixVQUE2QixJQUFJO1FBRTdCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUM7Z0JBQ0YsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUNNLHdDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0wsc0JBQUM7QUFBRCxDQUFDLEFBOUVELENBQXFDLHVCQUFVLEdBOEU5QztBQTlFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0ICogYXMgc2VnbWVudGVkQmFyTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcbnZhciBzZWdtZW50ZWRCYXIgPSBuZXcgc2VnbWVudGVkQmFyTW9kdWxlLlNlZ21lbnRlZEJhcigpO1xuXG52YXIgcGFnZTogUGFnZTtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIFxuICAgIHByaXZhdGUgZXZlbnRUaXRsZTogc3RyaW5nO1xuICAgIHByaXZhdGUgbXlEYXRhQXJyYXk6IGFueSA9IFtcbiAgICAgICAge3RpdGxlOlwiU2xpZGUgMVwiLCBjb2xvcjogXCIjYjNjZGUwXCIsIGltYWdlOlwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LXBob3Rvdmlld2VyL21hc3Rlci9kZW1vL3Jlcy8wMS5qcGdcIn0sXG4gICAgICAgIHt0aXRsZTpcIlNsaWRlIDJcIiwgY29sb3I6IFwiIzY0OTdiMVwiLCBpbWFnZTpcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9tYW5pamFrL25hdGl2ZXNjcmlwdC1waG90b3ZpZXdlci9tYXN0ZXIvZGVtby9yZXMvMDIuanBnXCJ9LFxuICAgICAgICB7dGl0bGU6XCJTbGlkZSAzXCIsIGNvbG9yOiBcIiMwMDViOTZcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAzLmpwZ1wifSxcbiAgICAgICAge3RpdGxlOlwiU2xpZGUgNFwiLCBjb2xvcjogXCIjMDMzOTZjXCIsIGltYWdlOlwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LXBob3Rvdmlld2VyL21hc3Rlci9kZW1vL3Jlcy8wNC5qcGdcIn1cbiAgICAgICAgLyp7dGl0bGU6XCJTbGlkZSA1XCIsIGNvbG9yOiBcIiMwMTFmNGJcIiwgaW1hZ2U6IFwiXCJ9Ki9cbiAgICBdO1xuICAgIHByaXZhdGUgbGF0aXR1ZGUgPSAgMzkuMTcxMDAzMjtcbiAgICBwcml2YXRlIGxvbmdpdHVkZSA9IC04Ni41MTcxOTc1O1xuICAgIHByaXZhdGUgem9vbSA9IDE1O1xuICAgIHByaXZhdGUgbWluWm9vbSA9IDA7XG4gICAgcHJpdmF0ZSBtYXhab29tID0gMjI7XG4gICAgcHJpdmF0ZSBiZWFyaW5nID0gMDtcbiAgICBwcml2YXRlIHRpbHQgPSAwO1xuICAgIHByaXZhdGUgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEluZGV4ID0gMDtcbiAgICBwcml2YXRlIHRhYk5hbWVzID0gW1wiRmFjZWJvb2tcIixcIlR3aXR0ZXJcIixcIkluc3RhZ3JhbVwiXTtcbiAgICBwcml2YXRlIHRhYjE6c3RyaW5nO1xuICAgIHByaXZhdGUgdGFiMjpzdHJpbmc7ICAgIFxuICAgIHByaXZhdGUgdGFiMzpzdHJpbmc7XG4gICAgcHJpdmF0ZSB2aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgcHJpdmF0ZSB2aXNpYmlsaXR5MiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdmlzaWJpbGl0eTMgPSBmYWxzZTtcbiAgICBcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGRlZmF1bHQgdmFsdWVzLlxuICAgICAgICB0aGlzLmV2ZW50VGl0bGUgPSBcIldvcmxkIEZhaXIgMjAxOFwiO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnRhYjEgPSB0aGlzLnRhYk5hbWVzWzBdO1xuICAgICAgICB0aGlzLnRhYjIgPSB0aGlzLnRhYk5hbWVzWzFdO1xuICAgICAgICB0aGlzLnRhYjMgPSB0aGlzLnRhYk5hbWVzWzJdO1xuICAgIH0gXG4gICAgXG4gICAgcHVibGljICBteUNoYW5nZUV2ZW50KGFyZ3Mpe1xuICAgICAgICB2YXIgY2hhbmdlRXZlbnRUZXh0ID0gXCJQYWdlIGNoYW5nZWQgdG8gaW5kZXg6IFwiICsgYXJncy5pbmRleDtcbiAgICAgICAgY29uc29sZS5sb2coY2hhbmdlRXZlbnRUZXh0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NYXBSZWFkeShhcmdzKSB7XG4gICAgICAgIHZhciBtYXBWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBhIG1hcmtlci4uLlwiKTtcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygzOS4xNzEwMDMyLCAtODYuNTE3MTk3NSk7XG4gICAgICAgIG1hcmtlci50aXRsZSA9IFwiV2VsbHMgTGlicmFyeVwiO1xuICAgICAgICBtYXJrZXIudXNlckRhdGEgPSB7IGluZGV4IDogMX07XG4gICAgICAgIG1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7XG5cbiAgICAgICAgLy8gRGlzYWJsaW5nIHpvb20gZ2VzdHVyZXNcbiAgICAgICAgbWFwVmlldy5zZXR0aW5ncy56b29tR2VzdHVyZXNFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKXtcblxuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0gXG4gICAgcHVibGljIG9uTWFya2VyU2VsZWN0KGFyZ3MpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2xpY2tlZCBvbiBcIiArYXJncy5tYXJrZXIudGl0bGUpO1xuICAgIH1cbiAgICBcbiAgICAgIFxufVxuIl19