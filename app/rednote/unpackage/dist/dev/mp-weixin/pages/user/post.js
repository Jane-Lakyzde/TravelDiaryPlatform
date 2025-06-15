"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const store_modules_post = require("../../store/modules/post.js");
const _sfc_main = {
  __name: "post",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    const postStore = store_modules_post.usePostStore();
    const imageList = common_vendor.ref([]);
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const location = common_vendor.ref("");
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 9 - imageList.value.length,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFiles = res.tempFilePaths.map((path) => ({ url: path }));
          imageList.value.push(...tempFiles);
        }
      });
    };
    const chooseLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        success: () => {
          common_vendor.index.chooseLocation({
            success: (res) => {
              location.value = res.name;
            }
          });
        }
      });
    };
    const saveDraft = () => {
      common_vendor.index.showToast({ title: "已存为草稿", icon: "none" });
    };
    const previewPost = () => {
      common_vendor.index.showToast({ title: "预览功能开发中", icon: "none" });
    };
    const handlePublish = async () => {
      try {
        if (!title.value.trim()) {
          common_vendor.index.showToast({ title: "请输入标题", icon: "none" });
          return;
        }
        if (!content.value.trim()) {
          common_vendor.index.showToast({ title: "请输入正文", icon: "none" });
          return;
        }
        if (imageList.value.length === 0) {
          common_vendor.index.showToast({ title: "请至少上传一张图片", icon: "none" });
          return;
        }
        const newPost = {
          id: Date.now().toString(),
          title: title.value,
          content: content.value,
          images: imageList.value.map((image) => image.url),
          location: location.value,
          author: {
            username: userStore.getUserInfo.username,
            avatar: userStore.getUserInfo.avatar
          },
          createTime: (/* @__PURE__ */ new Date()).toLocaleString(),
          likes: 0,
          isLiked: false
        };
        postStore.addPost(newPost);
        const currentPosts = userStore.getUserInfo.posts || 0;
        userStore.updatePostsCount(currentPosts + 1);
        title.value = "";
        content.value = "";
        imageList.value = [];
        location.value = "";
        common_vendor.index.showToast({ title: "发布成功", icon: "success" });
        common_vendor.index.switchTab({ url: "/pages/user/my" });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/post.vue:157", "发布失败:", error);
        common_vendor.index.showToast({ title: "发布失败，请重试", icon: "none" });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(imageList.value, (image, index, i0) => {
          return {
            a: image.url,
            b: index
          };
        }),
        b: imageList.value.length < 9
      }, imageList.value.length < 9 ? {
        c: common_vendor.o(chooseImage)
      } : {}, {
        d: title.value,
        e: common_vendor.o(($event) => title.value = $event.detail.value),
        f: content.value,
        g: common_vendor.o(($event) => content.value = $event.detail.value),
        h: common_vendor.t(location.value || ""),
        i: common_vendor.o(chooseLocation),
        j: common_vendor.o(saveDraft),
        k: common_vendor.o(previewPost),
        l: common_vendor.o(handlePublish)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/post.js.map
