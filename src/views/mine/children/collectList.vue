<template>
  <div>
    <div class="m-r-title">{{$t('head.myCollection')}}</div>
    <div v-if="collectList.length > 0">
      <div class='collect-list'>
        <div class="goods" v-for="(item,index) of collectList">
          <img v-lazyload="item.imgUrl" @click="collectSee(item.visitUrl)" />
          <div class="goods-name ellipsis">{{$i18n.locale == 'zh_CN' ? item.name : completed[item.translationIndex] || item.name}}</div>
          <div class="goods-price">
            <span class="price-unit">{{$store.state.exchangeRate.symbol}}</span>{{item.price | currency}}</div>
          <div class="cancel" @click="deleteCollect(index,item.objId)">{{$t('component.cancel')}}</div>
        </div>
      </div>
      <page :current-page="pageNo" :total="totalSize" @current-change="getCollectList"></page>
    </div>
    <div class="no-data" v-if="collectList.length <= 0 && pageNo == 1">
      <div class="no-data-img bc-collect"></div>
      <div class="no-data-msg">
        {{$t('mineCenter.noCollectionOfAnyGoodsOh')}}
        <router-link class='a-hover' to='/index'>{{$t('myCart.casuallyStrollIt')}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { userSelectCollect, userDeleteCollect } from '@/service/main/mine'
import page from '@/components/common/page'
import { translate } from '@/service/main/goods'
import { openGoodsLink } from '@/service/main/index'
export default {
  components: {
    page
  },
  data() {
    return {
      collectList: [],
      pageNo: 1,
      pageSize: 9,
      totalSize: 1,
      translation: [],
      completed: [],
    }
  },
  created() {
    this.getCollectList();
  },
  methods: {
    pageData() {
      this.getTranslate(this.translation).then(
        data => {
          this.completed = data;
        }
      )
    },
    getCollectList(val) {
      if (val) {
        this.pageNo = val;
      }
      const _this = this;
      let translationStatistics = new Array();
      let translationIndex = 0;
      userSelectCollect(_this.$store.state.locale.type, _this.pageNo, _this.pageSize).then(
        data => {
          if (data.success) {
            for (var item of data.data.dataList) {
              translationStatistics.push({ index: translationIndex, text: item.name });
              item.translationIndex = translationIndex;
              translationIndex++;
            }
            _this.translation = translationStatistics;
            console.log(data.data.dataList);
            this.collectList = data.data.dataList;
            this.totalSize = data.data.totalPage;
            this.pageData();
            document.body.scrollTop = 0;
          }
        }
      );
    },
    collectSee(visitUrl) {
      this.$store.commit('setGoodsDetail', { goodsLink: visitUrl });
      openGoodsLink(this, visitUrl, true);
    },
    deleteCollect(index, id) {
      userDeleteCollect(id).then(
        data => {
          if (data.success) {
            this.collectList.splice(index, 1);
            if (this.collectList.length <= 0) {
              if (this.pageNo > 1) {
                this.getCollectList(this.pageNo - 1);
              } else {
                this.getCollectList(1);
              }
            }
            this.$parent.$parent.$refs.confirm.tip(this.$t('mineCenter.cancelCollectionSuccess'), true);
          }
        }
      );
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/components/main';
@import '../../../style/noData';
.collect-list {
  @include clear;
  .goods {
    width: 306px;
    background-color: #fff;
    margin: 22px 0 0 21px;
    float: left;
    &:first-child,
    &:nth-child(3n+1) {
      margin-left: 0;
    }
    img {
      height: 306px;
      cursor: pointer;
      &:hover {}
    }
    text-align:center;
    .goods-name {
      margin-top: 29px;
      padding: 0 24px;
      font-size: 15px;
      color: #333;
    }
    .goods-price {
      padding-top: 18px;
      color: #FF681C;
      font-size: 19px;
      .price-unit {
        font-size: 13px;
      }
    }
    .cancel {
      width: 130px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      margin: 16px auto 34px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #ebebeb;
      font-size: 15px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #fff;
        border: 2px solid $main-color;
        background-color: $main-color;
      }
    }
  }
}

.bc-collect {
  width: 239px;
  height: 178px;
  background-image: url(../../../img/mine/grzx_bg.png);
  background-size: cover;
}
</style>
