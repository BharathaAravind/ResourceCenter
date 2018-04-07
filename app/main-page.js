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
var videoPlayer = require("nativescript-videoplayer");
var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel interdum turpis. Proin non orci mi. Etiam lobortis quam risus, nec pellentesque est luctus quis. Nullam dolor neque, sodales vel metus eget, viverra elementum enim. Fusce a nisl iaculis, finibus enim ac, tempor nibh. In hac habitasse platea dictumst. Etiam faucibus, nisl ac molestie varius, nisl odio euismod turpis, in gravida justo arcu id lorem. Suspendisse et hendrerit tellus. Aenean pulvinar purus diam, ut luctus diam imperdiet et.\n\nUt interdum pretium orci, non cursus ante ullamcorper aliquam. In lacinia, dui ut finibus mollis, libero ipsum viverra mauris, ac tincidunt ante dolor id est. Fusce dapibus lacus viverra vestibulum feugiat. Ut ac metus vehicula, venenatis ex sed, molestie arcu. Sed congue odio vel libero volutpat condimentum. Aliquam erat volutpat. Mauris viverra mi nibh, a finibus felis tristique non. Ut non interdum dolor.\n";
var webViewModule = require("tns-core-modules/ui/web-view");
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
        fetchModule.fetch("https://api.twitter.com/1.1/search/tweets.json?q=deletefacebook&count=10&result_type=popular", {
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
    pageData.set("src", "https://api.instagram.com/oauth/authorize/?client_id=" + CLIENT_ID_INSTA + "&redirect_uri=" + REDIRECT_URL + "&response_type=token");
    var webView = page.getViewById("instawebview");
    if (typeof webView != "undefined") {
        webView.on(webViewModule.WebView.loadFinishedEvent, function (args) {
            var message;
            if (!args.error) {
                message = args.url;
                if (message.includes("access_token")) {
                    webView.visibility = "collapsed";
                    var url = message.split("access_token=");
                    access_token_insta = url[1];
                    console.log(access_token_insta);
                    var tag = "throwback";
                    console.log(tag);
                    fetchModule.fetch("https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + access_token_insta, {
                        method: "GET",
                    })
                        .then(function (response) {
                        console.log("search api success");
                        //console.log(JSON.stringify(response));
                        //alert(JSON.stringify(response));
                        instaTweets(args, response._bodyInit);
                    }, function (error) {
                        console.log("search api fail");
                        //console.log(JSON.stringify(error));
                    });
                }
                else {
                    webView.visibility = "visible";
                }
                console.log(message);
            }
            else {
                message = "Error loading " + args.url + ": " + args.error;
            }
        });
    }
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
    page = args.object;
    var listview = view.getViewById(page, "listview");
    listview.items = items;
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
};
function instaTweets(args, response) {
    response = JSON.parse(response);
    var posts = response.data;
    var stk = page.getViewById("instagrid");
    posts.forEach(function (post) {
        console.log(post.user.username);
        console.log(post.images.standard_resolution.url);
        console.log(post.caption.text);
        console.log(post.likes.count);
        var card = new nativescript_cardview_1.CardView();
        card.margin = 10;
        card.marginTop = 10;
        card.radius = 5;
        card.elevation = 40;
        card.className = "cardStyle";
        var cardContentGrid = new grid_layout_1.GridLayout();
        var firstColumn = new layout.ItemSpec(1, "auto");
        var secondColumn = new layout.ItemSpec(1, "auto");
        var thirdColumn = new layout.ItemSpec(1, "star");
        var firstRow = new layout.ItemSpec(1, "auto");
        var secondRow = new layout.ItemSpec(1, "auto");
        var thirdRow = new layout.ItemSpec(1, "auto");
        cardContentGrid.addColumn(firstColumn);
        cardContentGrid.addColumn(secondColumn);
        cardContentGrid.addColumn(thirdColumn);
        cardContentGrid.addRow(firstRow);
        cardContentGrid.addRow(secondRow);
        cardContentGrid.addRow(thirdRow);
        if (post.type == "video") {
            var video = new videoPlayer.Video();
            video.src = post.videos.standard_resolution.url;
            console.log(post.videos.standard_resolution.url);
            video.height = 320;
            video.loop = true;
            video.stretch = "aspectFill";
            video.autoplay = true;
            video.controls = false;
            cardContentGrid.addChild(video);
            grid_layout_1.GridLayout.setRow(video, 0);
            grid_layout_1.GridLayout.setColumnSpan(video, 3);
        }
        else {
            var image = new ImageModule.Image();
            image.src = post.images.standard_resolution.url;
            image.stretch = "aspectFill";
            cardContentGrid.addChild(image);
            grid_layout_1.GridLayout.setRow(image, 0);
            grid_layout_1.GridLayout.setColumnSpan(image, 3);
        }
        var instaContent = new LabelModule.Label();
        instaContent.text = post.user.username + ": " + post.caption.text;
        instaContent.textWrap = true;
        instaContent.className = "insta-post";
        cardContentGrid.addChild(instaContent);
        grid_layout_1.GridLayout.setRow(instaContent, 1);
        //GridLayout.setColumn(instaContent, 1);
        grid_layout_1.GridLayout.setColumnSpan(instaContent, 3);
        var likeButton = new LabelModule.Label();
        likeButton.className = "like-icon";
        likeButton.text = "favorite_border";
        cardContentGrid.addChild(likeButton);
        grid_layout_1.GridLayout.setRow(likeButton, 2);
        grid_layout_1.GridLayout.setColumn(likeButton, 0);
        var likeCount = new LabelModule.Label();
        likeCount.text = "" + post.likes.count;
        likeCount.className = "likes-label";
        cardContentGrid.addChild(likeCount);
        grid_layout_1.GridLayout.setRow(likeCount, 2);
        grid_layout_1.GridLayout.setColumn(likeCount, 1);
        var timeStampOfPost = new LabelModule.Label();
        var date = new Date(post.created_time * 1000);
        timeStampOfPost.text = date.toDateString();
        ;
        timeStampOfPost.textWrap = true;
        cardContentGrid.addChild(timeStampOfPost);
        grid_layout_1.GridLayout.setRow(timeStampOfPost, 2);
        grid_layout_1.GridLayout.setColumn(timeStampOfPost, 2);
        card.content = cardContentGrid;
        console.log(stk);
        stk.addChild(card);
    });
}
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
        var secondColumn = new layout.ItemSpec(250, "pixel");
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
        grid_layout_1.GridLayout.setColumn(userNameLabel, 1);
        var tweetContent = new LabelModule.Label();
        tweetContent.text = tweets[key].text;
        tweetContent.textWrap = true;
        tweetContent.className = "info";
        cardContentGrid.addChild(tweetContent);
        grid_layout_1.GridLayout.setRow(tweetContent, 1);
        grid_layout_1.GridLayout.setColumn(tweetContent, 1);
        var likeButton = new LabelModule.Label();
        likeButton.className = "like-icon";
        likeButton.text = "favorite_border";
        cardContentGrid.addChild(likeButton);
        grid_layout_1.GridLayout.setRow(likeButton, 2);
        grid_layout_1.GridLayout.setColumn(likeButton, 0);
        var likeCount = new LabelModule.Label();
        likeCount.text = "" + tweets[key].favorite_count + "  " + tweets[key].created_at.split("+")[0];
        ;
        cardContentGrid.addChild(likeCount);
        grid_layout_1.GridLayout.setRow(likeCount, 2);
        grid_layout_1.GridLayout.setColumn(likeCount, 1);
        // var timeStampOfPost = new LabelModule.Label();
        // timeStampOfPost.text = tweets[key].created_at.split("+")[0];
        // timeStampOfPost.textWrap = true;
        // cardContentGrid.addChild(timeStampOfPost);
        // GridLayout.setRow(timeStampOfPost,2);
        // GridLayout.setColumn(timeStampOfPost, 2);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQWlEO0FBQ2pELHVEQUF5RDtBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0Msc0RBQW9EO0FBQ3BELHVEQUF5RDtBQUN6RCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxJQUFJLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUV0RCxJQUFJLFdBQVcsR0FBRyw4NUJBR2pCLENBQUM7QUFDRiw0REFBOEQ7QUFFOUQsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVuQyw4QkFBOEI7QUFDNUIsSUFBSSxHQUFHLEdBQUcsMkJBQTJCLENBQUM7QUFDdEMsSUFBSSxNQUFNLEdBQUcsb0RBQW9ELENBQUM7QUFDbEUsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFFLEdBQUcsR0FBQyxNQUFNLENBQUM7QUFDMUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtBQUN0QyxJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFHdkQsZ0NBQWdDO0FBQ2hDLElBQUksZUFBZSxHQUFHLGtDQUFrQyxDQUFDO0FBQ3pELElBQUksWUFBWSxHQUFHLHVCQUF1QixDQUFDO0FBQzNDLElBQUksa0JBQWtCLEdBQUcsRUFB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QUcsS0FBSyxDQUFDLENBQUEsQ0FBQztRQUMzQixpQkFBaUIsR0FBQztZQUNkLFVBQVUsRUFBQyxtQkFBbUI7WUFDOUIsT0FBTyxFQUFDO2dCQUNKLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixNQUFNLEVBQUUsUUFBUTthQUNuQjtTQUNKLENBQUE7SUFDTCxDQUFDO0lBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBRyxRQUFRLENBQUMsQ0FBQSxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgQ2FyZFZpZXcgfSBmcm9tICduYXRpdmVzY3JpcHQtY2FyZHZpZXcnO1xuaW1wb3J0ICogYXMgTGFiZWxNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcbnZhciB2aWV3ID0gcmVxdWlyZShcInVpL2NvcmUvdmlld1wiKTtcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiKTtcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tICd1aS9sYXlvdXRzL2dyaWQtbGF5b3V0JztcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG52YXIgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoXCJkYXRhL29ic2VydmFibGVcIik7XG52YXIgcGFnZURhdGEgPSBuZXcgb2JzZXJ2YWJsZS5PYnNlcnZhYmxlKCk7XG52YXIgdmlkZW9QbGF5ZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXZpZGVvcGxheWVyXCIpO1xuXG52YXIgZGVzY3JpcHRpb24gPSBgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gTnVsbGFtIHZlbCBpbnRlcmR1bSB0dXJwaXMuIFByb2luIG5vbiBvcmNpIG1pLiBFdGlhbSBsb2JvcnRpcyBxdWFtIHJpc3VzLCBuZWMgcGVsbGVudGVzcXVlIGVzdCBsdWN0dXMgcXVpcy4gTnVsbGFtIGRvbG9yIG5lcXVlLCBzb2RhbGVzIHZlbCBtZXR1cyBlZ2V0LCB2aXZlcnJhIGVsZW1lbnR1bSBlbmltLiBGdXNjZSBhIG5pc2wgaWFjdWxpcywgZmluaWJ1cyBlbmltIGFjLCB0ZW1wb3IgbmliaC4gSW4gaGFjIGhhYml0YXNzZSBwbGF0ZWEgZGljdHVtc3QuIEV0aWFtIGZhdWNpYnVzLCBuaXNsIGFjIG1vbGVzdGllIHZhcml1cywgbmlzbCBvZGlvIGV1aXNtb2QgdHVycGlzLCBpbiBncmF2aWRhIGp1c3RvIGFyY3UgaWQgbG9yZW0uIFN1c3BlbmRpc3NlIGV0IGhlbmRyZXJpdCB0ZWxsdXMuIEFlbmVhbiBwdWx2aW5hciBwdXJ1cyBkaWFtLCB1dCBsdWN0dXMgZGlhbSBpbXBlcmRpZXQgZXQuXG5cblV0IGludGVyZHVtIHByZXRpdW0gb3JjaSwgbm9uIGN1cnN1cyBhbnRlIHVsbGFtY29ycGVyIGFsaXF1YW0uIEluIGxhY2luaWEsIGR1aSB1dCBmaW5pYnVzIG1vbGxpcywgbGliZXJvIGlwc3VtIHZpdmVycmEgbWF1cmlzLCBhYyB0aW5jaWR1bnQgYW50ZSBkb2xvciBpZCBlc3QuIEZ1c2NlIGRhcGlidXMgbGFjdXMgdml2ZXJyYSB2ZXN0aWJ1bHVtIGZldWdpYXQuIFV0IGFjIG1ldHVzIHZlaGljdWxhLCB2ZW5lbmF0aXMgZXggc2VkLCBtb2xlc3RpZSBhcmN1LiBTZWQgY29uZ3VlIG9kaW8gdmVsIGxpYmVybyB2b2x1dHBhdCBjb25kaW1lbnR1bS4gQWxpcXVhbSBlcmF0IHZvbHV0cGF0LiBNYXVyaXMgdml2ZXJyYSBtaSBuaWJoLCBhIGZpbmlidXMgZmVsaXMgdHJpc3RpcXVlIG5vbi4gVXQgbm9uIGludGVyZHVtIGRvbG9yLlxuYDtcbmltcG9ydCAqIGFzIHdlYlZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIjtcblxudmFyIHV0aWxpdHlNb2R1bGUgPSByZXF1aXJlKFwidXRpbHMvdXRpbHNcIik7XG52YXIgZmV0Y2hNb2R1bGUgPSByZXF1aXJlKFwiZmV0Y2hcIik7XG5cbi8vVHdpdHRlciBLZXlzIGFuZCBjcmVkZW50aWFsc1xuICB2YXIga2V5ID0gXCI4VjZiajBUNVlNeTlTN0hqVllqZnhHQ3JMXCI7XG4gIHZhciBzZWNyZXQgPSBcIkRNUFNqcndCZUxueFR0YVlCWEtPMHdPUXUyWUFlQWJ1bWNqRzFsdE5GNnRVaHJPRVJSXCI7XG4gIHZhciBjYXQgPSBrZXkgK1wiOlwiK3NlY3JldDtcbiAgdmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlci8nKS5CdWZmZXJcbiAgdmFyIGNyZWRlbnRpYWxzID0gbmV3IEJ1ZmZlcihjYXQpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgXG4gIFxuLy9JbnN0YWdyYW0ga2V5cyBhbmQgY3JlZGV0bmlhbHNcbnZhciBDTElFTlRfSURfSU5TVEEgPSBcImRkMjEwNThjYmEwMjRjNTI5M2U3NjIwOTljZjE1N2FhXCI7XG52YXIgUkVESVJFQ1RfVVJMID0gXCJodHRwczovL3d3dy50ZXN0LmNvbS9cIjtcbnZhciBhY2Nlc3NfdG9rZW5faW5zdGEgPSBcIlwiO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxudmFyIG15RGF0YUFycmF5OiBhbnkgPSBbXG4gICAge3RpdGxlOlwiU2xpZGUgMVwiLCBjb2xvcjogXCIjYjNjZGUwXCIsIGltYWdlOlwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LXBob3Rvdmlld2VyL21hc3Rlci9kZW1vL3Jlcy8wMS5qcGdcIn0sXG4gICAge3RpdGxlOlwiU2xpZGUgMlwiLCBjb2xvcjogXCIjNjQ5N2IxXCIsIGltYWdlOlwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LXBob3Rvdmlld2VyL21hc3Rlci9kZW1vL3Jlcy8wMi5qcGdcIn0sXG4gICAge3RpdGxlOlwiU2xpZGUgM1wiLCBjb2xvcjogXCIjMDA1Yjk2XCIsIGltYWdlOlwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LXBob3Rvdmlld2VyL21hc3Rlci9kZW1vL3Jlcy8wMy5qcGdcIn0sXG4gICAge3RpdGxlOlwiU2xpZGUgNFwiLCBjb2xvcjogXCIjMDMzOTZjXCIsIGltYWdlOlwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LXBob3Rvdmlld2VyL21hc3Rlci9kZW1vL3Jlcy8wNC5qcGdcIn1cbiAgICAvKnt0aXRsZTpcIlNsaWRlIDVcIiwgY29sb3I6IFwiIzAxMWY0YlwiLCBpbWFnZTogXCJcIn0qL1xuXTtcbnZhciBjcmVhdGVWaWV3TW9kZWwgPSByZXF1aXJlKFwiLi9tYWluLXZpZXctbW9kZWxcIikuY3JlYXRlVmlld01vZGVsO1xudmFyIGZyYW1lTW9kdWxlID1yZXF1aXJlKFwidWkvZnJhbWVcIik7XG52YXIgaXRlbXMgPSBbXTtcbnZhciBiZWFyZXJUb2tlbjtcbmZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3MpIHtcbiAgICB2YXIgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBjcmVhdGVWaWV3TW9kZWwoKTtcbn1cbmV4cG9ydHMub25OYXZpZ2F0aW5nVG8gPSBvbk5hdmlnYXRpbmdUbztcbnZhciBwYWdlO1xuXG5leHBvcnRzLmxvYWRlZCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGlzIGNhbGxlZFwiKTtcbiAgICAvL1R3aXR0ZXIgQXBpIEludGVncmF0aW9uXG4gICAgZmV0Y2hNb2R1bGUuZmV0Y2goXCJodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aDIvdG9rZW5cIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBcIiArIGNyZWRlbnRpYWxzLFxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04XCJcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogXCJncmFudF90eXBlPWNsaWVudF9jcmVkZW50aWFsc1wiXG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImJlYXJlciBhcGkgc3VjY2Vzc1wiKTsgIFxuICAgICAgICBiZWFyZXJUb2tlbiA9IHJlc3BvbnNlW1wiX2JvZHlJbml0XCJdO1xuICAgICAgICBiZWFyZXJUb2tlbiA9IEpTT04ucGFyc2UoYmVhcmVyVG9rZW4pLmFjY2Vzc190b2tlbjtcbiAgICAgICAgY29uc29sZS5sb2coYmVhcmVyVG9rZW4pO1xuICAgICAgICBmZXRjaE1vZHVsZS5mZXRjaChcImh0dHBzOi8vYXBpLnR3aXR0ZXIuY29tLzEuMS9zZWFyY2gvdHdlZXRzLmpzb24/cT1kZWxldGVmYWNlYm9vayZjb3VudD0xMCZyZXN1bHRfdHlwZT1wb3B1bGFyXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBiZWFyZXJUb2tlbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlYXJjaCBhcGkgc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG4gICAgICAgICAgICB0ZXN0KGFyZ3MsIHJlc3BvbnNlLl9ib2R5SW5pdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGFwaSBmYWlsXCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICB9KTtcblxuXG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9KTtcblxuICAgIC8vSW5zdGFncmFtIEFwaSBJbnRlZ3JhdGlvblxuICAgIHBhZ2VEYXRhLnNldChcInNyY1wiLCBcImh0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplLz9jbGllbnRfaWQ9XCIrQ0xJRU5UX0lEX0lOU1RBK1wiJnJlZGlyZWN0X3VyaT1cIitSRURJUkVDVF9VUkwrXCImcmVzcG9uc2VfdHlwZT10b2tlblwiKTtcblxuICAgIGxldCB3ZWJWaWV3ID0gcGFnZS5nZXRWaWV3QnlJZChcImluc3Rhd2Vidmlld1wiKTtcblxuICAgIGlmKHR5cGVvZiB3ZWJWaWV3ICE9IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgd2ViVmlldy5vbih3ZWJWaWV3TW9kdWxlLldlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiB3ZWJWaWV3TW9kdWxlLkxvYWRFdmVudERhdGEpIHtcbiAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYXJncy51cmw7IFxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuaW5jbHVkZXMoXCJhY2Nlc3NfdG9rZW5cIikpe1xuICAgICAgICAgICAgICAgICAgICB3ZWJWaWV3LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gbWVzc2FnZS5zcGxpdChcImFjY2Vzc190b2tlbj1cIik7XG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbl9pbnN0YSA9IHVybFsxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWNjZXNzX3Rva2VuX2luc3RhKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZyA9IFwidGhyb3diYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoTW9kdWxlLmZldGNoKFwiaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS92MS90YWdzL1wiK3RhZytcIi9tZWRpYS9yZWNlbnQ/YWNjZXNzX3Rva2VuPVwiK2FjY2Vzc190b2tlbl9pbnN0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2ggYXBpIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YVR3ZWV0cyhhcmdzLCByZXNwb25zZS5fYm9keUluaXQpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGFwaSBmYWlsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHdlYlZpZXcudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkVycm9yIGxvYWRpbmcgXCIgKyBhcmdzLnVybCArIFwiOiBcIiArIGFyZ3MuZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cblxuICAgIHBhZ2VEYXRhLnNldChcInNob3dEZXRhaWxzXCIsIHRydWUpO1xuICAgIHBhZ2VEYXRhLnNldChcInBhZ2VUaXRsZVwiLCBcIlJlc291cmNlIENlbnRlclwiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJldmVudFRpdGxlXCIsIFwiV29ybGQgZmFpclwiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ0YWIxXCIsIFwiRmFjZWJvb2tcIik7XG4gICAgcGFnZURhdGEuc2V0KFwidGFiMlwiLCBcIlR3aXR0ZXJcIik7XG4gICAgcGFnZURhdGEuc2V0KFwidGFiM1wiLCBcIkluc3RhZ3JhbVwiKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MVwiLCB0cnVlKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MlwiLCBmYWxzZSk7XG4gICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTNcIiwgZmFsc2UpO1xuICAgIHBhZ2VEYXRhLnNldChcIm15RGF0YUFycmF5XCIsIG15RGF0YUFycmF5KTtcbiAgICAvLyBwYWdlRGF0YS5zZXQoXCJsYXRpdHVkZVwiLCBsYXRpdHVkZSk7XG4gICAgLy8gcGFnZURhdGEuc2V0KFwibG9uZ2l0dWRlXCIsIGxvbmdpdHVkZSk7XG4gICAgLy8gcGFnZURhdGEuc2V0KFwiem9vbVwiLCB6b29tKTtcbiAgICBwYWdlRGF0YS5zZXQoXCJteURhdGFBcnJheVwiLCBteURhdGFBcnJheSk7XG4gICAgaWYoZGVzY3JpcHRpb24ubGVuZ3RoPDE1MCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIHRoaXNcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uLmxlbmd0aCk7XG4gICAgICAgIHBhZ2VEYXRhLnNldChcImRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgdGhpc1wiKTtcbiAgICAgICAgdmFyIHRlbXAgPSBkZXNjcmlwdGlvbi5zdWJzdHJpbmcoMCwgMTUwKTtcbiAgICAgICAgY29uc29sZS5sb2codGVtcC5sZW5ndGgpO1xuICAgICAgICBwYWdlRGF0YS5zZXQoXCJkZXNjcmlwdGlvblwiLCB0ZW1wKTtcbiAgICB9XG4gICAgaXRlbXM9W107XG4gICAgaXRlbXMucHVzaChcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwicGRmXCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJFdmVudCBGbHllclwiLFxuICAgICAgICAgICAgaXRlbURlc2M6IFwiRnVuZXJhbFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcImNhbnZhc1wiLFxuICAgICAgICAgICAgaXRlbU5hbWU6IFwiQ2FudmFzIEV2ZW50XCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogXCJGb3IgRW1tYSwgRm9yZXZlciBBZ29cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtVHlwZTogXCJ3ZWJwYWdlXCIsXG4gICAgICAgICAgICBpdGVtTmFtZTogXCJXZWIgUGFnZVwiLFxuICAgICAgICAgICAgaXRlbURlc2M6IFwiUmFuZG9tIEFjY2VzcyBNZW1vcmllc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcIm1hcFwiLFxuICAgICAgICAgICAgaXRlbU5hbWU6IFwiTWFwXCIsXG4gICAgICAgICAgICBpdGVtRGVzYzogZGVzY3JpcHRpb25cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgaXRlbU5hbWU6IFwiVGV4dFwiLFxuICAgICAgICAgICAgaXRlbURlc2M6IGRlc2NyaXB0aW9uXG4gICAgICAgIH1cbiAgICApXG4gICAgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgIHZhciBsaXN0dmlldyA9IHZpZXcuZ2V0Vmlld0J5SWQocGFnZSwgXCJsaXN0dmlld1wiKTtcbiAgICBsaXN0dmlldy5pdGVtcyA9IGl0ZW1zO1xuXG4gICAgYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQgPSBwYWdlRGF0YTtcbn1cblxuZXhwb3J0cy5vblNlbGVjdGVkSW5kZXhDaGFuZ2UgPSBmdW5jdGlvbihhcmdzKXtcbiAgICBjb25zb2xlLmxvZyhcInRhcHBlZFwiKTtcbiAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkxXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkyXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5M1wiLCBmYWxzZSk7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkxXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5MlwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5M1wiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcGFnZURhdGEuc2V0KFwidmlzaWJpbGl0eTFcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhLnNldChcInZpc2liaWxpdHkyXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YS5zZXQoXCJ2aXNpYmlsaXR5M1wiLCB0cnVlKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbn1cblxuZXhwb3J0cy5teUNoYW5nZUV2ZW50ID0gZnVuY3Rpb24oYXJncyl7XG4gICAgICAgIHZhciBjaGFuZ2VFdmVudFRleHQgPSBcIlBhZ2UgY2hhbmdlZCB0byBpbmRleDogXCIgKyBhcmdzLmluZGV4O1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFuZ2VFdmVudFRleHQpO1xuICAgIH1cblxuXG5leHBvcnRzLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHBhZ2VEYXRhLnNldChcInNob3dEZXRhaWxzXCIsICFwYWdlRGF0YS5nZXQoXCJzaG93RGV0YWlsc1wiKSk7XG59XG5cbmV4cG9ydHMubGlzdFZpZXdJdGVtVGFwID0gZnVuY3Rpb24oYXJncykge1xuICAgIHZhciBpdGVtSW5kZXggPSBhcmdzLmluZGV4O1xufVxuXG5leHBvcnRzLmV4cGFuZFRleHQgPSBmdW5jdGlvbihhcmdzKXtcbiAgICBjb25zb2xlLmxvZyhhcmdzLm9iamVjdCk7XG4gICAgdmFyIGxhYiA9IDxhbnk+YXJncy5vYmplY3Q7XG4gICAgdmFyIHNwYW5sYWJlbCA9IDxhbnk+bGFiLmdldFZpZXdCeUlkKFwic2VlbW9yZWxhYmVsXCIpO1xuICAgIGlmKHNwYW5sYWJlbC50ZXh0PT09XCIuLi5zZWUgbGVzc1wiKXtcbiAgICAgICAgdmFyIHRlbXAgPSBkZXNjcmlwdGlvbi5zdWJzdHJpbmcoMCwgMTUwKTtcbiAgICAgICAgY29uc29sZS5sb2codGVtcC5sZW5ndGgpO1xuICAgICAgICBwYWdlRGF0YS5zZXQoXCJkZXNjcmlwdGlvblwiLCB0ZW1wKTtcbiAgICAgICAgc3BhbmxhYmVsLnRleHQ9XCIuLi5zZWUgbW9yZVwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBwYWdlRGF0YS5zZXQoXCJkZXNjcmlwdGlvblwiLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIHNwYW5sYWJlbC50ZXh0PVwiLi4uc2VlIGxlc3NcIjtcbiAgICB9XG4gICAgXG4gICAgXG59XG5cbmZ1bmN0aW9uIGluc3RhVHdlZXRzKGFyZ3MsIHJlc3BvbnNlKXtcbiAgICBcbiAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgIHZhciBwb3N0cyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgdmFyIHN0ayA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJpbnN0YWdyaWRcIik7XG4gICAgcG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhwb3N0LnVzZXIudXNlcm5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhwb3N0LmltYWdlcy5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBvc3QuY2FwdGlvbi50ZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2cocG9zdC5saWtlcy5jb3VudCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2FyZCA9IG5ldyBDYXJkVmlldygpO1xuICAgICAgICBjYXJkLm1hcmdpbiA9IDEwO1xuICAgICAgICBjYXJkLm1hcmdpblRvcCA9IDEwO1xuICAgICAgICBjYXJkLnJhZGl1cyA9IDU7XG4gICAgICAgIGNhcmQuZWxldmF0aW9uID0gNDA7XG4gICAgICAgIGNhcmQuY2xhc3NOYW1lID0gXCJjYXJkU3R5bGVcIjtcbiAgICBcbiAgICAgICAgdmFyIGNhcmRDb250ZW50R3JpZCA9IG5ldyBHcmlkTGF5b3V0KCk7XG4gICAgICAgIHZhciBmaXJzdENvbHVtbiA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoMSwgXCJhdXRvXCIpO1xuICAgICAgICB2YXIgc2Vjb25kQ29sdW1uID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIHZhciB0aGlyZENvbHVtbiA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoMSwgXCJzdGFyXCIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGZpcnN0Um93ID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIHZhciBzZWNvbmRSb3cgPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDEsIFwiYXV0b1wiKTtcbiAgICAgICAgdmFyIHRoaXJkUm93ID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIFxuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ29sdW1uKGZpcnN0Q29sdW1uKTtcbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENvbHVtbihzZWNvbmRDb2x1bW4pO1xuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ29sdW1uKHRoaXJkQ29sdW1uKTtcblxuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkUm93KGZpcnN0Um93KTtcbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZFJvdyhzZWNvbmRSb3cpO1xuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkUm93KHRoaXJkUm93KTtcblxuICAgICAgICBpZihwb3N0LnR5cGUgPT0gXCJ2aWRlb1wiKXtcblxuICAgICAgICAgICAgdmFyIHZpZGVvID0gbmV3IHZpZGVvUGxheWVyLlZpZGVvKCk7XG4gICAgICAgICAgICB2aWRlby5zcmMgPSBwb3N0LnZpZGVvcy5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvc3QudmlkZW9zLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsKTtcbiAgICAgICAgICAgIHZpZGVvLmhlaWdodCA9IDMyMDtcbiAgICAgICAgICAgIHZpZGVvLmxvb3AgPSB0cnVlO1xuICAgICAgICAgICAgdmlkZW8uc3RyZXRjaCA9IFwiYXNwZWN0RmlsbFwiXG4gICAgICAgICAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgICAgICB2aWRlby5jb250cm9scyA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQodmlkZW8pO1xuICAgICAgICAgICAgR3JpZExheW91dC5zZXRSb3codmlkZW8sMCk7XG4gICAgICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtblNwYW4odmlkZW8sIDMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2VNb2R1bGUuSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHBvc3QuaW1hZ2VzLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsO1xuICAgICAgICAgICAgaW1hZ2Uuc3RyZXRjaCA9IFwiYXNwZWN0RmlsbFwiOyBcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQoaW1hZ2UpO1xuICAgICAgICAgICAgR3JpZExheW91dC5zZXRSb3coaW1hZ2UsMCk7XG4gICAgICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtblNwYW4oaW1hZ2UsIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluc3RhQ29udGVudCA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICBpbnN0YUNvbnRlbnQudGV4dCA9IHBvc3QudXNlci51c2VybmFtZSArIFwiOiBcIiArIHBvc3QuY2FwdGlvbi50ZXh0O1xuICAgICAgICBpbnN0YUNvbnRlbnQudGV4dFdyYXAgPSB0cnVlO1xuICAgICAgICBpbnN0YUNvbnRlbnQuY2xhc3NOYW1lID0gXCJpbnN0YS1wb3N0XCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKGluc3RhQ29udGVudCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KGluc3RhQ29udGVudCwxKTtcbiAgICAgICAgLy9HcmlkTGF5b3V0LnNldENvbHVtbihpbnN0YUNvbnRlbnQsIDEpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtblNwYW4oaW5zdGFDb250ZW50LDMpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxpa2VCdXR0b24gPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgbGlrZUJ1dHRvbi5jbGFzc05hbWUgPSBcImxpa2UtaWNvblwiO1xuICAgICAgICBsaWtlQnV0dG9uLnRleHQgPSBcImZhdm9yaXRlX2JvcmRlclwiO1xuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZChsaWtlQnV0dG9uKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRSb3cobGlrZUJ1dHRvbiwyKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW4obGlrZUJ1dHRvbiwgMCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbGlrZUNvdW50ID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgICAgIGxpa2VDb3VudC50ZXh0ID0gXCJcIitwb3N0Lmxpa2VzLmNvdW50O1xuICAgICAgICBsaWtlQ291bnQuY2xhc3NOYW1lID0gXCJsaWtlcy1sYWJlbFwiO1xuXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZChsaWtlQ291bnQpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyhsaWtlQ291bnQsMik7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKGxpa2VDb3VudCwgMSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgdGltZVN0YW1wT2ZQb3N0ID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkX3RpbWUqMTAwMCk7XG4gICAgICAgIHRpbWVTdGFtcE9mUG9zdC50ZXh0ID0gZGF0ZS50b0RhdGVTdHJpbmcoKTs7XG4gICAgICAgIHRpbWVTdGFtcE9mUG9zdC50ZXh0V3JhcCA9IHRydWU7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKHRpbWVTdGFtcE9mUG9zdCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KHRpbWVTdGFtcE9mUG9zdCwyKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW4odGltZVN0YW1wT2ZQb3N0LCAyKTtcbiAgICAgICAgXG4gICAgICAgIGNhcmQuY29udGVudCA9IGNhcmRDb250ZW50R3JpZDtcbiAgICAgICAgY29uc29sZS5sb2coc3RrKTtcbiAgICAgICAgc3RrLmFkZENoaWxkKGNhcmQpO1xuICAgIH0pO1xuICAgIFxuXG59XG5cbmZ1bmN0aW9uIHRlc3QoYXJncywgcmVzcG9uc2Upe1xuICAgIHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgcmVzcG9uc2UpO1xuICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgdmFyIHR3ZWV0cyA9IHJlc3BvbnNlW1wic3RhdHVzZXNcIl07XG4gICAgXG4gICAgdmFyIHN0ayA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ3R3ZWV0c2dyaWQnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdHdlZXRzKXtcbiAgICAgICAgXG4gICAgICAgIHZhciBjYXJkID0gbmV3IENhcmRWaWV3KCk7XG4gICAgICAgIGNhcmQubWFyZ2luID0gMTA7XG4gICAgICAgIGNhcmQubWFyZ2luVG9wID0gMTA7XG4gICAgICAgIGNhcmQucmFkaXVzID0gNTtcbiAgICAgICAgY2FyZC5lbGV2YXRpb24gPSA0MDtcbiAgICAgICAgY2FyZC5jbGFzc05hbWUgPSBcImNhcmRTdHlsZVwiO1xuICAgICAgIFxuICAgICAgICB2YXIgY2FyZENvbnRlbnRHcmlkID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICAgICAgdmFyIGZpcnN0Q29sdW1uID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIHZhciBzZWNvbmRDb2x1bW4gPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDI1MCwgXCJwaXhlbFwiKTtcbiAgICAgICAgdmFyIHRoaXJkQ29sdW1uID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIFxuICAgICAgICB2YXIgZmlyc3RSb3cgPSBuZXcgbGF5b3V0Lkl0ZW1TcGVjKDUwLCBcInBpeGVsXCIpO1xuICAgICAgICB2YXIgc2Vjb25kUm93ID0gbmV3IGxheW91dC5JdGVtU3BlYygxLCBcImF1dG9cIik7XG4gICAgICAgIHZhciB0aGlyZFJvdyA9IG5ldyBsYXlvdXQuSXRlbVNwZWMoMSwgXCJhdXRvXCIpO1xuICAgICAgICBcbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENvbHVtbihmaXJzdENvbHVtbik7XG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDb2x1bW4oc2Vjb25kQ29sdW1uKTtcbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENvbHVtbih0aGlyZENvbHVtbik7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZFJvdyhmaXJzdFJvdyk7XG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRSb3coc2Vjb25kUm93KTtcbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZFJvdyh0aGlyZFJvdyk7XG5cbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlTW9kdWxlLkltYWdlKCk7XG4gICAgICAgIGltYWdlLnNyYyA9IHR3ZWV0c1trZXldLnVzZXIucHJvZmlsZV9pbWFnZV91cmw7XG4gICAgICAgIGltYWdlLnN0cmV0Y2ggPSBcImFzcGVjdEZpbGxcIjsgXG4gICAgICAgIGltYWdlLmNsYXNzTmFtZSA9IFwicHJvZmlsZS1pY29uXCI7XG5cblxuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQoaW1hZ2UpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyhpbWFnZSwwKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW4oaW1hZ2UsIDApO1xuICAgICAgICAvL0dyaWRMYXlvdXQuc2V0Um93U3BhbihpbWFnZSwgMik7XG5cblxuICAgICAgICB2YXIgdXNlck5hbWVMYWJlbCA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLnRleHQgPSB0d2VldHNba2V5XS51c2VyLm5hbWU7XG4gICAgICAgIHVzZXJOYW1lTGFiZWwudGV4dFdyYXAgPSB0cnVlO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLmNsYXNzTmFtZSA9IFwiaW5mb1wiO1xuICAgICAgICB1c2VyTmFtZUxhYmVsLnZlcnRpY2FsQWxpZ25tZW50ID0gXCJtaWRkbGVcIjtcblxuICAgICAgICBjYXJkQ29udGVudEdyaWQuYWRkQ2hpbGQodXNlck5hbWVMYWJlbCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KHVzZXJOYW1lTGFiZWwsMCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKHVzZXJOYW1lTGFiZWwsIDEpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHR3ZWV0Q29udGVudCA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICB0d2VldENvbnRlbnQudGV4dCA9IHR3ZWV0c1trZXldLnRleHQ7XG4gICAgICAgIHR3ZWV0Q29udGVudC50ZXh0V3JhcCA9IHRydWU7XG4gICAgICAgIHR3ZWV0Q29udGVudC5jbGFzc05hbWUgPSBcImluZm9cIjtcbiAgICAgICAgXG4gICAgICAgIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZCh0d2VldENvbnRlbnQpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyh0d2VldENvbnRlbnQsMSk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Q29sdW1uKHR3ZWV0Q29udGVudCwgMSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbGlrZUJ1dHRvbiA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICBsaWtlQnV0dG9uLmNsYXNzTmFtZSA9IFwibGlrZS1pY29uXCI7XG4gICAgICAgIGxpa2VCdXR0b24udGV4dCA9IFwiZmF2b3JpdGVfYm9yZGVyXCI7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKGxpa2VCdXR0b24pO1xuICAgICAgICBHcmlkTGF5b3V0LnNldFJvdyhsaWtlQnV0dG9uLDIpO1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbihsaWtlQnV0dG9uLCAwKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBsaWtlQ291bnQgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgbGlrZUNvdW50LnRleHQgPSBcIlwiK3R3ZWV0c1trZXldLmZhdm9yaXRlX2NvdW50K1wiICBcIit0d2VldHNba2V5XS5jcmVhdGVkX2F0LnNwbGl0KFwiK1wiKVswXTs7XG5cbiAgICAgICAgY2FyZENvbnRlbnRHcmlkLmFkZENoaWxkKGxpa2VDb3VudCk7XG4gICAgICAgIEdyaWRMYXlvdXQuc2V0Um93KGxpa2VDb3VudCwyKTtcbiAgICAgICAgR3JpZExheW91dC5zZXRDb2x1bW4obGlrZUNvdW50LCAxKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHZhciB0aW1lU3RhbXBPZlBvc3QgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgLy8gdGltZVN0YW1wT2ZQb3N0LnRleHQgPSB0d2VldHNba2V5XS5jcmVhdGVkX2F0LnNwbGl0KFwiK1wiKVswXTtcbiAgICAgICAgLy8gdGltZVN0YW1wT2ZQb3N0LnRleHRXcmFwID0gdHJ1ZTtcblxuXG4gICAgICAgIC8vIGNhcmRDb250ZW50R3JpZC5hZGRDaGlsZCh0aW1lU3RhbXBPZlBvc3QpO1xuICAgICAgICAvLyBHcmlkTGF5b3V0LnNldFJvdyh0aW1lU3RhbXBPZlBvc3QsMik7XG4gICAgICAgIC8vIEdyaWRMYXlvdXQuc2V0Q29sdW1uKHRpbWVTdGFtcE9mUG9zdCwgMik7XG4gICAgICAgIFxuICAgICAgICBjYXJkLmNvbnRlbnQgPSBjYXJkQ29udGVudEdyaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0ayk7XG4gICAgICAgIHN0ay5hZGRDaGlsZChjYXJkKTtcbiAgICB9XG5cblxufVxuZXhwb3J0cy5vblRhcCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgdmFyIGluZGV4ID0gYXJncy5pbmRleDtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICB2YXIgbmF2aWdhdGlvbk9wdGlvbnM7XG4gICAgaWYoaXRlbS5pdGVtVHlwZT09PVwicGRmXCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC1wZGYtbGlzdCcsXG4gICAgICAgICAgICBjb250ZXh0OntcbiAgICAgICAgICAgICAgICBwYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgcGFyYW0yOiBcInZhbHVlMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihpdGVtLml0ZW1UeXBlPT09XCJjYW52YXNcIil7XG4gICAgICAgIHV0aWxpdHlNb2R1bGUub3BlblVybChcImh0dHBzOi8vaXUuaW5zdHJ1Y3R1cmUuY29tL2NvdXJzZXMvMTY4NzIwMS9hc3NpZ25tZW50cy83OTE1MDc1XCIpO1xuICAgIH1cbiAgICBlbHNlIGlmKGl0ZW0uaXRlbVR5cGU9PT1cInRleHRcIil7XG4gICAgICAgIG5hdmlnYXRpb25PcHRpb25zPXtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6J2RldGFpbGVkLXRleHQtbGlzdCcsXG4gICAgICAgICAgICBjb250ZXh0OntcbiAgICAgICAgICAgICAgICBwYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgcGFyYW0yOiBcInZhbHVlMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihpdGVtLml0ZW1UeXBlPT09XCJ3ZWJwYWdlXCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC13ZWJwYWdlLWxpc3QnLFxuICAgICAgICAgICAgY29udGV4dDp7XG4gICAgICAgICAgICAgICAgcGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgICAgICAgICAgIHBhcmFtMjogXCJ2YWx1ZTJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoaXRlbS5pdGVtVHlwZT09PVwibWFwXCIpe1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz17XG4gICAgICAgICAgICBtb2R1bGVOYW1lOidkZXRhaWxlZC1tYXAtbGlzdCcsXG4gICAgICAgICAgICBjb250ZXh0OntcbiAgICAgICAgICAgICAgICBwYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgcGFyYW0yOiBcInZhbHVlMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoaXRlbS5pdGVtVHlwZSE9PVwiY2FudmFzXCIpe1xuICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUobmF2aWdhdGlvbk9wdGlvbnMpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBpdGVtIHdpdGggaW5kZXggJyArIGluZGV4KTtcbn07XG5cblxuXG4iXX0=