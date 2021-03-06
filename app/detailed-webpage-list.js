var frameModule = require("ui/frame");
var utilityModule = require("utils/utils");
exports.onNavigatingToWeb = function (args) {
    var page = args.object;
    var gotData = page.navigationContext;
    console.log(gotData.param1);
    console.log(gotData.param2);
};
exports.onOpenWithBrowserClick = function () {
    utilityModule.openUrl("https://www.facebook.com/events/169716073757640/");
};
exports.onNavBtnTap = function () {
    // This code will be called only in Android.
    console.log("Navigation button tapped!");
    var navigationOptions = {
        moduleName: 'main-page',
        clearHistory: true,
    };
    frameModule.topmost().navigate(navigationOptions);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQtd2VicGFnZS1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsZWQtd2VicGFnZS1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksV0FBVyxHQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyQyxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFM0MsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFVBQVMsSUFBSTtJQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRXZCLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoQyxDQUFDLENBQUE7QUFDRCxPQUFPLENBQUMsc0JBQXNCLEdBQUc7SUFDN0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0FBQzlFLENBQUMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxXQUFXLEdBQUc7SUFDbEIsNENBQTRDO0lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN6QyxJQUFJLGlCQUFpQixHQUFDO1FBQ2xCLFVBQVUsRUFBQyxXQUFXO1FBQ3RCLFlBQVksRUFBRSxJQUFJO0tBQ3JCLENBQUE7SUFFRCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGZyYW1lTW9kdWxlID1yZXF1aXJlKFwidWkvZnJhbWVcIik7XHJcbnZhciB1dGlsaXR5TW9kdWxlID0gcmVxdWlyZShcInV0aWxzL3V0aWxzXCIpO1xyXG5cclxuZXhwb3J0cy5vbk5hdmlnYXRpbmdUb1dlYiA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgIHZhciBwYWdlID0gYXJncy5vYmplY3Q7XHJcbiAgICBcclxuICAgIHZhciBnb3REYXRhPXBhZ2UubmF2aWdhdGlvbkNvbnRleHQ7XHJcbiAgICBjb25zb2xlLmxvZyhnb3REYXRhLnBhcmFtMSk7XHJcbiAgICBjb25zb2xlLmxvZyhnb3REYXRhLnBhcmFtMik7XHJcblxyXG59XHJcbmV4cG9ydHMub25PcGVuV2l0aEJyb3dzZXJDbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB1dGlsaXR5TW9kdWxlLm9wZW5VcmwoXCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vZXZlbnRzLzE2OTcxNjA3Mzc1NzY0MC9cIik7XHJcbn1cclxuXHJcbmV4cG9ydHMub25OYXZCdG5UYXAgPSBmdW5jdGlvbigpe1xyXG4gICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIHZhciBuYXZpZ2F0aW9uT3B0aW9ucz17XHJcbiAgICAgICAgbW9kdWxlTmFtZTonbWFpbi1wYWdlJyxcclxuICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZShuYXZpZ2F0aW9uT3B0aW9ucyk7XHJcbn1cclxuIl19