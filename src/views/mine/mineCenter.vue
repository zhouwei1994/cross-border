<template>
	<div class="mine-center">
		<div class="page-adr">
			<div class="page-center ub ub-ac">
				{{$t('head.home')}}>{{$t('mineCenter.personalCenter')}}
			</div>
		</div>
		<div class="m-content page-center ub">
			<div class="m-left ub ub-ov" :class="{'textCenter':$i18n.locale == 'zh_CN'}">
				<div class="title">{{$t('mineCenter.personalCenter')}}</div>
				<router-link to='/mineCenter/myInfo'>{{$t('head.personalInformation')}}</router-link>
				<router-link to='/mineCenter/collectList'>{{$t('head.myCollection')}}</router-link>
				<router-link to='/mineCenter/address'>{{$t('head.shippingAddress')}}</router-link>
				<router-link to='/mineCenter/updatePwd'>{{$t('head.changePassword')}}</router-link>
			</div>
			<div class="m-right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	const testGoodsList = [];
	export default {
		data(){
			return{
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/components/main';
.mine-center{
	.m-content{
		margin-top:36px;
		.m-left{
			width: 220px;
			height: 285px;
			background: #fff;
			div,a{
				width: 100%;
        height: 57px;
        line-height: 57px;
        text-align: left;
				font-size:16px;
        color:#555;
        padding-left: 20px;
				&.title{
					background-color: $main-color;
					color:#fff;
					font-size: 18px;
					font-weight: bold;
				}
      }
			div:not(.title),a:not(.title){
				background-image: url(../../img/mine/grzx_icon_gengduo_default.png);
				background-repeat:no-repeat;
				background-position:191px center;
				&:hover,&.act,&.router-link-active{
					background-color: #ffeee5;
					color:$main-color;
					background-image: url(../../img/mine/grzx_icon__gengduo_pressed.png)
				}
			}
    }
    .textCenter {
      div,a{
        text-align: center;
        padding-left: 0px;
      }
    }
	}
}
</style>
<style lang="scss">
@import '../../style/components/main';
.mine-center{
	.m-right{
		width: 100%;
		flex: 1;
		margin-left: 20px;
		.m-r-title{
			padding-left: 24px;
			background: #fff;
			color:$main-color;
			height: 58px;
			line-height: 58px;
			font-size: 18px;
		}
	}
	.m-btn{
		width: 80px;
		height: 30px;
		line-height: 30px;
		border-radius: 4px;
		font-size: 14px;
		text-align: center;
		cursor: pointer;
		&.main{
			background-color: $main-color;
			color:#fff;
		}
		&.gray{
			background-color: #F1F1F1;
			color:#666;
		}
	}
	.ic-success {
		span {
			@include bindicBg(12px,12px)
			background-image: url(../../img/mine/grzx_icon_chenggong.png);
			margin-right: 10px;
		}
		div {
			color: #7eb71b;
		}
	}
	.ic-error {
		span {
			@include bindicBg(12px,12px)
			background-image: url(../../img/login/dly_icon_msg.png);
			margin-right: 10px;
		}
		div {
			color: #666;
		}
	}
	.ic-pwd-changed{
		@include bindicBg(98px,98px);
		margin: 83px 0 45px;
		background-image: url(../../img/mine/grzx_chenggong_beij-.png);
	}
}
</style>
