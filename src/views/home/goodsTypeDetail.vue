<template>
  <div class="goods-type-list">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('head.Categories')}}>{{$t('goodsTypeDetail.listOfGoods')}}
      </div>
    </div>
    <div id="searchList" class="page-center">
      <div class="search-key c-title">{{$route.query.goodsType}}</div>
      <div class="m-sortbar ub ub-ac">
        <div class='order-by'>
          <ul>
            <li class="act">{{$t('goodsTypeDetail.IntegratedSorting')}}</li>
            <li>{{$t('goodsTypeDetail.sales')}}</li>
            <li>{{$t('goodsTypeDetail.price')}}</li>
          </ul>
        </div>
      </div>
      <div class="goods-list ui-p-r">
        <div class="goods" :productNo='goods.productNo' v-for="(goods,i) in goodsTypeList" :link='goods.visitUrl' @click='openGoodsLink(goods.visitUrl)' :key="i">
          <img :src="goods.imgUrl">
          <div class="goods-detail">
            <div class="goods-name ellipsis">{{goods.name}}</div>
            <div class="goods-desc">
              <div class="goods-price">
                <span class="price-unit"></span>{{goods.price}}</div>
              <div class="buyers">{{goods.saleNum}}{{$t('index.peoplePay')}}</div>
            </div>
          </div>
        </div>
      </div>
      <page-box v-show='goodsTypeList.length>0' :current-page="pageNo" :total="totalSize" @current-change="getGoodsTypeList"></page-box>
    </div>
  </div>
</template>
<script>
import pageBox from '@/components/common/page'
import { verifyNull } from '@/service/model/public'
import { categoryChildGoods, openGoodsLink } from '@/service/main/index'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    pageBox
  },
  data() {
    return {
      goodsTypeId: '',
      goodsTypeList: '',
      pageNo: 1,
      totalSize: 1,
    }
  },
  created() {
    let _this = this;
    this.pageDate();
  },
  computed: {
    ...mapState([
      'path',
    ]),
    searchKey: function () {
      return this.$store.state.search.searchKey
    }
  },
  watch: {
    path(val) {
      this.getGoodsTypeList();
    }
  },
  methods: {
    pageDate(){
      this.getGoodsTypeList();
    },
    openGoodsLink: function (link) {
      openGoodsLink(this, link);
    },
    getGoodsTypeList: function () {
      let _this = this;
      categoryChildGoods(this.$route.params.id, this.pageNo, 20).then((data) => {
        if (data.success) {
          _this.goodsTypeList = data.data.dataList;
          _this.totalSize = data.data.totalPage;
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/components/main';
@import '../../style/goodsList';
.goods-type-list {
  .m-sortbar {
    width: 100%;
    color: #404040;
    height: 41px;
    background-color: #f5f5f5;
    border: solid 1px #e8e8e8;
    border-collapse: collapse;
    .order-by {
      &>ul {
        @include clear;
      }
      &>ul>li {
        font-size: 12px;
        float: left;
        line-height: 39px;
        padding: 0 19px;
        border: 1px solid transparent;
        border-width: 0 1px;
        &:first-child {
          border-left-width: 0;
        }
      }
      &>ul>li.act,
      &>ul>li:hover {
        background-color: #fff;
        border-color: #e5e5e5;
        color: #f50;
      }
    }
  }
}
</style>
