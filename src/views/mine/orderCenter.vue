<template>
  <div class="order-center">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('head.myOrder')}}
      </div>
    </div>
    <div class="content page-center">
      <div class="c-title">{{$t('head.myOrder')}}</div>
      <div class="order-lists" v-if="orderList.length>0 || type != ''">
        <ul class="order-status">
          <li :class="{'act':type == ''}" @click="orderSwitch('')">{{$t('orderCenter.allOrders')}}</li>
          <li :class="{'act':type == 3101}" @click="orderSwitch(3101)">{{$t('orderCenter.toBeConfirmed')}}</li>
          <li :class="{'act':type == 3102}" @click="orderSwitch(3102)">{{$t('orderCenter.pendingPayment')}}</li>
          <li :class="{'act':type == 3103}" @click="orderSwitch(3103)">{{$t('orderCenter.transfer')}}</li>
          <li :class="{'act':type == 3202}" @click="orderSwitch(3202)">{{$t('orderCenter.shipped')}}</li>
          <li :class="{'act':type == 3301}" @click="orderSwitch(3301)">{{$t('orderCenter.completed')}}</li>
        </ul>
        <div class="o-goods-table" v-if="orderList.length>0">
          <div class="th">
            <div class="goods-desc">{{$t('orderCenter.orderInformation')}}</div>
            <div>{{$t('myCart.quantity')}}</div>
            <div>{{$t('myCart.unitPrice')}}</div>
            <div>{{$t('orderCenter.orderStatus')}}</div>
            <div>{{$t('myCart.operating')}}</div>
          </div>
          <div class="" v-for="(item,index) of orderList">
            <div class="th-child">
              <div>
                <span>{{$t('orderCenter.orderNumber')}}：</span>
                <span class="main-color">{{item.orderNo}}</span>
                <span class="ui-ml-20">{{$t('orderCenter.submitTime')}}：</span>
                <span class="">{{item.createTime}}</span>
              </div>
              <div class="cu-po">
                <span class="ic-server"></span>
                <span class="main-color" @click="contact(item.orderNo)">{{$t('orderCenter.contactCustomerService')}}</span>
              </div>
            </div>
            <div class="tr-box">
              <div class="tr-list">
                <div class="tr" v-for="(sonItem,sonIndex) of item.orderProduct">
                  <div class="goods-desc">
                    <div class="goodsImg">
                      <img :src="sonItem.imgUrl">
                    </div>
                    <div>
                      <div class="goods-name">
                        <div class="linkOrder">
                          <p @click="pageJump(sonItem.visitUrl)">{{$i18n.locale == 'zh_CN' ? sonItem.productName : completed[sonItem.translationIndex] || sonItem.productName || '未知'}}</p>
                          <span v-if="item.mau === 1">（链接下单）</span>
                        </div>
                      </div>
                      <div class="goods-type">
                        <div class="goods_Box" :style="{zIndex:100-index}">
                          <span>{{$t('myCart.viewTheParameters')}}</span>
                          <div class="goodsParameter">
                            <p class="arrow"></p>
                            <ul v-if="sonItem.productList.length > 0">
                              <li :class="{'whiteSpace':($i18n.locale == 'zh_CN' ? i.name : completed[i.translationIndex] || i.name).length > 40}" v-for="i of sonItem.productList">{{$i18n.locale == 'zh_CN' ? i.name : completed[i.translationIndex] || i.name}}</li>
                            </ul>
                            <div v-else>{{$t('mineCenter.nothing')}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="num">x{{sonItem.productNumber}}</div>
                  <div class="ui-text-strong" v-if="sonItem.price">
                    <span class="price-unit">{{$store.state.exchangeRate.symbol}}</span>{{sonItem.price | currency}}
                  </div>
                  <div class="ui-text-strong" v-else>未知</div>
                </div>
              </div>
              <div class="auto-height">
                <div class="tr-status" v-if="item.orderStatusInfo == 3100">
                  {{$t('orderCenter.tradingClosed')}}
                </div>
                <div class="tr-status" v-if="item.orderStatusInfo == 3101">
                  {{$t('orderCenter.toBeConfirmed')}}
                </div>
                <div class="tr-status" v-if="item.orderStatusInfo == 3102">
                  {{$t('orderCenter.pendingPayment')}}
                </div>
                <div class="tr-status" v-if="item.orderStatusInfo == 3103">
                  {{$t('orderCenter.transfer')}}
                </div>
                <div class="tr-status" v-if="item.orderStatusInfo == 3202">
                  {{$t('orderCenter.shipped')}}
                </div>
                <div class="tr-status" v-if="item.orderStatusInfo == 3301">
                  {{$t('orderCenter.completed')}}
                </div>
              </div>
              <div class="auto-height">
                <div class="order-operate">
                  <div class="bc-do-btn" v-if="item.orderStatusInfo == 3102" @click="orderUpdate(item.objId,3001,index,item.orderTotalPrice)">{{$t('orderCenter.paymentHasBeenCompleted')}}</div>
                  <div class="bc-do-btn" v-if="item.orderStatusInfo == 3202" @click="orderUpdate(item.objId,3002,index)">{{$t('orderCenter.confirmReceipt')}}</div>
                  <div class="o-min">
                    <router-link :to="'/orderDetail/'+item.objId" class="c-o-hover">
                      {{$t('orderCenter.orderDetails')}}
                    </router-link>
                    <a class="c-o-hover" v-if="item.orderStatusInfo == 3101 || item.orderStatusInfo == 3102" @click="orderUpdate(item.objId,3000,index)">{{$t('orderCenter.cancelOrder')}}</a>
                    <a class="c-o-hover" v-if="item.orderStatusInfo == 3202" @click="$router.push('/logistics/'+item.orderNo)">{{$t('orderCenter.viewLogistics')}}</a>
                    <a class="c-o-hover" v-if="item.orderStatusInfo == 3402 || item.orderStatusInfo == 3301 || item.orderStatusInfo == 3100" @click="deleteOrd(item.objId,index)">{{$t('orderCenter.deleteOrder')}}</a>
                  </div>
                  <router-link class="pay c-o-hover" to="/helpCenter/payType" target="_blank" v-if="item.orderStatusInfo == 3102">{{$t('confirmOrder.paymentMethod')}}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--order-lists 已结束-->
      <div class="no-data" v-if="orderList.length<=0 && pageNo==1">
        <div class="no-data-img bc-order"></div>
        <div class="no-data-msg">
          {{$t('orderCenter.thereIsNoOrderYet')}}
          <router-link class='a-hover' to='/index'>{{$t('myCart.casuallyStrollIt')}}</router-link>
        </div>
      </div>
    </div>
    <page-box v-show="orderList.length>0 || pageNo>1" :current-page="pageNo" :total="totalSize" @current-change="setOrderList"></page-box>
  </div>
</template>
<script>
import pageBox from '@/components/common/page'
import { translate } from '@/service/main/goods'
import { openGoodsLink } from '@/service/main/index'
import { orderSelect, orderDelete, orderUpdateTrack } from '@/service/main/order'
export default {
  components: {
    pageBox
  },
  data() {
    return {
      orderList: [],
      type: '',
      pageNo: 1,
      pageSize: 3,
      totalSize: 1,
      translation: [],
      completed: [],
    }
  },
  created() {
    this.setOrderList();
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
    setOrderList(val) {
      if (val) {
        this.pageNo = val;
      }
      const _this = this;
      let translationStatistics = new Array();
      let translationIndex = 0;
      orderSelect(this.$store.state.locale.type, this.type, this.pageNo, this.pageSize).then(
        data => {
          if (data.success) {
            for (var item of data.data.dataList) {
              for (var sonItem of item.orderProduct) {
                sonItem.productList = [];
                translationStatistics.push({ index: translationIndex, text: sonItem.productName });
                sonItem.translationIndex = translationIndex;
                translationIndex++;
                if (sonItem.productText) {
                  sonItem.productText = sonItem.productText.split('#');
                  for (var text of sonItem.productText) {
                    translationStatistics.push({ index: translationIndex, text: text });
                    sonItem.productList.push({ translationIndex: translationIndex, name: text });
                    translationIndex++;
                  }
                }
              }
            }
            _this.translation = translationStatistics;
            this.orderList = data.data.dataList;
            this.totalSize = data.data.totalPage;
            this.pageData();
            document.body.scrollTop = 0;
          }
        }
      );
    },
    orderSwitch(val) {
      this.type = val;
      this.pageNo = 1;
      this.setOrderList();
    },
    //删除
    deleteOrd(id, index) {
      const _this = this;
      this.$parent.$refs.confirm.show(_this.$t('orderCenter.areYouSureYouWantToDeleteThisOrder'), true, function() {
        orderDelete(id).then(
          data => {
            if (data.success) {
              _this.orderList.splice(index, 1);
              if (_this.orderList.length <= 0) {
                if (_this.pageNo > 1) {
                  _this.setOrderList(_this.pageNo - 1);
                } else {
                  _this.setOrderList(1);
                }
              }
              _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.successfullyDeleted'), true);
            }
          }
        );
      });
    },
    //联系客服
    contact(val) {
      const _this = this;
      $zopim(function() {
        $zopim.livechat.window.show();
        $zopim.livechat.setLanguage(_this.$store.state.locale.type);
        $zopim.livechat.say(_this.$t('orderCenter.orderNumber') + '：' + val);
      });
    },
    //修改订单状态
    orderUpdate(id, state, index, price) {
      let text = '';
      if (state == 3001) {
        text = this.$t('orderCenter.determineTheAmountOfPaymentCompleted') + " <span class='orange'>" + this.$store.state.exchangeRate.symbol + this.currency(price) + "</span>？";
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
              if (state == 3001) {
                _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.makeSureThePaymentIsSuccessful'), true);
                _this.orderList[index].orderStatusInfo = 3103;
              } else if (state == 3002) {
                _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.makeSureTheReceiptIsSuccessful'), true);
                _this.orderList[index].orderStatusInfo = 3301;
              } else {
                _this.$parent.$refs.confirm.tip(_this.$t('orderCenter.cancelOrderSuccess'), true);
                _this.orderList[index].orderStatusInfo = 3100;
              }
            }
          }
        );
      });
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
@import '../../style/noData';
.confirm-order {
  .content {}
}

.o-goods-table {
  .tr-status {
    width: 168px;
  }
}

.bc-order {
  width: 267px;
  height: 151px;
  background-image: url(../../img/order/wddd_bg_kzt1.png);
  background-size: cover;
}

.pay {
  font-size: 14px;
  display: block;
}
</style>
