; (function () {
  'use strict';
  // 必须样式[hidden]!important
  window.kikyou = {
    // 默认，或传参(trigger,dropdown)
    dropdown
  }
  //trigger单击触发dropdown
  function dropdown(triggerSel = ".dropdown", dropdownSel = ".dropdown-list") {
    let trigger = document.querySelector(triggerSel);
    let dropdown = document.querySelector(dropdownSel);

    //dropdown绑定初始样式
    trigger.classList.add(".dropdown");
    dropdown.classList.add(".dropdown-list");
    //显-隐事件
    document.addEventListener("click", e => {
      if (e.target === trigger) {
        dropdown.hidden = !dropdown.hidden;
        return;
      }
      if (!(e.target.closest(".dropdown-list"))) {
        dropdown.hidden = true;
      }
    })





  }
})()