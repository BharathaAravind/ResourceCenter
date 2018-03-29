"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_cardview_1 = require("nativescript-cardview");
var LabelModule = require("tns-core-modules/ui/label");
var view = require("ui/core/view");
var layout = require("ui/layouts/grid-layout");
var grid_layout_1 = require("ui/layouts/grid-layout");
var ImageModule = require("tns-core-modules/ui/image");
var observable = require("data/observable");
var pageData = new observable.Observable();
var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel interdum turpis. Proin non orci mi. Etiam lobortis quam risus, nec pellentesque est luctus quis. Nullam dolor neque, sodales vel metus eget, viverra elementum enim. Fusce a nisl iaculis, finibus enim ac, tempor nibh. In hac habitasse platea dictumst. Etiam faucibus, nisl ac molestie varius, nisl odio euismod turpis, in gravida justo arcu id lorem. Suspendisse et hendrerit tellus. Aenean pulvinar purus diam, ut luctus diam imperdiet et.\n\nUt interdum pretium orci, non cursus ante ullamcorper aliquam. In lacinia, dui ut finibus mollis, libero ipsum viverra mauris, ac tincidunt ante dolor id est. Fusce dapibus lacus viverra vestibulum feugiat. Ut ac metus vehicula, venenatis ex sed, molestie arcu. Sed congue odio vel libero volutpat condimentum. Aliquam erat volutpat. Mauris viverra mi nibh, a finibus felis tristique non. Ut non interdum dolor.\n";
var utilityModule = require("utils/utils");
var fetchModule = require("fetch");
//Twitter Keys and credentials
var key = "8V6bj0T5YMy9S7HjVYjfxGCrL";
var secret = "DMPSjrwBeLnxTtaYBXKO0wOQu2YAeAbumcjG1ltNF6tUhrOERR";
var cat = key + ":" + secret;
var Buffer = require('buffer/').Buffer;
var credentials = new Buffer(cat).toString('base64');
//Instagram keys and credetnials
var CLIENT_ID_INSTA = "dd21058cba024c5293e762099cf157aa";
var REDIRECT_URL = "https://www.test.com/";
var access_token_insta = "";
var http = require("http");
var myDataArray = [
    { title: "Slide 1", color: "#b3cde0", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/01.jpg" },
    { title: "Slide 2", color: "#6497b1", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/02.jpg" },
    { title: "Slide 3", color: "#005b96", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/03.jpg" },
    { title: "Slide 4", color: "#03396c", image: "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/04.jpg" }
    /*{title:"Slide 5", color: "#011f4b", image: ""}*/
];
var createViewModel = require("./main-view-model").createViewModel;
var frameModule = require("ui/frame");
var items = [];
var bearerToken;
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
var page;
exports.loaded = function (args) {
    page = args.object;
    console.log("loading is called");
    //Twitter Api Integration
    /*
    fetchModule.fetch("https://api.twitter.com/oauth2/token", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + credentials,
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: "grant_type=client_credentials"
    })
    .then(function(response) {
        console.log("bearer api success");
        bearerToken = response["_bodyInit"];
        bearerToken = JSON.parse(bearerToken).access_token;
        console.log(bearerToken);
        fetchModule.fetch("https://api.twitter.com/1.1/search/tweets.json?q=deletefacebook", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + bearerToken,
            },
        })
        .then(function(response) {
            console.log("search api success");
            //console.log(JSON.stringify(response));
            alert(JSON.stringify(response));
        }, function(error) {
            console.log("search api fail");
            //console.log(JSON.stringify(error));
        });


    }, function(error) {
        console.log(JSON.stringify(error));
    });
    */
    //Instagram Api Integration
    pageData.set("src", "https://api.instagram.com/oauth/authorize/?client_id=" + CLIENT_ID_INSTA + "&redirect_uri=" + REDIRECT_URL + "&response_type=token");
    // let webView = page.getViewById("instawebview");
    // if(typeof webView != "undefined"){
    //      webView.on(webViewModule.WebView.loadFinishedEvent, function (args: webViewModule.LoadEventData) {
    //          let message;
    //          if (!args.error) {
    //             message = args.url; 
    //             if(message.includes("access_token")){
    //                 webView.visibility = "collapsed";
    //                 var url = message.split("access_token=");
    //                 access_token_insta = url[1];
    //                 console.log(access_token_insta);
    //                 var tag = "lifeoncampus";
    //                 console.log(tag);
    //                 fetchModule.fetch("https://api.instagram.com/v1/tags/"+tag+"/media/recent?access_token="+access_token_insta, {
    //                         method: "GET",
    //                     })
    //                 .then(function(response) {
    //                         console.log("search api success");
    //                         //console.log(JSON.stringify(response));
    //                         alert(JSON.stringify(response));
    //                 }, function(error) {
    //                         console.log("search api fail");
    //                         //console.log(JSON.stringify(error));
    //                 });
    //             }
    //              else{
    //                 webView.visibility = "visible";
    //              }
    //              console.log(message);
    //          }
    //          else {
    //              message = "Error loading " + args.url + ": " + args.error;
    //         }
    //      });
    // }
    pageData.set("showDetails", true);
    pageData.set("pageTitle", "Resource Center");
    pageData.set("eventTitle", "World fair");
    pageData.set("tab1", "Facebook");
    pageData.set("tab2", "Twitter");
    pageData.set("tab3", "Instagram");
    pageData.set("visibility1", true);
    pageData.set("visibility2", false);
    pageData.set("visibility3", false);
    pageData.set("myDataArray", myDataArray);
    // pageData.set("latitude", latitude);
    // pageData.set("longitude", longitude);
    // pageData.set("zoom", zoom);
    pageData.set("myDataArray", myDataArray);
    if (description.length < 150) {
        console.log("inside this");
        console.log(description.length);
        pageData.set("description", description);
    }
    else {
        console.log("inside this");
        var temp = description.substring(0, 150);
        console.log(temp.length);
        pageData.set("description", temp);
    }
    items = [];
    items.push({
        itemType: "pdf",
        itemName: "Event Flyer",
        itemDesc: "Funeral"
    }, {
        itemType: "canvas",
        itemName: "Canvas Event",
        itemDesc: "For Emma, Forever Ago"
    }, {
        itemType: "webpage",
        itemName: "Web Page",
        itemDesc: "Random Access Memories"
    }, {
        itemType: "map",
        itemName: "Map",
        itemDesc: description
    }, {
        itemType: "text",
        itemName: "Text",
        itemDesc: description
    });
    var page = args.object;
    var listview = view.getViewById(page, "listview");
    listview.items = items;
    var stk = page.getViewById('tweetsgrid');
    for (var i = 0; i < 10; i++) {
        var card = new nativescript_cardview_1.CardView();
        card.margin = 10;
        card.radius = 5;
        card.elevation = 40;
        card.className = "cardStyle";
        var cardContentGrid = new grid_layout_1.GridLayout();
        var firstColumn = new layout.ItemSpec(1, "auto");
        var secondColumn = new layout.ItemSpec(1, "auto");
        var thirdColumn = new layout.ItemSpec(1, "auto");
        var firstRow = new layout.ItemSpec(50, "pixel");
        var secondRow = new layout.ItemSpec(1, "auto");
        var thirdRow = new layout.ItemSpec(1, "auto");
        cardContentGrid.addColumn(firstColumn);
        cardContentGrid.addColumn(secondColumn);
        cardContentGrid.addColumn(thirdColumn);
        cardContentGrid.addRow(firstRow);
        cardContentGrid.addRow(secondRow);
        cardContentGrid.addRow(thirdRow);
        var image = new ImageModule.Image();
        image.src = "https://vignette.wikia.nocookie.net/jerma-lore/images/0/09/Batman.jpg/revision/latest?cb=20170505210619";
        image.stretch = "aspectFill";
        image.className = "profile-icon";
        cardContentGrid.addChild(image);
        grid_layout_1.GridLayout.setRow(image, 0);
        grid_layout_1.GridLayout.setColumn(image, 0);
        grid_layout_1.GridLayout.setRowSpan(image, 2);
        var userNameLabel = new LabelModule.Label();
        userNameLabel.text = "Username";
        userNameLabel.textWrap = true;
        userNameLabel.className = "info";
        userNameLabel.verticalAlignment = "middle";
        cardContentGrid.addChild(userNameLabel);
        grid_layout_1.GridLayout.setRow(userNameLabel, 0);
        grid_layout_1.GridLayout.setRowSpan(userNameLabel, 2);
        grid_layout_1.GridLayout.setColumn(userNameLabel, 1);
        var tweetContent = new LabelModule.Label();
        tweetContent.text = "Batman wants to be friends?";
        tweetContent.textWrap = true;
        tweetContent.className = "info";
        tweetContent.verticalAlignment = "middle";
        cardContentGrid.addChild(tweetContent);
        grid_layout_1.GridLayout.setRow(tweetContent, 1);
        grid_layout_1.GridLayout.setColumn(tweetContent, 1);
        grid_layout_1.GridLayout.setColumnSpan(tweetContent, 2);
        var likeButton = new LabelModule.Label();
        likeButton.className = "like-icon";
        likeButton.text = "favorite_border";
        cardContentGrid.addChild(likeButton);
        grid_layout_1.GridLayout.setRow(likeButton, 2);
        grid_layout_1.GridLayout.setColumn(likeButton, 0);
        var timeStampOfPost = new LabelModule.Label();
        timeStampOfPost.text = "Feb2, 2018";
        timeStampOfPost.textWrap = true;
        cardContentGrid.addChild(timeStampOfPost);
        grid_layout_1.GridLayout.setRow(timeStampOfPost, 2);
        grid_layout_1.GridLayout.setColumn(timeStampOfPost, 1);
        grid_layout_1.GridLayout.setColumnSpan(timeStampOfPost, 2);
        card.content = cardContentGrid;
        console.log(stk);
        stk.addChild(card);
    }
    args.object.bindingContext = pageData;
};
exports.onSelectedIndexChange = function (args) {
    console.log("tapped");
    var segmetedBar = args.object;
    this.selectedIndex = segmetedBar.selectedIndex;
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
        case 0:
            pageData.set("visibility1", true);
            pageData.set("visibility2", false);
            pageData.set("visibility3", false);
            break;
        case 1:
            pageData.set("visibility1", false);
            pageData.set("visibility2", true);
            pageData.set("visibility3", false);
            break;
        case 2:
            pageData.set("visibility1", false);
            pageData.set("visibility2", false);
            pageData.set("visibility3", true);
            break;
        default:
            break;
    }
};
exports.myChangeEvent = function (args) {
    var changeEventText = "Page changed to index: " + args.index;
    console.log(changeEventText);
};
exports.toggle = function () {
    pageData.set("showDetails", !pageData.get("showDetails"));
};
exports.listViewItemTap = function (args) {
    var itemIndex = args.index;
};
exports.expandText = function (args) {
    console.log(args.object);
    var lab = args.object;
    var spanlabel = lab.getViewById("seemorelabel");
    if (spanlabel.text === "...see less") {
        var temp = description.substring(0, 150);
        console.log(temp.length);
        pageData.set("description", temp);
        spanlabel.text = "...see more";
    }
    else {
        pageData.set("description", description);
        spanlabel.text = "...see less";
    }
    //console.log(a);  
};
exports.onTap = function (args) {
    var index = args.index;
    var item = items[index];
    var navigationOptions;
    if (item.itemType === "pdf") {
        navigationOptions = {
            moduleName: 'detailed-pdf-list',
            context: {
                param1: "value1",
                param2: "value2"
            }
        };
    }
    else if (item.itemType === "canvas") {
        utilityModule.openUrl("https://iu.instructure.com/courses/1687201/assignments/7915075");
    }
    else if (item.itemType === "text") {
        navigationOptions = {
            moduleName: 'detailed-text-list',
            context: {
                param1: "value1",
                param2: "value2"
            }
        };
    }
    else if (item.itemType === "webpage") {
        navigationOptions = {
            moduleName: 'detailed-webpage-list',
            context: {
                param1: "value1",
                param2: "value2"
            }
        };
    }
    else if (item.itemType === "map") {
        navigationOptions = {
            moduleName: 'detailed-map-list',
            context: {
                param1: "value1",
                param2: "value2"
            }
        };
    }
    if (item.itemType !== "canvas") {
        frameModule.topmost().navigate(navigationOptions);
    }
    console.log('Clicked item with index ' + index);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQWlEO0FBQ2pELHVEQUF5RDtBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0Msc0RBQW9EO0FBQ3BELHVEQUF5RDtBQUV6RCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxJQUFJLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyw4NUJBR2pCLENBQUM7QUFHRixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRW5DLDhCQUE4QjtBQUM1QixJQUFJLEdBQUcsR0FBRywyQkFBMkIsQ0FBQztBQUN0QyxJQUFJLE1BQU0sR0FBRyxvREFBb0QsQ0FBQztBQUNsRSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUUsR0FBRyxHQUFDLE1BQU0sQ0FBQztBQUMxQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ3RDLElBQUksV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUd2RCxnQ0FBZ0M7QUFDaEMsSUFBSSxlQUFlLEdBQUcsa0NBQWtDLENBQUM7QUFDekQsSUFBSSxZQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFDM0MsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCLElB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QUMsQ0FBQztBQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgQ2FyZFZpZXcgfSBmcm9tICduYXRpdmVzY3JpcHQtY2FyZHZpZXcnO1xuaW1wb3J0ICogYXMgTGFiZWxNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcbnZhciB2aWV3ID0gcmVxdWlyZShcInVpL2NvcmUvdmlld1wiKTtcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiKTtcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tICd1aS9sYXlvdXRzL2dyaWQtbGF5b3V0JztcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5cbnZhciBvYnNlcnZhYmxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKTtcbnZhciBwYWdlRGF0YSA9IG5ldyBvYnNlcnZhYmxlLk9ic2VydmFibGUoKTtcbnZhciBkZXNjcmlwdGlvbiA9IGBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBOdWxsYW0gdmVsIGludGVyZHVtIHR1cnBpcy4gUHJvaW4gbm9uIG9yY2kgbWkuIEV0aWFtIGxvYm9ydGlzIHF1YW0gcmlzdXMsIG5lYyBwZWxsZW50ZXNxdWUgZXN0IGx1Y3R1cyBxdWlzLiBOdWxsYW0gZG9sb3IgbmVxdWUsIHNvZGFsZXMgdmVsIG1ldHVzIGVnZXQsIHZpdmVycmEgZWxlbWVudHVtIGVuaW0uIEZ1c2NlIGEgbmlzbCBpYWN1bGlzLCBmaW5pYnVzIGVuaW0gYWMsIHRlbXBvciBuaWJoLiBJbiBoYWMgaGFiaXRhc3NlIHBsYXRlYSBkaWN0dW1zdC4gRXRpYW0gZmF1Y2lidXMsIG5pc2wgYWMgbW9sZXN0aWUgdmFyaXVzLCBuaXNsIG9kaW8gZXVpc21vZCB0dXJwaXMsIGluIGdyYXZpZGEganVzdG8gYXJjdSBpZCBsb3JlbS4gU3VzcGVuZGlzc2UgZXQgaGVuZHJlcml0IHRlbGx1cy4gQWVuZWFuIHB1bHZpbmFyIHB1cnVzIGRpYW0sIHV0IGx1Y3R1cyBkaWFtIGltcGVyZGlldCBldC5cblxuVXQgaW50ZXJkdW0gcHJldGl1bSBvcmNpLCBub24gY3Vyc3VzIGFudGUgdWxsYW1jb3JwZXIgYWxpcXVhbS4gSW4gbGFjaW5pYSwgZHVpIHV0IGZpbmlidXMgbW9sbGlzLCBsaWJlcm8gaXBzdW0gdml2ZXJyYSBtYXVyaXMsIGFjIHRpbmNpZHVudCBhbnRlIGRvbG9yIGlkIGVzdC4gRnVzY2UgZGFwaWJ1cyBsYWN1cyB2aXZlcnJhIHZlc3RpYnVsdW0gZmV1Z2lhdC4gVXQgYWMgbWV0dXMgdmVoaWN1bGEsIHZlbmVuYXRpcyBleCBzZWQsIG1vbGVzdGllIGFyY3UuIFNlZCBjb25ndWUgb2RpbyB2ZWwgbGliZXJvIHZvbHV0cGF0IGNvbmRpbWVudHVtLiBBbGlxdWFtIGVyYXQgdm9sdXRwYXQuIE1hdXJpcyB2aXZlcnJhIG1pIG5pYmgsIGEgZmluaWJ1cyBmZWxpcyB0cmlzdGlxdWUgbm9uLiBVdCBub24gaW50ZXJkdW0gZG9sb3IuXG5gO1xuaW1wb3J0ICogYXMgd2ViVmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiO1xuXG52YXIgdXRpbGl0eU1vZHVsZSA9IHJlcXVpcmUoXCJ1dGlscy91dGlsc1wiKTtcbnZhciBmZXRjaE1vZHVsZSA9IHJlcXVpcmUoXCJmZXRjaFwiKTtcblxuLy9Ud2l0dGVyIEtleXMgYW5kIGNyZWRlbnRpYWxzXG4gIHZhciBrZXkgPSBcIjhWNmJqMFQ1WU15OVM3SGpWWWpmeEdDckxcIjtcbiAgdmFyIHNlY3JldCA9IFwiRE1QU2pyd0JlTG54VHRhWUJYS08wd09RdTJZQWVBYnVtY2pHMWx0TkY2dFVock9FUlJcIjtcbiAgdmFyIGNhdCA9IGtleSArXCI6XCIrc2VjcmV0O1xuICB2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyLycpLkJ1ZmZlclxuICB2YXIgY3JlZGVudGlhbHMgPSBuZXcgQnVmZmVyKGNhdCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICBcbiAgXG4vL0luc3RhZ3JhbSBrZXlzIGFuZCBjcmVkZXRuaWFsc1xudmFyIENMSUVOVF9JRF9JTlNUQSA9IFwiZGQyMTA1OGNiYTAyNGM1MjkzZTc2MjA5OWNmMTU3YWFcIjtcbnZhciBSRURJUkVDVF9VUkwgPSBcImh0dHBzOi8vd3d3LnRlc3QuY29tL1wiO1xudmFyIGFjY2Vzc190b2tlbl9pbnN0YSA9IFwiXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG52YXIgbXlEYXRhQXJyYXk6IGFueSA9IFtcbiAgICB7dGl0bGU6XCJTbGlkZSAxXCIsIGNvbG9yOiBcIiNiM2NkZTBcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAxLmpwZ1wifSxcbiAgICB7dGl0bGU6XCJTbGlkZSAyXCIsIGNvbG9yOiBcIiM2NDk3YjFcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAyLmpwZ1wifSxcbiAgICB7dGl0bGU6XCJTbGlkZSAzXCIsIGNvbG9yOiBcIiMwMDViOTZcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAzLmpwZ1wifSxcbiAgICB7dGl0bGU6XCJTbGlkZSA0XCIsIGNvbG9yOiBcIiMwMzM5NmNcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzA0LmpwZ1wifVxuICAgIC8qe3RpdGxlOlwiU2xpZGUgNVwiLCBjb2xvcjogXCIjMDExZjRiXCIsIGltYWdlOiBcIlwifSovXG5dO1xudmFyIGNyZWF0ZVZpZXdNb2RlbCA9IHJlcXVpcmUoXCIuL21haW4tdmlldy1tb2RlbFwiKS5jcmVhdGVWaWV3TW9kZWw7XG52YXIgZnJhbWVNb2R1bGUgPXJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbnZhciBpdGVtcyA9IFtdO1xudmFyIGJlYXJlclRva2VuO1xuZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJncykge1xuICAgIHZhciBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IGNyZWF0ZVZpZXdNb2RlbCgpO1xufVxuZXhwb3J0cy5vbk5hdmlnYXRpbmdUbyA9IG9uTmF2aWdhdGluZ1RvO1xuXG52YXIgcGFnZTtcblxuZXhwb3J0cy5sb2FkZWQgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGlzIGNhbGxlZFwiKTtcblxuICAgIC8vVHdpdHRlciBBcGkgSW50ZWdyYXRpb25cbiAgICAvKlxuICAgIGZldGNoTW9kdWxlLmZldGNoKFwiaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgyL3Rva2VuXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgXCIgKyBjcmVkZW50aWFscyxcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOFwiXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IFwiZ3JhbnRfdHlwZT1jbGllbnRfY3JlZGVudGlhbHNcIlxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJiZWFyZXIgYXBpIHN1Y2Nlc3NcIik7ICBcbiAgICAgICAgYmVhcmVyVG9rZW4gPSByZXNwb25zZVtcIl9ib2R5SW5pdFwiXTtcbiAgICAgICAgYmVhcmVyVG9rZW4gPSBKU09OLnBhcnNlKGJlYXJlclRva2VuKS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGNvbnNvbGUubG9nKGJlYXJlclRva2VuKTtcbiAgICAgICAgZmV0Y2hNb2R1bGUuZmV0Y2goXCJodHRwczovL2FwaS50d2l0dGVyLmNvbS8xLjEvc2VhcmNoL3R3ZWV0cy5qc29uP3E9ZGVsZXRlZmFjZWJvb2tcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIGJlYXJlclRva2VuLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGFwaSBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGFwaSBmYWlsXCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICB9KTtcblxuXG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9KTtcbiAgICAqL1xuICAgIC8vSW5zdGFncmFtIEFwaSBJbnRlZ3JhdGlvblxuICAgIHBhZ2VEYXRhLnNldChcInNyY1wiLCBcImh0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplLz9jbGllbnRfaWQ9XCIrQ0xJRU5UX0lEX0lOU1RBK1wiJnJlZGlyZWN0X3VyaT1cIitSRURJUkVDVF9VUkwrXCImcmVzcG9uc2VfdHlwZT10b2tlblwiKTtcblxuICAgIC8vIGxldCB3ZWJWaWV3ID0gcGFnZS5nZXRWaWV3QnlJZChcImluc3Rhd2Vidmlld1wiKTtcblxuICAgIC8vIGlmKHR5cGVvZiB3ZWJWaWV3ICE9IFwidW5kZWZpbmVkXCIpe1xuICAgIC8vICAgICAgd2ViVmlldy5vbih3ZWJWaWV3TW9kdWxlLldlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiB3ZWJWaWV3TW9kdWxlLkxvYWRFdmVudERhdGEpIHtcbiAgICAvLyAgICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAvLyAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcbiAgICAvLyAgICAgICAgICAgICBtZXNzYWdlID0gYXJncy51cmw7IFxuICAgIC8vICAgICAgICAgICAgIGlmKG1lc3NhZ2UuaW5jbHVkZXMoXCJhY2Nlc3NfdG9rZW5cIikpe1xuICAgIC8vICAgICAgICAgICAgICAgICB3ZWJWaWV3LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlZFwiO1xuICAgIC8vICAgICAgICAgICAgICAgICB2YXIgdXJsID0gbWVzc2FnZS5zcGxpdChcImFjY2Vzc190b2tlbj1cIik7XG4gICAgLy8gICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbl9pbnN0YSA9IHVybFsxXTtcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWNjZXNzX3Rva2VuX2luc3RhKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFyIHRhZyA9IFwibGlmZW9uY2FtcHVzXCI7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgLy8gICAgICAgICAgICAgICAgIGZldGNoTW9kdWxlLmZldGNoKFwiaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS92MS90YWdzL1wiK3RhZytcIi9tZWRpYS9yZWNlbnQ/YWNjZXNzX3Rva2VuPVwiK2FjY2Vzc190b2tlbl9pbnN0YSwge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2ggYXBpIHN1Y2Nlc3NcIik7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG4gICAgLy8gICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2ggYXBpIGZhaWxcIik7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIC8vICAgICAgICAgICAgICAgICB9KTtcblxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2ViVmlldy52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgLy8gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgIC8vICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRXJyb3IgbG9hZGluZyBcIiArIGFyZ3MudXJsICsgXCI6IFwiICsgYXJncy5lcnJvcjtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgIH0pO1xuICAgIC8vIH1cbiAgICBcblxuXG4gICAgcGFnZURhdGEuc2V0KFwic2hvd0RldGFpbHNcIiwgdHJ1ZSk7XG4gICAgcGFnZURhdGEuc2V0KFwicGFnZVRpdGxlXCIsIFwiUmVzb3VyY2UgQ2VudGVyXCIpO1xuICAgIHBhZ2VEYXRhLnNldChcImV2ZW50VGl0bGVcIiwgXCJXb3JsZCBmYWlyXCIpO1xuICAgIHBhZ2VEYXRhLnNldChcInRhYjFcIiwgXCJGYWNlYm9va1wiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ0YWIyXCIsIFwiVHdpdHRlclwiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ0YWIzXCIsIFwiSW5zdGFncmFtXCIpO1xuICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkxXCIsIHRydWUpO1xuICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkyXCIsIGZhbHNlKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5M1wiLCBmYWxzZSk7XG4gICAgcGFnZURhdGEuc2V0KFwibXlEYXRhQXJyYXlcIiwgbXlEYXRhQXJyYXkpO1xuICAgIC8vIHBhZ2VEYXRhLnNldChcImxhdGl0dWRlXCIsIGxhdGl0dWRlKTtcbiAgICAvLyBwYWdlRGF0YS5zZXQoXCJsb25naXR1ZGVcIiwgbG9uZ2l0dWRlKTtcbiAgICAvLyBwYWdlRGF0YS5zZXQoXCJ6b29tXCIsIHpvb20pO1xuICAgIHBhZ2VEYXRhLnNldChcIm15RGF0YUFycmF5XCIsIG15RGF0YUFycmF5KTtcbiAgICBpZihkZXNjcmlwdGlvbi5sZW5ndGg8MTUwKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgdGhpc1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24ubGVuZ3RoKTtcbiAgICAgICAgcGFnZURhdGEuc2V0KFwiZGVzY3JpcHRpb25cIiwgZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmxvZyhcImluc2lkZSB0aGlzXCIpO1xuICAgICAgICB2YXIgdGVtcCA9IGRlc2NyaXB0aW9uLnN1YnN0cmluZygwLCAxNTApO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wLmxlbmd0aCk7XG4gICAgICAgIHBhZ2VEYXRhLnNldChcImRlc2NyaXB0aW9uXCIsIHRlbXApO1xuICAgIH1cbiAgICBpdGVtcz1bXTtcbiAgICBpdGVtcy5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtVHlwZTogXCJwZGZcIixcbiAgICAgICAgICAgIGl0ZW1OYW1lOiBcIkV2ZW50IEZseWVyXCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogXCJGdW5lcmFsXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwiY2FudmFzXCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJDYW52YXMgRXZlbnRcIixcbiAgICAgICAgICAgIGl0ZW1EZXNjOiBcIkZvciBFbW1hLCBGb3JldmVyIEFnb1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcIndlYnBhZ2VcIixcbiAgICAgICAgICAgIGl0ZW1OYW1lOiBcIldlYiBQYWdlXCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogXCJSYW5kb20gQWNjZXNzIE1lbW9yaWVzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwibWFwXCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJNYXBcIixcbiAgICAgICAgICAgIGl0ZW1EZXNjOiBkZXNjcmlwdGlvblxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtVHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJUZXh0XCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogZGVzY3JpcHRpb25cbiAgICAgICAgfVxuICAgIClcbiAgICB2YXIgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgIHZhciBsaXN0dmlldyA9IHZpZXcuZ2V0Vmlld0J5SWQocGFnZSwgXCJsaXN0dmlld1wiKTtcbiAgICBsaXN0dmlldy5pdGVtcyA9IGl0ZW1zO1xuXG4gICAgdmFyIHN0ayA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ3R3ZWV0c2dyaWQnKTtcbiAgICBcbiAgICBmb3IodmFyIGk9MDtpPDEwO2krKyl7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2FyZCA9IG5ldyBDYXJkVmlldygpO1xuICAgICAgICBjYXJkLm1hcmdpbiA9IDEwO1xuICAgICAgICBjYXJkLnJhZGl1cyA9IDU7XG4gICAgICAgIGNhcmQuZWxldmF0aW9uID0gNDA7XG4gICAgICAgIGNhcmQuY2xhc3NOYW1lID0gXCJjYXJkU3R5bGVcIjtcbiAgICAgICAgXG4gICAgICAgIHZhciBjYXJkQ29udGVudEdyaWQgPSBuZXcgR3JpZExheW91dCgpO1xuICAgICAgICB2YXIgZmlyc3RDb2x1bW4gPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAgICAgdmFyIHNlY29uZENvbHVtbiA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoMSwgXCJhdXRvXCIpO1xuICAgICAgICB2YXIgdGhpcmRDb2x1bW4gPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAgICAgdmFyIGZpcnN0Um93ID0gbmV3IGxheW91dC5JdGVtU3BlYyg1MCwgXCJwaXhlbFwiKTtcbiAgICAgICAgdmFyIHNlY29uZFJvdyA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoMSwgXCJhdXRvXCIpO1xuICAgICAgICB2YXIgdGhpcmRSb3cgPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAgICAgXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDb2x1bW4oZmlyc3RDb2x1bW4pO1xuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ29sdW1uKHNlY29uZENvbHVtbik7XG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDb2x1bW4odGhpcmRDb2x1bW4pO1xuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRSb3coZmlyc3RSb3cpO1xuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkUm93KHNlY29uZFJvdyk7XG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRSb3codGhpcmRSb3cpO1xuXG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBcImh0dHBzOi8vdmlnbmV0dGUud2lraWEubm9jb29raWUubmV0L2plcm1hLWxvcmUvaW1hZ2VzLzAvMDkvQmF0bWFuLmpwZy9yZXZpc2lvbi9sYXRlc3Q/Y2I9MjAxNzA1MDUyMTA2MTlcIjtcbiAgICAgICAgaW1hZ2Uuc3RyZXRjaCA9IFwiYXNwZWN0RmlsbFwiOyBcbiAgICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gXCJwcm9maWxlLWljb25cIjtcblxuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZChpbWFnZSk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KGltYWdlLDApO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbihpbWFnZSwgMCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93U3BhbihpbWFnZSwgMik7XG5cblxuICAgICAgICB2YXIgdXNlck5hbWVMYWJlbCA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLnRleHQgPSBcIlVzZXJuYW1lXCI7XG4gICAgICAgIHVzZXJOYW1lTGFiZWwudGV4dFdyYXAgPSB0cnVlO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLmNsYXNzTmFtZSA9IFwiaW5mb1wiO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLnZlcnRpY2FsQWxpZ25tZW50ID0gXCJtaWRkbGVcIjtcblxuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQodXNlck5hbWVMYWJlbCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KHVzZXJOYW1lTGFiZWwsMCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93U3Bhbih1c2VyTmFtZUxhYmVsLDIpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbih1c2VyTmFtZUxhYmVsLCAxKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB0d2VldENvbnRlbnQgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgdHdlZXRDb250ZW50LnRleHQgPSBcIkJhdG1hbiB3YW50cyB0byBiZSBmcmllbmRzP1wiO1xuICAgICAgICB0d2VldENvbnRlbnQudGV4dFdyYXAgPSB0cnVlO1xuICAgICAgICB0d2VldENvbnRlbnQuY2xhc3NOYW1lID0gXCJpbmZvXCI7XG4gICAgICAgIHR3ZWV0Q29udGVudC52ZXJ0aWNhbEFsaWdubWVudCA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKHR3ZWV0Q29udGVudCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KHR3ZWV0Q29udGVudCwxKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW4odHdlZXRDb250ZW50LCAxKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW5TcGFuKHR3ZWV0Q29udGVudCwyKTtcblxuICAgICAgICB2YXIgbGlrZUJ1dHRvbiA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICBsaWtlQnV0dG9uLmNsYXNzTmFtZSA9IFwibGlrZS1pY29uXCI7XG4gICAgICAgIGxpa2VCdXR0b24udGV4dCA9IFwiZmF2b3JpdGVfYm9yZGVyXCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKGxpa2VCdXR0b24pO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyhsaWtlQnV0dG9uLDIpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbihsaWtlQnV0dG9uLCAwKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB0aW1lU3RhbXBPZlBvc3QgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgdGltZVN0YW1wT2ZQb3N0LnRleHQgPSBcIkZlYjIsIDIwMThcIjtcbiAgICAgICAgdGltZVN0YW1wT2ZQb3N0LnRleHRXcmFwID0gdHJ1ZTtcblxuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZCh0aW1lU3RhbXBPZlBvc3QpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyh0aW1lU3RhbXBPZlBvc3QsMik7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKHRpbWVTdGFtcE9mUG9zdCwgMSk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uU3Bhbih0aW1lU3RhbXBPZlBvc3QsIDIpO1xuXG4gICAgICAgIGNhcmQuY29udGVudCA9IGNhcmRDb250ZW50R3JpZDtcbiAgICAgICAgY29uc29sZS5sb2coc3RrKTtcbiAgICAgICAgc3RrLmFkZENoaWxkKGNhcmQpO1xuICAgIH1cblxuICAgIGFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0ID0gcGFnZURhdGE7XG59XG5cbmV4cG9ydHMub25TZWxlY3RlZEluZGV4Q2hhbmdlID0gZnVuY3Rpb24oYXJncyl7XG4gICAgY29uc29sZS5sb2coXCJ0YXBwZWRcIik7XG4gICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MlwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTNcIiwgZmFsc2UpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MVwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTJcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTNcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkxXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MlwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTNcIiwgdHJ1ZSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG59XG5cbmV4cG9ydHMubXlDaGFuZ2VFdmVudCA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgICAgICB2YXIgY2hhbmdlRXZlbnRUZXh0ID0gXCJQYWdlIGNoYW5nZWQgdG8gaW5kZXg6IFwiICsgYXJncy5pbmRleDtcbiAgICAgICAgY29uc29sZS5sb2coY2hhbmdlRXZlbnRUZXh0KTtcbiAgICB9XG5cblxuZXhwb3J0cy50b2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICBwYWdlRGF0YS5zZXQoXCJzaG93RGV0YWlsc1wiLCAhcGFnZURhdGEuZ2V0KFwic2hvd0RldGFpbHNcIikpO1xufVxuXG5leHBvcnRzLmxpc3RWaWV3SXRlbVRhcCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICB2YXIgaXRlbUluZGV4ID0gYXJncy5pbmRleDtcbn1cblxuZXhwb3J0cy5leHBhbmRUZXh0ID0gZnVuY3Rpb24oYXJncyl7XG4gICAgY29uc29sZS5sb2coYXJncy5vYmplY3QpO1xuICAgIHZhciBsYWIgPSA8YW55PmFyZ3Mub2JqZWN0O1xuICAgIHZhciBzcGFubGFiZWwgPSA8YW55PmxhYi5nZXRWaWV3QnlJZChcInNlZW1vcmVsYWJlbFwiKTtcbiAgICBpZihzcGFubGFiZWwudGV4dD09PVwiLi4uc2VlIGxlc3NcIil7XG4gICAgICAgIHZhciB0ZW1wID0gZGVzY3JpcHRpb24uc3Vic3RyaW5nKDAsIDE1MCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXAubGVuZ3RoKTtcbiAgICAgICAgcGFnZURhdGEuc2V0KFwiZGVzY3JpcHRpb25cIiwgdGVtcCk7XG4gICAgICAgIHNwYW5sYWJlbC50ZXh0PVwiLi4uc2VlIG1vcmVcIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcGFnZURhdGEuc2V0KFwiZGVzY3JpcHRpb25cIiwgZGVzY3JpcHRpb24pO1xuICAgICAgICBzcGFubGFiZWwudGV4dD1cIi4uLnNlZSBsZXNzXCI7XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coYSk7ICBcbn1cblxuZXhwb3J0cy5vblRhcCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgdmFyIGluZGV4ID0gYXJncy5pbmRleDtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICB2YXIgbmF2aWdhdGlvbk9wdGlvbnM7XG4gICAgaWYoaXRlbS5pdGVtVHlwZT09PVwicGRmXCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC1wZGYtbGlzdCcsXG4gICAgICAgICAgICBjb250ZXh0OntcbiAgICAgICAgICAgICAgICBwYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgcGFyYW0yOiBcInZhbHVlMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihpdGVtLml0ZW1UeXBlPT09XCJjYW52YXNcIil7XG4gICAgICAgIHV0aWxpdHlNb2R1bGUub3BlblVybChcImh0dHBzOi8vaXUuaW5zdHJ1Y3R1cmUuY29tL2NvdXJzZXMvMTY4NzIwMS9hc3NpZ25tZW50cy83OTE1MDc1XCIpO1xuICAgIH1cbiAgICBlbHNlIGlmKGl0ZW0uaXRlbVR5cGU9PT1cInRleHRcIil7XG4gICAgICAgIG5hdmlnYXRpb25PcHRpb25zPXtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6J2RldGFpbGVkLXRleHQtbGlzdCcsXG4gICAgICAgICAgICBjb250ZXh0OntcbiAgICAgICAgICAgICAgICBwYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgcGFyYW0yOiBcInZhbHVlMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihpdGVtLml0ZW1UeXBlPT09XCJ3ZWJwYWdlXCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC13ZWJwYWdlLWxpc3QnLFxuICAgICAgICAgICAgY29udGV4dDp7XG4gICAgICAgICAgICAgICAgcGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgICAgICAgICAgIHBhcmFtMjogXCJ2YWx1ZTJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoaXRlbS5pdGVtVHlwZT09PVwibWFwXCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC1tYXAtbGlzdCcsXG4gICAgICAgICAgICBjb250ZXh0OntcbiAgICAgICAgICAgICAgICBwYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgcGFyYW0yOiBcInZhbHVlMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoaXRlbS5pdGVtVHlwZSE9PVwiY2FudmFzXCIpe1xuICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUobmF2aWdhdGlvbk9wdGlvbnMpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBpdGVtIHdpdGggaW5kZXggJyArIGluZGV4KTtcbn07XG5cblxuXG4iXX0=