"use strict";
const common_vendor = require("../common/vendor.js");
const js_sdk_luchRequest_request = require("../js_sdk/luch-request/request.js");
const utils_appConfig = require("./appConfig.js");
const http = new js_sdk_luchRequest_request.Request();
http.setConfig((config) => {
  config.baseUrl = utils_appConfig.API_BASE_URL;
  config.header = {
    ...config.header
  };
  return config;
});
http.validateStatus = (statusCode) => {
  return statusCode === 200;
};
http.interceptor.request((config, cancel) => {
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    config.header = {
      "Authorization": token,
      ...config.header
    };
  } else {
    config.header = {
      ...config.header
    };
  }
  return config;
});
http.interceptor.response((response) => {
  const res = response.data;
  if (res.code !== 200) {
    common_vendor.index.showToast({
      title: res.message,
      duration: 1500
    });
    if (res.code === 401) {
      common_vendor.index.showModal({
        title: "提示",
        content: "你已被登出，可以取消继续留在该页面，或者重新登录",
        confirmText: "重新登录",
        cancelText: "取消",
        success: function(res2) {
          if (res2.confirm) {
            common_vendor.index.navigateTo({
              url: "/pages/public/login"
            });
          } else if (res2.cancel) {
            common_vendor.index.__f__("log", "at utils/requestUtil.js:64", "用户点击取消");
          }
        }
      });
    }
    return Promise.reject(response);
  } else {
    return response.data;
  }
}, (response) => {
  common_vendor.index.__f__("log", "at utils/requestUtil.js:75", "response error", response);
  common_vendor.index.showToast({
    title: response.errMsg,
    duration: 1500
  });
  return Promise.reject(response);
});
function request(options = {}) {
  return http.request(options);
}
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/requestUtil.js.map
