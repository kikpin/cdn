; (function () {
  'use strict';
  //暴露接口
  window.fillFormData = {
    fillData,
  };
  //填充FORM表单,通过"name属性"定位"表单控件"
  //传参:{data} 数据 {formSelector} 填充目标
  function fillData(data, formSelector) {

    let elForm = document.querySelector(formSelector);

    for (let key in data) {
      let it = data[key];
      switch (key) {
        //select,fill,submit,reset,hidden,image,button:未处理
        case "radio":
          let radioInput = elForm.querySelector(`[type='radio'][name='${key}'][value='${it}']`);
          radioInput && (radioInput.checked = true);
          break;
        case "checkbox":
          it.forEach(itCheck => {
            let checkboxInput = elForm.querySelector(`[type='checkbox'][name=${key}][value=${itCheck}]`);
            checkboxInput && (checkboxInput.checked = true);
          })
          break;
        //data,time,month,week,datatime,datatime-local,number,range,password,text,email,search,url,color,textarea
        default:
          let input = elForm.querySelector(`[name=${key}]`)
          input.value = it;
      }
    }
  }
})()