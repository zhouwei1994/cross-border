<template>
  <div class="loading_box" v-show="show">
    <div class="loading_mask" v-if="type"></div>
    <div class="loading_toast" :class="[type ? 'overall':'local']">
      <spinner type="circles" slot="value"></spinner>
      <span class="loading_content">{{ text || $t('component.loading') }}</span>
    </div>
  </div>
</template>
<script>
import Spinner from './../spinner/index.vue'
export default {
	components: {
    Spinner
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: String,
    type:{
      type:Boolean,
      default:false
    }
  },
  created () {
    this.show = this.value
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
.loading_box .loading_mask {
	position: fixed;
	top: 0px;
	left: 0px;
  width: 100%;
  height: 100%;
	background: rgba(255,255,255,0.5);
  z-index: 10000;
}
.loading_box .loading_toast {

	border-radius: 5px;
	text-align: center;
	box-sizing: border-box;
}
.loading_box .local {
  width: 100%;
	padding: 50px 0px;
}
.loading_box .overall {
  position: fixed;
	top: 50%;
	left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10001;
  background-color: #000;
  padding: 20px;
}
.loading_box .overall .vux-spinner {
  stroke: #444;
  fill: #FFF;
  vertical-align: middle;
}
.loading_box .loading_toast	.loading_content {
  vertical-align: middle;
	font-size: 16px;
	margin-left: 10px;
	height: 28px;
	line-height: 28px;
}
.loading_box .local .loading_content {
  color: #333;
}
.loading_box .overall .loading_content {
  color: #FFF;
}
</style>
