"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    const activeTab = common_vendor.ref("post");
    const userInfo = common_vendor.computed(() => userStore.getUserInfo);
    const recommendedUsers = common_vendor.ref([
      { id: 1, avatar: "https://placeholder.com/80x80", username: "xiaox.iao04", desc: "已关注 kelsey041121" },
      { id: 2, avatar: "https://placeholder.com/80x80", username: "Luna", desc: "为你推荐" },
      { id: 3, avatar: "https://placeholder.com/80x80", username: "Cat", desc: "粉丝推荐" }
    ]);
    const myPosts = common_vendor.ref([
      { id: 1, images: ["https://placeholder.com/300x300"] },
      { id: 2, images: ["https://placeholder.com/300x300"] },
      { id: 3, images: ["https://placeholder.com/300x300"] }
    ]);
    const myVideos = common_vendor.ref([
      { id: 1, cover: "https://placeholder.com/300x300" },
      { id: 2, cover: "https://placeholder.com/300x300" }
    ]);
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            userStore.logout();
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(userInfo.value.email),
        b: common_vendor.o(handleLogout),
        c: userInfo.value.avatar,
        d: common_vendor.t(userInfo.value.posts),
        e: common_vendor.t(userInfo.value.followers),
        f: common_vendor.t(userInfo.value.following),
        g: common_vendor.t(userInfo.value.username),
        h: common_vendor.t(userInfo.value.bio),
        i: common_vendor.f(recommendedUsers.value, (user, k0, i0) => {
          return {
            a: user.avatar,
            b: common_vendor.t(user.username),
            c: common_vendor.t(user.desc),
            d: user.id
          };
        }),
        j: activeTab.value === "post" ? 1 : "",
        k: common_vendor.o(($event) => activeTab.value = "post"),
        l: activeTab.value === "video" ? 1 : "",
        m: common_vendor.o(($event) => activeTab.value = "video"),
        n: activeTab.value === "post"
      }, activeTab.value === "post" ? {
        o: common_vendor.f(myPosts.value, (img, k0, i0) => {
          return {
            a: img.id,
            b: img.images[0]
          };
        })
      } : {
        p: common_vendor.f(myVideos.value, (video, k0, i0) => {
          return {
            a: video.cover,
            b: video.id
          };
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/my.js.map
