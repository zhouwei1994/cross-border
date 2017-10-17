<template>
  <div class="confirm-order">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('goodsTypeDetail.productDetails')}}>{{$t('confirmOrder.submitOrder')}}
      </div>
    </div>
    <div class="content page-center">
      <div class="c-title">{{$t('confirmOrder.submitOrder')}}</div>
      <div class="order-detail">
        <div class="address-title">{{$t('head.shippingAddress')}}</div>
        <div class="line ub ub-ac ub-pj" v-show="defaultAddress.phone">
          <div class="line-right">
            <span class="ic-selected"></span>
            <div>{{defaultAddress.name}}&nbsp;&nbsp;&nbsp;{{defaultAddress.phone}}&nbsp;&nbsp;&nbsp;{{defaultAddress.address}}&nbsp;&nbsp;&nbsp;{{defaultAddress.postcode}}</div>
          </div>
        </div>
        <div class="add-adrress">
          <div class="add-btn bc-do-btn" @click="$router.push('/confirmOrder/address?state=0')">{{$t('confirmOrder.manageTheShippingAddress')}}</div>
        </div>
        <div class="address-title">{{$t('confirmOrder.paymentMethod')}}</div>
        <div class="line line-right">
          <span class="ic-selected"></span>{{$t('confirmOrder.lineToPayBankCardTransferTheSpecificOperationPleaseReferTo')}}&nbsp;
          <a class="main-color a-hover" @click="PayJump('/helpCenter/payType')">{{$t('confirmOrder.paymentMethod')}}</a>
        </div>
        <div class="address-title line-p-t">{{$t('confirmOrder.freight')}}</div>
        <div class="line line-right">
          <span class="ic-selected"></span>{{$t('confirmOrder.pleaseFirstContactWithTheCustomerService')}}&nbsp;
          <a class="main-color a-hover" @click="PayJump('/helpCenter/cost')">{{$t('confirmOrder.costEstimate')}}</a>
        </div>
        <div class="address-title line-p-t">{{$t('confirmOrder.listOfGoods')}}</div>
        <div class="o-goods-table">
          <div class="th">
            <div class="goods-desc">{{$t('goodsTypeDetail.productName')}}</div>
            <div>{{$t('myCart.unitPrice')}}</div>
            <div>{{$t('myCart.quantity')}}</div>
            <div>{{$t('myCart.total')}}</div>
          </div>
          <div class="tr" v-for="(item,index) of orderSubmit">
            <div class="goods-desc">
              <div class="goodsImg">
                <img :src="item.imgUrl">
              </div>
              <div>
                <div class="goods-name">
                  <div class="name" @click="pageJump(item.visitUrl)" v-if="orderSubmitInfo.type != 2">{{$i18n.locale == 'zh_CN' ? item.name : completed[item.translationIndex] || item.name}}</div>
                  <div class="linkOrder" v-else>
                    <p @click="pageJump(item.visitUrl)">未知</p>
                    <span>（链接下单）</span>
                  </div>
                </div>
                <div class="goods-type">
                  <div class="goods_Box" :style="{zIndex:100-index}">
                    <span>{{$t('myCart.viewTheParameters')}}</span>
                    <div class="goodsParameter">
                      <p class="arrow"></p>
                      <ul v-if="item.productArr.length > 0">
                        <li :class="{'whiteSpace':($i18n.locale == 'zh_CN' ? i.name : completed[i.translationIndex] || i.name).length > 40}" v-for="i of item.productArr">{{$i18n.locale == 'zh_CN' ? i.name : completed[i.translationIndex] || i.name}}</li>
                      </ul>
                      <div v-else>{{$t('mineCenter.nothing')}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="goods-price" v-if="orderSubmitInfo.type != 2">
              <span class="">{{$store.state.exchangeRate.symbol}}</span>{{item.price | currency}}
            </div>
            <div class="goods-price" v-else>
              未知
            </div>
            <div class="goods-num" v-if="orderSubmitInfo.type != 2">{{item.productNumber}}</div>
            <div class="goods-num" v-else>未知</div>
            <div class="goods-total" v-if="orderSubmitInfo.type != 2">{{$store.state.exchangeRate.symbol}}{{item.price * item.productNumber | currency}}</div>
            <div class="goods-total" v-else>未知</div>
          </div>
        </div>
        <div class="order-info">
          <div class="o-remark">
            <div class="o-r-name">{{$t('confirmOrder.buyerMessage')}}：</div>
            <div class="auto-textarea">
              <span>{{remark}}</span>
              <textarea v-model="remark" maxlength="200" :placeholder="$t('confirmOrder.optionalDescriptionOfThisTransaction')"></textarea>
              <div class="max-size">{{remark.length}}/200</div>
            </div>
          </div>
          <div class="o-amount">
            <div>
              <span>{{$t('confirmOrder.numberOfGoods')}}：</span>
              <span v-if="orderSubmitInfo.type != 2">{{orderSubmitInfo.allNum}}{{$t('confirmOrder.pieces')}}</span>
              <span v-else>未知</span>
            </div>
            <div>
              <span>{{$t('confirmOrder.totalAmount')}}：</span>
              <span>{{$store.state.exchangeRate.symbol}}{{orderSubmitInfo.total | currency}}</span>
            </div>
            <div>
              <span>{{$t('confirmOrder.freight')}}：</span>
              <span>{{$t('confirmOrder.toBeCommunicated')}}</span>
            </div>
            <div>
              <span>{{$t('confirmOrder.serviceCharge')}}：</span>
              <span>{{$store.state.exchangeRate.symbol}}{{orderSubmitInfo.total | ratio | currency}}</span>
            </div>
            <div class="order-total">
              <span>{{$t('confirmOrder.amountsPayable')}}：</span>
              <span>{{$t('confirmOrder.toBeCommunicated')}}</span>
            </div>
            <div class="tip">
              <div>（{{$t('confirmOrder.serviceFee')}}）
                <div class="goodsParameter">
                  <p class="arrow"></p>
                  <ul>
                    <li v-for="(item,index) of $store.state.ratio">
                      <span v-if="item.max === ''">
                        {{ $t('confirmOrder.theTotalPriceOfTheOrderIsGreater') | replace($store.state.exchangeRate.symbol+currency(item.min),'SS') | replace(item.cost * 100+'%','XX')}}
                        <!-- 订单总价大于{{$store.state.exchangeRate.symbol}}{{item.min | currency}}收取服务费为总价的{{item.cost * 100}}% -->
                      </span>
                      <span v-else-if="item.cost <= 1">
                        {{ $t('confirmOrder.TheTotalAmountOfOrdersChargedBetween') | replace($store.state.exchangeRate.symbol+currency(item.min)+'-'+$store.state.exchangeRate.symbol+currency(item.max),'SS') | replace(item.cost * 100+'%','XX')}}
                        <!-- 订单总价在{{$store.state.exchangeRate.symbol}}{{item.min | currency}}-{{$store.state.exchangeRate.symbol}}{{item.max | currency}}之间收取服务费为总价的{{item.cost * 100}}% -->
                      </span>
                      <span v-else>
                        {{ $t('confirmOrder.TheTotalAmountOfOrdersChargedBetweenServiceFee') | replace($store.state.exchangeRate.symbol+currency(item.min)+'-'+$store.state.exchangeRate.symbol+currency(item.max),'SS') | replace($store.state.exchangeRate.symbol+currency(item.cost),'XX')}}
                        <!-- 订单总价在{{$store.state.exchangeRate.symbol}}{{item.min | currency}}-{{$store.state.exchangeRate.symbol}}{{item.max | currency}}之间收取服务费为{{$store.state.exchangeRate.symbol}}{{item.cost | currency}} -->
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div></div>
            </div>
            <div class="line-b"></div>
          </div>
        </div>
        <div class="commit-box">
          <div class="commit-btn cu-po" @click="getorderByCar">{{$t('confirmOrder.submitOrder')}}</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { orderByCar, orderByPro, getRatio, buyercar } from '@/service/main/order'
import { userSelectDefaultAddress } from '@/service/main/mine'
import { translate } from '@/service/main/goods'
import { openGoodsLink } from '@/service/main/index'
export default {
  data() {
    return {
      orderSubmit: [],
      remark: '',
      rulesView: false,
      translation: [],
      completed: [],
    }
  },
  mounted() {
    this.pageData();
    let translationStatistics = new Array();
    let translationIndex = 0;
    var orderSubmit = JSON.parse(JSON.stringify(this.orderSubmitInfo.cartList));
    for (var item of orderSubmit) {
      item.productArr = [];
      translationStatistics.push({ index: translationIndex, text: item.name });
      item.translationIndex = translationIndex;
      translationIndex++;
      for (var text of item.productText) {
        item.productArr.push({ translationIndex: translationIndex, name: text });
        translationStatistics.push({ index: translationIndex, text: text });
        translationIndex++;
      }
    }
    console.log(orderSubmit);
    this.orderSubmit = orderSubmit;
    this.translation = translationStatistics;
    this.getTranslate(translationStatistics).then(
      data => {
        this.completed = data;
      }
    )
    console.log(this.orderSubmitInfo);
  },
  computed: {
    ...mapState([
      'orderSubmitInfo',
      'defaultAddress'
    ]),
  },
  methods: {
    ...mapMutations([
      'getOrderSubmitInfo',
      'setAddressInfo',
      'getAddressInfo'
    ]),
    pageData() {
      if (!this.orderSubmitInfo.total) {
        this.getOrderSubmitInfo();
      }
      if (this.defaultAddress.objId) {
        this.getAddressInfo();
      }
      this.getAddress();
    },
    getAddress() {
      userSelectDefaultAddress(this.$store.state.locale.type).then(
        data => {
          if (data.success) {
            data.data.lang = this.$store.state.locale.type;
            this.setAddressInfo(data.data);
          }
        }
      );
    },
    getorderByCar() {
      let id = [], msg = '', thaMsg = '';
      let cartList = this.orderSubmitInfo.cartList[0];
      for (var item of this.orderSubmitInfo.cartList) {
        id.push(item.objId);
      }
      id = id.join(',');
      if (this.defaultAddress.lang == 'th') {
        thaMsg = this.remark;
      } else {
        msg = this.remark;
      }
      if (!this.defaultAddress.objId) {
        this.$parent.$refs.confirm.tip('confirmOrder.shippingAddressIsEmpty', false);
      } else {
        if (this.orderSubmitInfo.type == 0) {
          orderByCar(this.defaultAddress.lang, '', id, msg, this.defaultAddress.objId, thaMsg).then(
            data => {
              if (data.success) {
                this.$parent.cartNum();
                this.$router.push('/confirmSucceed/' + data.data.objId);
              } else if (data.msg == "无商品数据") {
                this.$parent.$refs.confirm.tip(this.$t('confirmOrder.theProductDoesNotExist'), false);
              }
            }
          );
        } else if (this.orderSubmitInfo.type == 1) {
          orderByPro(this.defaultAddress.lang, '', msg, this.defaultAddress.objId, thaMsg, cartList.productNo, cartList.name, cartList.imgUrl, cartList.visitUrl, cartList.price, cartList.productNumber, cartList.productText.join('#')).then(
            data => {
              if (data.success) {
                this.$router.push('/confirmSucceed/' + data.data.objId);
              } else if (data.msg == "无商品数据") {
                this.$parent.$refs.confirm.tip(this.$t('confirmOrder.theProductDoesNotExist'), false);
              }
            }
          );
        } else if (this.orderSubmitInfo.type == 2) {
          console.log(cartList.visitUrl);
          buyercar(cartList.visitUrl, cartList.productText.join('#'),this.defaultAddress.lang,this.defaultAddress.objId).then(
            data => {
              if (data.success) {
                this.$router.push('/confirmSucceed/' + data.data.objId);
              }
            }
          );
        }
      }
    },
    PayJump(url) {
      window.open(document.location.protocol + '//' + window.location.host + url);
    },
    pageJump(url) {
      openGoodsLink(this, url, true);
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
@import '../../style/order';
.confirm-order {
  .content {}
}

.order-detail {
  padding: 0 30px;
  background: #FFFFFF;
  .order-info {
    line-height: 1;
    padding: 0 38px 0 44px;
    @include clear;
    .o-amount {
      float: right;
      margin-top: 36px;
      display: -webkit-box;
      display: -moz-box;
      -webkit-box-align: end;
      -webkit-box-orient: vertical;
      &>div {
        text-align: right;
        margin-bottom: 14px;
        font-size: rem(18);
        color: #333;
        >span:first-child {}
        >span:last-child {
          display: inline-block;
          width: 200px;
        }
      }
      .order-total {
        font-size: 20px;
        font-weight: bold;
        margin: 8px 0;
        span:last-child {
          font-size: 22px;
          color: $main-color;
        }
      }
      .tip {
        font-size: 14px;
        color: #666;
        display: flex;
        >div:first-child {
          cursor: pointer;
          position: relative;
          .goodsParameter {
            position: absolute;
            display: none;
            top: calc(100% + 15px);
            left: 50%;
            transform: translateX(-50%);
            padding: 10px;
            text-align: left;
            box-shadow: 0px 1px 5px 0px #ccc;
            z-index: 1000;
            background-color: #FFF;
            .arrow {
              position: absolute;
              top: -10px;
              left: 50%;
              width: 0;
              height: 0;
              transform: translateX(-50%);
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 10px solid #eee;
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
            ul {
              li {
                font-size: 12px;
                color: #333;
                white-space: nowrap;
                padding-bottom: 10px;
              }
              li:last-child {
                padding-bottom: 0px;
              }
            }
          }
          &:hover {
            color: #FF681C;
            .goodsParameter {
              display: block;
            }
          }
        }
        >div:last-child {
          display: inline-block;
          width: 200px;
          flex-shrink: 0;
        }
      }
      .line-b {
        margin: 11px 0 0;
        @extend .current-bb;
        width: 420px;
      }
    }
    .o-remark {
      @include clear;
      float: left;
      margin-top: 27px;
      .o-r-name {
        float: left;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        color: #333;
      }
      .auto-textarea {
        float: left;
        margin-left: 7px;
        min-height: 36px;
        span,
        textarea {
          width: 428px;
          max-height: 157px;
          line-height: 20px;
          font-size: 14px;
          padding-left: 7px;
          border: 2px solid #eee;
          padding: 5px;
          color: #333;
        }
        .max-size {
          position: absolute;
          height: 8px;
          line-height: 1;
          font-size: 12px;
          color: #999999;
          bottom: -16px;
          right: 0;
        }
      }
    }
  }
}
</style>
