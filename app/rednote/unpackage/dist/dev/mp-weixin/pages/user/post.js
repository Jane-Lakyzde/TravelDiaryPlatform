"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "post",
  setup(__props) {
    const postContent = common_vendor.ref("");
    const imageList = common_vendor.ref([]);
    const allowComments = common_vendor.ref(true);
    const showLocation = common_vendor.ref(false);
    const canPublish = common_vendor.computed(() => {
      return postContent.value.trim().length > 0 || imageList.value.length > 0;
    });
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 9 - imageList.value.length,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFiles = res.tempFilePaths.map((path) => ({
            url: path
            // 这里可以添加上传逻辑
          }));
          imageList.value.push(...tempFiles);
        }
      });
    };
    const handleImageRemove = (index) => {
      imageList.value.splice(index, 1);
    };
    const handlePublish = () => {
      if (!canPublish.value)
        return;
      common_vendor.index.showLoading({
        title: "发布中..."
      });
      common_vendor.index.__f__("log", "at pages/user/post.vue:120", "发布帖子:", {
        content: postContent.value,
        images: imageList.value,
        allowComments: allowComments.value,
        showLocation: showLocation.value
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 2e3);
      }, 1500);
    };
    const handleCancel = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要放弃编辑吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateBack();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleCancel),
        b: common_vendor.o(handlePublish),
        c: !canPublish.value,
        d: postContent.value,
        e: common_vendor.o(($event) => postContent.value = $event.detail.value),
        f: common_vendor.t(postContent.value.length),
        g: common_vendor.f(imageList.value, (image, index, i0) => {
          return {
            a: image.url,
            b: common_vendor.o(($event) => handleImageRemove(index), index),
            c: index
          };
        }),
        h: imageList.value.length < 9
      }, imageList.value.length < 9 ? {
        i: common_vendor.o(chooseImage)
      } : {}, {
        j: allowComments.value,
        k: common_vendor.o(($event) => allowComments.value = $event.detail.value),
        l: showLocation.value,
        m: common_vendor.o(($event) => showLocation.value = $event.detail.value)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/post.js.map
