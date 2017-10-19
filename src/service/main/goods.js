import { async, verifyNull } from "@/service/model/public"
import md5 from 'js-md5'
import base64 from '@/service/model/base64'
//加入购物车
var addCar = (productNo, name, imgUrl, visitUrl, cnPrice, productNumber, stock, productText) => {
  visitUrl = new base64().encode(visitUrl);
  return async('/api/user/buyercar/buyercar_add', {
    productNo, name, imgUrl, visitUrl, cnPrice, productNumber, stock, productText
  }, "POST", {
      noTip: true,
      success: function (obj) {

      }
    })
}
//查询购物车
var buyercarInfo = (lang) => async('/api/user/buyercar/buyercar_info', {
  lang
}, "POST");
//修改购物车数量
var buyercarUpdate = (id, productNumber) => async('/api/user/buyercar/buyercar_update', {
  id, productNumber
}, "POST");
//删除购物车
var buyercarDelete = (id) => async('/api/user/buyercar/buyercar_delete', {
  id
}, "POST");
//获取购物车总数
var getCartNum = () => async('/api/user/buyercar/buyercar_number', {
}, "POST", {
    load: false
  });
//判断是否已收藏
var userSelectCollectExit = (productNo) => async('/api/user/info/user_selectCollectExit', {
  productNo
}, "POST", {
    load: false
  });
//添加收藏
var userAddCollect = (lang, productNo, name, imgUrl, visitUrl, cnPrice) => async('/api/user/info/user_addCollect', {
  lang, productNo, name, imgUrl, visitUrl, cnPrice
}, "POST");
//获取商品详情接口
var crawler = (goodUrl) => async('/crawler', {
  goodUrl
}, "POST", {
    load: true,
    language: true
  }, 'https://front.superbuy.com');
//获取商品列表接口
var search = (q, s = 0, pSize = 50, sort = 'default', filter = 'reserve_price[,]', tab = 'all', psort = 'commend', json = 'on') => {
  q = q.replace(/[%]/g, '%25').replace(/[+]/g, '%2B').replace(/[&]/g, '%26').replace(/[=]/g, '%3D').replace(/[#]/g, '%23').replace(/[?]/g, '%3F').replace(/[/]/g, '%2F');
  return async('/search', {
    q, s, pSize, sort, filter, tab, psort, json
  }, "JSONP", '', 'https://s.taobao.com');
}

//获取商品评论接口
var feedRateList = (auctionNumId, currentPageNum = 1, rateType = '', pageSize = 20) => async('/feedRateList.htm', {
  auctionNumId, currentPageNum, rateType, pageSize,
}, "JSONP", '', 'https://rate.taobao.com');
//获取商品评价接口
var detailCommon = (auctionNumId) => async('/detailCommon.htm', {
  auctionNumId
}, "JSONP", '', 'https://rate.taobao.com');
//获取翻译
var translate = (q, target = 'th', source = 'zh-CN', load = false) => {
  return async('/api/open/common/translate_google', {
    q, target, source
  }, 'POST', { load: load });
}
export {
  addCar,
  buyercarInfo,
  buyercarUpdate,
  buyercarDelete,
  orderByCar,
  getCartNum,
  userSelectCollectExit,
  userAddCollect,
  crawler,
  search,
  feedRateList,
  detailCommon,
  translate
}
