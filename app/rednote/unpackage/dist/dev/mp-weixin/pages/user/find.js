"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "find",
  setup(__props) {
    const recommendedUsers = common_vendor.ref([
      {
        id: "user001",
        username: "摄影爱好者",
        avatar: "https://placeholder.com/60x60",
        bio: "热爱摄影，分享生活中的美好瞬间",
        posts: 128,
        followers: 1024,
        following: 256,
        isFollowing: false
      },
      {
        id: "user002",
        username: "美食达人",
        avatar: "https://placeholder.com/60x60",
        bio: "美食探店，分享美味",
        posts: 256,
        followers: 2048,
        following: 512,
        isFollowing: false
      },
      {
        id: "user003",
        username: "旅行日记",
        avatar: "https://placeholder.com/60x60",
        bio: "记录每一次旅行的美好",
        posts: 64,
        followers: 512,
        following: 128,
        isFollowing: false
      },
      {
        id: "user004",
        username: "健身教练",
        avatar: "https://placeholder.com/60x60",
        bio: "分享健身知识和经验",
        posts: 96,
        followers: 768,
        following: 192,
        isFollowing: false
      },
      {
        id: "user005",
        username: "读书笔记",
        avatar: "https://placeholder.com/60x60",
        bio: "分享读书心得和推荐",
        posts: 48,
        followers: 384,
        following: 96,
        isFollowing: false
      }
    ]);
    const handleFollow = (user) => {
      user.isFollowing = !user.isFollowing;
      common_vendor.index.showToast({
        title: user.isFollowing ? "关注成功" : "已取消关注",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(recommendedUsers.value, (user, k0, i0) => {
          return {
            a: user.avatar,
            b: common_vendor.t(user.username),
            c: common_vendor.t(user.id),
            d: common_vendor.t(user.bio),
            e: common_vendor.t(user.posts),
            f: common_vendor.t(user.followers),
            g: common_vendor.t(user.following),
            h: common_vendor.t(user.isFollowing ? "已关注" : "关注"),
            i: common_vendor.n(user.isFollowing ? "following" : ""),
            j: common_vendor.o(($event) => handleFollow(user), user.id),
            k: user.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/find.js.map
