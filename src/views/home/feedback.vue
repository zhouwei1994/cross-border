<template>
  <div class="feedback" :style="{minHeight:height+'px'}">
    <div class="page-center">
      <div class="feedback_head">
        <img src="../../img/index/TPI_logo.png" @click="$router.push('/index')"/>
        <router-link to="/index">{{$t('feedback.returnHomePage')}}</router-link>
      </div>
      <div class="feedback_conent" v-if="state">
        <p>{{$t('feedback.dearUsersYouAreHavingTroubleUsing')}}</p>
        <textarea :placeholder="$t('feedback.pleaseLeaveAMessage')" v-model="feedback"></textarea>
        <div class="textSize">{{feedback.length}}/200</div>
        <div class="but">
          <button :class="{'active':feedback.length > 0}" @click="submit">{{$t('forget.submit')}}</button>
        </div>
      </div>
      <div class="success" v-else>
        <p>{{$t('feedback.feedbackHasBeenSubmittedThanks')}}</p>
        {{$t('forget.secondsToAutomaticallyJumpTo') | replace(second)}}<router-link to="/index">{{$t('head.home')}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { feedback } from '@/service/main/index'
var clear;
export default {
  data () {
    return {
      height:900,
      feedback:'',
      state:true,
      second: 3,
    }
  },
  watch:{
    feedback(val){
      if (val.length > 120) {
        this.feedback = val.substring(0, 200);
      }
    }
  },
  methods:{
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
    submit(){
      if(this.feedback.length > 0){
        feedback(this.feedback).then(
          data => {
            if(data.success){
              this.state = false;
              this.secondJump('/index');
            }else{
              this.$parent.$refs.confirm.tip('feedback.theInputLanguageIsIncorrect', false);
            }
          }
        );
      }
    }
  },
  mounted(){
    this.height = document.documentElement.clientHeight;
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
.feedback {
  background-color: #FFF;
  .feedback_head {
    padding: 41px 0px 22px 0px;
    border-bottom: 4px solid #ff681c;
    display: flex;
    justify-content: space-between;
    img {
      height: 58px;
    }
    a {
      margin-top: 38px;
      font-size: 14px;
      color: #333;
    }
    a:hover {
      color: #ff681c;
    }
  }
  .feedback_conent {
    margin-top: 142px;
    width: 936px;
    margin-left: auto;
    margin-right: auto;
    p {
      color: #333;
      font-size: 16px;
      margin-bottom: 41px;
    }
    textarea {
      width: 100%;
      height: 358px;
      padding: 10px;
      border: 1px solid #e6e6e6;
      line-height: 20px;
      color: #333;
    }
    .textSize {
      text-align: right;
      margin-top: 5px;
      font-size: 14px;
      color: #666;
    }
    .but {
      margin-top: 40px;
      text-align: center;

      button {
        width: 218px;
        height: 48px;
        border: 0px;
        background-color: #F1F1F1;
        font-size: 16px;
        color: #999;
        outline: none;
      }
      .active {
        background-color: #ff681c;
        color: #FFF;
      }
    }
  }
  .success {
    text-align: center;
    padding: 95px 0px;
    font-size: 14px;
    color: #333;
    p {
      font-size: 16px;
      padding-bottom: 30px;
    }
    a {
      color: #ff681c;
    }
  }
}
</style>
