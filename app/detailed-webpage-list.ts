var frameModule =require("ui/frame");
var utilityModule = require("utils/utils");

exports.onNavigatingToWeb = function(args) {
    var page = args.object;
    
    var gotData=page.navigationContext;
    console.log(gotData.param1);
    console.log(gotData.param2);

}
exports.onOpenWithBrowserClick = function(){
    utilityModule.openUrl("https://www.facebook.com/events/169716073757640/");
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
