<template>
  <div class="index">
    <!--<div class="page-adr" v-if='pageTag'>
          			<div class="page-center ub ub-ac">
          				{{pageTag}}
          			</div>
          		</div>-->
    <div class="nav ub page-center">
      <ul class="goods-type-item">
      </ul>
      <swiper class="mod-banner-scroll" :options="swiperOption">
        <swiper-slide v-for="(item,index) of $store.state.indexSliderimgList" :key="index">
          <img :src="item.imgUrl" @click="openGoods(item.visitUrl)" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination">
        </div>
      </swiper>
    </div>
    <div class="content page-center">
      <div class="goods-type-list" v-bind:class="item.webClass" :categoryId='item.categoryId' v-for="(item,index) in indexGoodsList" :key='index'>
        <div class="title">
          <div>
            <span class="ui-mr-10">{{index+1}}F</span>
            <span>{{item.categoryName}}</span>
          </div>
          <div>
            <span class="more a-hover" @click="jumpGoodsType(item.categoryName)">{{$t('index.more')}}</span>
          </div>
        </div>
        <div class="goods-list ui-p-r">
          <div class="goods" :class="{'goodsfour':(i+1)%4 == 0}" :productNo='goods.productNo' v-for="(goods,i) in item.products" :link='goods.visitUrl' @click='openGoods(goods.visitUrl)' :key="i">
            <img v-lazyload="goods.imgUrl">
            <div class="goods-detail">
              <div class="goods-name ellipsis">{{goods.name}}</div>
              <div class="goods-desc">
                <div class="goods-price">
                  <span class="price-unit">{{$store.state.exchangeRate.symbol}}</span> {{goods.price | currency}}</div>
                <div class="buyers">{{goods.saleNum}} {{$t('index.peoplePay')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getSliderImglist, categoryHomeGoods, openGoodsLink } from '@/service/main/index'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      // goodsTypeList:[],
      indexGoodsList: [],
      goodsTypeView: false,
      //滑动配置
      swiperOption: {
        autoplay: 3000,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        observeParents: true
      }
    }
  },
  created() {
    this.pageData();
  },
  watch: {

  },
  methods: {
    pageData() {
      this.indexLoad();
    },
    indexLoad: function() {
      var _this = this;
      getSliderImglist(1101).then(
        data => {
          if (data.success) {
            _this.$store.commit("setIndexSliderimgList", data.data)
          } else {

          }
        }
      )
      categoryHomeGoods().then(
        data => {
          if (data.success) {
            console.log(data.data)
            this.indexGoodsList = data.data;
          }
        }
      )
    },
    openGoods(link) {
      console.log(123);
      openGoodsLink(this, link, true);
    },
    //跳转商品分类
    jumpGoodsType(name) {
      this.$router.push({ 'path': '/searchList?searchKey=' + name })
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
@import '../../style/goodsType';
@import '../../style/goodsList';
@import '../../../node_modules/swiper/dist/css/swiper.min.css';
.index {
  .nav {
    height: 549px;
    .mod-banner-scroll {
      @include modSwiper(549px);
      flex: 1;
      -webkit-box-flex: 1;
      background-color: #fff;
    }
    .nav-img {
      flex: 1;
      -webkit-flex: 1;
      height: 100%;
    }
  }
  .content {
    position: relative;
    .goods-type-list {
      &>.title {
        height: 58px;
        margin-top: 48px;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        .more {
          font-size: 14px;
          margin-right: 23px;
          color: #666;
        }
        .more:hover {
          color: #ff681c;
        }
      }
    }
  }
}

.price-unit {
  font-size: 12px;
}
.swiper-container-horizontal {
  .swiper-pagination.swiper-pagination-bullets {
    .swiper-pagination-bullet {
      margin: 0 7px;
      background-color: #83e9c9;
    }
    .swiper-pagination-bullet-active {
      background-color: #fff;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    background-size: 9px 15px;
    background-position: center center;
    pointer-events: auto !important;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 44px;
    opacity: 0;
    transition: all 0.5s;
  }
  .swiper-button-prev {
    background-image: url(../../img/index/sy_bannar_icon_zuo.png);
  }
  .swiper-button-next {
    background-image: url(../../img/index/sy_bannar_icon_you.png);
  }
}

.swiper-container-horizontal:hover {
  .swiper-button-prev,
  .swiper-button-next {
    opacity: 1;
  }
  div.swiper-button-disabled {
    opacity: 0;
  }
}
</style>
