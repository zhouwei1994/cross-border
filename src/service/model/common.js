import store from '@/config/store'
import { translate } from '@/service/main/goods'
export default {
  install(Vue) {
    //时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
    Vue.prototype.formatTime = function (value, format) {
      var timeObj;
      if (value) {
        timeObj = new Date(parseInt(value));
      } else if (value == '') {
        timeObj = new Date();
      } else {
        return;
      }
      var date = {
        "M+": timeObj.getMonth() + 1,
        "d+": timeObj.getDate(),
        "h+": timeObj.getHours(),
        "m+": timeObj.getMinutes(),
        "s+": timeObj.getSeconds(),
        "q+": Math.floor((timeObj.getMonth() + 3) / 3),
        "S+": timeObj.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (timeObj.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }
    //时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
    Vue.filter("format", function (value, format) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return Vue.prototype.formatTime(value, format);
    });
    Vue.prototype.clickDateDiff = function (value) {
      const _this = this;
      var result;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = parseInt(now) - parseInt(value);
      if (diffValue < 0) { return; }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        result = "" + parseInt(monthC) + '月前';
      }
      else if (weekC >= 1) {
        result = "" + parseInt(weekC) + '周前';
      }
      else if (dayC >= 1) {
        result = "" + parseInt(dayC) + '天前';
      }
      else if (hourC >= 1) {
        result = "" + parseInt(hourC) + '小时前';
      }
      else if (minC >= 1) {
        result = "" + parseInt(minC) + '分钟前';
      } else {
        result = '刚刚';
      }
      return result;
    };
    //时间戳转换为XX天前
    Vue.filter("getDateDiff", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return Vue.prototype.clickDateDiff(value);
    });
    //金额保留两位
    Vue.filter("decimal", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return parseFloat(value).toFixed(2);
    });
    //保留整数
    Vue.filter("integer", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return parseInt(value);
    });
    //货币转换
    Vue.filter("currency", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      if (value) {
        var currencyArray = value.toString().split('-');
        if (currencyArray.length <= 1) {
          return (store.state.exchangeRate.rate * parseFloat(currencyArray[0])).toFixed(2);
        } else {
          return (store.state.exchangeRate.rate * parseFloat(currencyArray[0])).toFixed(2) + '-' + (store.state.exchangeRate.rate * parseFloat(currencyArray[1])).toFixed(2);
        }
      } else {
        return '0.00';
      }
    });
    Vue.prototype.currency = function (value) {
      if (value) {
        var currencyArray = value.toString().split('-');
        if (currencyArray.length <= 1) {
          return (store.state.exchangeRate.rate * parseFloat(currencyArray[0])).toFixed(2);
        } else {
          return (store.state.exchangeRate.rate * parseFloat(currencyArray[0])).toFixed(2) + '-' + (store.state.exchangeRate.rate * parseFloat(currencyArray[1])).toFixed(2);
        }
      } else {
        return '0.00';
      }
    }
    //字符串替换
    Vue.filter("replace", function (value, val, rule = 'XX') {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      var codeRule = new RegExp(rule);
      return value.toString().replace(codeRule, val);
    });
    //服务费计算
    Vue.filter("ratio", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      if(!value){
        return 0.00;
      }
      var price = parseFloat(value);
      var ratio = store.state.ratio;
      console.log(price,ratio);
      for(var item of ratio){
        if(item.max === ''){
          if(item.cost <= 1){
            return parseFloat(price * item.cost).toFixed(2);
          }else{
            return parseFloat(item.cost).toFixed(2);
          }
        }else if(item.min <= price && item.max >= price){
          if(item.cost <= 1){
            return parseFloat(price * item.cost).toFixed(2);
          }else{
            return parseFloat(item.cost).toFixed(2);
          }
        }
      }
    });
    Vue.prototype.funcurrency = function (value) {
      return (store.state.exchangeRate.rate * parseFloat(value)).toFixed(2);
    }
    //翻译方法
    Vue.prototype.getTranslate = function (translation, state, load = true, target = this.$i18n.locale, source = 'zh-CN') {
      return new Promise((resolve, reject) => {
        if (state) {
          var arrayText = new Array();
          arrayText.push({ index: 0, text: translation });
          arrayText = JSON.stringify(arrayText).replace(/[%]/g,'%25').replace(/[+]/g,'%2B').replace(/[&]/g,'%26').replace(/[=]/g,'%3D').replace(/[#]/g,'%23').replace(/[?]/g,'%3F').replace(/[/]/g,'%2F');
          // if (this.$i18n.locale != 'zh_CN') {
            translate(arrayText, target, source, load).then(
              data => {
                if (data.success) {
                  resolve(data.data.r[0]);
                } else {
                  this.$parent.$refs.confirm.tip('component.translationFailure', false);
                  reject();
                }
              }
            );
          // } else {
          //   resolve(translation);
          // }
        } else if (this.$i18n.locale != 'zh_CN' && translation.length > 0) {
          translation = JSON.stringify(translation).replace(/[%]/g,'%25').replace(/[+]/g,'%2B').replace(/[&]/g,'%26').replace(/[=]/g,'%3D').replace(/[#]/g,'%23').replace(/[?]/g,'%3F').replace(/[/]/g,'%2F');
          translate(translation, this.$i18n.locale, 'zh-CN', load).then(
            data => {
              if (data.success) {
                resolve(data.data.r);
              } else {
                this.$parent.$refs.confirm.tip('component.translationFailure', false);
                reject();
              }
            }
          );
        }
      })
    }
    //argArr:[{state:'userinfo',setFunc:"setUserinfo"}],false,针对没有规则的命名
    //argArr:['userinfo']	isAi：是否智能匹配
    Vue.prototype.storeAsny = function (argArr, isAi) {
      var _this = this;
      //命名规则数组
      var namings = ['{{set}}'];
      //遍历获取本地
      if (isAi) {
        for (let item of argArr) {
          //遍历store的变化方法
          if (namings.length > 0) {
            for (let name of namings) {
              //拼接首字母大写
              let uCName = item.substr(0, 1).toUpperCase() + item.substring(1);
              //匹配
              name = name.replace(/{{key}}/g, uCName);
              if (this.$store._mutations[name] != undefined) {
                setStore(item, name);
              } else {
                forSearch(item);
              }
            }
          } else {
            forSearch(item);
          }
        }
      } else {
        for (let item of argArr) {
          setStore(item.state, item.setFunc)
        }
      }
      //遍历_mutations的名称匹配
      function forSearch(name) {
        for (let _mutations in _this.$store._mutations) {
          //匹配
          let reg = new RegExp(name, 'ig');
          if (reg.test(_mutations)) {
            //记忆规则
            var nameRules = _mutations.replace(reg, '{{key}}');
            if (String.prototype.indexOf.call(namings, nameRules) == -1) namings.push(nameRules);
            //读取
            setStore(name, _mutations);
            break;
          }
        }
      }
      //获取值
      function setStore(name, func) {
        let local = sessionStorage.getItem(name);
        if(!/^http:\/\/|https:\/\//.test(local)){
          local = JSON.parse(local);
        }
        _this.$store.commit(func, local);
      }
    }
    //       注入组件
    Vue.mixin({
      computed: {
        localeState() {
          return store.state.locale.type;
        }
      },
      watch: {
        localeState(val) {
          if (this.pageData) {
            this.pageData();
          }
        }
      },
    })
  }
}
