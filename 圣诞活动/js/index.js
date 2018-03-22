var shell = document.getElementById("mian");
var w=$(document).width();
var dw=w/20;
var mainh=$(document).height();
$(function(){
    $('.bott').css('height','150px');
    $('.person').css('height','100px');


    $(".bott_left").bind("touchstart",function(){//人物向左移动
        $('.person').attr('i','1');
        var set=setInterval(function(){
            var p=$('.person').attr('i');
            if(p=='1'){//判断手机触摸
                var  person_left=$('.person').css('margin-left');
                person_left=parseInt(person_left);
                if(person_left>0){//判断人物是否移动出边界
                    $('.person').css('margin-left',(person_left-2)+'px');
                }
            }
            if(p=='0'){
                clearInterval(set);
            }
        },5);
    });

    $(".bott_left").bind("touchend",function(){//人物向左移动停止，手触摸离开就改变状态
        $('.person').attr('i','0');
    });


    $(".bott_rihgt").bind("touchstart",function(){//人物向右移动
        $('.person').attr('i','1');
        var set=setInterval(function(){
            var p=$('.person').attr('i');
            if(p=='1'){
                var  person_left=$('.person').css('margin-left');
                person_left=parseInt(person_left);
                if(person_left<(w-96)){//判断人物是否移动出边界
                    $('.person').css('margin-left',(person_left+2)+'px');
                }
            }
            if(p=='0'){
                clearInterval(set);
            }
        },5);
    });

    $(".bott_rihgt").bind("touchend",function(){//人物向右移动停止
        $('.person').attr('i','0');
    });


});

//**水果随机出现位置*/
function ran() {//随机1到20的数的函数
    var kwc = Math.ceil(Math.random() * 20);
    return kwc;
}
//**水果下落函数*/
function fall(){
    var s,der,ki,col;
    s=ran();
    der=ran();
    if(der==5 || der==10 || der==15){
        ki='0';//0就扣分
        col='url(images/apple1.png)';
    }else{
        ki='1';//如果是1就记分
        col='url(images/apple.png)';
    }

    var ml=dw*s;
    if(ml>(w-30)){//判断右边果子是否超出边界
        ml=ml-50;
    }

    var myDate = new Date();
    var myid = myDate.getTime();

    var html=shell.innerHTML;
    shell.innerHTML=html+'<div ki="'+ki+'" id="'+myid+'" style="position:absolute;z-index: 0;width: 30px;margin-left: '+ml+'px;margin-top: 0px;height: 30px;background: '+col+';"></div>';
    var fallset=setInterval(function(){
        var obsg=document.getElementById(myid);//获取下落水果对象

        var vt=obsg.style.marginTop;
        vt=parseInt(vt);
        obsg.style.marginTop=(vt+1)+'px';
        if(vt>mainh-240){
            var person=$('#person').css('margin-left');//获取人物的位置
            person=parseInt(person);
            if(ml>person && ml<(person+70)){//判断接没有接住
                //**记录分数*/
                var ki=$('#'+myid).attr('ki');
                var fen=$('#person').attr('fens');
                var kiy=$('#suju').attr('kiy');
                fen=parseInt(fen);

                if(kiy=='1'){//判断游戏是否结束没有
                    if(ki=='1'){//判断是否该加减分数
                        fen=fen+1;//加分
                    }else{
                        fen=fen-2;//减分
                    }
                }

                $('#person').attr('fens',fen);
                $('#czsl').html(fen);//分数记录
                $('#endfeng').html(fen);

                //**记录分数*/
                clearInterval(fallset);
                obsg.remove();
            }
        }
        if(vt>mainh-30){
            clearInterval(fallset);
            obsg.remove();
        }
    },10);

}
function allrun(){//游戏总运行函数
    var endrun=setInterval(function(){//定时游戏结束
        $('#suju').attr('kiy','0');
        $('#ing').css('display','none');
        $('#end').css('display','block');
        console.log('游戏结束');
        clearInterval(endrun);
    },21000);

    var time1=setInterval(function(){//时间跳动表
        var pd=$('#suju').attr('kiy');
        if(pd=='0'){
            clearInterval(time1);
        }else{
            var times=$('#time1').html();
            times=parseInt(times);
            times=times-1;
            $('#time1').html(times);
        }
    },1000);

    var run=setInterval(function(){//游戏运行函数
        var kiy=$('#suju').attr('kiy');
        if(kiy=='1'){
            fall();
        }else{
            clearInterval(run);
        }
    },1000);
}

function reten(){
    window.location.reload();
}

function funrun(){
    $('.beijinzez').css('display','none');
    allrun();
}
