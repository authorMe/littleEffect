/* 
* @Author: Marte
* @Date:   2017-02-14 16:31:30
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-14 17:45:29
*/

/*----------该方法不推荐使用，因为无没有过滤信号的来源，不够安全，可能会被恶意利用-------------*/
//window.postMessage（父窗口a向子窗口b发消息）第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源(origin)
var popup = window.open('http://bbb.com','title');
popup.postMessage('Hello World!','http://bbb.com');
//子窗口向父窗口发送信息
window.opener.postMessage('Nice to see you','http://aaa.com');
//父窗口和子窗口都可以通过message事件，监听对方的消息
window.addEventListener('message', function(){
    console.log(e.data);
},false)；

//localstorage
//子窗口接收消息
window.onmessage = function(e){
    if(e.origin !== 'http.bbb.com') return;
    var payload = JSON.parse(e.data);
    switch(payload.method){
        case 'set':
            localStorage.setItem(payload.key,JSON.stringify(payload.data));
            break;
        case 'get':
            var parent = window.parent;
            var data = localStorage.getItem(payload.key);
            parent.postMessage(data,'http://aaa.com');
            break;
        case 'remove':
            localStorage.removeItem(payload.key);
            break;
    }
};

//父窗口发送消息
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = {name:'jack'};
//存入对象
win.postMessage(JSON.stringify({key:'storage',method:'set',data:'obj'}),'http://bbb.coom');
//读取对象
win.postMessage(JSON.stringify({key:'storage',method:'get'}),'*');
window.onmessage =function(e){
    if(e.origin != 'http://aaa.com') return;
    console.log(JSON.parse(e.data).name);    //"jack"
};

