import store from '@/config/store'
import {
  baseUrl
} from '@/config/env'
//请求方法
//noTip不显示提示         success请求成功执行的回调函数
//option{noTip:true,success:function(){}}
function async(url = '', data = {}, type = 'GET', options = {}, httpUrl = baseUrl) {
  let ajaxType = type.toUpperCase();
  url = httpUrl + url;

  let dataStr = ''; //数据拼接字符串
  if (type == 'FORM') {
    ajaxType = 'POST';
    dataStr = data;
  } else {
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    //匹配最后一个&并去除
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    }
    if (type == 'GET') {
      url = url + '?' + dataStr;
      dataStr = "";
    }else if(type == 'JSONP'){
      url = url + '?' + dataStr+'&callback=process';
      dataStr = "";
    }
  }
  return new Promise((resolve, reject) => {
    if(!options.load){
      store.commit('setLoading', true)
    }
    if(type == 'JSONP'){
      window.process = function(data){
          resolve(data);
      }
      var script = document.createElement("script");
      script.src = url;
      document.head.appendChild(script);
      // 及时删除，防止加载过多的JS
      document.head.removeChild(script);
      store.commit('setLoading', false);
    }else{
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }
      requestObj.open(ajaxType, url, true);
      // requestObj.withCredentials = true;//通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据
      if (type != 'FORM') {
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      }
      if(options.language){
        requestObj.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
      }
      if(httpUrl == baseUrl){
        let user_token = store.state.userinfo.token ? store.state.userinfo.token : '';
        requestObj.setRequestHeader("token", user_token);
      }
      requestObj.send(dataStr);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          store.commit('setLoading', false)
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            console.log(url, '\n', obj);
            resolve(handle(obj))
          } else {
            reject(requestObj)
          }
        }
      }
    }
  })
  //	}
  //数据处理
  function handle(obj) {
    if (parseInt(obj.code) == 0) {
      if (jugleType(options.success) == "Function") {
        //执行默认的成功方法
        options.success(obj);
        return obj;
      } else {
        return obj;
      }
    } else if ((parseInt(obj.code) == 3101 || parseInt(obj.code) == 3102) && store.state.path != '/login') {
      if (!store.state.login) {
        $Vue.$children[0].$refs.confirm.show($Vue.$t("head.youAreNotLoggedInAreYouLoggedIn"), false, function () {
          $Vue.$router.push('/login');
        });
      } else {
        store.commit('clearUserinfo');
        $Vue.$children[0].$refs.confirm.show($Vue.$t("component.loginHasExpiredPleaseLogInAgain"), false,function () {
          $Vue.$router.push('/login');
        });
      }
      return obj;
    } else {
      return obj;
    }
  }
}
//校验数据是否为空，不为空返回true
function verifyNull(data) {
  let result = data && data != "null" && data != "undefined" && data != {} && data != [] ? true : false;
  return result;
}
//类型判断 返回  Function String Object Array Number Bool Null Undefined... 首字母大写就OK
function jugleType(data) {
  let result = Object.prototype.toString.apply(data).substr(8);
  result = result.substr(0, result.length - 1);
  return result;
}
//按需修改obj
function updateObj(oldObj, newObj) {
  for (let name in newObj) {
    //原来obj上没有的不允许添加
    oldObj[name] = oldObj[name] != undefined ? newObj[name] : undefined;
  }
  return oldObj;
}
export {
  async, verifyNull, jugleType, updateObj
}
