"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "phone",
  setup(__props) {
    const showHelp = common_vendor.ref(false);
    const checked = common_vendor.ref(false);
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    const areaCodes = common_vendor.ref(["+86", "+852", "+853", "+886"]);
    const areaIndex = common_vendor.ref(0);
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const toggleHelp = () => {
      showHelp.value = !showHelp.value;
    };
    const onAreaChange = (e) => {
      areaIndex.value = e.detail.value;
    };
    const goPwdLogin = () => {
      common_vendor.index.showToast({ title: "请用手机号+密码登录", icon: "none" });
    };
    const canSubmit = common_vendor.computed(() => {
      return phone.value.length === 11 && password.value.length >= 6 && checked.value;
    });
    const onConfirm = () => {
      if (phone.value.length !== 11) {
        common_vendor.index.showToast({ title: "请输入11位手机号", icon: "none" });
        return;
      }
      if (password.value.length < 6) {
        common_vendor.index.showToast({ title: "密码长度至少6位", icon: "none" });
        return;
      }
      if (!checked.value) {
        common_vendor.index.showToast({ title: "请勾选协议", icon: "none" });
        return;
      }
      common_vendor.index.reLaunch({ url: "/pages/user/home" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.o(toggleHelp),
        c: showHelp.value
      }, showHelp.value ? {
        d: common_vendor.o(() => {
        })
      } : {}, {
        e: common_vendor.t(areaCodes.value[areaIndex.value]),
        f: areaCodes.value,
        g: areaIndex.value,
        h: common_vendor.o(onAreaChange),
        i: phone.value,
        j: common_vendor.o(($event) => phone.value = $event.detail.value),
        k: password.value,
        l: common_vendor.o(($event) => password.value = $event.detail.value),
        m: !canSubmit.value,
        n: common_vendor.o(onConfirm),
        o: common_vendor.o(goPwdLogin),
        p: checked.value
      }, checked.value ? {} : {}, {
        q: checked.value ? 1 : "",
        r: common_vendor.o(($event) => checked.value = !checked.value)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/phone.js.map
