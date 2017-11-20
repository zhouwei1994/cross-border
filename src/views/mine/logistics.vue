<template>
  <div class="order-detail-box">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.myOrder')}}>{{$t('orderCenter.orderDetails')}}>{{$t('logistics.logisticsDetails')}}
      </div>
    </div>
    <div class="content page-center" v-if="!pageState">
      <div class="c-title">{{$t('logistics.logisticsDetails')}}</div>
      <div class="order-content">
        <div class="order-id border-b">
          {{$t('logistics.shipmentNumber')}}：{{carryNo}}
        </div>
        <div class='content-title' v-if="!logisticsState">{{$i18n.locale == 'zh_CN' ? wuLiuType : completed[translationIndex] || wuLiuType}}</div>
        <div class='content-title' v-if="logisticsState">{{$t('logistics.toGetTheLogisticsInformationFailedPleaseContactCustomerService')}}</div>
        <div class="order-tracking" v-if="carry.length > 0">
          <div class="ot-top">
            <div class="">{{$t('orderDetail.processingTime')}}</div>
            <div class="">{{$t('orderCenter.orderInformation')}}</div>
          </div>
          <div class="logistics-status">
            <div v-for="item in carry">
              <div class="status-icon">
                <div></div>
              </div>
              <div class="ot-content status-info">
                <div class="">{{item.time}}</div>
                <div class="">{{$i18n.locale == 'zh_CN' ? item.context : completed[item.translationIndex] || item.context}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class='content-title ui-pt-24 ui-my-0'>{{$t('confirmSucceed.deliveryInformation')}}</div>
        <table class="logistics-info">
          <tr>
            <td>{{$t('orderDetail.name')}}</td>
            <td>{{address.name}}</td>
          </tr>
          <tr>
            <td>{{$t('head.shippingAddress')}}</td>
            <td>{{address.address}}</td>
          </tr>
          <tr>
            <td>{{$t('orderDetail.contactInformation')}}</td>
            <td>{{address.phone}}</td>
          </tr>
          <tr>
            <td>{{$t('mineCenter.zipCode')}}</td>
            <td v-if="address.postcode">{{address.postcode}}</td>
            <td v-else>{{$t('mineCenter.nothing')}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="page-center noData" v-if="pageState">
      <div>
        <i></i>
        <p>{{$t('logistics.toGetTheLogisticsInformationFailedPleaseContactCustomerService')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { carryInfo } from '@/service/main/order'
import { translate } from '@/service/main/goods'
export default {
  data() {
    return {
      address: {},
      carry: [],
      orderNo: '',
      carryNo: '',
      wuLiuType: '',
      translationIndex:0,
      logisticsState: false,
      pageState: false,
      translation: [],
      completed: [],
    }
  },
  created() {
    this.info();
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
    info() {
      const _this = this;
      let translationStatistics = new Array();
      let translationIndex = 0;
      carryInfo(this.$route.params.id).then(
        data => {
          if (data.success) {
            this.address = data.data.address;

            if (data.data.wuliu.status == 200) {
              for (var item of data.data.wuliu.data) {
                translationStatistics.push({index:translationIndex,text:item.context});
                item.translationIndex = translationIndex;
                translationIndex++;
              }
              this.carry = data.data.wuliu.data;
              translationStatistics.push({index:translationIndex,text:data.data.wuLiuType});
              this.translationIndex = translationIndex;
              translationIndex++;
              this.wuLiuType = data.data.wuLiuType;
              _this.translation = translationStatistics;
              this.logisticsState = false;
            } else {
              this.logisticsState = true;
            }
            this.carryNo = data.data.carryNo;
            this.orderNo = data.data.orderNo;
            this.pageState = false;
            this.getTranslate(this.translation).then(
              data => {
                this.completed = data;
              }
            )
          } else {
            this.pageState = true;
          }
        }
      );
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
@import '../../style/order';
@import '../../style/orderDetail';
.ui-my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.order-content {
  padding-bottom: 69px;
  .order-id {}
  .content-title {
    margin: 48px 0;
    font-size: rem(18);
  }
  .order-tracking {
    background: #fff;
    margin-bottom: 0;
    .ot-top {
      margin-bottom: 13px;
    }
    .ot-content {
      font-size: rem(14);
      padding-top: 0;
      -webkit-box-align: center;
    }
  }
  .logistics-info {
    font-size: rem(14);
    color: #666;
  }
}

.logistics-status {
  &>div {
    display: -webkit-box;
    display: -moz-box;
    width: 100%;
    border-width: 6px 0;
    padding-bottom: 10px;
    position: relative;
  }
  /*去除首尾的竖线*/
  &>div:first-child {
    .status-icon::after {
      top: 6px;
    }
  }
  &>div:last-child {
    .status-icon::after {
      height: 6px;
      bottom: inherit;
    }
  }
  .status-icon {
    display: flex;
    width: 6px;
    height: 100%;
    margin-right: 20px;
    &::after {
      content: "";
      background: #EEEDED;
      display: block;
      width: 1px;
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 2.5px;
    }
    div {
      background: #c9c9c9;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      position: absolute;
      top: 6px;
      z-index: 2;
    }
  }
  /*当前状态*/
  &>div.act {
    .status-info {
      color: #89c479;
    }
    .status-icon {
      div {
        background-color: $main-color;
      }
    }
  }
  .status-info {
    flex: 1;
  }
}
</style>
