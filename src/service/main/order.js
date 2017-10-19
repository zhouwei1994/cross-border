import {async,verifyNull} from "@/service/model/public"
import store from '@/config/store'
import base64 from '@/service/model/base64'
//提交订单
var orderByCar =(lang,buyercarId,msg,addressId,transport) =>async('/api/user/order/order_byCar',{
	lang,buyercarId,msg,addressId,transport
},"POST");
//立即购买生成订单
var orderByPro =(lang,msg,addressId,productNo,productName,imgUrl,visitUrl,cnPrice,productNumber,productText,transport) => {
  visitUrl = new base64().encode(visitUrl);
  return async('/api/user/order/order_byPro',{
    lang,msg,addressId,productNo,productName,imgUrl,visitUrl,cnPrice,productNumber,productText,transport
  },"POST");
}
//获取订单信息
var orderSelect =(lang,orderStatusInfo,pageNo,pageSize) =>async('/api/user/order/order_select',{
	lang,orderStatusInfo,pageNo,pageSize
},"POST");
//删除订单信息
var orderDelete =(id) =>async('/api/user/order/order_delete',{
	id
},"POST");
//获取订单详情信息
var orderSelectDetails =(id) =>async('/api/user/order/order_selectDetails',{
	id
},"POST");
//修改订单状态
var orderUpdateTrack =(id,orderStatusInfo) =>async('/api/user/order/order_updateTrack',{
	id,orderStatusInfo
},"POST");
//获取物流信息
var carryInfo =(orderNo) =>async('/api/user/order/carry_info',{
	orderNo
},"POST");
//提交订单页面订单信息
var orderInfo =(id) =>async('/api/user/order/order_info',{
	id
},"POST");
//获取服务费比率
var getRatio =() =>async('/api/open/common/get_ratio',{},'GET',{
  load:false
});
//链接下单
var buyercar =(visitUrl,productText,lang,addressId,msg,transport) => {
  visitUrl = new base64().encode(visitUrl);
  console.log(visitUrl);
  return async('/api/user/buyercar/buyercar_add_manual',{
    visitUrl,productText,lang,addressId,msg,transport
  },'POST');
}

export{
	orderByCar,
	orderByPro,
	orderSelect,
	orderDelete,
	orderSelectDetails,
	orderUpdateTrack,
	carryInfo,
	orderInfo,
  getRatio,
  buyercar
}
