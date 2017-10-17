import { async, verifyNull } from "@/service/model/public"
import store from '@/config/store'
import md5 from 'js-md5'
//获取用户信息
var getUserInfo = () => async('/api/user/info/user_info', {
}, "GET", {
    noTip: true,
    success: function (obj) {

    }
  })
//修改用户信息
var userUpdate = (datas) => async('/api/user/info/user_update', datas, "FORM");
//获取收藏
var userSelectCollect = (lang, pageNo, pageSize) => async('/api/user/info/user_selectCollect', {
  lang, pageNo, pageSize
}, "POST");
//删除收藏
var userDeleteCollect = (id) => async('/api/user/info/user_deleteCollect', {
  id
}, "POST");
//获取地址
var userSelectAddress = (lang) => async('/api/user/info/user_selectAddress', {
  lang
}, "POST");
//删除地址
var userDeleteAddress = (lang, id) => async('/api/user/info/user_deleteAddress', {
  lang, id
}, "POST");
//添加地址
var userAddAddress = (lang, name, address, phone, postcode) => async('/api/user/info/user_addAddress', {
  lang, name, address, phone, postcode
}, "POST");
//修改地址
var userUpdateAddress = (id, lang, name, address, phone, postcode) => async('/api/user/info/user_updateAddress', {
  id, lang, name, address, phone, postcode
}, "POST");
//设置默认地址
var userSetDefaultAddress = (lang, id) => async('/api/user/info/user_setDefaultAddress', {
  lang, id
}, "POST");
//重置密码
var userUpdatePwd = (email, newPassword, checkNewPassword, code) => {
  newPassword = md5(newPassword);
  checkNewPassword = md5(checkNewPassword);
  return async('/api/user/info/user_updatePwd', {
    email, newPassword, checkNewPassword, code
  }, "POST");
}
//重置密码
var forgetPw = (email, newPassword, checkNewPassword, code) => {
  newPassword = md5(newPassword);
  checkNewPassword = md5(checkNewPassword);
  return async('api/open/common/forgetPw', {
    email, newPassword, checkNewPassword, code
  }, "POST");
}
//获取默认收货地址
var userSelectDefaultAddress = (lang) => async('/api/user/info/user_selectDefaultAddress', {
  lang
}, "POST");
export {
  getUserInfo,
  userUpdate,
  userSelectCollect,
  userDeleteCollect,
  userSelectAddress,
  userDeleteAddress,
  userAddAddress,
  userUpdateAddress,
  userSetDefaultAddress,
  userUpdatePwd,
  forgetPw,
  userSelectDefaultAddress,
}
