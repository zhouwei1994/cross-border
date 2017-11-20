import {async,verifyNull} from "@/service/model/public"
import md5 from 'js-md5'
//注册
var register = (userName, email, code, password, custId) =>{ 
	password = md5(password);
	return async('api/open/common/register',{
		userName, email, code, password, custId
	},"POST")
}
//获取验证码
//3001	注册
//3002	修改个人信息
var getCode =(type,email) => async('api/open/common/sms',{
  type,email
},"POST")
//登录
var login = (email,password) =>{
	password = md5(password);
	return	async('api/open/common/login_check',{
	  email,password
	},"POST")
}
//退出登录
var getSignOut =() =>async('api/open/common/sign_out',{});
export{
	register,getCode,login,getSignOut
}
