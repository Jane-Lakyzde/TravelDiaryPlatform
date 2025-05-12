"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_modules_user = require("../../store/modules/user.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    const showHelp = common_vendor.ref(false);
    const showOtherMenu = common_vendor.ref(false);
    const checked = common_vendor.ref(false);
    const loginLoading = common_vendor.ref(false);
    const toggleHelp = () => {
      showHelp.value = !showHelp.value;
      showOtherMenu.value = false;
    };
    const toggleOtherMenu = () => {
      showOtherMenu.value = !showOtherMenu.value;
      showHelp.value = false;
    };
    const goPhoneLogin = async () => {
      if (!checked.value) {
        common_vendor.index.showToast({
          title: "请先阅读并同意相关协议",
          icon: "none"
        });
        return;
      }
      try {
        await common_vendor.index.navigateTo({ url: "/pages/login/phone" });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:94", "Navigation failed:", error);
        common_vendor.index.showToast({
          title: "导航失败，请重试",
          icon: "none"
        });
      }
    };
    const goToAgreement = (type) => {
      common_vendor.index.navigateTo({
        url: `/pages/agreement/${type}`
      });
    };
    const wxLogin = () => {
      if (!checked.value) {
        common_vendor.index.showToast({
          title: "请先阅读并同意相关协议",
          icon: "none"
        });
        return;
      }
      common_vendor.index.getUserProfile({
        desc: "用于完善用户资料",
        lang: "zh_CN",
        success: async (userInfoRes) => {
          loginLoading.value = true;
          try {
            const loginRes = await common_vendor.index.login({ provider: "weixin" });
            await userStore.wxLogin({
              code: loginRes.code,
              userInfo: userInfoRes.userInfo,
              loginType: "wechat",
              encryptedData: userInfoRes.encryptedData,
              iv: userInfoRes.iv
            });
            common_vendor.index.switchTab({
              url: "/pages/user/home"
            });
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
          } catch (error) {
            common_vendor.index.__f__("error", "at pages/login/login.vue:149", "登录失败", error);
            common_vendor.index.showToast({
              title: error.message || "登录失败，请重试",
              icon: "none"
            });
          } finally {
            loginLoading.value = false;
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/login/login.vue:159", "getUserProfile 授权失败：", err);
          common_vendor.index.showToast({
            title: "用户拒绝授权",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(toggleHelp),
        b: showHelp.value
      }, showHelp.value ? {
        c: common_vendor.o(() => {
        })
      } : {}, {
        d: common_assets._imports_0,
        e: common_vendor.o(wxLogin),
        f: common_vendor.o(goPhoneLogin),
        g: common_vendor.o(toggleOtherMenu),
        h: common_vendor.o(toggleOtherMenu),
        i: common_vendor.o(toggleOtherMenu),
        j: showOtherMenu.value
      }, showOtherMenu.value ? {
        k: common_vendor.o(() => {
        })
      } : {}, {
        l: checked.value
      }, checked.value ? {} : {}, {
        m: checked.value ? 1 : "",
        n: common_vendor.o(($event) => checked.value = !checked.value),
        o: common_vendor.o(($event) => goToAgreement("user-agreement")),
        p: common_vendor.o(($event) => goToAgreement("privacy-policy")),
        q: common_vendor.o(($event) => goToAgreement("buyer-notice"))
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
