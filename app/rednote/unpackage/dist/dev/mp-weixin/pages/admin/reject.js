"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_el_page_header = common_vendor.resolveComponent("el-page-header");
  const _component_el_empty = common_vendor.resolveComponent("el-empty");
  (_component_el_page_header + _component_el_empty)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      content: "未通过笔记"
    }),
    b: common_vendor.p({
      description: "暂无审核失败内容"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/admin/reject.js.map
