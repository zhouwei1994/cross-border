<template>
  <div class="goods-type-list">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('goodsTypeDetail.listOfGoods')}}
      </div>
    </div>
    <div id="searchList" class="page-center">
      <div class="search-key c-title">{{$t('goodsTypeDetail.allWith')}} "<span v-html="$route.query.langText || goodsText"></span>" {{$t('goodsTypeDetail.relatedGoods')}}</div>
      <div class="m-sortbar ub ub-ac" v-if="pageState">
        <div class='order-by'>
          <ul>
            <li :class="{'act':sort == 'default' && psort == 'commend'}" @click="screen('default','commend')">
              <div class="screen_box">
                <span v-show="sort == 'default' && psort == 'commend'">{{$t('goodsTypeDetail.IntegratedSorting')}}</span>
                <span v-show="sort != 'default' || psort != 'commend'">{{$t('goodsTypeDetail.comprehensive')}}</span>
              </div>
            </li>
            <li :class="{'act':sort == 'renqi-desc'}" @click="screen('renqi-desc')" v-if="dataType == 0">
              <div class="screen_box">
                <span v-show="sort == 'renqi-desc'">{{$t('goodsTypeDetail.popularityRangesFromHighToLow')}}</span>
                <span v-show="sort != 'renqi-desc'">{{$t('goodsTypeDetail.popularity')}}</span>
              </div>
            </li>
            <li :class="{'act':sort == 'sale-desc' && psort == '_lw_quantity'}" @click="screen('sale-desc','_lw_quantity')">
              <div class="screen_box">
                <span v-show="sort == 'sale-desc' && psort == '_lw_quantity'">{{$t('goodsTypeDetail.salesRangeFromHighToLow')}}</span>
                <span v-show="sort != 'sale-desc' || psort != '_lw_quantity'">{{$t('goodsTypeDetail.sales')}}</span>
              </div>
            </li>
            <li :class="{'act':sort == 'price-asc'|| sort == 'price-desc' || sort == 'total-asc' || sort == 'total-desc'}" v-if="dataType == 0">
              <div class="screen_box">
                <span v-for="(item,index) of priceScreen" v-show="sort == item.type">{{$t(item.name)}}</span>
                <span v-show="sort != 'price-asc' || sort != 'price-desc' || sort != 'total-asc' || sort != 'total-desc'">{{$t('goodsTypeDetail.price')}}</span>
                <i></i>
              </div>
              <ul>
                <li v-for="(item,index) of priceScreen" @click="screen(item.type,'commend',true)" :class="{'act':index == 0}">{{$t(item.name)}}</li>
              </ul>
            </li>
            <li :class="{'act': psort == '_market_time'}" @click="screen('default','_market_time')" v-if="dataType == 1">
              <div class="screen_box">
                <span>{{$t('goodsTypeDetail.listingTime')}}</span>
              </div>
            </li>
            <li :class="{'act': psort == '_price'}" @click="screen('default','_price')" v-if="dataType == 1">
              <div class="screen_box">
                <span>{{$t('goodsTypeDetail.pricesRangeFromHighToLow')}}</span>
              </div>
            </li>
            <li :class="{'act': psort == 'price'}" @click="screen('default','price')" v-if="dataType == 1">
              <div class="screen_box">
                <span>{{$t('goodsTypeDetail.pricesRangeFromLowToHigh')}}</span>
              </div>
            </li>
            <li>
              <div class="input_box">
                <input type="text" :placeholder="$store.state.exchangeRate.symbol" v-model="minPrice"> -
                <input type="text" :placeholder="$store.state.exchangeRate.symbol" v-model="maxPrice">
                <button @click="goodsListInfo(1)">{{$t('component.determine')}}</button>
              </div>
            </li>
          </ul>
          <div class="tianmaotaobao">
            <div :class="{'act':mall}" @click="mall = !mall;goodsListInfo(1)">
              <i></i>{{$t('goodsTypeDetail.tmall')}}</div>
            <div :class="{'act':taobao}" @click="taobao = !taobao;goodsListInfo(1)">
              <i></i>{{$t('goodsTypeDetail.taoBao')}}</div>
          </div>
        </div>
      </div>
      <div class="goods-list ui-p-r" v-if="goodsTypeList.length > 0">
        <div class="goods" :class="{'goodsfour':(index+1)%4 == 0}" :productNo='goods.productNo' v-for="(goods,index) in goodsTypeList" @click='openGoodsLink(index,goods)'>
          <img v-lazyload="goods.pic_url">
          <div class="goods-detail">
            <div class="goods-name" v-if="dataType == 0" v-html="$i18n.locale == 'zh_CN' ? goods.title : completed[goods.translationIndex] || goods.title"></div>
            <div class="goods-name" v-if="dataType == 1">
              <span>{{$i18n.locale == 'zh_CN' ? goods.title : completed[goods.translationIndex] || goods.title}}</span>
              <span v-if="$i18n.locale == 'zh_CN'" v-for="item of goods.tag_info"> {{item.tag}}</span>
            </div>
            <div class="goods-desc">
              <div class="goods-price" v-if="dataType == 0">{{$store.state.exchangeRate.symbol}}{{goods.view_price | currency}}</div>
              <div class="goods-price" v-if="dataType == 1">{{$store.state.exchangeRate.symbol}}{{goods.price | currency}}</div>
              <div class="buyers" v-if="dataType == 0">{{goods.view_sales | integer}}{{$t('index.peoplePay')}}</div>
              <div class="buyers" v-if="dataType == 1">{{goods.month_sales}}{{$t('index.peoplePay')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="noData" v-if="goodsTypeList.length <= 0 && pageState">
        <div>
          <i></i>
          <p>{{$t('goodsTypeDetail.didNotFindTheConditionOfTheGoods')}}</p>
        </div>
      </div>
      <div class="noData" v-if="notFound">
        <div>
          <i></i>
          <p>{{$t('goodsTypeDetail.sorryDidNotFindThisAnd') | replace(goodsText)}}</p>
        </div>
      </div>
      <page-box v-show='goodsTypeList.length>0' :current-page="pageNo" :total="totalPage" @current-change="goodsListInfo"></page-box>
    </div>
  </div>
</template>
<script>
import { verifyNull } from "@/service/model/public";
import { iframeUrl } from "@/config/env.js";
import { search, translate } from "@/service/main/goods";
import { openGoodsLink } from "@/service/main/index";
import loading from "@/components/common/loading/loading";
import pageBox from "@/components/common/page";
export default {
  components: {
    loading,
    pageBox
  },
  data() {
    return {
      goodsTypeList: [],
      loading: true,
      pageSize: 50,
      pageNo: 1,
      totalPage: 1,
      sort: "default", //筛选
      psort: "commend", //筛选
      dataType: 0,
      priceScreen: [
        {
          type: "price-asc",
          name: "goodsTypeDetail.pricesRangeFromLowToHigh"
        },
        {
          type: "price-desc",
          name: "goodsTypeDetail.pricesRangeFromHighToLow"
        },
        {
          type: "total-asc",
          name: "goodsTypeDetail.theTotalPriceFromLowToHigh"
        },
        {
          type: "total-desc",
          name: "goodsTypeDetail.theTotalPriceFromHighToLow"
        }
      ],
      minPrice: "", //金额筛选
      maxPrice: "", //金额筛选
      mall: true,
      taobao: true,
      pageState: false,
      notFound: false,
      translation: [],
      completed: []
    };
  },
  mounted() {
    this.goodsListInfo(1);
  },
  computed: {
    goodsText() {
      return this.$route.query.searchKey;
    }
  },
  watch: {
    goodsText() {
      this.sort = "default";
      this.psort = "commend";
      this.minPrice = "";
      this.maxPrice = "";
      this.goodsListInfo(1);
    },
    minPrice(val) {
      let minPrice = parseInt(val);
      if (!/[0-9]/.test(minPrice)) {
        this.minPrice = "";
      } else {
        this.minPrice = minPrice;
      }
    },
    maxPrice(val) {
      let maxPrice = parseInt(val);
      if (!/[0-9]/.test(maxPrice)) {
        this.maxPrice = "";
      } else {
        this.maxPrice = maxPrice;
      }
    }
  },
  methods: {
    pageData() {
      this.getTranslate(this.translation).then(data => {
        this.completed = data;
      });
    },
    goodsListInfo(val) {
      if (val) {
        this.pageNo = val;
      }
      let translationStatistics = new Array();
      let translationIndex = 0;
      let tab = "all",
        goodsText = this.goodsText;
      let rate = this.$store.state.exchangeRate.rate;
      const _this = this;
      const filter =
        "reserve_price[" +
        this.minPrice / rate +
        "," +
        this.maxPrice / rate +
        "]";
      if ((this.mall && this.taobao) || (!this.mall && !this.taobao)) {
        tab = "all";
      } else if (this.mall) {
        tab = "mall";
      } else if (this.taobao) {
        tab = "all";
        goodsText = goodsText + "-tmall";
      }
      if (this.$route.query.state == 1) {
        request(goodsText);
      } else {
        _this.getTranslate(goodsText, true, true, "zh_CN", "auto").then(
          data => {
            request(data);
          },
          () => {
            request(goodsText);
          }
        );
      }
      function request(val) {
        search(
          val,
          (_this.pageNo - 1) * _this.pageSize,
          _this.pageSize,
          _this.sort,
          filter,
          tab,
          _this.psort
        ).then(data => {
          if (data.mods) {
            if (data.mods.itemlist) {
              if (data.mods.itemlist.data) {
                for (var item of data.mods.itemlist.data.auctions) {
                  translationStatistics.push({
                    index: translationIndex,
                    text: item.title
                      .replace(/[<span class=H>]/g, "")
                      .replace(/[</span>]/g, "")
                  });
                  item.translationIndex = translationIndex;
                  translationIndex++;
                }
                document.body.scrollTop = 0;
                _this.translation = translationStatistics;
                _this.goodsTypeList = data.mods.itemlist.data.auctions;
                _this.dataType = 0;
                _this.pageState = true;
                _this.getTranslate(_this.translation).then(data => {
                  _this.completed = data;
                });
              } else {
                _this.goodsTypeList = [];
                _this.dataType = 1;
                _this.pageState = true;
              }
            } else if (data.mods.grid) {
              if (data.mods.grid.data) {
                for (var item of data.mods.grid.data.spus) {
                  var title = item.title;
                  for (var tag of item.tag_info) {
                    title += " " + tag.tag;
                  }
                  translationStatistics.push({
                    index: translationIndex,
                    text: title
                  });
                  item.translationIndex = translationIndex;
                  translationIndex++;
                }
                document.body.scrollTop = 0;
                _this.translation = translationStatistics;
                _this.goodsTypeList = data.mods.grid.data.spus;
                _this.dataType = 1;
                _this.pageState = true;
                _this.getTranslate(_this.translation).then(data => {
                  _this.completed = data;
                });
              } else {
                _this.goodsTypeList = [];
                _this.dataType = 1;
                _this.pageState = true;
              }
            } else {
              _this.pageState = false;
              _this.notFound = true;
            }
            if (data.mods.pager.data) {
              _this.totalPage = data.mods.pager.data.totalPage;
            }
          }
        });
      }
    },
    openGoodsLink(index, item) {
      var url = "";
      if (this.dataType == 0) {
        if (item.shopcard.isTmall) {
          url =
            "https://detail.tmall.com/item.htm?id=" +
            this.goodsTypeList[index].nid;
        } else {
          url ="https://item.taobao.com/item.htm?id=" +
            this.goodsTypeList[index].nid;
        }
        openGoodsLink(this, url, true);
      } else {
        this.$router.push({
          path: "/searchList",
          query: { searchKey: this.goodsTypeList[index].title, state: 1 }
        });
      }
    },
    screen(sort, psort, state) {
      if (state) {
        var arr = [];
        for (var item of this.priceScreen) {
          if (item.type == this.sort) {
            arr.unshift(item);
          } else {
            arr.push(item);
          }
        }
        this.priceScreen = arr;
      }
      if (sort) {
        this.sort = sort;
      }
      if (psort) {
        this.psort = psort;
      }
      this.goodsListInfo(1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/components/main";
@import "../../style/goodsList";
.goods-type-list {
  .search-key {
    overflow: hidden;
  }
  .m-sortbar {
    width: 100%;
    color: #404040;
    height: 48px;
    background-color: #fff;
    border: solid 1px #e8e8e8;
    border-collapse: collapse;
    .order-by {
      width: 100%;
      display: flex;
      justify-content: space-between;
      & > ul {
        @include clear;
      }
      & > ul > li {
        float: left;
        border: 1px solid transparent;
        border-width: 0 1px;
        position: relative;
        display: flex;
        cursor: pointer;
        .screen_box {
          font-size: 12px;
          height: 46px;
          line-height: 46px;
          padding: 0 19px;
          display: flex;
          i {
            @include bindicBg(9px, 46px);
            background-size: 100% auto;
            background-image: url("../../img/goodsDetails/spxq_icon_xiala.png");
            margin-left: 5px;
          }
        }

        &:first-child {
          border-left-width: 0;
        }

        > ul {
          position: absolute;
          top: 0px;
          left: 0px;
          display: block;
          z-index: 10;
          padding: 0px 19px;
          background-color: #fff;
          box-shadow: 0px 0px 20px 0px #ccc;
          border-radius: 3px;
          display: none;
          > li {
            color: #666;
            height: 46px;
            line-height: 46px;
            cursor: pointer;
            white-space: nowrap;
          }
        }
        .input_box {
          padding: 0px 19px;
          line-height: 46px;
          white-space: nowrap;
          input {
            height: 25px;
            width: 50px;
            border: solid 1px #dfdfdf;
            padding: 0px 5px;
          }
          button {
            background-color: #f50;
            color: #fff;
            border: 0px;
            height: 25px;
            padding: 0px 10px;
            margin-left: 5px;
            border-radius: 3px;
            display: none;
          }
        }
      }
      .tianmaotaobao {
        display: flex;
        div {
          font-size: 12px;
          height: 46px;
          line-height: 46px;
          padding: 0 19px;
          display: flex;
          cursor: pointer;
          i {
            @include bindicBg(16px,
            46px);
            background-size: 100% auto;
            background-image: url("../../img/order/gwc_icon_fuxuankuang.png");
            margin-right: 10px;
          }
        }
        > .act {
          i {
            background-image: url("../../img/order/gwc_fuxuankuang_pre.png");
          }
        }
      }
      & > ul > li.act,
      & > ul > li:hover,
      & > ul > li > ul > li:hover,
      & > ul > li > ul > li.act {
        background-color: #fff;
        border-color: #e5e5e5;
        color: #f50;
        i {
          background-image: url("../../img/goodsDetails/sy_nav_icon_xiala_y.png");
        }
      }
      & > ul > li:hover > ul {
        display: block;
      }
      & > ul > li:hover > .input_box {
        background-color: #fff;
        box-shadow: 0px 0px 20px 0px #ccc;
        button {
          display: inline-block;
        }
      }
    }
  }
}
</style>
