<template>
  <div class="confirmSucceed">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('goodsTypeDetail.productDetails')}}>{{$t('confirmOrder.submitOrder')}}
      </div>
    </div>
    <div class="content page-center">
      <div class="c-title">{{$t('confirmOrder.submitOrder')}}</div>
      <div class="succeed-box">
        <div class="ub">
          <span class="ic-succeed"></span>
          <div class="s-detail ub ub-pj ui-wp flex-1">
            <div class="s-tip">
              <p class="ui-mt-6 f-24 color-333">{{$t('confirmSucceed.customerServiceSisterIsConfirmedInThe')}}</p>
              <p class="ui-mt-44 f-16 color-666">{{$t('confirmSucceed.pleaseBePatientWaitingForMySisterToContactYou')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="order-info">
        <div>
          <span>{{$t('confirmSucceed.orderNumber')}}</span>
          <span>：&nbsp;
            <span class="main-color">{{orderNo}}</span>
          </span>
        </div>
        <div>
          <span>{{$t('confirmSucceed.deliveryInformation')}}</span>
          <span>：&nbsp;{{addressBO.name}}&nbsp;{{addressBO.phone}}&nbsp;{{addressBO.address}}&nbsp;{{addressBO.postcode}}</span>
        </div>
        <div>
          <span>{{$t('goodsTypeDetail.productName')}}</span>
          <span>：<span v-if="productName[0] != 0">&nbsp;{{$i18n.locale == 'zh_CN' ? productName[0] : translated || productName[0]}}</span>
          <span v-else>{{$t('orderCenter.unknown')}}</span>
            <span v-if="productName.length >1">{{$t('confirmSucceed.suchAsPiecesOfGoods') | replace(productName.length)}}</span>
          </span>
        </div>
        <div>
          <span>{{$t('confirmOrder.freight')}}</span>
          <span>：&nbsp;{{$t('confirmOrder.toBeCommunicated')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderInfo } from '@/service/main/order'
export default {
  data() {
    return {
      addressBO: {},
      productName: [],
      orderNo: '',
      translated: '',
    }
  },
  created() {
    this.info();
  },
  methods: {
    pageData() {
      console.log(123);
      this.getTranslate(this.productName[0], true,false).then(
        data => {
          console.log(data);
          this.translated = data;
        }
      )
    },
    info() {
      const _this = this;
      orderInfo(this.$route.params.id).then(
        data => {
          if (data.success) {
            this.addressBO = data.data.addressBO;
            this.productName = data.data.productName;
            this.orderNo = data.data.orderNo;
            this.pageData();
          }
        }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/components/main';
.confirmSucceed {
  .succeed-box {
    padding: 55px 51px 0;
    background: #FFFFFF;
    .s-tip {
      line-height: 1;
      .f-24 {
        height: 24px;
      }
      .f-16 {
        height: 16px;
      }
    }
    .s-detail {
      padding-bottom: 67px;
      border-bottom: 1px solid #eee;
      .s-total {
        line-height: 1;
        padding-top: 12px;
      }
      .service-charge {
        margin-top: 12px;
      }
    }
  }
  .order-info {
    background: #fff;
    padding: 26px 0 69px 225px;
    font-size: 16px;
    color: #666;
    &>div {
      padding-right: 20px;
      line-height: 38px;
      &>span {
      }
      &>span:first-child {
        min-width: 70px;
      }
    }
  }
}

.ic-succeed {
  @include bindicBg(98px, 98px);
  background-image: url('../../img/order/succeed.png');
  margin: 0 61px 0 14px;
}
</style>
