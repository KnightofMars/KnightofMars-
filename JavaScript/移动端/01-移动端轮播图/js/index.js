// ① 自动播放功能
// ② 开启定时器
// ③ 移动端移动，可以使用translate 移动
// ④ 想要图片优雅的移动，请添加过渡效果

// ① 自动播放功能-无缝滚动
// ② 注意，我们判断条件是要等到图片滚动完毕再去判断，就是过渡完成后判断
// ③ 此时需要添加检测过渡完成事件 transitionend 
// ④ 判断条件： 如果索引号等于 3 说明走到最后一张图片，此时 索引号要复原为 0
// ⑤ 此时图片，去掉过渡效果，然后移动
// ⑥ 如果索引号小于0， 说明是倒着走， 索引号等于2 
// ⑦ 此时图片，去掉过渡效果，然后移动

// ① 小圆点跟随变化效果
// ② 把ol里面li带有current类名的选出来去掉类名 remove
// ③ 让当前索引号 的小li 加上 current add
// ④ 但是，是等着过渡结束之后变化，所以这个写到 transitionend 事件里



// ① 手指滑动轮播图
// ② 本质就是ul跟随手指移动，简单说就是移动端拖动元素
// ③ 触摸元素 touchstart： 获取手指初始坐标
// ④ 移动手指 touchmove： 计算手指的滑动距离，并且移动盒子
// ⑤ 离开手指 touchend: 根据滑动的距离分不同的情况
// ⑥ 如果移动距离小于 某个像素 就回弹原来位置
// ⑦ 如果移动距离大于某个像素就上一张下一张滑动。
// ⑧ 滑动也分为左滑动和右滑动 判断的标准是 移动距离正负 如果是负值就是左滑 反之右滑
// ⑨ 如果是左滑 就播放下一张 （index++）
// ⑩ 如果是右滑 就播放上一张 (index--)




// ① 滚动某个地方显示
// ② 事件： scroll 页面滚动事件 
// ③ 如果被卷去的头部（window.pageYOffset ）大于某个数值
// ④ 点击， window.scroll(0,0) 返回顶部
window.addEventListener('load',function(){
    // 1.获取元素
    let focus = document.querySelector('.focus');//获取显示器
    let ul = focus.children[0];//用focus的孩子来获取
    let fw = focus.offsetWidth;
    let ol = focus.children[1];
    let index = 0;//设置一个index值 也就是索引号 切换到第几张图片就是-index*focus.width
    let timer = setInterval(function(){ 
        index++;
        let translateX = - index * fw ;
        ul.style.transition = 'all .3s';//css3 缓缓过渡 
        ul.style.transform =  'translateX('+ translateX  +'px)';
    },2000)
    // 2.给ul设置监听器
    ul.addEventListener('transitionend',function(){//实现无缝滚动的原理 和pc 一样 视觉差 过渡是有时间的 要要从最后一张跳到第一张 要迅速跳完 不可以是有过渡效果 所以等过渡完了 我们再进行跳动 transitionend检测过渡完成事件
        if(index >= 3){//通过索引号来判断是不是最后一张
            // 清除transition 缓缓过渡效果 
            ul.style.transition = 'none'; 
            index = 0;//设置索引号为0 跳转到第一张图片
            // 清除完过渡效果 把索引号设置为0 你还要让他直接跳转过去
            translateX = - index * fw ;
            ul.style.transform =  'translateX('+ translateX  +'px)';
        }else if(index < 0){//判断左侧移动的条件 因为第一张 我们没带他玩 索引号没有 也就是负的 
            index = 2;//设置索引号为2 跳转到最后一张 也就是实际的倒数第二张上 形成一个闭环
            ul.style.transition = 'none';
            translateX = - index * fw ;
            ul.style.transform =  'translateX('+ translateX  +'px)';
        }
        // 小圆点过渡效果放在 滚动结束以后 放在定时器里 会导致图片滚动到最后一张 不再变化
        // (1.) 把ol里面li带有current类名的选出来去掉类名 remove
        ol.querySelector('li.current').classList.remove('current');//ol里面的 li带有current 用classList来移除 current  我们也可以在querySelector里面直接添加current 因为ol里面只有一个li带有current
        // // (2)让当前索引号 的小li 加上 current add 
        ol.children[index].classList.add('current');//怎么判断是给哪个小li加current呢 用index index控制着图片移动 同时也可以作为索引号 
    })
        let startX = 0;
        let moveX = 0;
        let flag = false;//设置节流阀 
        // (1)touchstart获取手指的初始位置
        ul.addEventListener('touchstart',function(e){
            startX = e.targetTouches[0].pageX;//只用获取x坐标就好了 不需要获取y 因为是左右移动
            clearInterval(timer);//当你手指放上去 图片不需要自动播放
        })
        // (2)touchmove 计算手指移动距离 并移动盒子
        ul.addEventListener('touchmove',function(e){
            moveX = e.targetTouches[0].pageX - startX;  //手指移动的距离 就是 手指移动的点击的位置减去 手指刚触摸的位置
            let  translateX = - index * fw  + moveX;//局部变量名字一样没有关系 盒子本来的位置 + 手指移动距离 就是盒子移动的距离 
            ul.style.transition = 'none';//清除样式 拖动的时候是很快的 而不是要过渡效果
            ul.style.transform =  'translateX('+ translateX  +'px)';
            flag = true;//当我们移动过以后 我们让节流阀打开 用户只是触摸 没有移动 就让节流阀关闭
            e.preventDefault();//阻止屏幕滚动的行为 当屏幕太长的话
        })
        // (3)touchend 根据滑动不同情况讨论 我们想要当他移动了超过50像素 滑动到下一张 或者上一张 小于50像素不移动
        ul.addEventListener('touchend',function(){
            if(flag){
                if(Math.abs(moveX) > 50){//Math.abs 是绝对值的意思 当右划时 起始位置 - 移动后的位置 = 负值 当左滑时 起始位置  - 移动后的位置 = 正值
                    if(moveX > 0){
                        index--;//右划就是上一张的意思
                    }else{
                        index++;//左划就是下一张的意思
                    }
                    let  translateX = - index * fw ;//这里不加movex的原因是 你拖动大于50 跳转到下或上 不需要跳转很多
                    ul.style.transition = 'all .3s';
                    ul.style.transform =  'translateX('+ translateX  +'px)';
                }else{//小于50 我们不想让他移动 产生回弹效果
                    let  translateX = - index * fw ;//不移动 就乖乖回到刚刚的位置
                    ul.style.transition = 'all .1s';//过渡稍微快一点 产生回弹的效果
                    ul.style.transform =  'translateX('+ translateX  +'px)';
                }
            }
            clearInterval(timer);//我们再清除一次 保证只有一个监听器再运行
            timer = setInterval(function(){ //当你点击时清除了监听器 不再会会自动播放了 所以设置再点击完后 让他继续播放
                index++;
                let translateX = - index * fw ;
                ul.style.transition = 'all .3s';//css3 缓缓过渡 
                ul.style.transform =  'translateX('+ translateX  +'px)';
            },2000)
        })
        // 回到顶部模块
        let goBack = document.querySelector('.goBack');
        let nav = document.querySelector('nav');
        window.addEventListener('scroll',function(){
            if(window.pageYOffset >= nav.offsetTop ){//页面滚动的距离>nav到顶端的距离 我们就让goback盒子显示
                goBack.style.display = 'block';
            }else{
                goBack.style.display = 'none';
            }
        })
        goBack.addEventListener('click',function(){
            window.scroll(0,0);
        })
})