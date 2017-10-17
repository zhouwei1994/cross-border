<template>
  <div class="goods-type">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('head.Categories')}}
      </div>
    </div>
    <div class="page-center">
      <div class="c-title">{{$t('head.Categories')}}</div>
      <div class="goods-type-detail" v-for='(item,index) in goodsTypeList' :key='index' :objId='item.objId'>
        <div class="type-title ub ub-ac border-b">
          <span class="ic-goods-type" :class='item.webClass' :style="{'background-image':'url('+item.iconUrl+')'}"></span>
          <span class="desc">{{item.name}}</span>
        </div>
        <div class="type-content" v-for='(childItem,i) in item.child'>
          <div class="twoLevelTitle">{{childItem.name}}</div>
          <div class="threeText">
            <span class="c-o-hover" v-for='(threeItem,s) in childItem.three' @click="$router.push({'path':'/searchList?searchKey='+threeItem.name})">{{threeItem.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { category } from '@/service/main/index'
const testGoodsList = [];
export default {
  data() {
    return {
      goodsTypeList: {},
    }
  },
  created() {
    this.pageData();
  },
  methods: {
    pageData() {
      category().then(
        data => {
          if (data.success) {
            this.goodsTypeList = data.data;
            this.$store.commit('setGoodsTypeList', this.goodsTypeList);
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/components/main';
@import '../../style/goodsType';
.goods-type {}

.goods-type-detail {
  padding: 0 32px;
  .ic-goods-type {
    margin-right: 12px;
  }
  .type-title {
    height: 50px;
    padding-top: 10px;
    margin-bottom: 0;

  }
  .type-content {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px dashed #ddd;
    padding-left: 34px;
    .twoLevelTitle {
      width: 260px;
      color: #6f6f6f;
      font-size: 14px;
      padding: 8px 0px;
      flex-shrink: 0;
      font-weight: bold;
    }
    .threeText {
      flex: 1;
      padding-top: 8px;
      text-align: left;
      span {
        display: inline-block;
        margin-right: 20px;
        font-size: 12px;
        margin-bottom: 8px;
        color: #666;
      }
    }
  }
}

.page-center .goods-type-detail:nth-child(2) {
  .type-title {
    padding-top: 0px;
  }
}
.goods-type-detail:last-child {
  padding-bottom: 32px;
}
</style>
