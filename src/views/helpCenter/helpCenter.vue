<template>
	<div class="help-center">
		<div class="page-adr">
			<div class="page-center ub ub-ac">
				{{$t('head.home')}}>{{$t('tail.helpCenter')}}
			</div>
		</div>
		<div class="h-content page-center ub">
			<div class="h-left ub ub-ov">
				<div class="title">{{$t('tail.helpCenter')}}</div>
				<div class="menu-bar">{{$t('buyingGuide.instructions')}}</div>
				<div class="menu-list ub ub-ov">
					<router-link to='/helpCenter/aboutUser'>{{$t('buyingGuide.userLoginAndForgottenPassword')}}</router-link>
					<router-link to='/helpCenter/buyingGuide'>{{$t('tail.purchaseGuide')}}</router-link>
					<router-link to='/helpCenter/cancelOrder'>{{$t('orderCenter.cancelOrder')}}</router-link>
				</div>
				<div class="menu-bar">{{$t('tail.paymentStatement')}}</div>
				<div class="menu-list ub ub-ov">
					<router-link to='/helpCenter/payType'>{{$t('confirmOrder.paymentMethod')}}</router-link>
					<router-link to='/helpCenter/aboutBarter'>{{$t('buyingGuide.aboutReplacement')}}</router-link>
					<router-link to='/helpCenter/cost'>{{$t('confirmOrder.costEstimate')}}</router-link>
				</div>
				<div class="menu-bar">{{$t('tail.deliveryNote')}}</div>
				<div class="menu-list ub ub-ov">
					<router-link to='/helpCenter/transport'>{{$t('buyingGuide.transportInstructions')}}</router-link>
					<router-link to='/helpCenter/logistics'>{{$t('buyingGuide.orderAndCommodityLogisticsTracking')}}</router-link>
				</div>
			</div>
			<div class="h-right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
			}
		},
		created(){

		},
		computed:{

		},
		watch:{

		},
		methods:{

		}
	}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
.help-center{
	.h-content{
		margin-top:44px;
		color:#4c4c4c;
		.h-left{
			width: 220px;
			background: #fff;
			padding-bottom:26px;
			height: inherit;
			&>div.menu-bar {
				display: flex;
				width:100%;
				padding-left:32px;
      }
      .title{
        background-color: $main-color;
        color:#fff;
        height: 58px;
        line-height: 58px;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 2px;
        padding-left: 50px;
      }
			&>.menu-bar,.menu-list>a{
				&:hover,&.act,&.router-link-active{
					color:$main-color;
				}
			}
			&>div.menu-bar{
				padding-left: 32px;
				margin: 22px 0 2px;
				height: 16px;
				font-size: 16px;
				line-height: 1;
				&::before{
					content: '';
					@include bindicBg(5px,10px);
					background-image: url(../../img/mine/grzx_icon__gengduo_pressed.png);
					background-position:0 center;
					transform: rotate(90deg);
					margin-right: 12px;
				}
			}
			&>div.menu-list{
				font-size: 14px;
				padding-left: 49px;
				-webkit-box-align:start;
				&>a{
          margin-top: 14px;
          padding-right: 10px;
				}
			}
		}
		.h-right{
			background-color: #fff;
			width: 100%;
			flex: 1;
			margin-left: 22px;
		}
	}
}
</style>
<style lang="scss">
@import '../../style/components/main';
	.h-r-title{
		padding-left: 24px;
		background: #fff;
		color:$main-color;
		height: 58px;
		line-height: 58px;
		font-size: 18px;
		border-bottom: 1px solid #eee;
	}
	.help-content{
		padding:11px 24px 36px;
		font-size: 16px;
		line-height: 38px;
		&>div{
			padding-bottom: 8px;
		}
		img{
			margin: 11px 0;
			max-width: 100%;
		}
		img+img{
			margin-top:20px;
		}
	}
</style>
