import { async, verifyNull } from "@/service/model/public"
import store from '@/config/store'
//获取轮播图
//1101	主页
var getSliderImglist = (position) => async('api/open/common/lunbo_img', {
  position, lang: store.state.locale.type
}, "POST", {
    noTip: true,
    success: function (obj) {
    }
})
//分类列表
var category = () => async('api/open/goods/category', {
  lang: store.state.locale.type
}, "GET", {
    noTip: true,
    success: function (obj) {
    }
  })
//分类商品列表
var categoryHomeGoods = () => async('api/open/goods/category_home_goods', {
  lang: store.state.locale.type
}, "GET", {
    noTip: true,
    success: function (obj) {
    }
  })

var categoryChildGoods = (categoryId, pageNo, pageSize) => async('api/open/goods/category_goods', {
  categoryId, pageNo, pageSize, lang: store.state.locale.type
}, "POST", {
    noTip: true,
    success: function (obj) {
    }
  })
//淘宝的模糊搜索
var taobaoResult = (q, code = 'utf-8', _ksTS = '1502269200388_8514', k = 1, area = 'c2c', bucketid = 8) => {
  q = q.replace(/[%]/g,'%25').replace(/[+]/g,'%2B').replace(/[&]/g,'%26').replace(/[=]/g,'%3D').replace(/[#]/g,'%23').replace(/[?]/g,'%3F').replace(/[/]/g,'%2F');
  return async('sug', {
    q, code, _ksTS, k, area, bucketid
  }, "JSONP",{
    load: true
  }, 'https://suggest.taobao.com/')
}

//处理商品链接然后跳转到商品详情页
var openGoodsLink = function (_this, link,state) {
  //判断是否为网址
  if (/http|https/.test(link)) {
      let url = link.replace(/&/g, '%26');
      store.commit('setSearch', { searchKey: link });
      if(state){
        window.open(document.location.protocol+'//'+window.location.host+'/goodsDetail?searchKey='+url);
      }else{
        _this.$router.push({ path: '/goodsDetail' ,query:{searchKey:url}});
      }
  } else {
    if (link != "") {
      _this.$router.push(link);
    }
  }
}
//汇率转换
var getRate = (sorceCurrency, targetCurrency) => async('api/open/common/get_rate', {
  sorceCurrency, targetCurrency
},'GET',{
  load:false
})
//用户反馈
var feedback = (content, lang = store.state.locale.type) => async('api/open/common/feedback', {
  content, lang
},'POST')
export {
  getSliderImglist, category, categoryHomeGoods, categoryChildGoods, openGoodsLink, taobaoResult,getRate,feedback
}
