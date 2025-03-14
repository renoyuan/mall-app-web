// appConfig.js

//配置API请求的基础路径
const protocol = 'http://';
const domain = '192.168.1.141';
const domainLocal = 'localhost';
const port = '8085';
export const API_BASE_URL = protocol + domain + ':' + port;  

//是否启用支付宝支付
export const USE_ALIPAY = false;