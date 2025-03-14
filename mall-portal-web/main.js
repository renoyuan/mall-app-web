import { createApp } from 'vue';
import App from './App.vue';


const msg = (title, duration = 1500, mask = false, icon = 'none') => {
    // 统一提示方便全局修改
    if (Boolean(title) === false) {
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}

const prePage = () => {
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    // #ifdef H5
    return prePage;
    // #endif
    return prePage.$vm;
}

// 以下是 Vue 2 的代码，在 Vue 3 中需要修改
// Vue.config.productionTip = false
// Vue.prototype.$fire = new Vue();
// Vue.prototype.$store = store;
// Vue.prototype.$api = { msg, prePage };

// 移除 App.mpType = 'app' 这一行

const app = createApp(App);

// 在 Vue 3 中使用 provide 注入全局变量
app.provide('$fire', new (class extends Object {})()); 
// app.provide('$store', store);
app.config.globalProperties.$api = { msg,prePage};
app.config.globalProperties.$store = store;
// app.provide('$api', { msg, prePage });

// app.config.globalProperties.$api = api;

// 挂载应用
app.mount('#app');
// 导出 app 实例
export default app;

import store from './store/index.js'; // 假设你有 Vuex 状态管理
// 使用 Vuex
app.use(store);