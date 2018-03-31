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
    fetchModule.fetch("https://api.twitter.com/oauth2/token", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + credentials,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: "grant_type=client_credentials"
    })
        .then(function (response) {
        console.log("bearer api success");
        bearerToken = response["_bodyInit"];
        bearerToken = JSON.parse(bearerToken).access_token;
        console.log(bearerToken);
        fetchModule.fetch("https://api.twitter.com/1.1/search/tweets.json?q=iub&count=10&result_type=mixed", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + bearerToken,
            },
        })
            .then(function (response) {
            console.log("search api success");
            alert(JSON.stringify(response));
            test(args, response._bodyInit);
        }, function (error) {
            console.log("search api fail");
            //console.log(JSON.stringify(error));
        });
    }, function (error) {
        console.log(JSON.stringify(error));
    });
    //Instagram Api Integration
    // pageData.set("src", "https://api.instagram.com/oauth/authorize/?client_id="+CLIENT_ID_INSTA+"&redirect_uri="+REDIRECT_URL+"&response_type=token");
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
    //                 var tag = "throwback";
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
    // var stk = page.getViewById('tweetsgrid');
    // for(var i=0;i<1;i++){
    //     var card = new CardView();
    //     card.margin = 10;
    //     card.radius = 5;
    //     card.elevation = 40;
    //     card.className = "cardStyle";
    //     var cardContentGrid = new GridLayout();
    //     var firstColumn = new layout.ItemSpec(1, "auto");
    //     var secondColumn = new layout.ItemSpec(1, "auto");
    //     var thirdColumn = new layout.ItemSpec(1, "auto");
    //     var firstRow = new layout.ItemSpec(50, "pixel");
    //     var secondRow = new layout.ItemSpec(1, "auto");
    //     var thirdRow = new layout.ItemSpec(1, "auto");
    //     cardContentGrid.addColumn(firstColumn);
    //     cardContentGrid.addColumn(secondColumn);
    //     cardContentGrid.addColumn(thirdColumn);
    //     cardContentGrid.addRow(firstRow);
    //     cardContentGrid.addRow(secondRow);
    //     cardContentGrid.addRow(thirdRow);
    //     var image = new ImageModule.Image();
    //     image.src = "https://vignette.wikia.nocookie.net/jerma-lore/images/0/09/Batman.jpg/revision/latest?cb=20170505210619";
    //     image.stretch = "aspectFill"; 
    //     image.className = "profile-icon";
    //     cardContentGrid.addChild(image);
    //     GridLayout.setRow(image,0);
    //     GridLayout.setColumn(image, 0);
    //     GridLayout.setRowSpan(image, 2);
    //     var userNameLabel = new LabelModule.Label();
    //     userNameLabel.text = "Username";
    //     userNameLabel.textWrap = true;
    //     userNameLabel.className = "info";
    //     userNameLabel.verticalAlignment = "middle";
    //     cardContentGrid.addChild(userNameLabel);
    //     GridLayout.setRow(userNameLabel,0);
    //     GridLayout.setRowSpan(userNameLabel,2);
    //     GridLayout.setColumn(userNameLabel, 1);
    //     var tweetContent = new LabelModule.Label();
    //     tweetContent.text = "Batman wants to be friends?";
    //     tweetContent.textWrap = true;
    //     tweetContent.className = "info";
    //     tweetContent.verticalAlignment = "middle";
    //     cardContentGrid.addChild(tweetContent);
    //     GridLayout.setRow(tweetContent,1);
    //     GridLayout.setColumn(tweetContent, 1);
    //     GridLayout.setColumnSpan(tweetContent,2);
    //     var likeButton = new LabelModule.Label();
    //     likeButton.className = "like-icon";
    //     likeButton.text = "favorite_border";
    //     cardContentGrid.addChild(likeButton);
    //     GridLayout.setRow(likeButton,2);
    //     GridLayout.setColumn(likeButton, 0);
    //     var timeStampOfPost = new LabelModule.Label();
    //     timeStampOfPost.text = "Feb2, 2018";
    //     timeStampOfPost.textWrap = true;
    //     cardContentGrid.addChild(timeStampOfPost);
    //     GridLayout.setRow(timeStampOfPost,2);
    //     GridLayout.setColumn(timeStampOfPost, 1);
    //     GridLayout.setColumnSpan(timeStampOfPost, 2);
    //     card.content = cardContentGrid;
    //     console.log(stk);
    //     stk.addChild(card);
    // }
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
function test(args, response) {
    page = args.object;
    console.log(typeof response);
    response = JSON.parse(response);
    var tweets = response["statuses"];
    var stk = page.getViewById('tweetsgrid');
    for (var key in tweets) {
        var card = new nativescript_cardview_1.CardView();
        card.margin = 10;
        card.marginTop = 10;
        card.radius = 5;
        card.elevation = 40;
        card.className = "cardStyle";
        var cardContentGrid = new grid_layout_1.GridLayout();
        var firstColumn = new layout.ItemSpec(1, "auto");
        var secondColumn = new layout.ItemSpec(80, "pixel");
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
        image.src = tweets[key].user.profile_image_url;
        image.stretch = "aspectFill";
        image.className = "profile-icon";
        cardContentGrid.addChild(image);
        grid_layout_1.GridLayout.setRow(image, 0);
        grid_layout_1.GridLayout.setColumn(image, 0);
        //GridLayout.setRowSpan(image, 2);
        var userNameLabel = new LabelModule.Label();
        userNameLabel.text = tweets[key].user.name;
        userNameLabel.textWrap = true;
        userNameLabel.className = "info";
        userNameLabel.verticalAlignment = "middle";
        cardContentGrid.addChild(userNameLabel);
        grid_layout_1.GridLayout.setRow(userNameLabel, 0);
        //GridLayout.setRowSpan(userNameLabel,2);
        grid_layout_1.GridLayout.setColumn(userNameLabel, 1);
        var tweetContent = new LabelModule.Label();
        tweetContent.text = tweets[key].text;
        //tweetContent.textWrap = true;
        tweetContent.className = "info";
        tweetContent.whiteSpace = "normal";
        //tweetContent.verticalAlignment = "middle";
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
        var likeCount = new LabelModule.Label();
        likeCount.text = "" + tweets[key].favorite_count;
        cardContentGrid.addChild(likeCount);
        grid_layout_1.GridLayout.setRow(likeCount, 2);
        grid_layout_1.GridLayout.setColumn(likeCount, 1);
        var timeStampOfPost = new LabelModule.Label();
        timeStampOfPost.text = tweets[key].created_at.split("+")[0];
        timeStampOfPost.textWrap = true;
        cardContentGrid.addChild(timeStampOfPost);
        grid_layout_1.GridLayout.setRow(timeStampOfPost, 2);
        grid_layout_1.GridLayout.setColumn(timeStampOfPost, 2);
        card.content = cardContentGrid;
        console.log(stk);
        stk.addChild(card);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQWlEO0FBQ2pELHVEQUF5RDtBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0Msc0RBQW9EO0FBQ3BELHVEQUF5RDtBQUN6RCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxJQUFJLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyw4NUJBR2pCLENBQUM7QUFHRixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRW5DLDhCQUE4QjtBQUM1QixJQUFJLEdBQUcsR0FBRywyQkFBMkIsQ0FBQztBQUN0QyxJQUFJLE1BQU0sR0FBRyxvREFBb0QsQ0FBQztBQUNsRSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUUsR0FBRyxHQUFDLE1BQU0sQ0FBQztBQUMxQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ3RDLElBQUksV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUd2RCxnQ0FBZ0M7QUFDaEMsSUFBSSxlQUFlLEdBQUcsa0NBQWtDLENBQUM7QUFDekQsSUFBSSxZQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFDM0MsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCLElB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Q2QsVUFBVSxFQUFDLG1CQUFtQjtZQUM5QixPQUFPLEVBQUM7Z0JBQ0osTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLE1BQU0sRUFBRSxRQUFRO2FBQ25CO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFDRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFHLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDekIsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XG5pbXBvcnQgKiBhcyBMYWJlbE1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xudmFyIHZpZXcgPSByZXF1aXJlKFwidWkvY29yZS92aWV3XCIpO1xudmFyIGxheW91dCA9IHJlcXVpcmUoXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCIpO1xuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gJ3VpL2xheW91dHMvZ3JpZC1sYXlvdXQnO1xuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbnZhciBvYnNlcnZhYmxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKTtcbnZhciBwYWdlRGF0YSA9IG5ldyBvYnNlcnZhYmxlLk9ic2VydmFibGUoKTtcbnZhciBkZXNjcmlwdGlvbiA9IGBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBOdWxsYW0gdmVsIGludGVyZHVtIHR1cnBpcy4gUHJvaW4gbm9uIG9yY2kgbWkuIEV0aWFtIGxvYm9ydGlzIHF1YW0gcmlzdXMsIG5lYyBwZWxsZW50ZXNxdWUgZXN0IGx1Y3R1cyBxdWlzLiBOdWxsYW0gZG9sb3IgbmVxdWUsIHNvZGFsZXMgdmVsIG1ldHVzIGVnZXQsIHZpdmVycmEgZWxlbWVudHVtIGVuaW0uIEZ1c2NlIGEgbmlzbCBpYWN1bGlzLCBmaW5pYnVzIGVuaW0gYWMsIHRlbXBvciBuaWJoLiBJbiBoYWMgaGFiaXRhc3NlIHBsYXRlYSBkaWN0dW1zdC4gRXRpYW0gZmF1Y2lidXMsIG5pc2wgYWMgbW9sZXN0aWUgdmFyaXVzLCBuaXNsIG9kaW8gZXVpc21vZCB0dXJwaXMsIGluIGdyYXZpZGEganVzdG8gYXJjdSBpZCBsb3JlbS4gU3VzcGVuZGlzc2UgZXQgaGVuZHJlcml0IHRlbGx1cy4gQWVuZWFuIHB1bHZpbmFyIHB1cnVzIGRpYW0sIHV0IGx1Y3R1cyBkaWFtIGltcGVyZGlldCBldC5cblxuVXQgaW50ZXJkdW0gcHJldGl1bSBvcmNpLCBub24gY3Vyc3VzIGFudGUgdWxsYW1jb3JwZXIgYWxpcXVhbS4gSW4gbGFjaW5pYSwgZHVpIHV0IGZpbmlidXMgbW9sbGlzLCBsaWJlcm8gaXBzdW0gdml2ZXJyYSBtYXVyaXMsIGFjIHRpbmNpZHVudCBhbnRlIGRvbG9yIGlkIGVzdC4gRnVzY2UgZGFwaWJ1cyBsYWN1cyB2aXZlcnJhIHZlc3RpYnVsdW0gZmV1Z2lhdC4gVXQgYWMgbWV0dXMgdmVoaWN1bGEsIHZlbmVuYXRpcyBleCBzZWQsIG1vbGVzdGllIGFyY3UuIFNlZCBjb25ndWUgb2RpbyB2ZWwgbGliZXJvIHZvbHV0cGF0IGNvbmRpbWVudHVtLiBBbGlxdWFtIGVyYXQgdm9sdXRwYXQuIE1hdXJpcyB2aXZlcnJhIG1pIG5pYmgsIGEgZmluaWJ1cyBmZWxpcyB0cmlzdGlxdWUgbm9uLiBVdCBub24gaW50ZXJkdW0gZG9sb3IuXG5gO1xuaW1wb3J0ICogYXMgd2ViVmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiO1xuXG52YXIgdXRpbGl0eU1vZHVsZSA9IHJlcXVpcmUoXCJ1dGlscy91dGlsc1wiKTtcbnZhciBmZXRjaE1vZHVsZSA9IHJlcXVpcmUoXCJmZXRjaFwiKTtcblxuLy9Ud2l0dGVyIEtleXMgYW5kIGNyZWRlbnRpYWxzXG4gIHZhciBrZXkgPSBcIjhWNmJqMFQ1WU15OVM3SGpWWWpmeEdDckxcIjtcbiAgdmFyIHNlY3JldCA9IFwiRE1QU2pyd0JlTG54VHRhWUJYS08wd09RdTJZQWVBYnVtY2pHMWx0TkY2dFVock9FUlJcIjtcbiAgdmFyIGNhdCA9IGtleSArXCI6XCIrc2VjcmV0O1xuICB2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyLycpLkJ1ZmZlclxuICB2YXIgY3JlZGVudGlhbHMgPSBuZXcgQnVmZmVyKGNhdCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICBcbiAgXG4vL0luc3RhZ3JhbSBrZXlzIGFuZCBjcmVkZXRuaWFsc1xudmFyIENMSUVOVF9JRF9JTlNUQSA9IFwiZGQyMTA1OGNiYTAyNGM1MjkzZTc2MjA5OWNmMTU3YWFcIjtcbnZhciBSRURJUkVDVF9VUkwgPSBcImh0dHBzOi8vd3d3LnRlc3QuY29tL1wiO1xudmFyIGFjY2Vzc190b2tlbl9pbnN0YSA9IFwiXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG52YXIgbXlEYXRhQXJyYXk6IGFueSA9IFtcbiAgICB7dGl0bGU6XCJTbGlkZSAxXCIsIGNvbG9yOiBcIiNiM2NkZTBcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAxLmpwZ1wifSxcbiAgICB7dGl0bGU6XCJTbGlkZSAyXCIsIGNvbG9yOiBcIiM2NDk3YjFcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAyLmpwZ1wifSxcbiAgICB7dGl0bGU6XCJTbGlkZSAzXCIsIGNvbG9yOiBcIiMwMDViOTZcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzAzLmpwZ1wifSxcbiAgICB7dGl0bGU6XCJTbGlkZSA0XCIsIGNvbG9yOiBcIiMwMzM5NmNcIiwgaW1hZ2U6XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWFuaWphay9uYXRpdmVzY3JpcHQtcGhvdG92aWV3ZXIvbWFzdGVyL2RlbW8vcmVzLzA0LmpwZ1wifVxuICAgIC8qe3RpdGxlOlwiU2xpZGUgNVwiLCBjb2xvcjogXCIjMDExZjRiXCIsIGltYWdlOiBcIlwifSovXG5dO1xudmFyIGNyZWF0ZVZpZXdNb2RlbCA9IHJlcXVpcmUoXCIuL21haW4tdmlldy1tb2RlbFwiKS5jcmVhdGVWaWV3TW9kZWw7XG52YXIgZnJhbWVNb2R1bGUgPXJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbnZhciBpdGVtcyA9IFtdO1xudmFyIGJlYXJlclRva2VuO1xuZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJncykge1xuICAgIHZhciBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IGNyZWF0ZVZpZXdNb2RlbCgpO1xufVxuZXhwb3J0cy5vbk5hdmlnYXRpbmdUbyA9IG9uTmF2aWdhdGluZ1RvO1xudmFyIHBhZ2U7XG5cbmV4cG9ydHMubG9hZGVkID0gZnVuY3Rpb24oYXJncykge1xuICAgIHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcgaXMgY2FsbGVkXCIpO1xuICAgIC8vVHdpdHRlciBBcGkgSW50ZWdyYXRpb25cbiAgICBmZXRjaE1vZHVsZS5mZXRjaChcImh0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL29hdXRoMi90b2tlblwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIFwiICsgY3JlZGVudGlhbHMsXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLThcIlxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBcImdyYW50X3R5cGU9Y2xpZW50X2NyZWRlbnRpYWxzXCJcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVhcmVyIGFwaSBzdWNjZXNzXCIpOyAgXG4gICAgICAgIGJlYXJlclRva2VuID0gcmVzcG9uc2VbXCJfYm9keUluaXRcIl07XG4gICAgICAgIGJlYXJlclRva2VuID0gSlNPTi5wYXJzZShiZWFyZXJUb2tlbikuYWNjZXNzX3Rva2VuO1xuICAgICAgICBjb25zb2xlLmxvZyhiZWFyZXJUb2tlbik7XG4gICAgICAgIGZldGNoTW9kdWxlLmZldGNoKFwiaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vMS4xL3NlYXJjaC90d2VldHMuanNvbj9xPWl1YiZjb3VudD0xMCZyZXN1bHRfdHlwZT1taXhlZFwiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgYmVhcmVyVG9rZW4sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2ggYXBpIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICAgICAgdGVzdChhcmdzLCByZXNwb25zZS5fYm9keUluaXQpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlYXJjaCBhcGkgZmFpbFwiKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfSk7XG5cbiAgICAvL0luc3RhZ3JhbSBBcGkgSW50ZWdyYXRpb25cbiAgICAvLyBwYWdlRGF0YS5zZXQoXCJzcmNcIiwgXCJodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2F1dGhvcml6ZS8/Y2xpZW50X2lkPVwiK0NMSUVOVF9JRF9JTlNUQStcIiZyZWRpcmVjdF91cmk9XCIrUkVESVJFQ1RfVVJMK1wiJnJlc3BvbnNlX3R5cGU9dG9rZW5cIik7XG5cbiAgICAvLyBsZXQgd2ViVmlldyA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJpbnN0YXdlYnZpZXdcIik7XG5cbiAgICAvLyBpZih0eXBlb2Ygd2ViVmlldyAhPSBcInVuZGVmaW5lZFwiKXtcbiAgICAvLyAgICAgIHdlYlZpZXcub24od2ViVmlld01vZHVsZS5XZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCBmdW5jdGlvbiAoYXJnczogd2ViVmlld01vZHVsZS5Mb2FkRXZlbnREYXRhKSB7XG4gICAgLy8gICAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgLy8gICAgICAgICAgaWYgKCFhcmdzLmVycm9yKSB7XG4gICAgLy8gICAgICAgICAgICAgbWVzc2FnZSA9IGFyZ3MudXJsOyBcbiAgICAvLyAgICAgICAgICAgICBpZihtZXNzYWdlLmluY2x1ZGVzKFwiYWNjZXNzX3Rva2VuXCIpKXtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2ViVmlldy52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZWRcIjtcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFyIHVybCA9IG1lc3NhZ2Uuc3BsaXQoXCJhY2Nlc3NfdG9rZW49XCIpO1xuICAgIC8vICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW5faW5zdGEgPSB1cmxbMV07XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjY2Vzc190b2tlbl9pbnN0YSk7XG4gICAgLy8gICAgICAgICAgICAgICAgIHZhciB0YWcgPSBcInRocm93YmFja1wiO1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YWcpO1xuICAgIC8vICAgICAgICAgICAgICAgICBmZXRjaE1vZHVsZS5mZXRjaChcImh0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vdjEvdGFncy9cIit0YWcrXCIvbWVkaWEvcmVjZW50P2FjY2Vzc190b2tlbj1cIithY2Nlc3NfdG9rZW5faW5zdGEsIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGFwaSBzdWNjZXNzXCIpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2ggYXBpIGZhaWxcIik7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIC8vICAgICAgICAgICAgICAgICB9KTtcblxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2ViVmlldy52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgLy8gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgIC8vICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRXJyb3IgbG9hZGluZyBcIiArIGFyZ3MudXJsICsgXCI6IFwiICsgYXJncy5lcnJvcjtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgIH0pO1xuICAgIC8vIH1cbiAgICBcblxuXG4gICAgcGFnZURhdGEuc2V0KFwic2hvd0RldGFpbHNcIiwgdHJ1ZSk7XG4gICAgcGFnZURhdGEuc2V0KFwicGFnZVRpdGxlXCIsIFwiUmVzb3VyY2UgQ2VudGVyXCIpO1xuICAgIHBhZ2VEYXRhLnNldChcImV2ZW50VGl0bGVcIiwgXCJXb3JsZCBmYWlyXCIpO1xuICAgIHBhZ2VEYXRhLnNldChcInRhYjFcIiwgXCJGYWNlYm9va1wiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ0YWIyXCIsIFwiVHdpdHRlclwiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ0YWIzXCIsIFwiSW5zdGFncmFtXCIpO1xuICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkxXCIsIHRydWUpO1xuICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkyXCIsIGZhbHNlKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5M1wiLCBmYWxzZSk7XG4gICAgcGFnZURhdGEuc2V0KFwibXlEYXRhQXJyYXlcIiwgbXlEYXRhQXJyYXkpO1xuICAgIC8vIHBhZ2VEYXRhLnNldChcImxhdGl0dWRlXCIsIGxhdGl0dWRlKTtcbiAgICAvLyBwYWdlRGF0YS5zZXQoXCJsb25naXR1ZGVcIiwgbG9uZ2l0dWRlKTtcbiAgICAvLyBwYWdlRGF0YS5zZXQoXCJ6b29tXCIsIHpvb20pO1xuICAgIHBhZ2VEYXRhLnNldChcIm15RGF0YUFycmF5XCIsIG15RGF0YUFycmF5KTtcbiAgICBpZihkZXNjcmlwdGlvbi5sZW5ndGg8MTUwKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgdGhpc1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24ubGVuZ3RoKTtcbiAgICAgICAgcGFnZURhdGEuc2V0KFwiZGVzY3JpcHRpb25cIiwgZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmxvZyhcImluc2lkZSB0aGlzXCIpO1xuICAgICAgICB2YXIgdGVtcCA9IGRlc2NyaXB0aW9uLnN1YnN0cmluZygwLCAxNTApO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wLmxlbmd0aCk7XG4gICAgICAgIHBhZ2VEYXRhLnNldChcImRlc2NyaXB0aW9uXCIsIHRlbXApO1xuICAgIH1cbiAgICBpdGVtcz1bXTtcbiAgICBpdGVtcy5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtVHlwZTogXCJwZGZcIixcbiAgICAgICAgICAgIGl0ZW1OYW1lOiBcIkV2ZW50IEZseWVyXCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogXCJGdW5lcmFsXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwiY2FudmFzXCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJDYW52YXMgRXZlbnRcIixcbiAgICAgICAgICAgIGl0ZW1EZXNjOiBcIkZvciBFbW1hLCBGb3JldmVyIEFnb1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcIndlYnBhZ2VcIixcbiAgICAgICAgICAgIGl0ZW1OYW1lOiBcIldlYiBQYWdlXCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogXCJSYW5kb20gQWNjZXNzIE1lbW9yaWVzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwibWFwXCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJNYXBcIixcbiAgICAgICAgICAgIGl0ZW1EZXNjOiBkZXNjcmlwdGlvblxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtVHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJUZXh0XCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogZGVzY3JpcHRpb25cbiAgICAgICAgfVxuICAgIClcbiAgICB2YXIgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgIHZhciBsaXN0dmlldyA9IHZpZXcuZ2V0Vmlld0J5SWQocGFnZSwgXCJsaXN0dmlld1wiKTtcbiAgICBsaXN0dmlldy5pdGVtcyA9IGl0ZW1zO1xuXG4gICAgLy8gdmFyIHN0ayA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ3R3ZWV0c2dyaWQnKTtcbiAgICBcbiAgICAvLyBmb3IodmFyIGk9MDtpPDE7aSsrKXtcbiAgICAgICAgXG4gICAgLy8gICAgIHZhciBjYXJkID0gbmV3IENhcmRWaWV3KCk7XG4gICAgLy8gICAgIGNhcmQubWFyZ2luID0gMTA7XG4gICAgLy8gICAgIGNhcmQucmFkaXVzID0gNTtcbiAgICAvLyAgICAgY2FyZC5lbGV2YXRpb24gPSA0MDtcbiAgICAvLyAgICAgY2FyZC5jbGFzc05hbWUgPSBcImNhcmRTdHlsZVwiO1xuICAgICAgIFxuICAgIC8vICAgICB2YXIgY2FyZENvbnRlbnRHcmlkID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICAvLyAgICAgdmFyIGZpcnN0Q29sdW1uID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgLy8gICAgIHZhciBzZWNvbmRDb2x1bW4gPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAvLyAgICAgdmFyIHRoaXJkQ29sdW1uID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgLy8gICAgIHZhciBmaXJzdFJvdyA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoNTAsIFwicGl4ZWxcIik7XG4gICAgLy8gICAgIHZhciBzZWNvbmRSb3cgPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAvLyAgICAgdmFyIHRoaXJkUm93ID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIFxuICAgIC8vICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ29sdW1uKGZpcnN0Q29sdW1uKTtcbiAgICAvLyAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENvbHVtbihzZWNvbmRDb2x1bW4pO1xuICAgIC8vICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ29sdW1uKHRoaXJkQ29sdW1uKTtcblxuICAgIC8vICAgICBjYXJkQ29udGVudEdyaWQuYWRkUm93KGZpcnN0Um93KTtcbiAgICAvLyAgICAgY2FyZENvbnRlbnRHcmlkLmFkZFJvdyhzZWNvbmRSb3cpO1xuICAgIC8vICAgICBjYXJkQ29udGVudEdyaWQuYWRkUm93KHRoaXJkUm93KTtcblxuICAgIC8vICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2VNb2R1bGUuSW1hZ2UoKTtcbiAgICAvLyAgICAgaW1hZ2Uuc3JjID0gXCJodHRwczovL3ZpZ25ldHRlLndpa2lhLm5vY29va2llLm5ldC9qZXJtYS1sb3JlL2ltYWdlcy8wLzA5L0JhdG1hbi5qcGcvcmV2aXNpb24vbGF0ZXN0P2NiPTIwMTcwNTA1MjEwNjE5XCI7XG4gICAgLy8gICAgIGltYWdlLnN0cmV0Y2ggPSBcImFzcGVjdEZpbGxcIjsgXG4gICAgLy8gICAgIGltYWdlLmNsYXNzTmFtZSA9IFwicHJvZmlsZS1pY29uXCI7XG5cblxuICAgIC8vICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQoaW1hZ2UpO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldFJvdyhpbWFnZSwwKTtcbiAgICAvLyAgICAgR3JpZExheW91dC5zZXRDb2x1bW4oaW1hZ2UsIDApO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldFJvd1NwYW4oaW1hZ2UsIDIpO1xuXG5cbiAgICAvLyAgICAgdmFyIHVzZXJOYW1lTGFiZWwgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAvLyAgICAgdXNlck5hbWVMYWJlbC50ZXh0ID0gXCJVc2VybmFtZVwiO1xuICAgIC8vICAgICB1c2VyTmFtZUxhYmVsLnRleHRXcmFwID0gdHJ1ZTtcbiAgICAvLyAgICAgdXNlck5hbWVMYWJlbC5jbGFzc05hbWUgPSBcImluZm9cIjtcbiAgICAvLyAgICAgdXNlck5hbWVMYWJlbC52ZXJ0aWNhbEFsaWdubWVudCA9IFwibWlkZGxlXCI7XG5cbiAgICAvLyAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKHVzZXJOYW1lTGFiZWwpO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldFJvdyh1c2VyTmFtZUxhYmVsLDApO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldFJvd1NwYW4odXNlck5hbWVMYWJlbCwyKTtcbiAgICAvLyAgICAgR3JpZExheW91dC5zZXRDb2x1bW4odXNlck5hbWVMYWJlbCwgMSk7XG4gICAgICAgIFxuICAgIC8vICAgICB2YXIgdHdlZXRDb250ZW50ID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgLy8gICAgIHR3ZWV0Q29udGVudC50ZXh0ID0gXCJCYXRtYW4gd2FudHMgdG8gYmUgZnJpZW5kcz9cIjtcbiAgICAvLyAgICAgdHdlZXRDb250ZW50LnRleHRXcmFwID0gdHJ1ZTtcbiAgICAvLyAgICAgdHdlZXRDb250ZW50LmNsYXNzTmFtZSA9IFwiaW5mb1wiO1xuICAgIC8vICAgICB0d2VldENvbnRlbnQudmVydGljYWxBbGlnbm1lbnQgPSBcIm1pZGRsZVwiO1xuXG4gICAgLy8gICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZCh0d2VldENvbnRlbnQpO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldFJvdyh0d2VldENvbnRlbnQsMSk7XG4gICAgLy8gICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKHR3ZWV0Q29udGVudCwgMSk7XG4gICAgLy8gICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uU3Bhbih0d2VldENvbnRlbnQsMik7XG5cbiAgICAvLyAgICAgdmFyIGxpa2VCdXR0b24gPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAvLyAgICAgbGlrZUJ1dHRvbi5jbGFzc05hbWUgPSBcImxpa2UtaWNvblwiO1xuICAgIC8vICAgICBsaWtlQnV0dG9uLnRleHQgPSBcImZhdm9yaXRlX2JvcmRlclwiO1xuXG4gICAgLy8gICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZChsaWtlQnV0dG9uKTtcbiAgICAvLyAgICAgR3JpZExheW91dC5zZXRSb3cobGlrZUJ1dHRvbiwyKTtcbiAgICAvLyAgICAgR3JpZExheW91dC5zZXRDb2x1bW4obGlrZUJ1dHRvbiwgMCk7XG4gICAgICAgIFxuICAgIC8vICAgICB2YXIgdGltZVN0YW1wT2ZQb3N0ID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgLy8gICAgIHRpbWVTdGFtcE9mUG9zdC50ZXh0ID0gXCJGZWIyLCAyMDE4XCI7XG4gICAgLy8gICAgIHRpbWVTdGFtcE9mUG9zdC50ZXh0V3JhcCA9IHRydWU7XG5cblxuICAgIC8vICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQodGltZVN0YW1wT2ZQb3N0KTtcbiAgICAvLyAgICAgR3JpZExheW91dC5zZXRSb3codGltZVN0YW1wT2ZQb3N0LDIpO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldENvbHVtbih0aW1lU3RhbXBPZlBvc3QsIDEpO1xuICAgIC8vICAgICBHcmlkTGF5b3V0LnNldENvbHVtblNwYW4odGltZVN0YW1wT2ZQb3N0LCAyKTtcblxuICAgIC8vICAgICBjYXJkLmNvbnRlbnQgPSBjYXJkQ29udGVudEdyaWQ7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHN0ayk7XG4gICAgLy8gICAgIHN0ay5hZGRDaGlsZChjYXJkKTtcbiAgICAvLyB9XG5cbiAgICBhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dCA9IHBhZ2VEYXRhO1xufVxuXG5leHBvcnRzLm9uU2VsZWN0ZWRJbmRleENoYW5nZSA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgIGNvbnNvbGUubG9nKFwidGFwcGVkXCIpO1xuICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTJcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkzXCIsIGZhbHNlKTsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTFcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkyXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkzXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MVwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTJcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkzXCIsIHRydWUpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxufVxuXG5leHBvcnRzLm15Q2hhbmdlRXZlbnQgPSBmdW5jdGlvbihhcmdzKXtcbiAgICAgICAgdmFyIGNoYW5nZUV2ZW50VGV4dCA9IFwiUGFnZSBjaGFuZ2VkIHRvIGluZGV4OiBcIiArIGFyZ3MuaW5kZXg7XG4gICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZUV2ZW50VGV4dCk7XG4gICAgfVxuXG5cbmV4cG9ydHMudG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gICAgcGFnZURhdGEuc2V0KFwic2hvd0RldGFpbHNcIiwgIXBhZ2VEYXRhLmdldChcInNob3dEZXRhaWxzXCIpKTtcbn1cblxuZXhwb3J0cy5saXN0Vmlld0l0ZW1UYXAgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG59XG5cbmV4cG9ydHMuZXhwYW5kVGV4dCA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgIGNvbnNvbGUubG9nKGFyZ3Mub2JqZWN0KTtcbiAgICB2YXIgbGFiID0gPGFueT5hcmdzLm9iamVjdDtcbiAgICB2YXIgc3BhbmxhYmVsID0gPGFueT5sYWIuZ2V0Vmlld0J5SWQoXCJzZWVtb3JlbGFiZWxcIik7XG4gICAgaWYoc3BhbmxhYmVsLnRleHQ9PT1cIi4uLnNlZSBsZXNzXCIpe1xuICAgICAgICB2YXIgdGVtcCA9IGRlc2NyaXB0aW9uLnN1YnN0cmluZygwLCAxNTApO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wLmxlbmd0aCk7XG4gICAgICAgIHBhZ2VEYXRhLnNldChcImRlc2NyaXB0aW9uXCIsIHRlbXApO1xuICAgICAgICBzcGFubGFiZWwudGV4dD1cIi4uLnNlZSBtb3JlXCI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHBhZ2VEYXRhLnNldChcImRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgc3BhbmxhYmVsLnRleHQ9XCIuLi5zZWUgbGVzc1wiO1xuICAgIH1cbiAgICBcbiAgICAvL2NvbnNvbGUubG9nKGEpOyAgXG59XG5cbmZ1bmN0aW9uIHRlc3QoYXJncywgcmVzcG9uc2Upe1xuICAgIHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgcmVzcG9uc2UpO1xuICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgdmFyIHR3ZWV0cyA9IHJlc3BvbnNlW1wic3RhdHVzZXNcIl07XG4gICAgXG4gICAgdmFyIHN0ayA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ3R3ZWV0c2dyaWQnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdHdlZXRzKXtcbiAgICAgICAgXG4gICAgICAgIHZhciBjYXJkID0gbmV3IENhcmRWaWV3KCk7XG4gICAgICAgIGNhcmQubWFyZ2luID0gMTA7XG4gICAgICAgIGNhcmQubWFyZ2luVG9wID0gMTA7XG4gICAgICAgIGNhcmQucmFkaXVzID0gNTtcbiAgICAgICAgY2FyZC5lbGV2YXRpb24gPSA0MDtcbiAgICAgICAgY2FyZC5jbGFzc05hbWUgPSBcImNhcmRTdHlsZVwiO1xuICAgICAgIFxuICAgICAgICB2YXIgY2FyZENvbnRlbnRHcmlkID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICAgICAgdmFyIGZpcnN0Q29sdW1uID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIHZhciBzZWNvbmRDb2x1bW4gPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDgwLCBcInBpeGVsXCIpO1xuICAgICAgICB2YXIgdGhpcmRDb2x1bW4gPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAgICAgdmFyIGZpcnN0Um93ID0gbmV3IGxheW91dC5JdGVtU3BlYyg1MCwgXCJwaXhlbFwiKTtcbiAgICAgICAgdmFyIHNlY29uZFJvdyA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoMSwgXCJhdXRvXCIpO1xuICAgICAgICB2YXIgdGhpcmRSb3cgPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAgICAgXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDb2x1bW4oZmlyc3RDb2x1bW4pO1xuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ29sdW1uKHNlY29uZENvbHVtbik7XG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDb2x1bW4odGhpcmRDb2x1bW4pO1xuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRSb3coZmlyc3RSb3cpO1xuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkUm93KHNlY29uZFJvdyk7XG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRSb3codGhpcmRSb3cpO1xuXG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSB0d2VldHNba2V5XS51c2VyLnByb2ZpbGVfaW1hZ2VfdXJsO1xuICAgICAgICBpbWFnZS5zdHJldGNoID0gXCJhc3BlY3RGaWxsXCI7IFxuICAgICAgICBpbWFnZS5jbGFzc05hbWUgPSBcInByb2ZpbGUtaWNvblwiO1xuXG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKGltYWdlKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRSb3coaW1hZ2UsMCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKGltYWdlLCAwKTtcbiAgICAgICAgLy9HcmlkTGF5b3V0LnNldFJvd1NwYW4oaW1hZ2UsIDIpO1xuXG5cbiAgICAgICAgdmFyIHVzZXJOYW1lTGFiZWwgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgdXNlck5hbWVMYWJlbC50ZXh0ID0gdHdlZXRzW2tleV0udXNlci5uYW1lO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLnRleHRXcmFwID0gdHJ1ZTtcbiAgICAgICAgdXNlck5hbWVMYWJlbC5jbGFzc05hbWUgPSBcImluZm9cIjtcbiAgICAgICAgdXNlck5hbWVMYWJlbC52ZXJ0aWNhbEFsaWdubWVudCA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKHVzZXJOYW1lTGFiZWwpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyh1c2VyTmFtZUxhYmVsLDApO1xuICAgICAgICAvL0dyaWRMYXlvdXQuc2V0Um93U3Bhbih1c2VyTmFtZUxhYmVsLDIpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbih1c2VyTmFtZUxhYmVsLCAxKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB0d2VldENvbnRlbnQgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgdHdlZXRDb250ZW50LnRleHQgPSB0d2VldHNba2V5XS50ZXh0O1xuICAgICAgICAvL3R3ZWV0Q29udGVudC50ZXh0V3JhcCA9IHRydWU7XG4gICAgICAgIHR3ZWV0Q29udGVudC5jbGFzc05hbWUgPSBcImluZm9cIjtcbiAgICAgICAgdHdlZXRDb250ZW50LndoaXRlU3BhY2UgPSBcIm5vcm1hbFwiO1xuICAgICAgICAvL3R3ZWV0Q29udGVudC52ZXJ0aWNhbEFsaWdubWVudCA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKHR3ZWV0Q29udGVudCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KHR3ZWV0Q29udGVudCwxKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW4odHdlZXRDb250ZW50LCAxKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW5TcGFuKHR3ZWV0Q29udGVudCwyKTtcblxuICAgICAgICB2YXIgbGlrZUJ1dHRvbiA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICBsaWtlQnV0dG9uLmNsYXNzTmFtZSA9IFwibGlrZS1pY29uXCI7XG4gICAgICAgIGxpa2VCdXR0b24udGV4dCA9IFwiZmF2b3JpdGVfYm9yZGVyXCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKGxpa2VCdXR0b24pO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyhsaWtlQnV0dG9uLDIpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbihsaWtlQnV0dG9uLCAwKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBsaWtlQ291bnQgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgbGlrZUNvdW50LnRleHQgPSBcIlwiK3R3ZWV0c1trZXldLmZhdm9yaXRlX2NvdW50O1xuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZChsaWtlQ291bnQpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyhsaWtlQ291bnQsMik7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKGxpa2VDb3VudCwgMSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgdGltZVN0YW1wT2ZQb3N0ID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgICAgIHRpbWVTdGFtcE9mUG9zdC50ZXh0ID0gdHdlZXRzW2tleV0uY3JlYXRlZF9hdC5zcGxpdChcIitcIilbMF07XG4gICAgICAgIHRpbWVTdGFtcE9mUG9zdC50ZXh0V3JhcCA9IHRydWU7XG5cblxuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQodGltZVN0YW1wT2ZQb3N0KTtcbiAgICAgICAgR3JpZExheW91dC5zZXRSb3codGltZVN0YW1wT2ZQb3N0LDIpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbih0aW1lU3RhbXBPZlBvc3QsIDIpO1xuICAgICAgICBcbiAgICAgICAgY2FyZC5jb250ZW50ID0gY2FyZENvbnRlbnRHcmlkO1xuICAgICAgICBjb25zb2xlLmxvZyhzdGspO1xuICAgICAgICBzdGsuYWRkQ2hpbGQoY2FyZCk7XG4gICAgfVxuXG5cbn1cbmV4cG9ydHMub25UYXAgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHZhciBpbmRleCA9IGFyZ3MuaW5kZXg7XG4gICAgdmFyIGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgdmFyIG5hdmlnYXRpb25PcHRpb25zO1xuICAgIGlmKGl0ZW0uaXRlbVR5cGU9PT1cInBkZlwiKXtcbiAgICAgICAgbmF2aWdhdGlvbk9wdGlvbnM9e1xuICAgICAgICAgICAgbW9kdWxlTmFtZTonZGV0YWlsZWQtcGRmLWxpc3QnLFxuICAgICAgICAgICAgY29udGV4dDp7XG4gICAgICAgICAgICAgICAgcGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgICAgICAgICAgIHBhcmFtMjogXCJ2YWx1ZTJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoaXRlbS5pdGVtVHlwZT09PVwiY2FudmFzXCIpe1xuICAgICAgICB1dGlsaXR5TW9kdWxlLm9wZW5VcmwoXCJodHRwczovL2l1Lmluc3RydWN0dXJlLmNvbS9jb3Vyc2VzLzE2ODcyMDEvYXNzaWdubWVudHMvNzkxNTA3NVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZihpdGVtLml0ZW1UeXBlPT09XCJ0ZXh0XCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC10ZXh0LWxpc3QnLFxuICAgICAgICAgICAgY29udGV4dDp7XG4gICAgICAgICAgICAgICAgcGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgICAgICAgICAgIHBhcmFtMjogXCJ2YWx1ZTJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoaXRlbS5pdGVtVHlwZT09PVwid2VicGFnZVwiKXtcbiAgICAgICAgbmF2aWdhdGlvbk9wdGlvbnM9e1xuICAgICAgICAgICAgbW9kdWxlTmFtZTonZGV0YWlsZWQtd2VicGFnZS1saXN0JyxcbiAgICAgICAgICAgIGNvbnRleHQ6e1xuICAgICAgICAgICAgICAgIHBhcmFtMTogXCJ2YWx1ZTFcIixcbiAgICAgICAgICAgICAgICBwYXJhbTI6IFwidmFsdWUyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGl0ZW0uaXRlbVR5cGU9PT1cIm1hcFwiKXtcbiAgICAgICAgbmF2aWdhdGlvbk9wdGlvbnM9e1xuICAgICAgICAgICAgbW9kdWxlTmFtZTonZGV0YWlsZWQtbWFwLWxpc3QnLFxuICAgICAgICAgICAgY29udGV4dDp7XG4gICAgICAgICAgICAgICAgcGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgICAgICAgICAgIHBhcmFtMjogXCJ2YWx1ZTJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKGl0ZW0uaXRlbVR5cGUhPT1cImNhbnZhc1wiKXtcbiAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKG5hdmlnYXRpb25PcHRpb25zKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ0NsaWNrZWQgaXRlbSB3aXRoIGluZGV4ICcgKyBpbmRleCk7XG59O1xuXG5cblxuIl19