/* 
* @Author: Marte
* @Date:   2017-02-14 14:35:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-14 14:51:23
*/

(function(){
    var scripts = document.getElementsByTagName('script')[0];
    function load(url){
        var script = document.createElement('script');
        script.async = true;  //脚本没有互相依赖关系，不会造成堵塞
        script.src = url;
        scripts.parentNode.insertBefore(script, scripts);
    }
    load('js/index1.js');
    load('js/index2.js');
    load('js/index3.js');
}());

//为动态加载的脚本指定回调函数
function loadScript(src,done){
    var js = document.createElement('script');
    js.src = src;
    js.onload = function(){
        done();
    };
    js.onerror = function(){
        done(new Error('Failed to load script' + src));
    };
    document.head.appendChild(js);
}

//动态嵌入还有一个地方需要注意：动态嵌入必须等待css文件加载完成后，才会去下载外部脚本文件；静态加载就不存在这个问题，script标签制定的外部脚本文件，都是与css文件同时并发下载。