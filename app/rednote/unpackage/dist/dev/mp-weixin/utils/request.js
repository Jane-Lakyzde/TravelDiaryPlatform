"use strict";
const common_vendor = require("../common/vendor.js");
const utils_mock = require("./mock.js");
const http = {
  request(options = {}) {
    const url = options.url;
    {
      common_vendor.index.__f__("log", "at utils/request.js:19", "使用模拟数据", url, options.data);
      return utils_mock.mockRequest(url, options.data);
    }
  },
  // GET请求
  get(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: "GET",
      ...options
    });
  },
  // POST请求
  post(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: "POST",
      ...options
    });
  },
  // PUT请求
  put(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: "PUT",
      ...options
    });
  },
  // DELETE请求
  delete(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: "DELETE",
      ...options
    });
  }
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
