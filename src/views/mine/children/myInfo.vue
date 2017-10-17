<template>
  <div>
    <div class="m-r-title">{{$t('head.personalInformation')}}</div>
    <div class='m-info' :class="{'zhCNStyle':$i18n.locale == 'zh_CN'}">
      <div class="ub ub-ac" :class="[{'ui-vh':promptText == ''},promptState ? 'tip':'tip-error']">
        <span :class="[promptState ? 'ic-success':'ic-error']"></span>
        {{promptText}}
      </div>
      <div class="avatar">
        <span>{{$t('mineCenter.avatar')}}：</span>
        <div class="img-box ui-p-r ub ub-ac ub-pc">
          <img :src="imgSrc" alt="" />
          <div class="update">
            <input type="file" @change="uploadImg" />
          </div>
        </div>
      </div>
      <div class="sex ui-mt-40">
        <span>{{$t('mineCenter.accountNumber')}}：</span>
        <div>{{$store.state.userinfo.email}}</div>
      </div>
      <div class="sex ui-mt-40">
        <span>{{$t('mineCenter.gender')}}：</span>
        <div class="radio ui-mr-40" :class="{'checked':sex ==1101}" @click="sex=1101">{{$t('mineCenter.male')}}</div>
        <div class="radio" :class="{'checked':sex ==1102}" @click="sex=1102">{{$t('mineCenter.female')}}</div>
      </div>
      <div class="nick-name">
        <span>{{$t('mineCenter.nickname')}}：</span>
        <input type="text" v-model="userName" />
      </div>
      <div class="ub ui-mt-46 saves">
        <div class="m-btn main ui-mr-26" @click="saves">{{$t('mineCenter.save')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getUserInfo, userUpdate } from '@/service/main/mine'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      imgSrc: 'http://card-repository.oss-cn-shenzhen.aliyuncs.com/user_default_head_img.png',
      sex: 1100,
      userName: '',
      fileData: '',
      promptText: "",
      promptState: true
    }
  },
  created() {
    this.userInfo();
  },
  computed: {
    ...mapState([
      'userinfo',
    ]),
  },
  methods: {
    ...mapMutations([
      'setUserinfo',
    ]),
    userInfo(){
      getUserInfo().then(
        data => {
          if (data.success) {
            if (data.data.headImg) {
              this.imgSrc = data.data.headImg;
            }
            this.sex = data.data.sex;
            this.userName = data.data.userName;
          }
        }
      )
    },
    uploadImg(e) {
      const _this = this;
      var files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (!files.length) {
        return false;
      }
      if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(files[0].name)) {
        this.promptState = false;
        this.promptText = _this.$t('mineCenter.thePictureTypeMustBeOneOf');
      } else if (files[0].size > 3145728) {
        this.promptState = false;
        this.promptText = _this.$t('mineCenter.imageCanNotBeLargerThan3M');
      } else {
        this.fileData = files[0];
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
          _this.imgSrc = this.result;
        }
      }
    },
    saves() {
      const _this = this;
      if (this.sex == 1100) {
        this.promptState = false;
        this.promptText = _this.$t('mineCenter.pleaseSelectGender');
      } else if (this.userName == '') {
        this.promptState = false;
        this.promptText = _this.$t('mineCenter.PleaseFillInNickname');
      } else {
        var datas = new FormData();
        datas.append("userName", this.userName);
        datas.append("sex", this.sex);
        if (this.fileData) {
          datas.append("headImg", this.fileData);
        }
        userUpdate(datas).then(
          data => {
            if (data.success) {
              _this.promptText = '';
              _this.$parent.$parent.$refs.confirm.tip(_this.$t('mineCenter.savedSuccessfully'), true);
              _this.userinfo.userName = _this.userName;
              _this.userinfo.sex = _this.sex;
              _this.setUserinfo(_this.userinfo);
            }
          }
        );
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/components/main';
.m-info {
  background-color: #fff;
  padding: 0 20px 50px;
  border-top: 1px solid #eee;
  .tip {
    height: 54px;
    font-size: 12px;
    color: #7eb71b;
  }
  .tip-error {
    margin-top: 2px;
    height: 54px;
    font-size: 12px;
    color: #666;
  }
  .saves {
    padding-left: 80px;
  }
  .avatar,
  .sex,
  .nick-name {
    font-size: 13px;
    color: #333;
    display: flex;
    span {
      display: block;
      width: 120px;
      text-align: left;
      padding-right: 20px;
    }
  }
  .avatar {
    height: 64px;
    .img-box {
      height: 100%;
      width: 64px;
      text-align: center;
      // border: 1px solid #ededed;
      // border-radius: 6px;
      position: relative;
      overflow: hidden;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .update {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        cursor: pointer;
        text-align: center;
        input[type=file] {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
  .nick-name {
    margin-top: 39px;
    input {
      height: 30px;
      width: 160px;
      padding-left: 12px;
      border: 1px solid #ebebeb;
      &:focus {
        border-color: $main-color;
      }
    }
  }
}
.zhCNStyle {
  .avatar,
  .sex,
  .nick-name {
    span {
      width: 60px;
    }
  }
}
.update-avatar {
  background-color: #fff;
  border-top: 1px solid #eee;
  font-size: 12px;
  color: #999;
  min-height: 382px;
  .img-box {
    margin: 34px 46px 0 20px;
    width: 108px;
    height: 108px;
  }
  .tip {
    height: 36px;
    line-height: 36px;
    margin-bottom: 2px;
    font-size: 12px;
    color: #7eb71b;
  }
  .file {
    margin-bottom: 12px;
    display: -webkit-box;
    display: -moz-box;
    .f-text {
      width: 324px;
      height: 24px;
      border: 1.5px solid #eee;
      margin-right: 10px;
    }
    .f-btn {
      width: 48px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      background-color: $main-color;
      position: relative;
      cursor: pointer;
    }
  }
  .upload {
    display: -webkit-box;
    display: -moz-box;
    margin-top: 12px;
    .f-btn {
      width: 66px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
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
  }
}
</style>
