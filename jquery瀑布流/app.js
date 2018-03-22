$(document).ready(function(){
    $(window).on("load",function(){
        imgLocation();
        var dataTmg = {"data":[{"src":"1.jpg"},{"src":"4.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
        //json数据存放图片的地址，用于扩充图片时候使用。
        window.onscroll = function(){
            // 通过屏幕的滚动来加载图片
            if(scrollside()){
                $.each(dataTmg.data,function(index,value){
                    //循环进行json数据的读取和函数的调用
                    var box = $("<div>").addClass('box').appendTo($('#container'));
                    //添加一个box到container下面
                    var content = $('<div>').addClass('content').appendTo(box);
                    // console.log('./img/'+$(value).attr('src'));
                    $('<img>').attr('src','./img/' + $(value).attr('src')).appendTo(content);
                    //添加如片到内容
                    imgLocation();
                    //创建出图片后，需要重新添加图片。
                });
            }
        }
     });
});

function scrollside(){
    var box = $('.box');
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
    // 获取最后一个盒子的高度也就是最高的盒子的高度。
    var documentHeight = $(document).width();
    //获取当前屏幕的高度
    var scrollHeight = $(window).scrollTop();
    //获取窗口的滚动高度 滚动到距顶端的位置
    // console.log(scrollHeight+"  "+documentHeight);
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
    // 当前文档的高度+滚动的高度大于最高的图片的高度的时候，进行图片的加载。
}

function imgLocation(){
    var box = $('.box');
    var boxWidth = box.eq(0).width();
    // 通过qu(0)来获取第一个盒子的宽度，宽度都相同，因此获取那个box的宽度都可以。
    var num = Math.floor($(window).width()/boxWidth);
    // 计算一排能放几个图片 num取整数。
    var boxArr = []; //存储盒子的高度
    box.each(function(index,value){
        // index:确定从哪个图片开始；value：确定当前是哪个对象
        // console.log(index+"  "+value);
        var boxHeight = box.eq(index).height();
        // 获取每个盒子的高度，其中第一排直接放在数组中。
        if(index<num){
            boxArr[index] = boxHeight;
        }else{
            var minBoxHeight = Math.min.apply(null,boxArr);
            var minBoxIndex = $.inArray(minBoxHeight,boxArr);
        
            // 当放置第二排时，需要考虑第一排的高度，获取最小盒子的高度，从数组中获取最小盒子的位置，从而为了放置下一排的盒子。
            $(value).css({
                'position':'absolute',
                'top':minBoxHeight,
                'left':box.eq(minBoxIndex).position().left
            });
             /*
                获取图片的对象，然后对图像进行操作。
                实际上操作的是box，位置的放置通过CSS来控制。
              */
            boxArr[minBoxIndex] += box.eq(index).height();
             /*
                当第二排的第一张图片添加完后，重新计算高度，否则所有的图片都叠在
                第一排的最低的图片下面。
             */
        }
    });
}
