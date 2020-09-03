;
(function () {
  'use strict';
  window.kikyou = {
    ajax: ajax,
    get: get,
    post: post
  };

  function get(url) {
    ajax("get", url);
  };

  function post(url) {
    ajax("post", url);
  };

  function ajax(method, url) {
    let http;

    if(window.XMLHttpRequest) { 
      http = new XMLHttpRequest();
    }else if (window.ActiveXObject) {
      http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(http !== null){
      http.open(method, url);
      http.send();
      http.onreadystatechange = function () {
        if (http.readyState == 4) {
          if (http.status == 200) {
            let data = JSON.parse(http.responseText);
            return data;
          } else {
            return console.log("it is not success(200) !");
          }
        }
      };
    }else{
      console.log("new XMLHttpRequest() is error");
    }

  };
})()