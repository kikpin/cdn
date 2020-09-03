; (function () {
  'use strict';
  //暴露接口
  window.getFormData = {
    getData,
  };

  //传参：{elForm} 获取目标
  function getData(formSelector) {
    let data = {};
    let elForm = document.querySelector(formSelector);
    let inputs = elForm.querySelectorAll("[name]");
    inputs.forEach(it => {
      switch (it.type) {
        case "number":
        case "range":
          data[it.name] = parseFloat(it.value);
          break;
        case "radio":
          if (!it.checked)
            return;
          data[it.name] = it.value;
          break;
        case "checkbox":
          if (!Array.isArray(data[it.name])) {
            data[it.name] = [];
          }
          if (!it.checked)
            return;
          data[it.name].push(it.value);
          break;
        //file的value:local-uri;new formData()创建上传表单
        // case "file":
        // case "submit":
        // case "reset":
        // case "hidden":
        // case "image":
        // case "button":
        // case "select":
        // console.log("类型暂时xxx");
        // break;
        //date,time,week,month,datetime,datetime-local,password,text,email,search,url,color,textarea
        default:
          data[it.name] = it.value;
      }
    });
    return data;
  }
}
)()