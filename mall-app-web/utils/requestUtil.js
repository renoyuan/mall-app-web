import Request from '@/js_sdk/luch-request/request.js';
import { API_BASE_URL } from '@/utils/appConfig.js';

// 定义接口或类型来增强类型安全
interface RequestOptions {
  baseUrl?: string;
  header?: Record<string, any>;
}

interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

const http = new Request();

http.setConfig((config: RequestOptions) => { /* 设置全局配置 */
  config.baseUrl = API_BASE_URL; /* 根域名不同 */
  config.header = {
    ...config.header
  };
  return config;
});

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode: number): boolean => {
  return statusCode === 200;
};

http.interceptor.request.use((config: RequestOptions, cancel: Function) => { /* 请求之前拦截器 */
  const token = uni.getStorageSync('token');
  if (token) {
    config.header = {
      'Authorization': token,
      ...config.header
    };
  } else {
    config.header = {
      ...config.header
    };
  }
  return config;
}, (error: any) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

http.interceptor.response.use((response: any) => { /* 请求之后拦截器 */
  const res: ResponseData = response.data;
  if (res.code !== 200) {
    // 提示错误信息
    uni.showToast({
      title: res.message,
      duration: 1500
    });
    // 401未登录处理
    if (res.code === 401) {
      uni.showModal({
        title: '提示',
        content: '你已被登出，可以取消继续留在该页面，或者重新登录',
        confirmText: '重新登录',
        cancelText: '取消',
        success: function(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/public/login'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
    return Promise.reject(response);
  } else {
    return response.data;
  }
}, (error: any) => {
  // 提示错误信息
  console.error('Response Error:', error);
  uni.showToast({
    title: error.errMsg,
    duration: 1500
  });
  return Promise.reject(error);
});

export function request<T = any>(options: RequestOptions = {}): Promise<T> {
  return http.request(options);
}

export default request;