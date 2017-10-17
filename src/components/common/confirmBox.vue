<template>
  <div>
    <div class="confirm layer-box" v-show='view'>
      <div class="confirm-box" :class="{'min':isMin}">
        <div class="confirm-title" v-html="$t(title)"></div>
        <div class="confirm-content">
          <div class="confirm-text" v-html="text">
          </div>
          <div class="confirm-operate ub ub-ac ub-pc">
            <div class="affirm btn bc-do-btn" v-show="affirm" @click="affirmFunc()">{{$t('component.determine')}}</div>
            <div class="cancle btn bc-dg-btn" v-show="cancle" @click="view= false">{{$t('component.cancel')}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-tip-box" v-show="tipview">
      <div class="tip-msg tip-error" :class="{'tip-success':tipMsgType}">
        <span class="ic-tip"></span>
        <span>{{$t(tipText)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { verifyNull, updateObj } from '@/service/model/public'
export default {
  props: {

  },
  data() {
    return {
      view: false,
      affirm: true,
      cancle: true,
      title: 'component.prompt',
      text: '',
      isMin: false,
      //确定调用的方法
      callback: {
        func: null,
        arg: []
      },
      //下面是提示框
      tipview: false,
      tipText: "component.networkError",
      tipMsgType: false
    }
  },
  created() {
  },
  watch: {
    text(val) {
      this.isMin = val.length <= 5 ? true : false;
    },
  },
  methods: {
    show: function(text, cancle, callback, option) {
      //提示文本//是否有取消按钮//回调函数//配置,可以覆盖当前组件的值
      var _this = this;
      this.text = verifyNull(text) ? text : this.text;
      this.cancle = cancle === false ? false : true;
      //赋值修改控件属性
      updateObj(_this, option);
      this.view = true;
      this.callback = verifyNull(callback) ? callback : null;
    },
    tip: function(text, msgType, delay) {
      if (this.tipview) return;
      var _this = this;
      this.tipText = verifyNull(text) ? text : this.tipText;
      this.tipMsgType = msgType;
      delay = verifyNull(delay) ? delay : 2500;
      this.tipview = true;
      setTimeout(function() {
        _this.tipview = false;
      }, delay)
    },
    affirmFunc: function() {
      if (this.callback) {
        let callback = verifyNull(this.callback.func) ? this.callback.func : this.callback;
        let arg = verifyNull(this.callback.arg) ? this.callback.arg : [];
        if (typeof callback == "function") {
          //回调函数读取传参
          this.view = callback.apply(callback, arg) ? true : false;
          return;
        }
      }
      this.view = false;
    }
  }
}
</script>
<style lang="scss">
@import '../../style/components/main';
.confirm.layer-box {
  z-index: 9000;
}

.orange {
  color: #FF681C;
}

.confirm-box {
  position: absolute;
  z-index: 9001;
  width: 554px;
  min-height: 162px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 4px;
  background-color: #fff;
  &.min {
    width: 328px;
  }
  .confirm-title {
    height: 44px;
    line-height: 44px;
    padding-left: 20px;
    border-bottom: 2px solid #F1F1F1;
    font-size: 16px;
    color: #666666;
  }
  .confirm-content {
    padding: 0 40px;
    .confirm-text {
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      padding: 17px 0;
    }
    .confirm-operate {
      .btn {
        width: 104px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 18px;
        margin: 0 10px 24px;
      }
      .affirm {
        color: #fff;
      }
      .cancle {
        color: #666;
        background-color: #f1f1f2;
      }
    }
  }
}

.common-tip-box {
  position: fixed;
  height: auto;
  left: 50%;
  top: 35%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
  line-height: 32px;
  max-width: 500px;
  font-size: 16px;
  padding: 8px 101px;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 9000;
  .tip-msg {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
  }
  .ic-tip {
    @include bindicBg(15px, 33px);
    background-size: 100% auto;
    margin-right: 15px;
  }
  .tip-error {
    color: #e93f2e;
    .ic-tip {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFQTY1MzQ3NkQyNjExRTdCOTcwQUZGRDQxQkMzMzcwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFQTY1MzQ4NkQyNjExRTdCOTcwQUZGRDQxQkMzMzcwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUVBNjUzNDU2RDI2MTFFN0I5NzBBRkZENDFCQzMzNzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUVBNjUzNDY2RDI2MTFFN0I5NzBBRkZENDFCQzMzNzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6hwMzKAAABBElEQVR42pSTMQrCQBBFNyHoAVSElB5ACwWFQMRTGAsbSSXewMJLqFXAwsJ4CQu1kGDjAewT1APYqH/gRxRMMAOP7M7+P7sZdrWoXVUfoYMu6IEWKIELOIAVWIPHpziOCgjAiEKpqvG7Yj6g7sssiR1YAIvikGsh5xbXd3EBgwXkOBPgqfSYgTv1TTE6TPwyPn/kPOodMfdZMUtMxSfmBthkNG9BTcxFEGU0X0FB56Cc0Swb3sR8BJ0EkZaQt8FJzEteAPVntxX1SzH7IA/cP3d2qfcN3lWHHcyBecq/DsGYx37E1/PMxADsWcxkMZPzPddt6pWW8qrqcVfZVJ+8X9VLgAEAYdw6OSkoCkkAAAAASUVORK5CYII=');
    }
  }
  .tip-success {
    color: #7EB71B;
    .ic-tip {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDgzNkQ2QkQ0RkRGMTFFNzk1QzhENzJGQjM3NDYwM0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDgzNkQ2QkU0RkRGMTFFNzk1QzhENzJGQjM3NDYwM0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEODM2RDZCQjRGREYxMUU3OTVDOEQ3MkZCMzc0NjAzQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEODM2RDZCQzRGREYxMUU3OTVDOEQ3MkZCMzc0NjAzQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pug70k0AAAIhSURBVHjajJNPSBRhGMaf+bPrbuKW1WYkShFRmwTRQkgXyYgwYqFDGSQReNBLeunQyVNBdImIjkEg1uoxwujSrUPUlgcPUlDohpKipe4fZ2dnpued/SamZane5Td8y/c+z/fO+72jjb1sR12cIFfIWXKA2GSevCbPyMdwshlax8ldcoNodaa7SZrcJA/JLVKWDV0lNJMsGWkgDoemcrJK89vgDsng/yOjNL6BlDb6t2xN02E7ZZQqa/D4U0WKJi0GA/8SW9VNbIvuRGfrScATAzfYviYGvWGB57nqlNorW/YGnzouHruPoVPTaEukUHWsIP20GHQGya5XRdW1mLAlVqg4BT5dZLruoWvvBcx9f4UfpQVWZQQGHbq6Z7iujURsH84dGcOhZC8TF/2T+lK30b1/ELNLzzE1M4SCtQJDj/wxB3mSlNPjZgI9B0eQ7riK9a1FHE6e8f9/XX2DyZlhv5GxyA6/OhV5o2cgcZSLbl03sFr6gqWNWd/gePslpNr6ML/2Fk/e9bOR64hHW8NiiUl5hfHaWkeT2YLctyxLHUY8sh3Lm3OY+HAdxcqKfwvS4LoYl1fIkQd0HjW0CFpie5DLT0Dn9S0XPuNneYHiXWywUy+mBu819THJWE6R83Ib0nnbKdHEhKk3NRqPaXKZFINRLpJ+8kgmQaNJ1GhuJPZqOX6uaCBNDDYryvmF2pSqYkSm5hN5qr7UxyrXj18CDABAO7MZKQXaEgAAAABJRU5ErkJggg==');
    }
  }
}
</style>
