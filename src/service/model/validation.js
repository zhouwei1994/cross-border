import {Validator} from 'vee-validate'
//新建规则
Validator.extend('username', {
  messages: {
    zh_CN:field => '用户名不少于4个字符',
    th:field => 'ชื่อผู้ใช้น้อยกว่า 4 ตัวอักษร',
  },
  validate: value => {
    return /^\S{4,}$/.test(value);
  }
});
Validator.extend('tel', {
  messages: {
    zh_CN:field => '请输入正确的手机号码',
    th:field => 'โปรดป้อนหมายเลขโทรศัพท์ที่ถูกต้อง',
  },
  validate: value => {
    return /^1[3|4|5|7|8][0-9]{9}$/.test(value);
  }
});
Validator.extend('pwd', {
  messages: {
    zh_CN:(field, args) => {
       return '密码不少于6个字符'
    },
    th:(field, args) => {
       return 'รหัสผ่านอย่างน้อย 6 ตัวอักษร'
    },
  },
  validate: value => {
    return /^\S{6,}$/.test(value);
  }
});
Validator.extend('code', {
  messages: {
    zh_CN:(field, args) => {
       return '邮箱验证码为6位数有效数字'
    },
    th:(field, args) => {
       return 'E-mail รหัสยืนยันตัวเลขหกหลักอย่างมีนัยสำคัญ'
    }
  },
  validate: value => {
    return /^[0-9]{6}$/.test(value);
  }
});
//修改规则属性
const dict = {
  zh_CN:{
  	custom: {
  	  tel: {
        //email: '电子邮箱是必须的' // required 与规则同时匹配需要提示的信息
      }
    },
  	attributes: {
      email: '电子邮箱',
      username: '用户名',
      tel: '手机号码',
      pwd: '密码',
      code: '邮箱验证码',
      address:'收货地址',
      postalCode:'邮政编码',
      checkNewPassword:'确认密码'
    }
  },
  en: {
    custom: {
    },
    attributes: {
      email: 'Email Address',
      username: 'User Name',
      tel: 'Telephone Number',
      pwd: 'Password',
      code: 'Email Verification Code',
      address:'Delivery address',
      postalCode:'Postal code',
      checkNewPassword:'Confirm password'
    }
  },
  th: {
    custom: {
    },
    attributes: {
      email: 'Email Address',
      username: 'User Name',
      tel: 'Telephone Number',
      pwd: 'Password',
      code: 'Email Verification Code',
      address:'Delivery address',
      postalCode:'Postal code',
      checkNewPassword:'Confirm password'
    }
  },
};
Validator.updateDictionary(dict);