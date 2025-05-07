"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const showHelp = common_vendor.ref(false);
    const showOtherMenu = common_vendor.ref(false);
    const checked = common_vendor.ref(false);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(toggleHelp),
        b: showHelp.value
      }, showHelp.value ? {
        c: common_vendor.o(() => {
        })
      } : {}, {
        d: common_vendor.o(goPhoneLogin),
        e: common_vendor.o(toggleOtherMenu),
        f: common_vendor.o(toggleOtherMenu),
        g: common_vendor.o(toggleOtherMenu),
        h: showOtherMenu.value
      }, showOtherMenu.value ? {
        i: common_vendor.o(() => {
        })
      } : {}, {
        j: checked.value
      }, checked.value ? {} : {}, {
        k: checked.value ? 1 : "",
        l: common_vendor.o(($event) => checked.value = !checked.value)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
