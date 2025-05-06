"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const activeTab = common_vendor.ref("post");
    const userInfo = common_vendor.ref({
      username: "nora.1212clark",
      nickname: "nora",
      avatar: "https://placeholder.com/120x120",
      bio: "u deserve better",
      posts: 1,
      followers: 0,
      following: 4
    });
    const recommendedUsers = common_vendor.ref([
      { id: 1, avatar: "https://placeholder.com/80x80", username: "xiaox.iao04", desc: "已关注 kelsey041121" },
      { id: 2, avatar: "https://placeholder.com/80x80", username: "Luna", desc: "为你推荐" },
      { id: 3, avatar: "https://placeholder.com/80x80", username: "Cat", desc: "粉丝推荐" }
    ]);
    const myPosts = common_vendor.ref([
      { id: 1, images: ["https://placeholder.com/300x300"] },
      { id: 2, images: ["https://placeholder.com/300x300"] },
      { id: 3, images: ["https://placeholder.com/300x300"] }
      // ...更多图片
    ]);
    const myVideos = common_vendor.ref([
      { id: 1, cover: "https://placeholder.com/300x300" },
      { id: 2, cover: "https://placeholder.com/300x300" }
      // ...更多视频
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(userInfo.value.username),
        b: userInfo.value.avatar,
        c: common_vendor.t(userInfo.value.posts),
        d: common_vendor.t(userInfo.value.followers),
        e: common_vendor.t(userInfo.value.following),
        f: common_vendor.t(userInfo.value.nickname),
        g: common_vendor.t(userInfo.value.bio),
        h: common_vendor.f(recommendedUsers.value, (user, k0, i0) => {
          return {
            a: user.avatar,
            b: common_vendor.t(user.username),
            c: common_vendor.t(user.desc),
            d: user.id
          };
        }),
        i: activeTab.value === "post" ? 1 : "",
        j: common_vendor.o(($event) => activeTab.value = "post"),
        k: activeTab.value === "video" ? 1 : "",
        l: common_vendor.o(($event) => activeTab.value = "video"),
        m: activeTab.value === "post"
      }, activeTab.value === "post" ? {
        n: common_vendor.f(myPosts.value, (img, k0, i0) => {
          return {
            a: img.id,
            b: img.images[0]
          };
        })
      } : {
        o: common_vendor.f(myVideos.value, (video, k0, i0) => {
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
