<template>
  <div :class="{'layer-box ub ub-ac ub-pc':$route.query.state ==0}">
    <div :class="{'orderAddress':$route.query.state ==0}">
      <div class="m-r-title addressTitle">{{$t('head.shippingAddress')}}
        <ul class="selectLang" :style="{right:$route.query.state ==0 ? 94 : 10 +'px'}">
          <li v-for="item of langList" @click="langVal(item.type)">
            <span>{{item.country}}</span>
            <i></i>
          </li>
        </ul>
        <div class="close" v-show="$route.query.state == 0" @click="$router.push('/confirmOrder');">×</div>
      </div>
      <div class="address">
        <div class="item" v-for="(item,index) of addressList" @click="defaultAddressInfo(item)">
          <div class="address-detail">{{item.name}}&nbsp;&nbsp;&nbsp;{{item.phone}}&nbsp;&nbsp;&nbsp;{{item.address}}&nbsp;&nbsp;&nbsp;{{item.postcode}}</div>
          <div class="address-operating">
            <span class="update c-o-hover" @click.stop="modifyAddress(item)">{{$t('mineCenter.modify')}}</span>&nbsp;|&nbsp;
            <span class="delete c-o-hover" @click.stop="deleteAddress(index,item.objId)">{{$t('mineCenter.delete')}}</span>
            <span class="radio" :class="{'checked':item.defaultAddress ==1101}" @click.stop="setDefaultAddress(index,item.objId)"></span>
            <span style="cursor: pointer" @click.stop="setDefaultAddress(index,item.objId)">{{$t('mineCenter.setAsTheDefaultAddress')}}</span>
          </div>
        </div>
        <div class="address-table" v-show="addressState != 0">
          <form class="address">
            <div class="tip-box ub ub-ac" :class="[{'ui-vh':errTip == ''},promptState ? 'ic-success':'ic-error']">
              <span></span>
              <div>{{$t(errTip)}}</div>
            </div>
            <div>
              <div>{{$t('mineCenter.country')}}:</div>
              <div class="">
                <select v-model="addressInfo.lang" :disabled="addressInfo.objId" @change="langVal(addressInfo.lang)">
                  <option :value="item.type" v-for="item of $store.state.localeList">{{item.country}}</option>
                </select>
              </div>
            </div>
            <div>
              <div>{{$t('orderDetail.name')}}:</div>
              <div class="">
                <input type="text" v-model="addressInfo.name" @blur="nameVerification"/>
              </div>
            </div>
            <div>
              <div>{{$t('mineCenter.cellphoneNumber')}}:</div>
              <div class="">
                <input type="tel" v-model="addressInfo.phone" @blur="phoneVerification"/>
              </div>
            </div>
            <div>
              <div>{{$t('mineCenter.address')}}:</div>
              <div class="">
                <textarea v-model="addressInfo.address" @blur="addressVerification"></textarea>
              </div>
            </div>
            <div>
              <div>{{$t('mineCenter.zipCode')}}:</div>
              <div class="">
                <input type="text" v-model="addressInfo.postcode" @blur="postcodeVerification"/>
              </div>
            </div>
            <div>
              <div></div>
              <div class="ub">
                <div class="m-btn main ui-mr-24" @click="preservation">{{$t('mineCenter.save')}}</div>
                <div class="m-btn gray" @click="emptyAddress">{{$t('component.cancel')}}</div>
              </div>
            </div>
          </form>
        </div>
        <div class="add-address" @click="addAddress" v-show="addressState == 0">
          <span class=""></span>{{$t('mineCenter.addNewAddress')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { userSelectAddress, userDeleteAddress, userAddAddress, userUpdateAddress, userSetDefaultAddress } from '@/service/main/mine'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      addressList: [],
      addressState: 0,
      addressInfo: {
        address: '',
        name: '',
        phone: '',
        postcode: '',
        lang: 'zh_CN'
      },
      //错误提示
      errTip: '',
      promptState: false,
      langList: this.$store.state.localeList,
      selectLang: this.$store.state.locale.type,
    }
  },
  created() {
    this.langVal();
    document.body.clientHeight
  },
  computed: {

  },
  watch: {

  },
  methods: {
    ...mapMutations([
      'setAddressInfo',
    ]),
    //名称验证
    nameVerification() {
      const _this = this;
      const registerData = this.addressInfo;
      if (registerData.name == '') {
        this.errTip = 'mineCenter.pleaseTypeInYourName';
        return false;
      }else if(!/^.{2,24}$/.test(registerData.name)){
        this.errTip = 'mineCenter.pleaseEnterTheCorrectNameInTheFormatCharacters';
        return false;
      }else{
        this.errTip = '';
        return true;
      }
    },
    //手机号码验证
    phoneVerification(){
      const _this = this;
      const registerData = this.addressInfo;
      if(registerData.phone == ''){
        this.errTip = 'mineCenter.pleaseEnterThePhoneNumber';
        return false;
      }else if(!/\d{6,20}/.test(registerData.phone)){
        this.errTip = 'mineCenter.pleaseEnterTheCorrectPhoneNumberInTheFormatOfDigits';
        return false;
      }else{
        return true;
      }
    },
    //收货地址码验证
    addressVerification(){
      const _this = this;
      const registerData = this.addressInfo;
      if(registerData.address == ''){
        this.errTip = 'mineCenter.pleaseEnterTheShippingAddress';
        return false;
      }else if(!/^.{5,300}$/.test(registerData.address)){
        this.errTip = 'mineCenter.pleaseEnterTheCorrectShippingAddressInTheFormatOfCharacters';
        return false;
      }else{
        this.errTip = '';
        return true;
      }
    },
    //邮政编码验证
    postcodeVerification(){
      const _this = this;
      const registerData = this.addressInfo;
      if(registerData.postcode == ''){
        this.errTip = 'mineCenter.PleaseEnterTheZipCode';
        return false;
      }else if(!/^.{3,24}$/.test(registerData.postcode)){
        this.errTip = 'mineCenter.pleaseEnterTheCorrectPostalCodeInTheFormatOfCharacters';
        return false;
      }else{
        this.errTip = '';
        return true;
      }
    },
    langVal(val) {
      if (val) {
        this.selectLang = val;
      }
      var arr = [];
      for (var item of this.langList) {
        if (item.type == this.selectLang) {
          arr.unshift(item);
        } else {
          arr.push(item);
        }
      }
      this.langList = arr;
      this.getAddress();
    },
    getAddress() {
      const _this = this;
      userSelectAddress(_this.selectLang).then(
        data => {
          if (data.success) {
            _this.addressList = data.data;
          }
        }
      );
    },
    addAddress() {
      this.addressState = 1;
      this.addressInfo = {
        address: '',
        name: '',
        phone: '',
        postcode: '',
        lang: this.selectLang
      };
    },
    modifyAddress(item) {
      this.addressState = 2;
      item.lang = this.selectLang;
      this.addressInfo = JSON.parse(JSON.stringify(item));
    },
    emptyAddress() {
      this.addressInfo = {
        address: '',
        name: '',
        phone: '',
        postcode: '',
        lang: 'zh_CN'
      };
      this.addressState = 0;
    },
    setDefaultAddress(index, id) {
      userSetDefaultAddress(this.selectLang, id).then(
        data => {
          if (data.success) {
            for (var item of this.addressList) {
              item.defaultAddress = 1102;
            }
            this.addressList[index].defaultAddress = 1101;
            this.defaultAddressInfo(this.addressList[index], true);
          }
        }
      );
    },
    deleteAddress(index, id) {
      userDeleteAddress(this.selectLang, id).then(
        data => {
          if (data.success) {
            this.addressList.splice(index, 1);
            this.setDefaultAddress(0, this.addressList[0].objId);
            this.$parent.$parent.$refs.confirm.tip(this.$t('mineCenter.deleteAddressSuccessful'), true);
          }
        }
      );
    },
    defaultAddressInfo(item, state) {
      if (this.$route.query.state == 0) {
        item.lang = this.selectLang;
        this.setAddressInfo(item);
        if (!state) {
          this.$router.push('/confirmOrder');
        }
      }
    },
    preservation() {
      const _this = this;
      if (this.nameVerification() && this.phoneVerification() && this.addressVerification() && this.postcodeVerification()) {
        if (this.addressState == 1) {
          userAddAddress(this.addressInfo.lang, this.addressInfo.name, this.addressInfo.address, this.addressInfo.phone, this.addressInfo.postcode).then(
            data => {
              if (data.success) {
                this.$parent.$parent.$refs.confirm.tip(this.$t('mineCenter.addShippingAddressToSuccess'), true);
                this.addressState = 0;
                this.addressInfo = {
                  address: '',
                  name: '',
                  phone: '',
                  postcode: '',
                  lang: 'zh_CN'
                };
                this.getAddress();
              }
            }
          );
        } else if (this.addressState == 2) {
          userUpdateAddress(this.addressInfo.objId, this.addressInfo.lang, this.addressInfo.name, this.addressInfo.address, this.addressInfo.phone, this.addressInfo.postcode).then(
            data => {
              if (data.success) {
                this.$parent.$parent.$refs.confirm.tip(this.$t('mineCenter.changeShippingAddressSuccessfully'), true);
                this.addressState = 0;
                this.addressInfo = {
                  address: '',
                  name: '',
                  phone: '',
                  postcode: '',
                  lang: 'zh_CN'
                };
                this.getAddress();
              }
            }
          );
        }
      } else {
        _this.promptState = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/components/main';
@import '../../../style/address';
.tip-box {
  height: 19px;
}

.orderAddress {
  background-color: #FFF;
  width: 900px;
  max-height: 90%;
  overflow-y: auto;
}

.m-r-title {
  padding-left: 24px;
  background: #fff;
  color: $main-color;
  height: 58px;
  line-height: 58px;
  font-size: 20px;
}

.m-btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  &.main {
    background-color: $main-color;
    color: #fff;
  }
  &.gray {
    background-color: #F1F1F1;
    color: #666;
  }
}

.ic-success {
  span {
    @include bindicBg(12px, 12px) background-image: url(../../../img/mine/grzx_icon_chenggong.png);
    margin-right: 10px;
  }
  div {
    color: #7eb71b;
  }
}

.ic-error {
  span {
    @include bindicBg(12px, 12px) background-image: url(../../../img/login/dly_icon_msg.png);
    margin-right: 10px;
  }
  div {
    color: #666;
  }
}

.addressTitle {
  position: relative;
  display: flex;
  justify-content: space-between;
  .close {
    font-size: 28px;
    padding-right: 22px;
    color: #999;
    cursor: pointer;
  }
  .close:hover {
    color: #ff1c1c;
  }
  .selectLang {
    position: absolute;
    right: 94px;
    top: 10px;
    background-color: #FFF;
    padding: 12px;
    height: 40px;
    overflow: hidden;
    li {
      font-size: 12px;
      height: 35px;
      line-height: 35px;
      color: #808080;
      text-align: right;
    }
    li:first-child {
      height: 25px;
      line-height: 20px;
      font-size: 16px;
      i {
        @include bindicBg(12px, 12px);
        background-image: url(../../../img/mine/add_icin_shift-_disselect.png);
        background-size: 100% auto;
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
  .selectLang:hover {
    box-shadow: 0px 2px 10px 0px #ccc;
    height: initial;
    overflow: initial;
    li:first-child {
      color: #ff681c;
      i {
        background-image: url(../../../img/mine/add_icin_shift-_select.png);
      }
    }
    li {
      cursor: pointer;
    }
    li:hover {
      color: #ff681c;
    }
  }
}
</style>
