"use strict";
const utils_request = require("../utils/request.js");
function login(data) {
  return utils_request.http.post("/api/user/login", data);
}
function phoneLogin(data) {
  return utils_request.http.post("/api/user/phone-login", data);
}
exports.login = login;
exports.phoneLogin = phoneLogin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
