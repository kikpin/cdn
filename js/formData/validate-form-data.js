;(function (){
  'use strict';

  // formValidate(data)
  // return index,success,error,


  window.validateFormData={
    validate,
  };
  //根据input.type初步验证数据，然后处理getData
  //传参{form}目标{data}外部传入getData数据
  function validate(formSelector){
    let elForm = document.querySelector(formSelector);
    let inputs = elForm.querySelectorAll("[name]");
    inputs.forEach(it => {
        console.log(it);
        switch (it.type){
          case "number":
          break;
        }
        
    });



  }
})()