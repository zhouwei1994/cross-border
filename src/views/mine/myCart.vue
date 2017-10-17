<template>
  <div class="my-cart">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('head.cart')}}
      </div>
    </div>
    <div class="content page-center">
      <div class="c-title">{{$t('myCart.myShoppingCart')}}</div>
      <div v-if='cartList.length>0'>
        <div class="order-detail">
          <div class="o-goods-table">
            <div class="th">
              <div class="slelc" style="width:155px;">
                <span class="ic-checkbox" :class="{'act':allSelect}" @click="allSelectClick"></span>
                <span>{{$t('myCart.selectAll')}}</span>
              </div>
              <div class="goods-desc">{{$t('myCart.commodity')}}</div>
              <div>{{$t('myCart.unitPrice')}}</div>
              <div>{{$t('myCart.quantity')}}</div>
              <div>{{$t('myCart.subtotal')}}</div>
              <div>{{$t('myCart.operating')}}</div>
            </div>
            <div class="tr border-b" v-for="(item,index) of cartList">
              <div>
                <span class="ic-checkbox" :class="{'act':item.select}" @click="selectGoods(index)"></span>
              </div>
              <div class="goods-desc">
                <div class="goodsImg">
                  <img :src="item.imgUrl">
                </div>
                <div>
                  <div class="goods-name">
                    <div @click="pageJump(item.visitUrl)">{{$i18n.locale == 'zh_CN' ? item.name : completed[item.translationIndex]}}</div>
                  </div>
                  <div class="goods-type">
                    <div class="goods_Box" :style="{zIndex:100-index}">
                      <span>{{$t('myCart.viewTheParameters')}}</span>
                      <div class="goodsParameter">
                        <p class="arrow"></p>
                        <ul v-if="item.productList.length > 0">
                          <li :class="{'whiteSpace':($i18n.locale == 'zh_CN' ? i.name : completed[i.translationIndex] || i.name).length > 40}" v-for="i of item.productList">{{$i18n.locale == 'zh_CN' ? i.name : completed[i.translationIndex] || i.name}}</li>
                        </ul>
                        <div v-else>{{$t('mineCenter.nothing')}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="goods-price">
                <span class="">{{$store.state.exchangeRate.symbol}}</span>{{item.price | currency}}</div>
              <div class="goods-num">
                <div class="num-select">
                  <div class="cu" :class="{'no-click':item.productNumber <= 1}" @click="numPlus(index,item.productNumber)"></div>
                  <div>
                    <input type="text" v-model="item.productNumber" @input="numChange(index,item.productNumber)">
                  </div>
                  <div class="cu" @click="numReduce(index,item.productNumber)"></div>
                </div>
              </div>
              <div class="goods-total">{{$store.state.exchangeRate.symbol}}{{item.price * item.productNumber | currency}}</div>
              <div class="goods-operate red-hover" @click="deleteCart(index,item.objId)">{{$t('myCart.delete')}}</div>
            </div>
          </div>
        </div>
        <div class="cart-info ub ub-ac ub-pj">
          <div class="c-o-hover" @click="deleteSelect">{{$t('myCart.deleteSelectedItems')}}</div>
          <div class="ub ub-ac ui-hp">
            <span class="checked-num">{{$t('myCart.chosen')}}
              <span class="main-color">{{allNum}}</span> {{$t('myCart.piecesOfMerchandise')}}</span>
            <span>{{$t('myCart.total')}}：</span>
            <span class="main-color f-24">{{$store.state.exchangeRate.symbol}}{{total | currency}}</span>
            <div class="create-order bc-do-btn ub ub-ac ub-pc" @click="settlement">{{$t('myCart.toSettle')}}</div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <div class="no-data-img bc-cart"></div>
        <div class="no-data-msg">
          {{$t('myCart.shoppingCartTurnedOutToBeEmpty')}}
          <router-link class='a-hover' to='/index'>{{$t('myCart.casuallyStrollIt')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { openGoodsLink } from '@/service/main/index'
import { buyercarInfo, buyercarUpdate, buyercarDelete, translate } from '@/service/main/goods'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      cartList: [],
      allSelect: true,
      total: 0,
      allNum: 0,
      selectedCart: [],
      translation: [],
      completed: [],
    }
  },
  created() {
    this.getMyCart();
  },
  computed: {

  },
  watch: {

  },
  methods: {
    ...mapMutations([
      'setOrderSubmitInfo',
    ]),
    pageData() {
      this.getTranslate(this.translation).then(
        data => {
          this.completed = data;
        }
      )
    },
    getMyCart() {
      const _this = this;
      let translationStatistics = new Array();
      let translationIndex = 0;
      buyercarInfo(this.$store.state.locale.type).then(
        data => {
          for (var item of data.data) {
            item.select = true;
            item.productList = [];
            translationStatistics.push({index:translationIndex,text:item.name});
            item.translationIndex = translationIndex;
            translationIndex++;
            if(item.productText){
              item.productText = item.productText.split('#');
              for (var text of item.productText) {
                translationStatistics.push({index:translationIndex,text:text});
                item.productList.push({ translationIndex: translationIndex, name: text });
                translationIndex++;
              }
            }
          }
          _this.translation = translationStatistics;
          this.cartList = data.data;
          this.pageData();
          this.selectStatistics();
        }
      );
    },
    //选择商品 -取消选择
    selectGoods(index) {
      this.cartList[index].select = !this.cartList[index].select;
      this.selectStatistics();
    },
    //全选-取消全选
    allSelectClick() {
      if (this.allSelect) {
        for (var item of this.cartList) {
          item.select = false;
        }
        this.allSelect = false;
      } else {
        for (var item of this.cartList) {
          item.select = true;
        }
        this.allSelect = true;
      }
      this.selectStatistics();
    },
    //判断选择了几个
    selectStatistics() {
      let state = true;
      let total = 0;
      let allNum = 0;
      let selectedCart = [];
      for (var item of this.cartList) {
        if (item.select == false) {
          state = false;
        } else {
          total += item.price * item.productNumber;
          allNum += item.productNumber;
          selectedCart.push(item);
        }
      }
      this.allSelect = state;
      this.total = total;
      this.allNum = allNum;
      this.selectedCart = selectedCart;
    },
    numPlus(index, num) {
      let parNum = parseInt(num);
      const _this = this;
      if (parNum > 1) {
        this.modriyNum(index, parNum - 1, function() {
          _this.cartList[index].productNumber = parNum - 1;
          _this.selectStatistics();
        })
      }
    },
    numReduce(index, num) {
      let parNum = parseInt(num);
      const _this = this;
      this.modriyNum(index, parNum + 1, function() {
        _this.cartList[index].productNumber = parNum + 1;
        _this.selectStatistics();
      })
    },
    pageJump(url){
      openGoodsLink(this, url, true);
    },
    numChange(index, num) {
      let parNum = parseInt(num);
      const _this = this;
      if (parNum >= 1) {
        this.modriyNum(index, parNum, function() {
          _this.selectStatistics();
        })
      } else {
        _this.cartList[index].productNumber = 1;
      }
    },
    modriyNum(index, num, callback) {
      buyercarUpdate(this.cartList[index].objId, num).then(
        data => {
          if (data.success) {
            callback();
          }
        }
      );
    },
    deleteCart(index, id) {
      const _this = this;
      this.$parent.$refs.confirm.show(this.$t('myCart.areYouSureYouWantToDeleteThisItem'), true, function() {
        buyercarDelete(id).then(
          data => {
            if (data.success) {
              _this.cartList.splice(index, 1);
              _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.successfullyDeleted'), true);
              _this.selectStatistics();
            }
          }
        );
      });
    },
    settlement() {
      if (this.allNum == 0) {
        this.$parent.$refs.confirm.tip(this.$t('myCart.pleaseSelectTheItemYouWantToBuy'), false);
      } else {
        this.setOrderSubmitInfo({
          cartList: this.selectedCart,
          total: this.total,
          allNum: this.allNum,
          type: 0
        });
        this.$router.push('/confirmOrder');
      }
    },
    deleteSelect() {
      const _this = this;
      this.$parent.$refs.confirm.show(this.$t('myCart.areYouSureYouWantToDeleteThisItem'), true, function() {
        let id = [];
        for (var item of _this.cartList) {
          if (item.select) {
            id.push(item.objId);
          }
        }
        console.log(id);
        let objId = id.join(',');
        buyercarDelete(id).then(
          data => {
            if (data.success) {
              _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.successfullyDeleted'), true);
              _this.getMyCart();
            }
          }
        );
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
@import '../../style/order';
@import '../../style/noData';
.my-cart {
  .o-goods-table {
    border: none;
    margin-top: 0;
    padding-bottom: 0;
    margin-bottom: 30px;
    .common-tr {
      font-size: rem(14);
      padding: 0 44px 0 20px;
      background: #FFFFFF;
      &>div:first-child {
        padding: 0;
        width: 80px;
        -webkit-box-pack: start;
        .ic-checkbox,
        .ic-checked {
          margin-right: 8px;
        }
      }
      &>div:nth-child(2) {}
      &>div:nth-child(3) {
        width: 128px;
        font-size: rem(14);
      }
      &>div:nth-child(4) {
        width: 136px;
      }
      &>div:nth-child(5) {
        font-size: rem(14);
        width: 148px;
        -webkit-box-orient: vertical;
        p {
          font-size: rem(12);
          color: #999;
          font-weight: normal;
        }
      }
      &>div:nth-child(6) {
        width: 84px;
      }
    }
    .th {
      background: #fff;
      color: #666;
      margin-bottom: 30px;
      text-align: center;
      .slelc {
        display: flex;
      }
      &>div {
        .ic-checkbox {
          position: relative;
          top: 50%;
          left: 0px;
          transform: translateY(-50%);
        }
      }
    }
    .tr {
      height: 122px;
      .goods-desc {
        padding-left: 0;
      }
      .ic-checkbox {
        position: relative;
        top: 50%;
        left: 0px;
        transform: translateY(-50%);
      }
    }
    .num-select {
      @include bindModified(36, 92px, 24px);
      position: relative;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .cu {
        cursor: pointer;
        line-height: 22px;
      }
    }
    .goods-operate {
      line-height: 121px;
      text-align: center;
    }
  }
  .cart-info {
    height: 48px;
    background: #fff;
    font-size: rem(14);
    padding-left: 26px;
    .create-order {
      padding: 0px 10px;
      min-width: 120px;
      height: 100%;
      margin-left: 56px;
      font-size: 20px;
      color: #fff;
    }
    .checked-num {
      margin-right: 73px;
    }
  }
}

.bc-cart {
  width: 226px;
  height: 139px;
  background-image: url(../../img/order/gwc_bg_kzt.png);
  background-size: cover;
}
</style>
