import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
var view = require("ui/core/view");
var observable = require("data/observable");
var pageData = new observable.Observable();
var description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel interdum turpis. Proin non orci mi. Etiam lobortis quam risus, nec pellentesque est luctus quis. Nullam dolor neque, sodales vel metus eget, viverra elementum enim. Fusce a nisl iaculis, finibus enim ac, tempor nibh. In hac habitasse platea dictumst. Etiam faucibus, nisl ac molestie varius, nisl odio euismod turpis, in gravida justo arcu id lorem. Suspendisse et hendrerit tellus. Aenean pulvinar purus diam, ut luctus diam imperdiet et.

Ut interdum pretium orci, non cursus ante ullamcorper aliquam. In lacinia, dui ut finibus mollis, libero ipsum viverra mauris, ac tincidunt ante dolor id est. Fusce dapibus lacus viverra vestibulum feugiat. Ut ac metus vehicula, venenatis ex sed, molestie arcu. Sed congue odio vel libero volutpat condimentum. Aliquam erat volutpat. Mauris viverra mi nibh, a finibus felis tristique non. Ut non interdum dolor.
`;
var utilityModule = require("utils/utils");

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
    
function onNavigatingTo(args) {
    console.log("hi");
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

exports.loaded = function(args) {
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



