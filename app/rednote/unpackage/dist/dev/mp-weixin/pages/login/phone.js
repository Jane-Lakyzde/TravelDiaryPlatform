"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const _sfc_main = {
  __name: "phone",
  setup(__props) {
    const showHelp = common_vendor.ref(false);
    const checked = common_vendor.ref(false);
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    const areaCodes = common_vendor.ref(["+86", "+852", "+853", "+886"]);
    const areaIndex = common_vendor.ref(0);
    const showPassword = common_vendor.ref(false);
    common_vendor.ref(false);
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
    const onConfirm = async () => {
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
      if (!canSubmit.value)
        return;
      try {
        const res = await api_user.phoneLogin({
          phone: phone.value,
          password: password.value
        });
        common_vendor.index.setStorageSync("token", res.token);
        common_vendor.index.showToast({ title: "登录成功", icon: "success" });
        common_vendor.index.reLaunch({ url: "/pages/user/home" });
      } catch (err) {
        common_vendor.index.showToast({ title: err.message || "登录失败", icon: "none" });
        common_vendor.index.__f__("error", "at pages/login/phone.vue:96", "登录错误：", err);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(toggleHelp),
        b: showHelp.value
      }, showHelp.value ? {
        c: common_vendor.o(() => {
        })
      } : {}, {
        d: common_vendor.t(areaCodes.value[areaIndex.value]),
        e: areaCodes.value,
        f: areaIndex.value,
        g: common_vendor.o(onAreaChange),
        h: phone.value,
        i: common_vendor.o(($event) => phone.value = $event.detail.value),
        j: showPassword.value ? "text" : "password",
        k: password.value,
        l: common_vendor.o(($event) => password.value = $event.detail.value),
        m: common_vendor.n(showPassword.value ? "icon-eye-open" : "icon-eye-close"),
        n: common_vendor.o(($event) => showPassword.value = !showPassword.value),
        o: !canSubmit.value,
        p: common_vendor.o(onConfirm),
        q: common_vendor.o(goPwdLogin),
        r: checked.value
      }, checked.value ? {} : {}, {
        s: checked.value ? 1 : "",
        t: common_vendor.o(($event) => checked.value = !checked.value)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/phone.js.map
