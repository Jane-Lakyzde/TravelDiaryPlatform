"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const store_modules_post = require("../../store/modules/post.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    const postStore = store_modules_post.usePostStore();
    const activeTab = common_vendor.ref("post");
    const userInfo = common_vendor.computed(() => userStore.getUserInfo);
    const myPosts = common_vendor.computed(() => {
      return postStore.posts.filter((post) => post.author.username === userInfo.value.username);
    });
    const handleEditProfile = () => {
      common_vendor.index.showActionSheet({
        itemList: ["编辑个人资料", "修改头像"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              common_vendor.index.navigateTo({ url: "/pages/change/editprofile" });
              break;
            case 1:
              chooseAvatar();
              break;
          }
        }
      });
    };
    const chooseAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          userStore.updateUserInfo({
            ...userInfo.value,
            avatar: tempFilePath
          });
        }
      });
    };
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
    const viewPostDetail = (postId) => {
      common_vendor.index.navigateTo({
        url: `/pages/post/detail?id=${postId}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(userInfo.value.email),
        b: common_vendor.o(handleLogout),
        c: userInfo.value.avatar || "/static/images/touxiang.jpg",
        d: common_vendor.o(chooseAvatar),
        e: common_vendor.t(userInfo.value.posts || 0),
        f: common_vendor.t(userInfo.value.followers || 0),
        g: common_vendor.t(userInfo.value.following || 0),
        h: common_vendor.t(userInfo.value.username),
        i: common_vendor.t(userInfo.value.bio || "这个人很懒，什么都没写~"),
        j: common_vendor.o(handleEditProfile),
        k: common_vendor.o(() => _ctx.uni.navigateTo({
          url: "/pages/user/post"
        })),
        l: activeTab.value === "post" ? 1 : "",
        m: common_vendor.o(($event) => activeTab.value = "post"),
        n: activeTab.value === "video" ? 1 : "",
        o: common_vendor.o(($event) => activeTab.value = "video"),
        p: activeTab.value === "post"
      }, activeTab.value === "post" ? {
        q: common_vendor.f(myPosts.value, (post, k0, i0) => {
          return {
            a: post.id,
            b: post.images[0],
            c: common_vendor.o(($event) => viewPostDetail(post.id), post.id)
          };
        })
      } : {
        r: common_vendor.f(_ctx.myVideos, (video, k0, i0) => {
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
