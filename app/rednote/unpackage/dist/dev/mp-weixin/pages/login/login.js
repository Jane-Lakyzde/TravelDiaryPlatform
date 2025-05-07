"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
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
    const goPhoneLogin = () => {
      common_vendor.index.navigateTo({ url: "/pages/login/phone" });
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
      loginLoading.value = true;
      common_vendor.index.login({
        provider: "weixin",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/login/login.vue:112", "微信登录成功，获取code：", res.code);
          api_user.login({
            code: res.code,
            loginType: "wechat"
          }).then((response) => {
            common_vendor.index.__f__("log", "at pages/login/login.vue:118", "登录成功", response);
            if (response.data && response.data.token) {
              common_vendor.index.setStorageSync("token", response.data.token);
              common_vendor.index.setStorageSync("userInfo", response.data.userInfo);
              common_vendor.index.switchTab({
                url: "/pages/user/home"
              });
            }
          }).catch((error) => {
            common_vendor.index.__f__("error", "at pages/login/login.vue:130", "登录失败", error);
            common_vendor.index.showToast({
              title: "登录失败，请重试",
              icon: "none"
            });
          }).finally(() => {
            loginLoading.value = false;
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/login/login.vue:140", "微信登录失败", err);
          common_vendor.index.showToast({
            title: "微信登录失败，请重试",
            icon: "none"
          });
          loginLoading.value = false;
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
