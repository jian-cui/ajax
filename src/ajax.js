/**
 * XMLHttpRequest
 * @param  {string} type the type of ajax request
 * @param  {string} url  ajax request api
 * @return {object} data
 */
function ajax(params, succCallback, failCallback) {
    let ajaxParams = {
        type: 'GET',
        url: '',
        data: null,
        async: true
    }
    Object.assign(ajaxParams, params);
    function addURLParam(url, name, value) {
        // GET
        url += (url.indexOf('?') === -1 ? "?" : "&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }
    function getXHR() {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest;
        } else if (typeof ActiveXObject != 'undefined') {
            if (typeof arguments.callee.activeXString != 'string') {
                let versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                    i, len;
                for (i=0, len=versions.length;i<len;i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error('Browser Doesn\'t Support Ajax');
        }
    }
    function getCookie(key) {
        if (document.cookie && document.cookie!='') {
            let cookiesArr = document.cookie.split(';');
            let cookie, ckey, cval;
            for (let i=0;i<=cookiesArr.length;i++) {
                cookie = cookiesArr[i].trim();
                ckey = cookie.split('=')[0];
                cval = decodeURIComponent(cookie.split('=')[1]);
                if (ckey == key) break;
            }
            return cval;
        }
    }
    let xhr = getXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status<300) || xhr.status==304) {
                // 成功
                succCallback.call(this, JSON.parse(xhr.responseText));
            } else {
                // 失败
                failCallback.call(this, JSON.parse(xhr.responseText));
            }
        }
    }
    if (ajaxParams.type.toUpperCase() === "GET") {
        if (ajaxParams.data) {
            let url = ajaxParams.url;
            let key;
            for (key in ajaxParams.data) {
                url = addURLParam(url, key, ajaxParams.data[key]);
            }
            ajaxParams.url = url;
        }
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(null);
        // xhr.send(ajaxParams.data);
    } else if (ajaxParams.type.toUpperCase() === "POST") {
        // 做CSRF预防 begin 
        // 将csrf token加入header中
        // 做CSRF预防 end
        xhr.open("POST", ajaxParams.url, ajaxParams.async);
        console.log('csrftoken', getCookie('csrftoken'));
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(ajaxParams.data);
    } else {

    }
}
export default ajax;




export let ajax2 = function (params) {
    let ajaxParams = {
        type: 'GET',
        url: '',
        data: null,
        async: true
    }
    Object.assign(ajaxParams, params);
    function addURLParam(url, name, value) {
        // GET
        url += (url.indexOf('?') === -1 ? "?" : "&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }
    function getXHR() {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest;
        } else if (typeof ActiveXObject != 'undefined') {
            if (typeof arguments.callee.activeXString != 'string') {
                let versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                    i, len;
                for (i=0, len=versions.length;i<len;i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error('Browser Doesn\'t Support Ajax');
        }
    }
    function getCookie(key) {
        if (document.cookie && document.cookie!='') {
            let cookiesArr = document.cookie.split(';');
            let cookie, ckey, cval;
            for (let i=0;i<=cookiesArr.length;i++) {
                cookie = cookiesArr[i].trim();
                ckey = cookie.split('=')[0];
                cval = decodeURIComponent(cookie.split('=')[1]);
                if (ckey == key) break;
            }
            return cval;
        }
    }
    return new Promise(function(resolve, reject) {
        let xhr = getXHR();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status<300) || xhr.status==304) {
                    // 成功
                    resolve(JSON.parse(xhr.responseText))
                    // succCallback.call(this, JSON.parse(xhr.responseText));
                } else {
                    // 失败
                    reject(JSON.parse(xhr.responseText))
                    // failCallback.call(this, JSON.parse(xhr.responseText));
                }
            }
        }
        if (ajaxParams.type.toUpperCase() === "GET") {
            if (ajaxParams.data) {
                let url = ajaxParams.url;
                let key;
                for (key in ajaxParams.data) {
                    url = addURLParam(url, key, ajaxParams.data[key]);
                }
                ajaxParams.url = url;
            }
            xhr.open("GET", ajaxParams.url, ajaxParams.async);
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send(null);
            // xhr.send(ajaxParams.data);
        } else if (ajaxParams.type.toUpperCase() === "POST") {
            // 做CSRF预防 begin 
            // 将csrf token加入header中
            // 做CSRF预防 end
            xhr.open("POST", ajaxParams.url, ajaxParams.async);
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send(ajaxParams.data);
        } else {

        }

    })
}