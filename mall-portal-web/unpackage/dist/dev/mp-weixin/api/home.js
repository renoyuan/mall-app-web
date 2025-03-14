"use strict";
const utils_requestUtil = require("../utils/requestUtil.js");
function fetchContent() {
  return utils_requestUtil.request({
    method: "GET",
    url: "/home/content"
  });
}
function fetchRecommendProductList(params) {
  return utils_requestUtil.request({
    method: "GET",
    url: "/home/recommendProductList",
    params
  });
}
exports.fetchContent = fetchContent;
exports.fetchRecommendProductList = fetchRecommendProductList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/home.js.map
