import app from './../App'
//公共模块
//页面
const index = r => require.ensure([], () => r(require('@/views/home/index')), 'index')
const goodsType = r => require.ensure([], () => r(require('@/views/home/goodsType')), 'goodsType')
const login = r => require.ensure([], () => r(require('@/views/home/login')), 'login')
const forget = r => require.ensure([], () => r(require('@/views/home/forget')), 'forget')
const feedback = r => require.ensure([], () => r(require('@/views/home/feedback')), 'feedback')

const searchList = r => require.ensure([], () => r(require('@/views/home/searchList')), 'searchList')
const goodsDetail = r => require.ensure([], () => r(require('@/views/home/goodsDetail')), 'goodsDetail')
const goodsTypeDetail = r => require.ensure([], () => r(require('@/views/home/goodsTypeDetail')), 'goodsTypeDetail')
const linkOrder  = r => require.ensure([], () => r(require('@/views/home/linkOrder')), 'linkOrder')


const confirmOrder = r => require.ensure([], () => r(require('@/views/mine/confirmOrder')), 'confirmOrder')
const confirmSucceed = r => require.ensure([], () => r(require('@/views/mine/confirmSucceed')), 'confirmSucceed')
const orderCenter = r => require.ensure([], () => r(require('@/views/mine/orderCenter')), 'orderCenter')
const orderDetail = r => require.ensure([], () => r(require('@/views/mine/orderDetail')), 'orderDetail')
const myCart = r => require.ensure([], () => r(require('@/views/mine/myCart')), 'myCart')
const logistics = r => require.ensure([], () => r(require('@/views/mine/logistics')), 'logistics')

const mineCenter = r => require.ensure([], () => r(require('@/views/mine/mineCenter')), 'mineCenter')
const address = r => require.ensure([], () => r(require('@/views/mine/children/address')), 'address')
const myInfo = r => require.ensure([], () => r(require('@/views/mine/children/myInfo')), 'myInfo')
const collectList = r => require.ensure([], () => r(require('@/views/mine/children/collectList')), 'collectList')
const updatePwd = r => require.ensure([], () => r(require('@/views/mine/children/updatePwd')), 'updatePwd')

const aboutUs = r => require.ensure([], () => r(require('@/views/helpCenter/aboutUs')), 'aboutUs')
const helpCenter = r => require.ensure([], () => r(require('@/views/helpCenter/helpCenter')), 'helpCenter')
const aboutUser = r => require.ensure([], () => r(require('@/views/helpCenter/children/aboutUser')), 'aboutUser')
const buyingGuide = r => require.ensure([], () => r(require('@/views/helpCenter/children/buyingGuide')), 'buyingGuide')
const aboutBarter = r => require.ensure([], () => r(require('@/views/helpCenter/children/aboutBarter')), 'aboutBarter')
const cancelOrder = r => require.ensure([], () => r(require('@/views/helpCenter/children/cancelOrder')), 'cancelOrder')
const helpLogistics = r => require.ensure([], () => r(require('@/views/helpCenter/children/logistics')), 'helpLogistics')
const payType = r => require.ensure([], () => r(require('@/views/helpCenter/children/payType')), 'payType')
const cost = r => require.ensure([], () => r(require('@/views/helpCenter/children/cost')), 'cost')
const transport  = r => require.ensure([], () => r(require('@/views/helpCenter/children/transport')), 'transport')

export default[
  {
    path: '/',
		component: app,	//顶层路由，对应index.html
		children:[			//二级路由。对应App.vue
		  {
		    path:"",
		    redirect: '/index'
		  },
	    {
		    path:"/index",
		    component:index,
		  },{
		  	path:'/goodsType',
		  	component:goodsType
		  },
		  {
		    path:"/goodsDetail",
		    name:'goodsDetail',
		    component:goodsDetail,
		  },{
		  	path:"/goodsTypeDetail/:id",
		    component:goodsTypeDetail,
      },
      {
		  	path:"/linkOrder",
		    component:linkOrder,
      },
      {
		  	path:"/searchList",
		  	component:searchList
		  },{
		  	path:"/login",
		  	component:login
      },
      { path: '/forget', component: forget },
      { path: '/feedback', component: feedback },
      {
		  	path:'/confirmOrder',
		  	component:confirmOrder,
		  	children:[{
		  		path:'/confirmOrder/address',
		  		component:address
		  	}]
		  },{
		  	path:'/confirmSucceed/:id',
		  	component:confirmSucceed
		  },{
		  	path:'/myCart',
		  	component:myCart
		  },{
		  	path:'/orderCenter',
		  	component:orderCenter
		  },{
		  	path:'/orderDetail/:id',
		  	component:orderDetail
		  },{
		  	path:'/logistics/:id',
		  	component:logistics
		  },{
		  	path:'/mineCenter',
		  	component:mineCenter,
		  	children:[{
		  		path:'/mineCenter/address',
		  		component:address
		  	},{
		  		path:'/mineCenter/myInfo',
		  		component:myInfo
		  	},{
		  		path:'/mineCenter/collectList',
		  		component:collectList
		  	},{
		  		path:'/mineCenter/updatePwd',
		  		component:updatePwd
		  	}]
		  },{
		  	path:'/aboutUs',
		  	component:aboutUs
		  },{
		  	path:'/helpCenter',
		  	component:helpCenter,
		  	children:[{
		  		path:'/helpCenter/aboutUser',
		  		component:aboutUser
		  	},{
		  		path:'/helpCenter/buyingGuide',
		  		component:buyingGuide
		  	},{
		  		path:'/helpCenter/aboutBarter',
		  		component:aboutBarter
		  	},{
		  		path:'/helpCenter/logistics',
		  		component:helpLogistics
		  	},{
		  		path:'/helpCenter/payType',
		  		component:payType
		  	},{
		  		path:'/helpCenter/cost',
		  		component:cost
		  	},{
		  		path:'/helpCenter/transport',
		  		component:transport
		  	},{
		  		path:'/helpCenter/cancelOrder',
		  		component:cancelOrder
		  	}]
		  }
    ]
  }
]
