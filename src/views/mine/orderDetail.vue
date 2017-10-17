<template>
  <div class="order-detail-box">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('head.myOrder')}}>{{$t('orderCenter.orderInformation')}}
      </div>
    </div>
    <div class="content page-center">
      <div class="c-title">{{$t('orderCenter.orderInformation')}}</div>
      <div class="order-content">
        <div class="order-id border-b">
          {{$t('confirmSucceed.orderNumber')}}：{{orderMainBO.orderNo}}
        </div>
        <div class="order-status">
          <div class="status-item" :class="{'act':item.state == 1,'cancelIcon':item.state == 2,'cancel':item.state == 3}" v-for="(item,index) of orderState">
            <div class="line">
              <span class="ic-complete"></span>
            </div>
            <div class="status-text">{{$t(item.stateName)}}</div>
            <div class="status-date">{{item.createTime}}</div>
          </div>
        </div>
        <div class='content-title'>{{$t('orderDetail.orderTracking')}}</div>
        <div class="order-tracking">
          <div class="ot-top">
            <div class="">{{$t('orderDetail.processingTime')}}</div>
            <div class="">{{$t('orderCenter.orderInformation')}}</div>
          </div>
          <div class="ot-content" v-for="(item,index) of orderTrack">
            <div class="">{{item.createTime}}</div>
            <div v-if="item.orderStatusInfo == 3100">
              {{$t('orderDetail.youHaveCanceledTheOrder')}}
            </div>
            <div v-if="item.orderStatusInfo == 3101">
              {{$t('orderDetail.youSubmittedAnOrder')}}
            </div>
            <div v-if="item.orderStatusInfo == 3102">
              {{$t('orderDetail.youAndCustomerServiceToCompleteTheShippingAgreement')}}
            </div>
            <div v-if="item.orderStatusInfo == 3103">
              {{$t('orderDetail.youHaveCompletedThePaymentAndWeWillArrangeTheShipmentImmediately')}}
            </div>
            <div v-if="item.orderStatusInfo == 3202">
              {{$t('orderDetail.hasBeenShippedWaitingForYouToConfirmReceipt')}}
              <br />{{$t('orderDetail.waybillNumber')}}：
              <span class="orange">{{orderMainBO.carryNo}}</span> {{$t('orderDetail.youCan')}}
              <span class="orange cu-po" @click="$router.push('/logistics/'+orderMainBO.orderNo)">{{$t('orderCenter.viewLogistics')}}</span>
            </div>
            <div v-if="item.orderStatusInfo == 3301">
              {{$t('orderDetail.youHaveConfirmedReceiptTheTransactionIsSuccessful')}}
            </div>
          </div>
        </div>
        <div class='content-title ui-pt-51'>{{$t('confirmSucceed.deliveryInformation')}}</div>
        <table class="logistics-info">
          <tr>
            <td>{{$t('orderDetail.name')}}</td>
            <td>{{addressBO.name}}</td>
          </tr>
          <tr>
            <td>{{$t('head.shippingAddress')}}</td>
            <td>{{addressBO.address}}</td>
          </tr>
          <tr>
            <td>{{$t('orderDetail.contactInformation')}}</td>
            <td>{{addressBO.phone}}</td>
          </tr>
        </table>
        <div class="order-lists">
          <div class="o-goods-table">
            <div class="th">
              <div class="goods-desc">{{$t('orderCenter.orderInformation')}}</div>
              <div></div>
              <div>{{$t('orderCenter.orderStatus')}}</div>
              <div>{{$t('orderCenter.submitTime')}}</div>
              <div>{{$t('myCart.operating')}}</div>
            </div>
            <div class="">
              <div class="tr-box">
                <div class="tr-list">
                  <div class="tr" v-for="(item,index) of orderProduct">
                    <div class="goods-desc">
                      <div class="goodsImg">
                        <img :src="item.imgUrl">
                      </div>
                      <div>
                        <div class="goods-name">
                          <div @click="pageJump(item.visitUrl)">{{$i18n.locale == 'zh_CN' ? item.productName : completed[item.translationIndex] || item.productName}}</div>
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
                    <div class="num">x{{item.productNumber}}</div>
                  </div>
                </div>
                <div class="auto-height">
                  <div class="tr-status" v-if="orderMainBO.orderStatusInfo == 3100">
                    {{$t('orderCenter.tradingClosed')}}
                  </div>
                  <div class="tr-status" v-if="orderMainBO.orderStatusInfo == 3101">
                    {{$t('orderCenter.toBeConfirmed')}}
                  </div>
                  <div class="tr-status" v-if="orderMainBO.orderStatusInfo == 3102">
                    {{$t('orderCenter.pendingPayment')}}
                  </div>
                  <div class="tr-status" v-if="orderMainBO.orderStatusInfo == 3103">
                    {{$t('orderCenter.transfer')}}
                  </div>
                  <div class="tr-status" v-if="orderMainBO.orderStatusInfo == 3202">
                    {{$t('orderCenter.shipped')}}
                  </div>
                  <div class="tr-status" v-if="orderMainBO.orderStatusInfo == 3301">
                    {{$t('orderCenter.completed')}}
                  </div>
                </div>
                <div class="auto-height">
                  <div class="tr-time" v-if="orderTrack[0]">
                    {{orderTrack[0].createTime}}
                  </div>
                </div>
                <div class="auto-height">
                  <div class="order-operate">
                    <div class="bc-do-btn" v-if="orderMainBO.orderStatusInfo == 3102" @click="orderUpdate(orderMainBO.objId,3001)">{{$t('orderCenter.paymentHasBeenCompleted')}}</div>
                    <div class="bc-do-btn" v-if="orderMainBO.orderStatusInfo == 3202" @click="orderUpdate(orderMainBO.objId,3002)">{{$t('orderCenter.confirmReceipt')}}</div>
                    <div class="o-min">
                      <a class="c-o-hover" v-if="orderMainBO.orderStatusInfo == 3101 || orderMainBO.orderStatusInfo == 3102" @click="orderUpdate(orderMainBO.objId,3000)">{{$t('orderCenter.cancelOrder')}}</a>
                      <a class="c-o-hover" v-if="orderMainBO.orderStatusInfo == 3202" @click="$router.push('/logistics/'+orderMainBO.objId+'?lang='+$route.query.lang);">{{$t('orderCenter.viewLogistics')}}</a>
                      <a class="c-o-hover" v-if="orderMainBO.orderStatusInfo == 3402 || orderMainBO.orderStatusInfo == 3301 || orderMainBO.orderStatusInfo == 3100" @click="deleteOrd(orderMainBO.objId)">{{$t('orderCenter.deleteOrder')}}</a>
                      <router-link class="pay c-o-hover" to="/helpCenter/payType" target="_blank" v-if="orderMainBO.orderStatusInfo == 3102">{{$t('confirmOrder.paymentMethod')}}</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--order-lists已结束-->
        <div class="order-info">
          <div class="o-remark">
            <div>
              <p>{{$t('orderDetail.buyerNotes')}}：</p>
              <span>{{orderMainBO.msg}}</span>
            </div>
          </div>
          <div class="o-amount">
            <div>
              <span>{{$t('orderDetail.totalPriceOfGoods')}}：</span>
              <span>{{$store.state.exchangeRate.symbol}}{{orderMainBO.productTotalPrice | currency}}</span>
            </div>
            <div>
              <span>{{$t('confirmOrder.freight')}}：</span>
              <span v-if="orderMainBO.orderStatusInfo == 3101">{{$t('orderCenter.toBeConfirmed')}}</span>
              <span v-else>{{$store.state.exchangeRate.symbol}}{{orderMainBO.carryCost | currency}}</span>
            </div>
            <div>
              <span>{{$t('confirmOrder.serviceCharge')}}：</span>
              <span v-if="orderMainBO.orderStatusInfo == 3101">{{$t('orderCenter.toBeConfirmed')}}</span>
              <span v-else>{{$store.state.exchangeRate.symbol}}{{orderMainBO.serverCost | currency}}</span>
            </div>
            <div class="order-total">
              <span>{{$t('confirmOrder.amountsPayable')}}：</span>
              <span>{{$store.state.exchangeRate.symbol}}{{orderMainBO.orderTotalPrice | currency}}</span>
            </div>
            <div class="tip" v-if="orderMainBO.orderStatusInfo != 3101">
              <div>
                （{{$t('confirmOrder.serviceFee')}}）
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

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderSelectDetails, orderDelete, orderUpdateTrack, getRatio } from '@/service/main/order'
import { translate } from '@/service/main/goods'
import { openGoodsLink } from '@/service/main/index'
export default {
  data() {
    return {
      addressBO: {},
      orderMainBO: {},
      orderProduct: [],
      orderTrack: [],
      orderState: [],
      translation: [],
      completed: [],
    }
  },
  created() {
    this.orderDetail();

  },
  computed: {

  },
  watch: {

  },
  methods: {
    pageData() {
      this.getTranslate(this.translation).then(
        data => {
          this.completed = data;
        }
      )
    },
    orderDetail() {
      let orderState = [
        { createTime: '', orderStatusInfo: 3101, stateName: 'confirmOrder.submitOrder', state: 0 },
        { createTime: '', orderStatusInfo: 3102, stateName: 'orderCenter.pendingPayment', state: 0 },
        { createTime: '', orderStatusInfo: 3103, stateName: 'orderCenter.transfer', state: 0 },
        { createTime: '', orderStatusInfo: 3202, stateName: 'orderDetail.toBeReceived', state: 0 },
        { createTime: '', orderStatusInfo: 3301, stateName: 'orderDetail.theTransactionWasSuccessful', state: 0 },
      ];
      const _this = this;
      let translationStatistics = new Array();
      let translationIndex = 0;
      orderSelectDetails(this.$route.params.id).then(
        data => {
          if (data.success) {
            this.addressBO = data.data.addressBO;
            for (var item of data.data.orderProduct) {
              item.select = true;
              item.productList = [];
              translationStatistics.push({ index: translationIndex, text: item.productName });
              item.translationIndex = translationIndex;
              translationIndex++;
              if (item.productText) {
                item.productText = item.productText.split('#');
                for (var text of item.productText) {
                  translationStatistics.push({ index: translationIndex, text: text });
                  item.productList.push({ translationIndex: translationIndex, name: text });
                  translationIndex++;
                }
              }
            }
            const len = data.data.orderTrack.length;
            this.orderProduct = data.data.orderProduct;
            this.orderTrack = data.data.orderTrack;
            for (var i in orderState) {
              if (len > i && data.data.orderMainBO.orderStatusInfo == 3100) {
                orderState[i].createTime = data.data.orderTrack[i].createTime;
                if (i == len - 1) {
                  orderState[i].state = 3;
                } else {
                  orderState[i].state = 2;
                }
              } else if (len > i && data.data.orderTrack[i].orderStatusInfo == orderState[i].orderStatusInfo) {
                orderState[i].createTime = data.data.orderTrack[i].createTime;
                orderState[i].state = 1;
              }
            }
            _this.translation = translationStatistics;
            this.orderState = orderState;
            this.orderMainBO = data.data.orderMainBO;
            this.pageData()
          }
        }
      );
    },
    deleteOrd(id) {
      const _this = this;
      this.$parent.$refs.confirm.show(_this.$t('orderCenter.areYouSureYouWantToDeleteThisOrder'), true, function() {
        orderDelete(id).then(
          data => {
            if (data.success) {
              _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.successfullyDeleted'), true);
              _this.$router.go(-1);
            }
          }
        );
      });
    },

    pageJump(url) {
      openGoodsLink(this, url, true);
    },
    //修改订单状态
    orderUpdate(id, state) {
      let text = '';
      if (state == 3001) {
        text = this.$t('orderCenter.determineTheAmountOfPaymentCompleted') + " <span class='orange'>" + this.$store.state.exchangeRate.symbol + this.currency(this.orderMainBO.orderTotalPrice) + "</span>？";
      } else if (state == 3002) {
        text = this.$t('orderCenter.areYouSureYouHaveReceived');
      } else {
        text = this.$t('orderCenter.AreYouSureYouWantToCancelTheOrder');
      }
      const _this = this;
      this.$parent.$refs.confirm.show(text, true, function() {
        orderUpdateTrack(id, state).then(
          data => {
            if (data.success) {
              for (var i in _this.orderState) {
                if (state == 3000 && _this.orderState[i].state) {
                  _this.orderState[i].state = 2;
                  _this.orderState[i + 1].state = 3;
                } else if (_this.orderState[i].orderStatusInfo == state) {
                  _this.orderState[i].state = 1;
                }
              }
              if (state == 3001) {
                _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.makeSureThePaymentIsSuccessful'), true);
                _this.orderMainBO.orderStatusInfo = 3103;
              } else if (state == 3002) {
                _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.makeSureTheReceiptIsSuccessful'), true);
                _this.orderMainBO.orderStatusInfo = 3301;
              } else {
                _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.cancelOrderSuccess'), true);
                _this.orderMainBO.orderStatusInfo = 3100;
              }
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
@import '../../style/orderDetail';
.orange {
  color: $orange
}

.order-detail-box {
  .order-content {
    .order-status {
      padding: 36px 0;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      &>.status-item {
        width: 216px;
        text-align: center;
        font-size: rem(14);
        color: #666;
        &.act {
          color: $main-color;
          .ic-complete {
            background-image: url(../../img/order/wddd_icon_wancheng.png);
          }
        }
        &.cancelIcon {
          color: #666;
          .ic-complete {
            background-image: url(../../img/login/dly_icon_msg_w.png);
          }
        }
        &.cancel {
          color: #666;
          .ic-complete {
            background-image: url(../../img/login/dly_icon_default_guanbi.png);
          }
        }
        .line {
          width: 100%;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          &::before,
          &::after {
            content: '';
            display: block;
            flex: 1;
            -webkit-box-flex: 1;
            width: 100%;
            height: 2px;
            background-color: #eee;
            margin: 13px 0px;
          }
        }
        .status-text {
          margin-top: 13px;
        }
        .status-date {
          margin-top: 1px;
        }
      }
      .status-item:first-child {
        .line {
          &::before {
            background-color: transparent;
          }
        }
      }
      .status-item:last-child {
        .line {
          &::after {
            background-color: transparent;
          }
        }
      }
    }
  }
  .ic-complete {
    @include bindicBg(28px, 28px);
    background-image: url(../../img/order/wddd_icon_wancheng1.png);
  }
  .o-goods-table {
    padding-bottom: 0;
    .th>div {
      &:nth-child(3) {
        width: 140px;
      }
      &:nth-child(4) {
        width: 194px;
      }
    }
    .tr-status {
      width: 140px;
    }
    .tr-time {
      width: 194px;
      position: relative;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      text-align: center;
    }
  }
  .order-info {
    margin: 0 8px;
    padding: 46px 62px 35px 51px;
    border: 0px solid #eee;
    border-width: 0 1px 1px;
    font-size: rem(16);
    color: #666;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    .o-amount {
      &>div {
        margin-bottom: 18px;
        display: flex;
        justify-content: space-between;
        text-align: right;
        min-width: 170px;
        &>span {
          display: block;
        }
        &>span:first-child {
          width: 215px;
          padding-right: 2px;
        }
        &>span:last-child {
          padding-left: 5px;
        }
      }
      .order-total {
        font-size: 20px;
        color: #333;
        font-weight: bold;
        margin: 30px 0 10px;
        min-width: auto;
        span:first-child {
          width: auto;
          width: 215px;
          padding-right: 0px;
        }
        span:last-child {
          font-size: 24px;
          color: $main-color;
        }
      }
      .tip {
        min-width: auto;
        font-size: rem(14);
        color: #999;
        text-align: right;
        width: 215px;
        display: block;
        >div {
          cursor: pointer;
          position: relative;
          display: inline-block;
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
      }
    }
  }
}

.o-remark {
  max-width: 500px;
  &>div {
    display: flex;
    p {
      flex-shrink: 0;
    }
  }
  span {
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
