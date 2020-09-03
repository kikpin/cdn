
(function () {
    window.$cookie = {
        set,
        get,
        check,
        sets,
    }

    function sets(data,exdays){
        if(data && Object.prototype.toString.call(data) == '[object Object]'){
            for(let key in data){
                set(key, data[key], exdays);
            }
        }
    }

    function set(key, value, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toGMTString();
        document.cookie = key + '=' + value + ';' + expires;
    }

    function get(key) {
        let name = key + "=";
        let cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            let c = cookieArr[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function check(key) {
        let value = get(key);
        if (value != "") {
            alert("Result is " + key + " : " + value);
        } else {
            alert("Not Setting");
        }
    }
})()