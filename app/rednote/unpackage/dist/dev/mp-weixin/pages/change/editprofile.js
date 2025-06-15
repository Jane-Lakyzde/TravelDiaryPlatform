"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const _sfc_main = {
  __name: "editprofile",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    const form = common_vendor.ref({
      username: "",
      bio: "",
      email: ""
    });
    common_vendor.onMounted(() => {
      const userInfo = userStore.getUserInfo();
      form.value = {
        username: userInfo.username || "",
        bio: userInfo.bio || "",
        email: userInfo.email || ""
      };
    });
    const handleSave = () => {
      if (!form.value.username.trim()) {
        common_vendor.index.showToast({ title: "请输入用户名", icon: "none" });
        return;
      }
      userStore.updateUserInfo({
        ...userStore.getUserInfo(),
        username: form.value.username,
        bio: form.value.bio,
        email: form.value.email
      });
      common_vendor.index.showToast({ title: "保存成功", icon: "success" });
      common_vendor.index.__f__("log", "at pages/change/editprofile.vue:60", userStore.getUserInfo());
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 100);
    };
    const handleCancel = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: form.value.username,
        b: common_vendor.o(($event) => form.value.username = $event.detail.value),
        c: form.value.bio,
        d: common_vendor.o(($event) => form.value.bio = $event.detail.value),
        e: common_vendor.t(form.value.bio.length),
        f: form.value.email,
        g: common_vendor.o(($event) => form.value.email = $event.detail.value),
        h: common_vendor.o(handleSave),
        i: common_vendor.o(handleCancel)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/change/editprofile.js.map
