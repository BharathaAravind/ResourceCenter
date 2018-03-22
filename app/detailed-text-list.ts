var frameModule =require("ui/frame");

exports.onNavigatingToText = function(args) {
    var page = args.object;
    
    var gotData=page.navigationContext;
    console.log(gotData.param1);
    console.log(gotData.param2);

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
