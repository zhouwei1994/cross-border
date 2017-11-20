/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl;
let routerMode;
let fileUrl;
let iframeUrl;

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://192.168.1.101:8080/mall/';
	baseUrl = 'http://www.tpimkp.com:74/mall/';
	//baseUrl = 'http://192.168.1.101:8080/mall/';
	iframeUrl = 'http://127.0.0.1:8082/proxy/?'
	//routerMode = 'hash';
	routerMode = 'history';
	fileUrl = '';
}else{
// 	baseUrl = 'http://www.tpimkp.com/mall/';
//   iframeUrl = 'http://www.tpimkp.com/proxy/?';
  	baseUrl = 'http://www.tpimkp.com:74/mall/';
	iframeUrl = 'http://www.tpimkp.com:74/proxy/?';
	routerMode = 'history';
	fileUrl = '';
}
export {
	baseUrl,
	routerMode,
	fileUrl,
	iframeUrl
}
