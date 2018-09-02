/*
* 实现轮播图效果
* */
var $oul=$('.ulBox');//获取到ulBox
var $listBox=$('.litBox');
function bannerFn() {
    var mySwiper=new Swiper('.bannerBox',{
        autoplay:{//用户操作后 仍然自动播放
            disableOnInteraction:true, /*设置false切换还可以自动播放*/
            //一个图片再当前窗口的停留时间
            delay:1000
        }, /*自动播放*/
        loop:true,  /*无缝滚动播放*/
        pagination: {//分页器
            el: '.pagebox',//分页盒子
            type: 'fraction',//分页类型 1/2
            currentClass:'currentPage',//变动数字的盒子类名
            totalClass:'totalPage'//总共数字 盒子的类名
            //type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },


    });
}

/*
* 获取数据
* */
//1
/*
把这个注释掉换成下面的promise了
$.ajax({
    type:'post',//请求方式
    url:'./data/banner.json',//请求路径
    data:{//发送数据给后台
        t:123,
        q:234
    },
    success:function (data) {//请求成功做的事情
        console.log(data);
        giveHtml(data);//请求成功之后直接把数据放到页面上
    },
    error:function () {//请求失败做的事情

    }
});*/
//2 把数据转成页面可见的元素
function giveHtml(data) {
    data=data || [];
    var str='';//用来存储拼接好的结构字符串
    data.forEach((item)=>{
        str+=`<li class="swiper-slide">
                    <a href="##">
                        <img src="${item.img}" alt="">
                        <div>${item.title}</div>
                    </a>
                </li>`
    });
    $oul.html(str);
    //bannerFn();//先请求数据 再把数据放到页面上 再执行轮播图函数
}

//转换成promise写法
var p=new Promise(function (resolve,reject) {
    $.ajax({
        type:'get',
        url:'./data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res);
        }
    })
});

/*p.then(function (data) {
  //第一个参数是promise执行成功函数
    console.log(data);
    giveHtml(data);
    return data;
},function () {
    //第二个参数是promise执行失败的函数
}).then(function (data) {//执行成功的
    //console.log(data);//上面return啥下面接收啥
    bannerFn();
},function () {

});*/
//下面是另外一种写法
p.then(function (data) {
    //第一个参数是promise执行成功函数
    console.log(data);
    giveHtml(data);
    return data;
}).then(function (data) {//执行成功的
    //console.log(data);//上面return啥下面接收啥
    bannerFn();
}).catch(function (ss) {
    console.log(ss);
});

/*
* 新闻列表
* */
var listPro=new Promise(function (resolve,reject) {
    $.ajax({
        type:'post',
        url:'./data/list.json',
        data:{t:1},
        success:function (data) {
            resolve(data);
            /*console.log(data);*/
        },
        error:function (res) {
            reject(res);
        }
    })
});
//把数据放到页面中
function giveListHtml(data) {
    data=data || [];
    var str="";
    data.forEach((item)=>{
        switch(item.type){
            case 0: //没有图的结构
                str+=`<a href="##">
                    <div>
                        <p>${item.title}</p>
                        <div class="comment_box">
                            <em class="">
                                <span class="">${item.num}</span>
                                <span class="icon_com"></span>
                            </em>
                        </div>
        
                    </div>
            </a>`;
            break;

            case 1://一张图的时候
                str+=`<a href="##">
            <div class="img_box">
                <img src="${item.img}" alt="">
            </div>
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>

            </div>
        </a>`;
            break;

            case 3://这是三张图
                str+=`<a href="###" class="three_box">
            <p>${item.title}</p>
            <div class="three_pic">
                <div><img src="${item.img[0]}" alt=""></div>
                <div><img src="${item.img[1]}" alt=""></div>
                <div><img src="${item.img[2]}" alt=""></div>

            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
            break;
        }
    });
    $listBox.html(str);
}

listPro.then(function (data) {
    giveListHtml(data);
});