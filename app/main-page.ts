import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { CardView } from 'nativescript-cardview';
import * as LabelModule from "tns-core-modules/ui/label";
var view = require("ui/core/view");
var layout = require("ui/layouts/grid-layout");
import { GridLayout } from 'ui/layouts/grid-layout';
import * as ImageModule from "tns-core-modules/ui/image";
var observable = require("data/observable");
var pageData = new observable.Observable();
var description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel interdum turpis. Proin non orci mi. Etiam lobortis quam risus, nec pellentesque est luctus quis. Nullam dolor neque, sodales vel metus eget, viverra elementum enim. Fusce a nisl iaculis, finibus enim ac, tempor nibh. In hac habitasse platea dictumst. Etiam faucibus, nisl ac molestie varius, nisl odio euismod turpis, in gravida justo arcu id lorem. Suspendisse et hendrerit tellus. Aenean pulvinar purus diam, ut luctus diam imperdiet et.

Ut interdum pretium orci, non cursus ante ullamcorper aliquam. In lacinia, dui ut finibus mollis, libero ipsum viverra mauris, ac tincidunt ante dolor id est. Fusce dapibus lacus viverra vestibulum feugiat. Ut ac metus vehicula, venenatis ex sed, molestie arcu. Sed congue odio vel libero volutpat condimentum. Aliquam erat volutpat. Mauris viverra mi nibh, a finibus felis tristique non. Ut non interdum dolor.
`;
import * as webViewModule from "tns-core-modules/ui/web-view";

var utilityModule = require("utils/utils");
var fetchModule = require("fetch");

//Twitter Keys and credentials
  var key = "8V6bj0T5YMy9S7HjVYjfxGCrL";
  var secret = "DMPSjrwBeLnxTtaYBXKO0wOQu2YAeAbumcjG1ltNF6tUhrOERR";
  var cat = key +":"+secret;
  var Buffer = require('buffer/').Buffer
  var credentials = new Buffer(cat).toString('base64');
  
  
//Instagram keys and credetnials
var CLIENT_ID_INSTA = "dd21058cba024c5293e762099cf157aa";
var REDIRECT_URL = "https://www.test.com/";
var access_token_insta = "";
var http = require("http");

var myDataArray: any = [
    {title:"Slide 1", color: "#b3cde0", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/01.jpg"},
    {title:"Slide 2", color: "#6497b1", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/02.jpg"},
    {title:"Slide 3", color: "#005b96", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/03.jpg"},
    {title:"Slide 4", color: "#03396c", image:"https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/04.jpg"}
    /*{title:"Slide 5", color: "#011f4b", image: ""}*/
];
var createViewModel = require("./main-view-model").createViewModel;
var frameModule =require("ui/frame");
var items = [];
var bearerToken;
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
var page;

exports.loaded = function(args) {
    page = args.object;
    console.log("loading is called");
    //Twitter Api Integration
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
        fetchModule.fetch("https://api.twitter.com/1.1/search/tweets.json?q=iub&count=10&result_type=mixed", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + bearerToken,
            },
        })
        .then(function(response) {
            console.log("search api success");
            alert(JSON.stringify(response));
            test(args, response._bodyInit);
            
        }, function(error) {
            console.log("search api fail");
            //console.log(JSON.stringify(error));
        });


    }, function(error) {
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
    if(description.length<150){
        console.log("inside this");
        console.log(description.length);
        pageData.set("description", description);
    }
    else{
        console.log("inside this");
        var temp = description.substring(0, 150);
        console.log(temp.length);
        pageData.set("description", temp);
    }
    items=[];
    items.push(
        {
            itemType: "pdf",
            itemName: "Event Flyer",
            itemDesc: "Funeral"
        },
        {
            itemType: "canvas",
            itemName: "Canvas Event",
            itemDesc: "For Emma, Forever Ago"
        },
        {
            itemType: "webpage",
            itemName: "Web Page",
            itemDesc: "Random Access Memories"
        },
        {
            itemType: "map",
            itemName: "Map",
            itemDesc: description
        },
        {
            itemType: "text",
            itemName: "Text",
            itemDesc: description
        }
    )
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
}

exports.onSelectedIndexChange = function(args){
    console.log("tapped");
    let segmetedBar = <SegmentedBar>args.object;
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
}

exports.myChangeEvent = function(args){
        var changeEventText = "Page changed to index: " + args.index;
        console.log(changeEventText);
    }


exports.toggle = function() {
    pageData.set("showDetails", !pageData.get("showDetails"));
}

exports.listViewItemTap = function(args) {
    var itemIndex = args.index;
}

exports.expandText = function(args){
    console.log(args.object);
    var lab = <any>args.object;
    var spanlabel = <any>lab.getViewById("seemorelabel");
    if(spanlabel.text==="...see less"){
        var temp = description.substring(0, 150);
        console.log(temp.length);
        pageData.set("description", temp);
        spanlabel.text="...see more";
    }
    else{
        pageData.set("description", description);
        spanlabel.text="...see less";
    }
    
    //console.log(a);  
}

function test(args, response){
    page = args.object;
    
    console.log(typeof response);
    response = JSON.parse(response);
    var tweets = response["statuses"];
    
    var stk = page.getViewById('tweetsgrid');
    for (var key in tweets){
        
        var card = new CardView();
        card.margin = 10;
        card.marginTop = 10;
        card.radius = 5;
        card.elevation = 40;
        card.className = "cardStyle";
       
        var cardContentGrid = new GridLayout();
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
        GridLayout.setRow(image,0);
        GridLayout.setColumn(image, 0);
        //GridLayout.setRowSpan(image, 2);


        var userNameLabel = new LabelModule.Label();
        userNameLabel.text = tweets[key].user.name;
        userNameLabel.textWrap = true;
        userNameLabel.className = "info";
        userNameLabel.verticalAlignment = "middle";

        cardContentGrid.addChild(userNameLabel);
        GridLayout.setRow(userNameLabel,0);
        //GridLayout.setRowSpan(userNameLabel,2);
        GridLayout.setColumn(userNameLabel, 1);
        
        var tweetContent = new LabelModule.Label();
        tweetContent.text = tweets[key].text;
        //tweetContent.textWrap = true;
        tweetContent.className = "info";
        tweetContent.whiteSpace = "normal";
        //tweetContent.verticalAlignment = "middle";

        cardContentGrid.addChild(tweetContent);
        GridLayout.setRow(tweetContent,1);
        GridLayout.setColumn(tweetContent, 1);
        GridLayout.setColumnSpan(tweetContent,2);

        var likeButton = new LabelModule.Label();
        likeButton.className = "like-icon";
        likeButton.text = "favorite_border";

        cardContentGrid.addChild(likeButton);
        GridLayout.setRow(likeButton,2);
        GridLayout.setColumn(likeButton, 0);
        
        var likeCount = new LabelModule.Label();
        likeCount.text = ""+tweets[key].favorite_count;

        cardContentGrid.addChild(likeCount);
        GridLayout.setRow(likeCount,2);
        GridLayout.setColumn(likeCount, 1);
        
        var timeStampOfPost = new LabelModule.Label();
        timeStampOfPost.text = tweets[key].created_at.split("+")[0];
        timeStampOfPost.textWrap = true;


        cardContentGrid.addChild(timeStampOfPost);
        GridLayout.setRow(timeStampOfPost,2);
        GridLayout.setColumn(timeStampOfPost, 2);
        
        card.content = cardContentGrid;
        console.log(stk);
        stk.addChild(card);
    }


}
exports.onTap = function (args) {
    var index = args.index;
    var item = items[index];
    var navigationOptions;
    if(item.itemType==="pdf"){
        navigationOptions={
            moduleName:'detailed-pdf-list',
            context:{
                param1: "value1",
                param2: "value2"
            }
        }
    }
    else if(item.itemType==="canvas"){
        utilityModule.openUrl("https://iu.instructure.com/courses/1687201/assignments/7915075");
    }
    else if(item.itemType==="text"){
        navigationOptions={
            moduleName:'detailed-text-list',
            context:{
                param1: "value1",
                param2: "value2"
            }
        }
    }
    else if(item.itemType==="webpage"){
        navigationOptions={
            moduleName:'detailed-webpage-list',
            context:{
                param1: "value1",
                param2: "value2"
            }
        }
    }
    else if(item.itemType==="map"){
        navigationOptions={
            moduleName:'detailed-map-list',
            context:{
                param1: "value1",
                param2: "value2"
            }
        }
    }
    if(item.itemType!=="canvas"){
        frameModule.topmost().navigate(navigationOptions);
    }
    console.log('Clicked item with index ' + index);
};



