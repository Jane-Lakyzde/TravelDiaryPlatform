"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const formInline = common_vendor.ref({
      username: "",
      password: "",
      confirmPassword: "",
      role: ""
    });
    const roles = [
      { label: "用户", value: "user" },
      { label: "管理员", value: "admin" }
    ];
    const roleIndex = common_vendor.ref(0);
    const handleRoleChange = (e) => {
      roleIndex.value = e.detail.value;
      formInline.value.role = roles[roleIndex.value].value;
    };
    const handleRegister = async () => {
      if (!formInline.value.role) {
        common_vendor.index.showToast({
          title: "请选择注册身份",
          icon: "none"
        });
        return;
      }
      if (!formInline.value.username) {
        common_vendor.index.showToast({
          title: "请输入用户名",
          icon: "none"
        });
        return;
      }
      if (formInline.value.username.length < 3) {
        common_vendor.index.showToast({
          title: "用户名长度不能小于3个字符",
          icon: "none"
        });
        return;
      }
      if (!formInline.value.password) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      if (formInline.value.password.length < 6) {
        common_vendor.index.showToast({
          title: "密码长度不能小于6个字符",
          icon: "none"
        });
        return;
      }
      if (formInline.value.password !== formInline.value.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return;
      }
      try {
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (err) {
        common_vendor.index.showToast({
          title: err.message || "注册失败",
          icon: "none"
        });
      }
    };
    const goToLogin = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(formInline.value.role ? roles[roleIndex.value].label : "请选择注册身份"),
        b: roleIndex.value,
        c: roles,
        d: common_vendor.o(handleRoleChange),
        e: formInline.value.username,
        f: common_vendor.o(($event) => formInline.value.username = $event.detail.value),
        g: formInline.value.password,
        h: common_vendor.o(($event) => formInline.value.password = $event.detail.value),
        i: formInline.value.confirmPassword,
        j: common_vendor.o(($event) => formInline.value.confirmPassword = $event.detail.value),
        k: common_vendor.o(handleRegister),
        l: common_vendor.o(goToLogin)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/register.js.map
