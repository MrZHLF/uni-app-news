if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../components/navbar/navbar');
require('../../components/uni-icons/uni-icons');
require('../../components/tab/tab');
require('../../components/list-scroll/list-scroll');
require('../../components/likes/likes');
require('../../components/list-card/list-card');
require('../../components/uni-load-more/uni-load-more');
require('../../components/list/list-item');
require('../../components/list/list');
require('../../components/list-author/list-author');
require('../../components/comments-box/comments-box');
require('../../components/uni-transition/uni-transition');
require('../../components/uni-popup/uni-popup');
require('../../components/gaoyia-parse/components/wxParseImg');
require('../../components/gaoyia-parse/components/wxParseVideo');
require('../../components/gaoyia-parse/components/wxParseAudio');
require('../../components/gaoyia-parse/components/wxParseTable');
require('../../components/gaoyia-parse/components/wxParseTemplate11');
require('../../components/gaoyia-parse/components/wxParseTemplate10');
require('../../components/gaoyia-parse/components/wxParseTemplate9');
require('../../components/gaoyia-parse/components/wxParseTemplate8');
require('../../components/gaoyia-parse/components/wxParseTemplate7');
require('../../components/gaoyia-parse/components/wxParseTemplate6');
require('../../components/gaoyia-parse/components/wxParseTemplate5');
require('../../components/gaoyia-parse/components/wxParseTemplate4');
require('../../components/gaoyia-parse/components/wxParseTemplate3');
require('../../components/gaoyia-parse/components/wxParseTemplate2');
require('../../components/gaoyia-parse/components/wxParseTemplate1');
require('../../components/gaoyia-parse/components/wxParseTemplate0');
require('../../components/gaoyia-parse/parse');
require('../../pages/tabbar/index/index');
require('../../pages/tabbar/follow/follow');
require('../../pages/tabbar/my/my');
require('../../components/navbar/navbar');
require('../../pages/home-search/home-search');
require('../../pages/home-label/home-label');
require('../../pages/home-detail/home-detail');
require('../../pages/detail-comments/detail-comments');
require('../../pages/my-article/my-article');
require('../../pages/feeback/feeback');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}