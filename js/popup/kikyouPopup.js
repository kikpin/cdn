; (function () {
  'use strict';

  window.kikyouPopup = {
    //入口配置如下
    popup
  }

  //入口配置文件
  // popup(".popup",//popup主体
  //   ".btn",//触发器
  //   {
  //     offsetY: 0.6,//popup的Y轴系数
  //     offsetX: 0.6,//popup的X轴系数
  //     pOn: "click",//popup显示触发事件
  //     mOn: "mouseup"//mask隐藏触发事件
  //   }
  // );
  //启动
  function popup(popupSelector, triggerSelector, config = defaultConfig) {
    let mask;
    let popup = document.querySelector(popupSelector);
    let trigger = document.querySelector(triggerSelector);
    //默认入口配置
    defaultConfig = {
      offsetY: 0.5,
      offsetX: 0.5,
      pOn: "click",
      mOn: "click"
    };
    loadConfig(config);
    initPopup(popup, config.offsetY, config.offsetX);
    //生成mask遮罩层，并获取mask
    initMask(popup, mask);
    mask = document.querySelector(".mask");
    //绑定popup,mask的显-隐事件
    bindEvent(popup, mask, false, trigger, config.pOn);
    bindEvent(popup, mask, true, mask, config.mOn);
  }

  //合并配置
  function loadConfig(conf) {
    config = Object.assign({}, defaultConfig, conf);
  }
  //初始化，生成mask层
  function initPopup(popup, offsetY, offsetX) {
    setPosiPopup(popup, offsetY, offsetX);
    popup.hidden = true;
  }
  function initMask(popup, mask) {
    let div = document.createElement("div");
    div.classList.add("mask");
    popup.parentElement.appendChild(div);
    div.hidden = true;
  }
  //绑定事件
  function bindEvent(popup, mask, toF, trigger, configOn) {
    trigger.addEventListener(configOn, function () {
      isVisibal(popup, toF)// tof即true or false
      isVisibal(mask, toF)
    })
  }
  function isVisibal(el, tof) {
    el.hidden = tof;
  }
  //自定义弹出层位置
  function setPosiPopup(popup, offsetY, offsetX) {
    let width = popup.offsetWidth;
    let height = popup.offsetHeight;
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    let x = winWidth - width;
    let y = winHeight - height;

    popup.style.left = x * offsetX + "px";
    popup.style.top = y * offsetY + "px";
  }
})()