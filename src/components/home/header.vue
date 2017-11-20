<template>
  <div class="header">
    <div class="h-content">
      <div class="h-top">
        <div class="h-info">
          <div class="c-o-hover" @click="$router.push('/helpCenter/aboutUser')">{{$t('tail.helpCenter')}}</div>
          <div>
            <i class="weixin"></i>
            <span>tpilulu</span>
          </div>
          <div>
            <i class="weixin2"></i>
            <span>@tpipreorder</span>
          </div>
        </div>
        <div class="h-right">
          <div class="visitors" v-if='!$store.state.login'>
            <span class="login c-o-hover" @click="$router.push({'path':'/login'})">{{$t('head.logIn')}}</span>
            <span class="c-o-hover" @click="$router.push({'path':'/login?type=register'})">{{$t('head.registered')}}</span>
          </div>
          <div class="select mine c-o-hover" v-else>
            <span class="userName">{{$store.state.userinfo.userName || $store.state.userinfo.email}}</span>
            <span class="ic-select"></span>
            <span class="arrow"></span>
            <ul class="select-more left">
              <li @click="$router.push({'path':'/mineCenter/myInfo'})">{{$t('head.personalInformation')}}</li>
              <li @click="$router.push({'path':'/mineCenter/collectList'})">{{$t('head.myCollection')}}</li>
              <li @click="$router.push({'path':'/mineCenter/address'})">{{$t('head.shippingAddress')}}</li>
              <li @click="$router.push({'path':'/mineCenter/updatePwd'})">{{$t('head.changePassword')}}</li>
              <li @click="signOut">{{$t('head.signOut')}}</li>
            </ul>
          </div>
          <div class="select c-o-hover language">
            <span class="ic-language" :class="{'ic-chinese':$store.state.locale.type == 'zh_CN','ic-th':$store.state.locale.type == 'th','ic-lo':$store.state.locale.type == 'lo','ic-english':$store.state.locale.type == 'en','ic-my':$store.state.locale.type == 'my'}"></span>
            <span class="text">{{$store.state.locale.name}}</span>
            <span class="ic-select"></span>
            <span class="arrow"></span>
            <ul class="select-more right">
              <li class="ellipsis" v-for="(item,index) of $store.state.localeList" @click="languageSetUp(item)" v-if="$store.state.locale.type != item.type">
                <span class="ic-language" :class="{'ic-chinese':item.type == 'zh_CN','ic-th':item.type == 'th','ic-lo':item.type == 'lo','ic-english':item.type == 'en','ic-my':item.type == 'my'}"></span>
                <span class="text">{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="select c-o-hover language">
            <span class="text">{{$store.state.exchangeRate.symbol}}-</span>
            <span class="text">{{$store.state.exchangeRate.currency}}</span>
            <span class="ic-select"></span>
            <span class="arrow"></span>
            <ul class="select-more right">
              <li class="ellipsis" v-for="(item,index) of $store.state.rateList" @click="rateSetUp(item)" v-if="$store.state.exchangeRate.currency != item.currency">
                <span class="text">{{item.symbol}}-</span>
                <span class="text"> {{item.currency}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h-nav ub ub-pj">
        <div class="logo cursor-click" @click="$router.push({'path':'/index'})">
          <span class="ic-logo"></span>
        </div>
        <div class="nav-list ub ub-ac">
          <router-link class="nav-btn" to='/index'>{{$t('head.home')}}</router-link>
          <router-link class="nav-btn" to='/goodsType'>{{$t('head.Categories')}}</router-link>
          <a class="nav-btn" @click="jumpPage('/orderCenter')">{{$t('head.myOrder')}}</a>
          <router-link class="nav-btn" to='/aboutUs'>{{$t('head.aboutUs')}}</router-link>
        </div>
      </div>
    </div>
    <div class="shopping main-bc">
      <div class="page-center ub ub-ac">
        <div class="goods-type ub ub-ac color-fff">
          <div class="ub">
            <span class="ic-type"></span>
            {{$t('head.allCategoriesOfGoods')}}
          </div>
          <span class="iconbasefont f-15 f-select">&#xe62d;</span>
          <ul class="goods-type-item" :class="{'show':!show}" v-show="navSate">
            <li v-for='(item,index) in goodsTypeList' :key='index' :objId='item.objId'>
              <div class="ic-goods-type" :class='item.webClass' v-bind:style="{'background-image':'url('+item.iconUrl+')'}"></div>
              <div>{{item.name}}</div>
              <div class="ic-right"></div>
              <div class="goods-type-detail">
                <div v-for='(childItem,i) in item.child' class="twoLevel">
                  <div class="type-title">{{childItem.name}}</div>
                  <div class="type-content">
                    <div class="c-o-hover" v-for='(threeItem,s) in childItem.three' @click="jumpGoodsType(threeItem.objId,threeItem.name)">{{threeItem.name}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="search-box">
          <input type="text" v-model="searchText" @keyup.13="search" @keyup.40="upAndDown('plus')" @keyup.38="upAndDown('reduce')" :placeholder="$t('head.PleaseEnterASearchForProductNameOrProductLink')" />
          <!-- <div class="select-item cu-po" @click="search(1)" v-if="searchState">
                        <span>{{$t('head.translateAndSearch')}}</span>
                        <span class="ic-select"></span>
                      </div> -->
          <div class="ic-search" @click="search"></div>
          <div class="blurryFind" v-show="blurryFindState && blurryFindList.length>0">
            <ul>
              <li v-for="(item,index) of blurryFindList" :class="{'act':index == findIndex}" v-html="$i18n.locale == 'zh_CN' ? item[0] : completed[item.translationIndex] || item[0]" @click="blurryFindSelect($event,item[0],completed[item.translationIndex])"></li>
            </ul>
          </div>
        </div>
        <div class="my-cart ub ub-ac ub-pc cursor-click" @click="jumpPage('/myCart')">
          <span class="ic-cart-w"></span>{{$t('head.myShoppingCart')}}（{{$store.state.cartNum}}）
        </div>
      </div>
    </div>
    <div class="goodsfelx">
      <div class="goods-type-tag">
        <a class="goBack go-top" href="#">
          <p>
            <span class="ic-top"></span>
          </p>
          <span class="text">{{$t('index.top')}}</span>
        </a>
        <div class="goBack go-suggestion" @click="$router.push('/feedback')">{{$t('index.feedback')}}</div>
      </div>
      <!-- <div class="tag" :class="item.webClass" v-for="(item,index) in goodsTypeList" :key='index'>
            <span class="title">{{item.name}}</span>
          </div> -->

    </div>
  </div>
</template>
<script>
import { category, taobaoResult } from '@/service/main/index'
import { getSignOut } from '@/service/main/login'
import { translate } from '@/service/main/goods'
export default {
  data() {
    return {
      searchText: '',
      goodsType: false,
      timeOut: null,
      goodsTypeList: [],
      navSate: true,
      blurryFindList: [],
      blurryFindState: false,
      TBresultState: true,
      findIndex: -1,
      translation: [],
      completed: [],
    }
  },
  props: {
    pageTag: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.pageData();
    const _this = this;
    document.body.onclick = function() {
      _this.blurryFindState = false;
    }
  },
  watch: {
    searchText(val) {
      if (this.TBresultState) {
        this.TBresult(val);
      }
    }
  },
  methods: {
    pageData() {
      //获取分类
      category().then(
        data => {
          if (data.success) {
            this.goodsTypeList = data.data;
          }
        }
      )
    },
    search: function() {
      let searchText = this.searchText;
      //判断是否为网址
      if (/http:\/\/|https:\/\//.test(searchText)) {
        this.$router.push({ path: '/goodsDetail' ,query:{searchKey:searchText}});
      } else {
        if (searchText != "") {
          this.$router.push({ path: '/searchList',query:{searchKey:searchText}});
        }
      }
      this.blurryFindState = false;
    },
    TBresult(val) {
      const _this = this;
      if (!/http:\/\/|https:\/\//.test(val)) {
        console.log(val);
        _this.getTranslate(val,true,true,'zh_CN','auto').then(
          data => {
            request(data);
          },
          () => {
            request(val);
          }
        )
        function request(value) {
          let translationStatistics = new Array();
          let translationIndex = 0;
          taobaoResult(value).then(
            data => {
              _this.blurryFindState = true;
              for (var item of data.result) {
                var newitem = item[0].replace(/[<b>]/g,'').replace(/[</b>]/g,'');
                item[0] = newitem;
                translationStatistics.push({index:translationIndex,text:newitem});
                item.translationIndex = translationIndex;
                translationIndex++;
              }
              _this.translation = translationStatistics;
              _this.blurryFindList = data.result;
              _this.findIndex = -1;
              console.log(translationStatistics);
              _this.getTranslate(translationStatistics,false,true).then(
                data => {
                  _this.completed = data;
                }
              )
            }
          );
        }
      }
    },
    blurryFindSelect(event, val,completed) {
      const _this = this;
      if (val != "") {
        if(this.$i18n.locale == 'zh_CN'){
          this.$router.push({ path: '/searchList' ,query:{searchKey:val}});
          this.searchText = val;
        }else{
          this.$router.push({ path: '/searchList' ,query:{searchKey:completed}});
          this.searchText = completed;
        }
        this.TBresultState = false;

        setTimeout(() => {
          _this.TBresultState = true;
        }, 500);
      }
      this.blurryFindState = false;
      event.stopPropagation();
    },
    //翻译搜索
    signOut() {
      this.$store.commit('clearUserinfo');
      this.$router.push('/login');
    },
    //跳转商品分类
    jumpGoodsType(objId, name) {
      const _this = this;
      this.$router.push({ path: '/searchList' ,query:{searchKey:name}})
      _this.navSate = false;
      setTimeout(function() {
        _this.navSate = true;
      }, 500)
    },
    //推荐搜索选择
    upAndDown(val) {
      this.TBresultState = false;
      const _this = this;
      const len = this.blurryFindList.length - 1;
      if (val == 'reduce') {
        if (this.findIndex <= 0) {
          this.findIndex = len;
        } else {
          this.findIndex--;
        }
      } else if (val == 'plus') {
        if (this.findIndex >= len) {
          this.findIndex = 0;
        } else {
          this.findIndex++;
        }
      }
      this.searchText = this.$i18n.locale == 'zh_CN' ? this.blurryFindList[this.findIndex][0] : this.completed[this.findIndex];
      setTimeout(() => {
        _this.TBresultState = true;
      }, 10);
    },
    jumpPage(url) {
      const _this = this;
      if (this.$store.state.login) {
        this.$router.push(url);
      } else {
        this.$parent.$refs.confirm.show(_this.$t('head.youAreNotLoggedInAreYouLoggedIn'), true, function() {
          _this.$router.push('/login');
        });
      }
    },
    languageSetUp(item) {
      this.$store.commit('languageSetUp', item);
    },
    rateSetUp(item){
      this.$store.dispatch('actionsExchangeRate', item);
    }
  }
}
</script>
<style lang="scss">
@import '../../style/components/main';
@import '../../style/goodsType';
.header {
  background: #fff;
  font-size: 13px;
  position: relative;
  z-index: 2;
  .h-content {
    @include pageCenter;
    .h-top {
      height: 44px;
      line-height: 44px;
      color: #666;
      @include clear;
      &>div {
        display: flex;
        height: 100%;
        float: left;
      }
      .h-info {
        display: flex;
        line-height: 44px;

        div {
          margin-right: 40px;
          display: flex;
          color: #666;
          i {
            @include bindicBg(14px, 48px);
            background-size: 100% auto;
            margin-right: 10px;
          }
          .weixin {
            background-image: url('../../img/index/footer_ic_wechat.png');
          }
          .weixin2 {
            background-image: url('../../img/index/footer_ic_line.png');
          }
        }
      }
      .language {
        .ic-language {
          @include bindicBg(24px,
          20px);
          background-size: 100% auto;
          margin-right: 8px;
          flex-shrink: 0;
        }
        .ic-chinese {
          background-image: url('../../img/language/spxq_icon_zhongguo.png');
        }
        .ic-english {
          background-image: url('../../img/language/nav_icon_English.png');
        }
        .ic-th {
          background-image: url('../../img/language/nav_icon_th.png');
        }
        .ic-lo {
          background-image: url('../../img/language/nav_icon_la.png');
        }
        .ic-my {
          background-image: url('../../img/language/nav_icon_miandian.png');
        }
        .ic-myr {
          background-image: url('../../img/language/malaixiya.png');
        }
        .ic-select {
          margin-left: 8px;
        }
      }
      .h-right {
        float: right;
        &>div {
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
        }
        .visitors {
          .login {
            margin-right: 40px;
          }
          div {
            cursor: pointer;
          }
        }
        .select {
          margin-left: 40px;
          display: flex;
          line-height: 32px;
          position: relative;
          padding: 12px 8px 12px 0px;
          background-color: #FFF;
          .userName {
            display: block;
            height: 20px;
            line-height: 20px;
          }
          .text {
            display: block;
            height: 20px;
            line-height: 20px;
          }
          >.ic-select {
            height: 20px;
            background-size: 100% auto;
          }
          .arrow {
            position: absolute;
            display: none;
            top: 33px;
            right: 4px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 10px solid #eee;
            z-index: 11;
            &::after {
              content: "";
              position: absolute;
              top: 3px;
              left: -8px;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 10px solid #FFF;
            }
          }
          .select-more {
            position: absolute;
            background-color: #fff;
            display: none;
            top: 43px;
            right: 0;
            color: #666666;
            font-size: 14px;
            text-align: center;
            box-shadow: 0px 0px 8px 0px rgba(153, 153, 153, 0.35);
            z-index: 10;
            padding-bottom: 8px;
            li {
              height: 32px;
              line-height: 20px;
              white-space: nowrap;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 12px;
            }
            li:hover {
              color: $main-color;
            }
          }
          .select-more.left {
            li {
              padding-left: 20px;
              padding-right: 20px;
            }
          }
          .select-more.right {
            li {
              padding-left: 8px;
              padding-right: 8px;
              display: flex;
            }
          }
          &:hover {
            .select-more {
              display: block;
            }
            .ic-select {
              @extend .act;
            }
            .arrow {
              display: block;
            }
          }
        }
        .ic-select {
          margin-left: 12px;
        }
      }
    }
    .h-nav {
      height: 96px;
      width: 100%;
      .nav-list {
        &>.nav-btn {
          font-size: 18px;
          text-align: center;
          margin-left: 50px;
          color: #555;
          cursor: pointer;
          &.router-link-active,
          &:hover {
            color: $main-color;
          }
        }
      }
    }
  }
  .shopping {
    height: 48px;
    .goods-type {
      width: 272px;
      height: 100%;
      background-color: #E65201; // box-shadow: #B9531C 0px 3px 3px;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      cursor: default;
      .ub {
        font-size: 17px;
        font-weight: bold;
        line-height: 19px;
      }
      .f-select {
        margin-right: 33px;
        font-size: 14px;
      }
      .goods-type-item {
        opacity: 1;
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 1;
        font-size: 17px;
      }
      .goods-type-item.show {
        display: none;
      }
    }
    .goods-type:hover .show {
      display: -webkit-box;
      display: block;
    }
    $sPadding: 12px;
    $lHeight:32px;
    .search-box {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      height: $lHeight;
      min-width: 680px;
      background: #fff;
      padding: 0 $sPadding;
      margin-left: 12px;
      border-radius: 22px;
      position: relative;
      input {
        display: block;
        height: 100%;
        width: 100%;
        border: none;
        padding-right: $sPadding;
        flex: 1;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        font-size: 13px;
      }
      .select-item {
        display: flex;
        line-height: 43px;
        .ic-select {
          margin-left: 10px;
        }
      }
      .select-item:hover {
        color: #FF681C;
      }
      .ic-search {
        @include bindicBg(15px,
        32px);
        background-position: right center;
        background-size: auto 55%;
        padding-left: 20px;
        padding-right: 10px;
        background-image: url(../../img/goodsDetails/nav_icon_sousuodianji.png);
        cursor: pointer;
      }
      .blurryFind {
        position: absolute;
        top: 40px;
        left: 0px;
        background: #FFF;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ededed;
        ul {
          li {
            padding: 10px 15px;
            cursor: pointer;
          }
          li:hover,
          .act {
            background: #ededed;
          }
        }
      }
    }
    .my-cart {
      width: 202px;
      border: 1px solid #fff;
      /*background-color: $orange;*/
      border-radius: 22px;
      height: $lHeight;
      color: #fff;
      margin-left: 36px;
      .ic-cart-w {
        margin-right: 10px;
        @include bindicBg(20px,
        19px);
        background-image: url(../../img/goodsDetails/nav_icon_gouwuche.png);
      }
    }
  }
  .goodsfelx {
    position: fixed;
    left: 50%;
    bottom: 100px;
    margin-left: 620px;
    .goods-type-tag {
      width: 60px;
      background: #fff;
      padding: 0 0px;
      cursor: pointer;
      .tag {
        width: 102%;
        height: 50px;
        padding: 8px 12px;
        line-height: 1.5;
        font-size: 12px;
        border-bottom: 2px solid #f1f1f1;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        .title {
          border: none !important;
        }
      }
      .tag:hover {
        background-repeat: no-repeat;
        background-size: cover;
        .title {
          color: #fff;
        }
      }
      .tag:last-child {
        border: none;
      }
      .go-top,
      .go-suggestion {
        color: #666;
        padding: 0;
        font-size: 12px;
      }
      .goBack {
        display: block;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid #f1f1f1;
        p {
          text-align: center;
          line-height: 15px;
        }
        .ic-top {
          display: inline-block;
          width: 18px;
          height: 15px;
          background-repeat: no-repeat;
          background-position: center left;
        }
        .text {
          display: block;
          line-height: 20px;
        }
      }
      .go-top:hover,
      .go-suggestion:hover {
        color: #fff;
        background-color: $main-color;
        .ic-top {
          background-image: url(../../img/index/sy_bannar_icon_you.png);
        }
      }
      .ic-top {
        margin-bottom: 4px;
      }
    }
  }

  /*icon about*/
  .ic-select {
    @include bindicBg(8px,
    4px);
    background-image: url(../../img/goodsDetails/spxq_icon_xiala.png);
  }

  .ic-select.act {
    background-image: url(../../img/goodsDetails/sy_nav_icon_xiala_y.png);
  }
  .ic-cart {
    margin-right: 10px;
    @include bindicBg(17px,
    16px);
    background-image: url(../../img/goodsDetails/spxq_icon_gouwuche.png);
  }
  .ic-logo {
    margin-top: 13px;
  }
  .ic-type {
    @include bindicBg(19px,
    21px);
    background-size: 100% auto;
    margin: 0 10px 0 24px;
    background-image: url(../../img/goodsDetails/nav_icon_suoyoushangpingfenlei.png);
  }
}
@media screen and (max-width: 1350px) {
    .goodsfelx {
      left: inherit !important;
      margin-left: inherit!important;
      right: 0px !important;
    }
}
</style>
