
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/more/index","pages/list/index","pages/weather/index","pages/news/index","pages/news/zhihu","pages/news/bilibili","pages/webview/webview"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","navigationStyle":"custom"},"tabBar":{"color":"#bfbfbf","selectedColor":"#1296db","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/home/index","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home2.png","text":"首页"},{"pagePath":"pages/list/index","iconPath":"static/tabbar/all.png","selectedIconPath":"static/tabbar/all2.png","text":"大厅"},{"pagePath":"pages/more/index","iconPath":"static/tabbar/set.png","selectedIconPath":"static/tabbar/set2.png","text":"更多"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"HolleBug-Tool","compilerVersion":"2.6.16","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/more/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/list/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/weather/index","meta":{},"window":{}},{"path":"/pages/news/index","meta":{},"window":{}},{"path":"/pages/news/zhihu","meta":{},"window":{}},{"path":"/pages/news/bilibili","meta":{},"window":{}},{"path":"/pages/webview/webview","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
