; (function () {
  'use strict';

  window.kikyouForm = {
    //取值getDate(formSelector)
    getDate,
    //存值setDate(dataObj,formSelector)
    setDate
  };
  //form取值
  function getData(formSelector) {
    let data = {};
    let inputs = formSelector.querySelectorAll("[name]");
    inputs.forEach(it => {
      switch (it.type) {
        case "number":
          data[it.name] = parseInt(it.value);
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
          if (!it.checked) {
            return;
          } else {
            data[it.name].push(it.value);
          }
          break;
        case "date":
        case "time":
        case "week":
        case "month":
        case "datetime":
        case "datetime-local":
          data[it.name] = it.valueAsDate;
          break;
        default:
          //EL表达式中[]的用法，可用于动态变量，优于data.it.name中“.”。
          data[it.name] = it.value;
      }
    });
    return data;
  }
  //form存值
  function setDate(data, form) {
    for (let key in data) {
      let input = form.querySelector(`[name=${key}]`);
      let val = data[key];
      switch (input.type) {
        case "radio":
          //动态变量用${}包起来
          let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);
          if (radio) {
            radio.checked = true;
          };
          break;
        case "checkbox":
          data[key].forEach(it => {
            let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);
            if (checkbox) {
              checkbox.checked = true;
            }
          })
        default:
          input.value = data[key];
      }
    }
  }
})();