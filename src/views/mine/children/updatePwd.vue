<template>
	<div>
		<div class="m-r-title">{{$t('head.changePassword')}}</div>
		<div class="update-pwd" v-show="!operation">
			<div class="input-list">
            <div class="name">{{$t('login.email')}}：</div>
            <input :class="{'getFocus':emailFocus}" @focus="emailFocus =true" @blur="emailFocus = false" type="text" @input="emailVerification" v-model="updateInfo.email" :placeholder="$t('login.pleaseInputYourEmail')" />
            <div class="err-tip" v-if="VerificationState.email == 1">{{$t('login.pleaseInputYourEmail')}}</div>
            <div class="err-tip" v-else-if="VerificationState.email == 2">{{$t('login.emailFormatIsIncorrect')}}</div>
            <div class="err-tip errHidden" v-else></div>
          </div>
          <div class="input-list">
            <div class="name">{{$t('login.verificationCode')}}：</div>
            <div class="inputCode-box" :class="{'getFocus':codeFocus}">
              <input type="text" v-model="updateInfo.code" @focus="codeFocus =true" @blur="codeFocus = false" @input="codeVerification" :placeholder="$t('login.pleaseEnterVerificationVode')" />
              <div class="get-code bc-do-btn" @click="getCode">
                {{codeS}}{{this.$t(codeText)}}
              </div>
            </div>
            <div class="err-tip" v-if="codeError">{{ codeError }}</div>
            <div class="err-tip" v-else-if="VerificationState.code == 1">{{$t('login.pleaseEnterVerificationVode')}}</div>
            <div class="err-tip" v-else-if="VerificationState.code == 2">{{$t('login.TheVerificationCodeIsA6DigitValidNumber')}}</div>
            <div class="err-tip errHidden" v-else></div>
          </div>
          <div class="input-list">
            <div class="name">{{$t('forget.newPassword')}}：</div>
            <input type="password" :class="{'getFocus':newFocus}" @focus="newFocus =true" @blur="newFocus = false" @input="pwdVerification" v-model="updateInfo.newPassword" :placeholder="$t('forget.pleaseEnterANewPassword')" />
            <div class="err-tip" v-if="VerificationState.newPassword == 1">{{$t('login.pleaseEnterYourPassword')}}</div>
            <div class="err-tip" v-else-if="VerificationState.newPassword == 2">{{$t('login.passwordIsAtLeast6Digits')}}</div>
            <div class="err-tip errHidden" v-else></div>
          </div>
          <div class="input-list">
            <div class="name">{{$t('forget.confirmPassword')}}：</div>
            <input type="password" :class="{'getFocus':checkFocus}" @focus="checkFocus =true" @blur="checkFocus = false" @input="checkPwdVerification" v-model="updateInfo.checkNewPassword" :placeholder="$t('forget.pleaseEnterTheNewPasswordAgain')" />
            <div class="err-tip" v-if="VerificationState.checkNewPassword == 1">{{$t('forget.pleaseEnterYourPasswordAgain')}}</div>
            <div class="err-tip" v-else-if="VerificationState.checkNewPassword == 2">{{$t('forget.twoPasswordsAreInconsistent')}}</div>
            <div class="err-tip errHidden" v-else></div>
          </div>
          <div class="submit bc-do-btn" @click="submitPwd">{{$t('forget.submit')}}</div>
		</div>
		<div class="pwd-changed ub ub-ac ub-ov" v-show="operation">
        <div class="ic-pwd-changed"></div>
        <div class="color-333 posds">{{$t('forget.congratulationsPasswordModificationSuccess')}}</div>
        <div class="login fonsoze a-hover">
          {{$t('forget.secondsToAutomaticallyJumpTo') | replace(second)}}
          <span @click="$router.push('/login')">{{$t('login.logInImmediately')}}</span>
        </div>
      </div>
	</div>
</template>
<script>
import { userUpdatePwd } from '@/service/main/mine'
import { register,getCode,login } from '@/service/main/login'
var clear;
export default {
	components:{

	},
	data(){
		return {
			updateInfo:{
				email:'',
				code:'',
				newPassword:'',
				checkNewPassword:''
			},
			emailFocus: false,
      codeFocus: false,
      newFocus: false,
      checkFocus: false,
      operation: false,
      codeS:'',
      codeText: 'login.getVerificationVode',
			readonly: false,
			codeError:'',
			second: 3,
      VerificationState: {
        email: 0,
        code: 0,
        newPassword: 0,
        checkNewPassword: 0
      },
		}
	},
	created(){

	},
	methods:{
		//邮箱验证
    emailVerification() {
      const _this = this;
      const inputData = this.updateInfo;
      var emailRule = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (inputData.email == '') {
        this.VerificationState.email = 1;
        return false;
      } else if (!emailRule.test(inputData.email)) {
        this.VerificationState.email = 2;
        return false;
      } else {
        this.VerificationState.email = 3;
        return true;
      }
    },
    //验证码验证
    codeVerification() {
      const _this = this;
      const registerData = this.updateInfo;
      if (registerData.code == '') {
        this.VerificationState.code = 1;
        return false;
      } else if (!/^[0-9]{6}$/.test(registerData.code)) {
        this.VerificationState.code = 2;
        return false;
      } else {
        this.VerificationState.code = 3;
        return true;
      }
    },
    //密码验证
    pwdVerification() {
      const _this = this;
      const inputData = this.updateInfo;
      if (inputData.newPassword == '') {
        this.VerificationState.newPassword = 1;
        return false;
      } else if (!/^\S{6,}$/.test(inputData.newPassword)) {
        this.VerificationState.newPassword = 2;
        return false;
      } else {
        this.VerificationState.newPassword = 3;
        return true;
      }
    },
    //第二次密码验证
    checkPwdVerification() {
      const _this = this;
      const inputData = this.updateInfo;
      if (inputData.checkNewPassword == '') {
        this.VerificationState.checkNewPassword = 1;
        return false;
      } else if (inputData.checkNewPassword != inputData.newPassword) {
        this.VerificationState.pwd = 2;
        return false;
      } else {
        this.VerificationState.pwd = 3;
        return true;
      }
    },
		submitPwd() {
      var state = true;
      if(!this.emailVerification()){
        state = false;
      }
      if(!this.codeVerification()){
        state = false;
      }
      if(!this.pwdVerification()){
        state = false;
      }
      if(!this.checkPwdVerification()){
        state = false;
      }
      if (state) {
        userUpdatePwd(this.updateInfo.email, this.updateInfo.newPassword, this.updateInfo.checkNewPassword, this.updateInfo.code).then(
          data => {
            if (data.success == true) {
              this.operation = true;
              this.secondJump('/login');
              this.updateInfo = {
                email: '',
                code: '',
                newPassword: '',
                checkNewPassword: ''
              }
            }
          }
        );
      }
    },
		getCodeState() {
      const _this = this;
      this.readonly = true;
      this.codeS = '60';
      this.codeText = 'login.afterTheReSend';
      var s = 60;
      clear = setInterval(() => {
        s--;
        _this.codeS = s;
        if (s == 0) {
          clearInterval(clear);
          this.codeS = '';
          _this.codeText = "login.getVerificationVode";
          _this.readonly = false;
        }
      }, 1000);
		},
		secondJump(url) {
      const _this = this;
      let clearSecond;
      clear = setInterval(() => {
        _this.second--;
        if (_this.second == 0) {
          _this.$router.push(url);
          clearInterval(clear);
        }
      }, 1000);
    },
		getCode: function () {
      var _this = this;
      if (_this.readonly) {
        this.codeError = _this.$t('login.messageHasBeenSent');
      } else if(this.emailVerification()){
        getCode(3002, _this.updateInfo.email).then(
          data => {
            if (data.success == true) {
              _this.getCodeState();
            } else {
              _this.codeError = data.msg;
            }
          }
        )
      }
    }
	}
}
</script>
<style lang="scss" scoped>
@import '../../../style/components/main';
.inputCode-box {
	height: 44px;
    width: 346px;
    padding: 2px;
    border: 1px solid #ebebeb;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: space-between;

    input {
    	border:0px;
    	flex: 1;
    	padding: 0px 10px;
    }
    .get-code {
    	flex-shrink: 0;
    	line-height: 36px;
    	padding: 0px 10px;
    	color: #FFF;
    }
}
.update-pwd{
	background-color: #fff;
	padding-left: 236px;
	padding-top: 36px;
	min-height: 522px;
	border-top:1px solid #eee;
	.input-list{
		&>div.name{
			color:#333;
			font-size: 13px;
			height: 16px;
			line-height: 16px;
			margin-bottom: 12px;
		}
		&>input{
			height: 44px;
			width: 346px;
			padding-left: 14px;
			border: 1px solid #ebebeb;
			font-size: 14px;
			color:#333;
    }
    .getFocus {
      border: 1px solid #FF681C;
    }
		.err-tip{
			height: 22px;
			line-height: 22px;
			margin-left: 14px;
			margin-bottom: 2px;
			padding-left: 17px;
			font-size: 12px;
			color:#ff311c;
			background: url(../../../img/login/dly_icon_msg.png) no-repeat left center;
			background-size: 12px 12px;
		}
		.errHidden {
			visibility: hidden;
		}
	}
	.submit{
		margin:20px 0  0 76px;
		width: 92px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		font-size: 16px;
		color: #fff;
		border-radius: 5px;
	}
}
.pwd-changed{
	background-color: #fff;
	border-top:1px solid #eee;
	padding-bottom: 164px;
	.login{
		color: $main-color;
		margin-top: 70px;
	}
}
.posds {
  font-size: 18px;
}
.fonsoze {
  font-size: 16px;
}
</style>
