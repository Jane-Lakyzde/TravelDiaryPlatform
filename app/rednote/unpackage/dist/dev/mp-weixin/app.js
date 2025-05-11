"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/login/phone.js";
  "./pages/user/home.js";
  "./pages/user/find.js";
  "./pages/user/my.js";
  "./pages/user/post.js";
  "./pages/user/msg.js";
  "./pages/admin/admin.js";
  "./pages/admin/approve.js";
  "./pages/admin/reject.js";
  "./pages/admin/pending.js";
  "./pages/sidebar/discover-friends/index.js";
  "./pages/sidebar/creator-center/index.js";
  "./pages/sidebar/drafts/index.js";
  "./pages/sidebar/comments/index.js";
  "./pages/sidebar/history/index.js";
  "./pages/sidebar/orders/index.js";
  "./pages/sidebar/cart/index.js";
  "./pages/sidebar/wallet/index.js";
  "./pages/sidebar/miniapp/index.js";
  "./pages/sidebar/community-guidelines/index.js";
  "./pages/sidebar/scan/index.js";
  "./pages/sidebar/support/index.js";
  "./pages/sidebar/settings/index.js";
  "./pages/agreement/user-agreement.js";
  "./pages/agreement/privacy-policy.js";
  "./pages/agreement/buyer-notice.js";
}
const pages = [
  "pages/home/index",
  "pages/explore/index",
  "pages/publish/index",
  "pages/message/index",
  "pages/profile/index"
];
const window = {
  backgroundTextStyle: "light",
  navigationBarBackgroundColor: "#fff",
  navigationBarTitleText: "旅行日记",
  navigationBarTextStyle: "black"
};
const tabBar = {
  color: "#999999",
  selectedColor: "#b2e6e0",
  backgroundColor: "#ffffff",
  borderStyle: "black",
  list: [
    {
      pagePath: "pages/home/index",
      text: "首页",
      iconPath: "static/tabbar/normal/home.png",
      selectedIconPath: "static/tabbar/active/home-active.png"
    },
    {
      pagePath: "pages/explore/index",
      text: "发现",
      iconPath: "static/tabbar/normal/explore.png",
      selectedIconPath: "static/tabbar/active/explore-active.png"
    },
    {
      pagePath: "pages/publish/index",
      text: "发布",
      iconPath: "static/tabbar/normal/publish.png",
      selectedIconPath: "static/tabbar/active/publish-active.png"
    },
    {
      pagePath: "pages/message/index",
      text: "消息",
      iconPath: "static/tabbar/normal/message.png",
      selectedIconPath: "static/tabbar/active/message-active.png"
    },
    {
      pagePath: "pages/profile/index",
      text: "我的",
      iconPath: "static/tabbar/normal/profile.png",
      selectedIconPath: "static/tabbar/active/profile-active.png"
    }
  ]
};
const style = "v2";
const sitemapLocation = "sitemap.json";
const App = {
  pages,
  window,
  tabBar,
  style,
  sitemapLocation
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
