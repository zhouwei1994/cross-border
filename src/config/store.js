import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import i18n from '@/service/language/i18n.js'
import { getRate } from '@/service/main/index'
import {
  setStore,
  getStore,
  removeStore
} from '@/config/mUtils'
import { verifyNull, updateObj } from '@/service/model/public'

const state = { //访问状态对象
  loading: false,
  isLoading: false,
  path: '',
  //语言
  locale: {
    type: 'zh_CN', name: '中文', country: '中国'
  },
  userinfo: {},
  login: false,
  //商品分类
  goodsTypeList: [],
  //首页轮播图
  indexSliderimgList: [],
  //搜索关键字、url
  search: {
    searchKey: ''
  },
  //服务费率
  ratio:[
    {min:0,max:500,cost:50},
    {min:500,max:1000,cost:100},
    {min:1001,max:5000,cost:0.03},
    {min:5001,max:10000,cost:0.02},
    {min:10001,max:50000,cost:0.015},
    {min:50001,max:'',cost:0.01},
  ],
  //语言种类
  localeList: [
    { type: 'zh_CN', name: '中文', country: '中国'},
    { type: 'en', name: 'English', country: 'United States of America'},
    { type: 'th', name: 'ไทย', country: 'ไทย'},
    { type: 'lo', name: 'ຂໍ້ຄວາມລາວ', country: 'ລາວ'},
    { type: 'my', name: 'မြန်မာ', country: 'မြန်မာ'},
  ],
  //货币汇率转换列表
  rateList:[
    //人民币
    {currency:'CNY',symbol:'￥'},
    //美元
    { currency:'USD',symbol:'$'},
    //泰铢
    { currency:'THB',symbol:'฿'},
    //老挝基普
    { currency:'LAK',symbol:'₭'},
    //缅元
    { currency:'BUK',symbol:'K'},
    //马来西亚币
    { currency:'MYR',symbol:'M.＄'},
  ],
  //购物车数量
  cartNum: 0,
  //订单提交信息
  orderSubmitInfo: {},
  //默认收货地址信息
  defaultAddress: {},
  //当前汇率
  exchangeRate:{
    symbol:'￥',
    rate:1,
    name:'人民币',
    currency:'CNY'
  },
}
const mutations = { //触发状态
  setPath(state, payload){
    state.path = payload;
  },
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading
  },
  setSearch(state, option) {
    if (verifyNull(option)) $.extend(state.search, option);
  },
  setLoading(state, payload) {
    state.loading = payload.loading || payload;
  },
  setCartNum(state, payload) {
    state.cartNum = payload;
  },
  setUserinfo(state, option) {
    if (verifyNull(option)) {
      state.userinfo = option;
      setStore("userinfo", JSON.stringify(state.userinfo));
      $zopim(function () {
        $zopim.livechat.setLanguage(state.locale.type);
        $zopim.livechat.setName(state.userinfo.userName || state.userinfo.email);
        $zopim.livechat.setEmail(state.userinfo.email);
      });
    }
  },
  setRatio(state, option){
    state.ratio = option;
  },
  clearUserinfo(state) {
    removeStore('userinfo');
    removeStore('addressInfo');
    removeStore('orderSubmitInfo');
    removeStore('login');
    $zopim(function () {
      $zopim.livechat.clearAll();
      $zopim.livechat.setName($Vue.$t('component.tourists'));
    });
    state.userinfo = {};
    state.login = false;
    state.cartNum = 0;
  },
  //语言切换
  languageSetUp(state, item) {
    i18n.locale = item.type;
    state.locale = item;
    $zopim(function () {
      $zopim.livechat.setLanguage(item.type);
    });
    setStore('locale', JSON.stringify(item));
  },
  //货币切换
  setExchangeRate(state,payload){
    if(verifyNull(payload)){
      state.exchangeRate = {
        symbol:payload.symbol,
        rate:payload.rate,
        name:payload.name,
        currency:payload.currency
      };
      setStore('exchangeRate', JSON.stringify(state.exchangeRate));
    }
  },
  setLogin(state, payload) {
    state.login = payload;
    setStore('login', JSON.stringify(state.login));
  },
  setGoodsTypeList(state, payload) {
    if (verifyNull(payload)) {
      state.goodsTypeList = payload;
      sessionStorage.setItem("goodsTypeList", JSON.stringify(state.goodsTypeList));
    }
  },
  setIndexSliderimgList(state, payload) {
    if (verifyNull(payload)) {
      state.indexSliderimgList = payload;
      sessionStorage.setItem("indexSliderimgList", JSON.stringify(state.indexSliderimgList));
    }
  },
  setOrderSubmitInfo(state, payload) {
    if (verifyNull(payload)) {
      state.orderSubmitInfo = payload;
      setStore('orderSubmitInfo', state.orderSubmitInfo);
    }
  },
  getOrderSubmitInfo(state) {
    const orderSubmitInfo = getStore('orderSubmitInfo');
    if (verifyNull(orderSubmitInfo)) {
      state.orderSubmitInfo = JSON.parse(orderSubmitInfo);
    }
  },
  setAddressInfo(state, payload) {
    if (verifyNull(payload)) {
      state.defaultAddress = payload;
      setStore('addressInfo', state.defaultAddress);
    }
  },
  getAddressInfo(state) {
    const defaultAddress = getStore('addressInfo');
    if (verifyNull(defaultAddress)) {
      state.defaultAddress = JSON.parse(defaultAddress);
    }
  },
}
const actions = {
  //汇率查询
  actionsExchangeRate ({ commit },products) {
    if(products.currency == 'CNY'){
      commit('setExchangeRate',{
        symbol:products.symbol,
        rate:1,
        name:products.name,
        currency:products.currency
      })
    }else{
      getRate('CNY',products.currency).then(
        data => {
          if(data.success){
            commit('setExchangeRate',{
              symbol:products.symbol,
              rate:parseFloat(data.data.number2),
              name:products.name,
              currency:products.currency
            })
          }else{
            alert('获取汇率失败');
          }
        }
      );
    }

  }
}
export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})
