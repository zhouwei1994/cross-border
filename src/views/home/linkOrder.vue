<template>
  <div class="linkOrderPage">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>链接下单
      </div>
    </div>
    <div class="page-center linkOrderBox">
      <div class="content">
        <div class="linkOrderPrompt">
          <span>商品信息解析失败，您可以手动填写商品信息，提交后我们为您购买。</span>
        </div>
        <div class="linkInputBox">
          <label>访问链接：</label>
          <textarea placeholder="请输入完整的商品链接" v-model="visitUrl"></textarea>
        </div>
        <div class="linkInputBox">
          <label>商品留言：</label>
          <textarea placeholder="请输入您对此商品的需求。如商品的规格、尺寸、大小、数量等信息。" v-model="productText"></textarea>
        </div>
        <div class="linkBut">
          <button @click="placeOrder">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      visitUrl: '',
      productText: ''
    }
  },
  methods: {
    ...mapMutations([
      'setOrderSubmitInfo',
    ]),
    placeOrder() {
      if (this.visitUrl == '') {
        this.$parent.$refs.confirm.tip(this.$t('请填写访问链接'), false);
      } else if (!/http:\/\/|https:\/\//.test(this.visitUrl)) {
        this.$parent.$refs.confirm.tip(this.$t('请填写正确的访问链接'), false);
      } else if (this.productText == '') {
        this.$parent.$refs.confirm.tip(this.$t('请填写商品留言'), false);
      } else {
        const visitUrl = this.visitUrl.replace(/&/g, '%26').replace(/=/g, '%3D').replace(/[?]/g, '%3F').replace(/\//g, '%2F');
        this.setOrderSubmitInfo({
          cartList: [
            {
              imgUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABDCAYAAAAoCNNNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUU1NUEzNzlBQTY4MTFFN0FFNjdERDJBQ0FFQ0U5N0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUU1NUEzN0FBQTY4MTFFN0FFNjdERDJBQ0FFQ0U5N0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTU1QTM3N0FBNjgxMUU3QUU2N0REMkFDQUVDRTk3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTU1QTM3OEFBNjgxMUU3QUU2N0REMkFDQUVDRTk3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmUa+NwAAAHmSURBVHja7NrtboIwFAZgwAZJ4IeDS9j939pi+PIDhfE2OYaRucyNY1p5mzRzRpA+7Tk9iuHH2AK2wIz9ra7rVSNkWWYhgmEYVr8iIgYFIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQiHmtE6cd/3i34pHEVREIahXxBAMMYE2+12MYzj8WjPpYWhAoGLxb0CQABlidWAXlVVsNls/IDArOFiceFd11kU/A+Qv6LIOTVDQyVZ4sLRgYG/mMnT6fSvgWjfhFLdNTCLiO39fm8xNGPcaQiEAjCQK+I4tgiu3l402hAAyPP8Vyth/ppnohntN5iGw72BSY1wvV5vr5km2ZeA+AkAg5Xd5Xw+2y4Dx/NYTUmS2McvAXEvkQIIv804HA63lSOr53K5WBgg7XY79SSrCiEzPl0RkjCxnQIAg5WCaX7sPFy8hJBBYKDTahDPSShIofRIAvUOAjOMwZZl+WWwMrtapbKzoSHl9mo/hs/L7Wcf6xzEd4nwEQg51stdAwNAPYDSuiiKRbZaSa7eQGDmgNA0jS2GlmhAaNtWNdcYrXBAnYC+ZJkuRZh32+ezSnXnP4b71AhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEMKlZr/FTtOUEGN/9+EmrXb7FGAAb5bz/PNa+ikAAAAASUVORK5CYII=',
              name: '',
              price: '',
              productNo: '',
              productNumber: '',
              productText: [this.productText],
              visitUrl: visitUrl,
            }
          ],
          total: '',
          allNum: '',
          type: 2
        });
        this.$router.push('/confirmOrder');
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
.linkOrderPage {
  .linkOrderBox {
    margin-top: 20px;
  }
  .content {
    background-color: #FFF;
    padding: 40px 58px 50px 58px;
    .linkOrderPrompt {
      padding-bottom: 40px;
      text-align: center;
      span {
        color: #FF681C;
        font-size: 16px;
      }
    }
    .linkInputBox {
      display: flex;
      margin-bottom: 50px;
      label {
        min-width: 100px;
        color: #666666;
        font-size: 15px;
        flex-shrink: 0;
      }
      textarea {
        flex: 1;
        padding: 10px;
        border: solid 1px rgba(210, 210, 210, 1);
        min-height: 100px;
      }
    }
    .linkBut {
      text-align: center;
      button {
        width: 104px;
        height: 40px;
        border-radius: 4px 4px 4px 4px;
        background-color: #FF681C;
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
        outline: none;
        border: 0;
      }
    }
  }
  .orderSuccess {
    background-color: #FFF;
    padding: 100px 30px;
    text-align: center;
    img {
      width: 86px;
      height: 86px;
      display: inline-block;
    }
    h2 {
      color: #333333;
      font-size: 24px;
      margin-top: 50px;
    }
    p {
      margin-top: 63px;
      color: #666666;
      font-size: 16px;
    }
  }
}
</style>
