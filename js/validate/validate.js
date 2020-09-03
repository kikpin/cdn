import api from "./api.js"

export let is = {
  required(value) {
    return !!(value || value === 0);
  },

  /**
   * 是否是数字
   * @param {number} value
   * @return {boolean}
   */
  numeric(value) {
    if (!/^\d+$/.test(value.toString())) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否大于指定数字
   * @param {number} value
   * @param {number}  compasison  最小值
   * @return {boolean}
   */

  min(value, comparison) {
    if (value < comparison) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否大于指定数字
   * @param {value} number
   * @param {comparison} number 最大值
   * @return {boolean}
   */

  max(value, comparison) {
    if (value > comparison) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否在两数字之间
   * @param {number} value 
   * @param {number} min 最小值
   * @param {number} max 最大值
   * @return {boolead} 
   */
  between(value, min, max) {
    if (!this.min(value, min) || !this.max(value, max)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否是整数
   * @param {number} value 
   * @return {boolean}
   */
  positive(value) {
    if (!this.numeric(value)) {
      return false;
    }
    if (value <= 0) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否是负数
   * @param {number} value 
   * @return {boolean}
   */
  negative(value) {
    if (!this.numeric(value)) {
      return false;
    }
    if (value >= 0) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 字符串是否小于指定长度
   * @param {string} value 
   * @param {number} comparison 长度
   * @return {boolean}
   */
  minLength(value, comparison) {
    if (value.length < comparison) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 字符串是否大于指定长度
   * @param {string} value 
   * @param {number} comparison 长度
   * @return {boolean}
   */
  maxLength(value, comparison) {
    if (value.length > comparison) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 字符串是否在指定长度之间
   * @param {string} value 
   * @param {number} min 
   * @param {number} max 
   * @return {boolean}
   */
  lengthBetween(value, min, max) {
    if (!this.minLength() || !this.maxLength()) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 字符串是否以某段字符开头
   * @param {string} value 
   * @param {sting} comparison 
   * @return {boolean}
   */
  startsWith(value, comparison) {
    if (!value.startsWith(comparison)) {
      return false;
    }else{
      return true;
    }
  },

  /**
   * 字符串是否以某段字符结尾
   * @param {string} value 
   * @param {string} comparison 
   * @return {boolean}
   */
  endsWith(value, comparison) {
    if (!value.endsWith(comparison)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 字符串是否包含某段字符
   * @param {string} value 
   * @param {string} comparison 
   * @return {boolean}
   */
  includes(value, comparison) {
    if (!value.includes(comparison)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否在数组中
   * @param {mix} value 
   * @param {Array} comparison 数组
   * @return {boolean}
   */
  in (value, comparison) {
    if (comparison.indexOf(value) === -1) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 邮箱格式是否正确
   * @param {string} value 邮箱
   * @return {boolean}
   */
  email(value) {
    let re = /^\w+@\w+\.\w+$/;
    if (!re.test(value)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 用户名格式是否合法
   * @param {string} value 用户名
   * @return {boolean}
   */
  username(value) {
    let re = /^[a-zA-Z0-9]\w+$/;
    if (!re.test(value)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 手机号码是否合法
   * @param {string} value 手机号
   * @return {boolean}
   */
  phone(value) {
    let re;
    switch (country = "zh") {
      case "zh":
        re = /!(?:\+?(?:86))?(\s|-)?1\d{10}$/;
        break;
    }
    if (!re.test(value)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 是否可以匹配正则
   * @param {string} value 
   * @param {string} re 用于匹配正则表达式
   * @return {boolean}
   */
  regex(value, re) {
    if (typeof re == "string") {
      re = new RegExp(re);
    }

    if (!re.test(value)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * MOOC模型方法封装
   * @param {string} value 值
   * @param {string} model 模型名
   * @param {string} action 方法：create、update、read、exists、delete、first
   * @param {string} property 模型属性
   */
  unique(value, model, action, property) {
    return api(`${model}/${action}`, {
      where: {
        and: {
          [property]: value
        }
      }
    }).then(r => {
      return !r.data;
    })
  }
};

/**
 * 
 * @param {string} type 需要调用的方法
 * @param {*} value 被验证的值
 * @param  {...any} args 选传参数：comparson
 */
export function call(type, value, ...args) {
  if (type !== "required" && !value && value !== 0) {
    return true;
  } else {
    return is[type](value, ...args);
  }
}