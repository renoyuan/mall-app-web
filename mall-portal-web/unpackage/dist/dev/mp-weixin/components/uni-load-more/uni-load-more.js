"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "uni-load-more",
  props: {
    status: {
      //上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
      type: String,
      default: "more"
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#777777"
    },
    contentText: {
      type: Object,
      default() {
        return {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了"
        };
      }
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.color,
    b: $props.color,
    c: $props.color,
    d: $props.color,
    e: $props.color,
    f: $props.color,
    g: $props.color,
    h: $props.color,
    i: $props.color,
    j: $props.color,
    k: $props.color,
    l: $props.color,
    m: $props.status === "loading" && $props.showIcon,
    n: common_vendor.t($props.status === "more" ? $props.contentText.contentdown : $props.status === "loading" ? $props.contentText.contentrefresh : $props.contentText.contentnomore),
    o: $props.color
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-load-more/uni-load-more.js.map
