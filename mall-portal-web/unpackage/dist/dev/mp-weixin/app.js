"use strict";
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/addres/addres.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const store2 = common_vendor.useStore();
    const onLaunch = () => {
      let userInfo = common_vendor.index.getStorageSync("userInfo") || "";
      if (userInfo.id) {
        common_vendor.index.getStorage({
          key: "userInfo",
          success: (res) => {
            store2.commit("login", res.data);
          }
        });
      }
    };
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:33", "App Show");
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:38", "App Hide");
    });
    onLaunch();
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const store = common_vendor.createStore({
  state: {
    hasLogin: false,
    userInfo: {}
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      common_vendor.index.setStorage({
        //缓存用户登陆状态
        key: "userInfo",
        data: provider
      });
      common_vendor.index.__f__("log", "at store/index.js:24", state.userInfo);
    },
    logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      common_vendor.index.removeStorage({
        key: "userInfo"
      });
      common_vendor.index.removeStorage({
        key: "token"
      });
    }
  },
  actions: {}
});
const msg = (title, duration = 1500, mask = false, icon = "none") => {
  if (Boolean(title) === false) {
    return;
  }
  common_vendor.index.showToast({
    title,
    duration,
    mask,
    icon
  });
};
const prePage = () => {
  let pages = getCurrentPages();
  let prePage2 = pages[pages.length - 2];
  return prePage2.$vm;
};
const app = common_vendor.createApp(_sfc_main);
app.provide("$fire", new class extends Object {
}());
app.provide("$store", store);
app.provide("$api", { msg, prePage });
app.mount("#app");
app.use(store);
module.exports = app;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
