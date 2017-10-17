<template>
  <div class="footer">
    <div class="connect page-center">
      <div>
        <div class="title titleRight">
          <span>{{$t('tail.aboutTpimkt')}}</span>
        </div>
        <div class="introduce">{{$t('tail.websiteIntroduction') | replace($store.state.ratio * 100)}}
          <span>《{{$t('confirmOrder.serviceFee')}}》
            <div class="goodsParameter">
              <p class="arrow"></p>
              <ul>
                <li v-for="(item,index) of $store.state.ratio">
                  <span v-if="item.max === ''">
                    {{ $t('confirmOrder.theTotalPriceOfTheOrderIsGreater') | replace($store.state.exchangeRate.symbol+currency(item.min),'SS') | replace(item.cost * 100+'%','XX')}}
                  </span>
                  <span v-else-if="item.cost <= 1">
                    {{ $t('confirmOrder.TheTotalAmountOfOrdersChargedBetween') | replace($store.state.exchangeRate.symbol+currency(item.min)+'-'+$store.state.exchangeRate.symbol+currency(item.max),'SS') | replace(item.cost * 100+'%','XX')}}
                  </span>
                  <span v-else>
                    {{ $t('confirmOrder.TheTotalAmountOfOrdersChargedBetweenServiceFee') | replace($store.state.exchangeRate.symbol+currency(item.min)+'-'+$store.state.exchangeRate.symbol+currency(item.max),'SS') | replace($store.state.exchangeRate.symbol+currency(item.cost),'XX')}}
                  </span>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
      <div>
        <div class="title c-o-hover" @click="$router.push({'path':'/helpCenter/aboutUser'})">
          <span>{{$t('tail.helpCenter')}}</span>
        </div>
        <div class="c-o-hover" @click="$router.push({'path':'/helpCenter/buyingGuide'})">{{$t('tail.purchaseGuide')}}</div>
        <div class="c-o-hover" @click="$router.push({'path':'/helpCenter/payType'})">{{$t('tail.paymentStatement')}}</div>
        <div class="c-o-hover" @click="$router.push({'path':'/helpCenter/transport'})">{{$t('tail.deliveryNote')}}</div>
      </div>
      <div>
        <div class="title">
          <span>{{$t('tail.contactUs')}}</span>
        </div>
        <div @click="customerService" class="c-o-hover">{{$t('tail.onlineService')}}</div>
        <div class="weixinIcon">
          <i class="weixin"></i>
          <span>：tpilulu</span>
        </div>
        <div class="weixinIcon">
          <i class="weixin2"></i>
          <span>：@tpipreorder</span>
        </div>
        <div v-if="$i18n.locale == 'lo'">Mobile :+856-20-59995088</div>
        <div v-else-if="$i18n.locale == 'my'">Mobile : 0925-3833886 , 0925-3833885 , 0925-2271296</div>
        <div v-else>Tel：1237, (+66) 034-406-555</div>

        <a v-if="$i18n.locale == 'zh_CN'" target="_blank" href="https://www.google.cn/maps?ll=13.60821,100.372686&z=16&t=m&hl=en-US&gl=TH&mapclient=embed&cid=13272218664041008009">我们的地址</a>
        <a v-if="$i18n.locale == 'en'" target="_blank" href="https://www.google.com/maps?ll=13.60821,100.372686&z=16&t=m&hl=en-US&gl=TH&mapclient=embed&cid=13272218664041008009">our address</a>
        <a v-if="$i18n.locale == 'th'" target="_blank" href="https://www.google.com/maps?ll=13.60821,100.372686&z=16&t=m&hl=en-US&gl=TH&mapclient=embed&cid=13272218664041008009">ที่อยู่ของเรา</a>

        <a v-if="$i18n.locale == 'lo'" target="_blank" href="https://www.google.com/maps/place/17%C2%B059'32.3%22N+102%C2%B034'31.4%22E/@17.992301,102.5744592,464m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d17.9923005!4d102.5753792?hl=en-US">ທີ່ຢູ່ຂອງພວກເຮົາ</a>
        <a v-if="$i18n.locale == 'my'" target="_blank" href="https://www.google.co.th/maps/place/16%C2%B051'57.5%22N+96%C2%B007'36.2%22E/@16.8659722,96.1245335,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d16.865977!4d96.126726?hl=th&authuser=1&authuser=1">ကျွန်ုပ်တို့၏လိပ်စာ</a>
      </div>
    </div>
    <div class="cooperativePartner page-center">
      <div class="title">
        {{$t('tail.partner')}}
      </div>
      <div class="partnerList">
        <ul>
          <li><img src="../../img/index/home_footer_pic_taobao.png" /></li>
          <li><img src="../../img/index/home_footer_pic_tianmao.png" /></li>
          <li><img src="../../img/index/home_footer_pic_JD.png" /></li>
          <li><img src="../../img/index/home_footer_pic_vip.png" /></li>
          <li><img src="../../img/index/home_footer_pic_the-first-store.png" /></li>
          <li><img src="../../img/index/home_footer_pic_amazon.png" /></li>
        </ul>
      </div>
      <div class="copyright">TPI.IMPORT-EXPORT & SHIPPING CO., LTD. © 2017. Privacy Policy</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    customerService() {
      $zopim(function() {
        $zopim.livechat.window.show();
      });
    }
  }
}
</script>

<style lang="scss">
@import '../../style/components/main';
.footer {
  margin-top: 70px;
  background: #fff;
  padding-top: 42px;
  .connect {
    padding: 0 100px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    &>div {
      text-align: center;
      color: #666;
      .title {
        height: auto;
        line-height: normal;
        span {
          padding-bottom: 18px;
          display: inline-block;
          border-bottom: 2px solid #e5e5e5;
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }
      }
      .c-o-hover:hover {
        color: #FF681C;
      }
      .title.c-o-hover:hover span {
        color: #FF681C;
      }
      .titleRight {
        text-align: left;
      }
      .introduce {
        line-height: 24px;
        text-align: left;
        width: 300px;
        padding-bottom: 0px;
        >span {
          display: inline-block;
          color: #FF681C;
          position: relative;
          cursor: pointer;
          .goodsParameter {
            position: absolute;
            display: none;
            bottom: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
            padding: 10px;
            text-align: left;
            box-shadow: 0px 1px 5px 0px #ccc;
            z-index: 1;
            background-color: #FFF;
            .arrow {
              position: absolute;
              bottom: -10px;
              left: 50%;
              width: 0;
              height: 0;
              transform: translateX(-50%);
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 10px solid #eee;
              &::after {
                content: "";
                position: absolute;
                bottom: 3px;
                left: -8px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 10px solid #FFF;
              }
            }
            ul {
              li {
                font-size: 12px;
                color: #333;
                white-space: nowrap;
                padding-bottom: 10px;
                line-height: 150%;
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
      div {
        color: #6f6f6f;
        padding-bottom: 15px;
        font-size: 13px;
      }
      .weixinIcon {
        display: flex;
        i {
          @include bindicBg(20px, 20px);
          background-size: 100% auto;
          margin-right: 2px;
        }
        .weixin {
          background-image: url('../../img/index/footer_ic_wechat.png');
        }
        .weixin2 {
          background-image: url('../../img/index/footer_ic_line.png');
        }
      }
      a {
        font-weight: bold;
      }
      a:hover {
        color: #FF681C;
      }
    }
    >div:last-child {
      text-align: left;
      padding-left: 50px;
      width: 250px;
    }
  }
  .cooperativePartner {
    padding: 0 100px 0px 100px;
    margin-top: 30px;
    .title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .partnerList {
      margin-top: 26px;
      ul {
        display: flex;

        li {
          margin-right: 55px;
          img {
            height: 30px;
          }
        }
      }
    }
    .copyright {
      text-align: center;
      padding: 35px 0px 20px 0px;
      font-size: 12px;
      color: #6f6f6f;
    }
  }
}
</style>
