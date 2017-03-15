
var replyF=document.getElementById('reply-layout');
var detailF=document.getElementById('detail-layout');
var flag=false;
var reduceFlag=false;
var index=1;
//论坛添加子节点模板的方法
function ReplyTemplate(jsonDate){
    var flat=document.createElement('div');
    flat.className="assess-flat";
    var html= '<span class="assess-wrapper">'
        + '<div class="assess-top">'
        + '<span class="user-portrait">'
        + '<img src='+jsonDate[0]+' >'
        + '</span>'
        + '<span class="user-name">'+jsonDate[1]+'</span>'
        + '<span class="assess-date">'+jsonDate[2]+'</span>'

        + '</div>'
        + '<div class="assess-bottom">'
        + '<p class="assess-content">'+jsonDate[3]+'</p>'

        +'<p class="pay-date">'+jsonDate[4]+'</p>'
        +'<p class="product-type">'+jsonDate[5]+'</p>'
        +'</div>'
        +'</span>'
        +'<div class="assess-btns-box">'
        + '<div class="assess-btns">'
        + '<a  class="assess-like-btn">'
        + ' <i class="icon-r iconfont ">&#xe62c;</i>'
        + '<span class="assess-btns-num">'+jsonDate[6]+'</span>'
        + ' </a>'
        + ' <a  class="assess-reply-btn">'
        + ' <i class="icon-r iconfont ">&#xe744;</i>'
        +'<span class="assess-btns-num">'+jsonDate[7]+'</span>'
        + '</a>'
        + '</div>'
        + '</div>';
    flat.innerHTML=html;
    return flat;
}
//详情添加子节点模板的方法
function DetailTemplate(jsonDate) {
    var img=document.createElement('img');
    img.src=jsonDate.imgSrc;
    return img;
}



//评论的AJAX请求
var replyFun=function () {
    replyF.innerHTML='';
    replyF.style.display='inline-block';

    $.ajax({

        type: "GET",
        url: "reply.txt",
        dataType: "json",
        success: function (data) {

            for(var i=0;i<data.length;i++){
                var strArr=[];
                for (var j=0;j<data[i].length;j++){
                    strArr.push(data[i][j]);
                }
                var o=new ReplyTemplate(strArr);
                replyF.appendChild(o);


            }

        }


    });

};
//详情的AJAX请求
var detailFun=function () {
    detailF.innerHTML='';
    detailF.style.display='inline-block';


    $.ajax({

        type: "GET",
        url: "detail.txt",
        dataType: "json",
        success: function (data) {

            for(var i=0;i<data.length;i++){

                var o=new DetailTemplate(data[i]);
                detailF.appendChild(o);


            }

        }


    });
};
var slide=document.querySelector('.slide');
var ulScroll=slide.children[0];

function testScreen(ele) {
    if(screen.width<=640 ){
        ele.style.width=screen.width+'px';
        ele.style.height=screen.width+'px';
        ele.children[0].style.width=screen.width*8+'px';
        ele.children[0].style.height=screen.width+'px';
        for(var i=0;i<8;i++){
            ele.children[0].children[i].style.width=screen.width+'px';
            ele.children[0].children[i].style.height=screen.width+'px';
        }
    }else{
        ele.style.width='640px';
        ele.style.height='640px';
        ele.children[0].style.width='5120px';
        ele.children[0].style.height='640px';
        for(var i=0;i<8;i++){
            ele.children[0].children[i].style.width='640px';
            ele.children[0].children[i].style.height='640px';
        }
    }
}
testScreen(slide);
function autoplay() {

    if(!reduceFlag){
        reduceFlag=true;
        if(ulScroll.offsetLeft-ulScroll.offsetHeight<=-1*ulScroll.offsetWidth){flag=true;}
        if(ulScroll.offsetLeft+ulScroll.offsetHeight>0){flag=false;}


        if(!flag){
            index=-1*((ulScroll.offsetLeft-ulScroll.offsetHeight)/ulScroll.offsetHeight)+1;
            ulScroll.style.left=ulScroll.offsetLeft-ulScroll.offsetHeight+'px';
        }else {
            index=-1*((ulScroll.offsetLeft+ulScroll.offsetHeight)/ulScroll.offsetHeight)+1;
            ulScroll.style.left=ulScroll.offsetLeft+ulScroll.offsetHeight+'px';

        }

    }
    t1= setTimeout(function () {
        reduceFlag=false;
    },1000)


}
var time1=setInterval(function () {
    autoplay();
},1500);
var lSlide=function () {
    clearInterval(time1);
    if(!(ulScroll.offsetLeft-ulScroll.offsetHeight<=-1*ulScroll.offsetWidth)){
        flag=false
        autoplay();
        setTimeout(function () {
            clearInterval(time1);
            time1=setInterval(function () {
                autoplay();
            },1500);
        },1000)

    }


};
var rSlide=function () {
    clearInterval(time1);
    if(!(ulScroll.offsetLeft+ulScroll.offsetHeight>0)){
        flag=true
        autoplay();
        setTimeout(function () {
            clearInterval(time1);
            time1=setInterval(function () {
                autoplay();
            },1500);
        },1000)
    }
};
window.onresize=function () {
    testScreen(slide);
    clearInterval(time1);
    ulScroll.style.left='0px';
     time1=setInterval(function () {
        autoplay();
    },1500);

}

$('#sp').on('touchend',function (e) {
    e.preventDefault();
    var active=document.getElementsByClassName('col-4 active')[0];
    active.className='col-4';
    e.originalEvent.changedTouches[0].target.className='col-4 active';
    slide.style.display='inline-block';
    replyF.style.display='none';
    detailF.style.display='none';
})
$('#xq').on('touchend',function (e) {
    e.preventDefault();
    var active=document.getElementsByClassName('col-4 active')[0];
    active.className='col-4';
    e.originalEvent.changedTouches[0].target.className='col-4 active';
    slide.style.display='none';
    replyF.style.display='none';
    detailFun();
})
$('#pj').on('touchend',function (e) {
    e.preventDefault();
    var active=document.getElementsByClassName('col-4 active')[0];
    active.className='col-4';
    e.originalEvent.changedTouches[0].target.className='col-4 active';
    slide.style.display='none';
    detailF.style.display='none';
    replyFun();
})

//判断手势226-254
var windowHeight = $(window).height(),
    $body = $("body");

$body.css("height", windowHeight);

$("body").on("touchstart", function(e) {


    e.preventDefault();
    startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
});

$("body").on("touchmove", function(e) {

    e.preventDefault();
    moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;

    if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
        rSlide();
    }
    else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
        lSlide();
    }

});

