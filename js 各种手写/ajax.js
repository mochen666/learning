/*
 ajax的工作原理:
 1、创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）
 2、判断数据传输方式(GET/POST)
 3、启动，调用open()
 4、发送，调用send()
 5、当ajax对象完成第四步数据接收完成，判断http响应状态，执行回调函数


 XMLHttpRequest对象的readyState属性可取的值：

 0：未初始化。尚未调用open()方法；
 1：启动。已经调用open()方法，但尚未调用send()方法；
 2：发送。已经调用send()方法，但尚未接收到响应；
 3：接收。已经接收到部分响应数据；
 4：完成。已经接收到全部响应数据，而且已经在客户端使用了；
 */
function ajax(method, url, data, successCallback, failCallback) {
    let xhr = null
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            successCallback && successCallback(xhr.responseText)
        } else {
            failCallback && failCallback()
        }
    }
    if (method === 'GET') {
        xhr.send()
    } else {
        xhr.send(data)
    }
}