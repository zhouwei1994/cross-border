<template>
  <div>
    <header-top :show="path == '/index'" v-if="!isTabbarDemo"></header-top>
    <div :style="{minHeight:height+'px'}">
      <!--页面容器-->
      <transition name="router-fade">
        <router-view></router-view>
      </transition>
    </div>
    <loading :value="loading || isLoading" :type="true"></loading>
    <footer-b v-if="!isTabbarDemo"></footer-b>
    <confirm-box ref='confirm'></confirm-box>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import * as $public from '@/service/model/public'
import { getUserInfo } from '@/service/main/mine'
import confirmBox from '@/components/common/confirmBox'
import headerTop from '@/components/home/header'
import footerB from '@/components/home/footer'
import { getCartNum } from '@/service/main/goods'
import { getRatio } from '@/service/main/order'
import loading from '@/components/common/loading/loading'
export default {
  data() {
    return {
      height: 1000,
    }
  },
  components: {
    confirmBox,
    headerTop,
    footerB,
    loading
  },
  computed: {
    ...mapState([
      'loading',
      'isLoading',
      'path',
      'login',
      'locale'
    ]),
    //路径带有tabbar的页面隐藏底部导航
    isTabbarDemo() {
      return /login|feedback/.test(this.path)
    },
  },
  created() {
    //检查用户登录状态
    // this.checkLogin();
    this.height = document.documentElement.clientHeight - 654;

  },
  methods: {
    ...mapMutations([
      'setCartNum',
      'languageSetUp',
      'setRatio'
    ]),
    ratio() {
      getRatio().then(
        data => {
          if (data.success) {
            this.setRatio(data.data);
          }
        }
      );
    },
    cartNum() {
      if (this.login) {
        getCartNum().then(
          data => {
            if (data.success) {
              this.setCartNum(data.data);
            }
          }
        )
      }
    }
  },
  mounted() {
    this.cartNum();
    this.ratio();
    var locale = window.sessionStorage.getItem('locale');
    if (locale) {
      this.languageSetUp(JSON.parse(locale));
    }
  }
}
</script>
<style lang="scss">
@import "./style/components/public";
body {
  font-size: 12px;
}
</style>
