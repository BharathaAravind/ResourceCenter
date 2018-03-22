var frameModule =require("ui/frame");
var observable = require("data/observable");
var pageData = new observable.Observable();

exports.onNavigatingToPdf = function(args) {
    var page = args.object;
    pageData.set("pdfUrl", "http://www.pdf995.com/samples/pdf.pdf");    
    var gotData=page.navigationContext;
    console.log(gotData.param1);
    console.log(gotData.param2);

    args.object.bindingContext = pageData;

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


exports.onLoad = function(){
    console.log("pdf loaded");
}