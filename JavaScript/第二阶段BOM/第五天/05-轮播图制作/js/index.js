// 轮播图也称为焦点图，是网页中比较常见的网页特效。
// 功能需求：
// 1. 鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
// 2. 点击右侧按钮一次，图片往左播放一张，以此类推， 左侧按钮同理。
// 3. 图片播放的同时，下面小圆圈模块跟随一起变化。
// 4. 点击小圆圈，可以播放相应图片。
// 5. 鼠标不经过轮播图， 轮播图也会自动播放图片。
// 6. 鼠标经过，轮播图模块， 自动播放停止

// ① 因为js较多，我们单独新建js文件夹，再新建js文件， 引入页面中。
// ② 此时需要添加 load 事件。
// ③ 鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
// ④ 显示隐藏 display 按钮

// ① 动态生成小圆圈
// ② 核心思路：小圆圈的个数要跟图片张数一致
// ③ 所以首先先得到ul里面图片的张数（图片放入li里面，所以就是li的个数）
// ④ 利用循环动态生成小圆圈（这个小圆圈要放入ol里面）
// ⑤ 创建节点 createElement(‘li’)
// ⑥ 插入节点 ol. appendChild(li)
// ⑦ 第一个小圆圈需要添加 current 


// ① 小圆圈的排他思想
// ② 点击当前小圆圈，就添加current类
// ③ 其余的小圆圈就移除这个current类
// ④ 注意： 我们在刚才生成小圆圈的同时，就可以直接绑定这个点击事件了

// ① 点击小圆圈滚动图片
// ② 此时用到animate动画函数，将js文件引入（注意，因为index.js 依赖 animate.js 所以，animate.js 要写到 index.js 上面）
// ③ 使用动画函数的前提，该元素必须有定位
// ④ 注意是ul 移动 而不是小li 
// ⑤ 滚动图片的核心算法： 点击某个小圆圈 ， 就让图片滚动 小圆圈的索引号乘以图片的宽度做为ul移动距离
// ⑥ 此时需要知道小圆圈的索引号， 我们可以在生成小圆圈的时候，给它设置一个自定义属性，点击的时候获取这个自定
// 义属性即可

// ① 点击右侧按钮一次，就让图片滚动一张。
// ② 声明一个变量num， 点击一次，自增1， 让这个变量乘以图片宽度，就是 ul 的滚动距离。
// ③ 图片无缝滚动原理
// ④ 把ul 第一个li 复制一份，放到ul 的最后面
// ⑤ 当图片滚动到克隆的最后一张图片时， 让ul 快速的、不做动画的跳到最左侧： left 为0
// ⑥ 同时num 赋值为0，可以从新开始滚动图片了


// ① 克隆第一张图片
// ② 克隆ul 第一个li cloneNode() 加true 深克隆 复制里面的子节点 false 浅克隆
// ③ 添加到 ul 最后面 appendChild


// ① 点击右侧按钮， 小圆圈跟随变化
// ② 最简单的做法是再声明一个变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，因此要声明全局变量。
// ③ 但是图片有5张，我们小圆圈只有4个少一个，必须加一个判断条件
// ④ 如果circle == 4 就 从新复原为 0



// ① 自动播放功能
// ② 添加一个定时器
// ③ 自动播放轮播图，实际就类似于点击了右侧按钮
// ④ 此时我们使用手动调用右侧按钮点击事件 arrow_r.click()
// ⑤ 鼠标经过focus 就停止定时器
// ⑥ 鼠标离开focus 就开始定时器


// 5.1 节流阀
// 防止轮播图按钮连续点击造成播放过快。
// 节流阀目的：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发。
// 核心实现思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数。
// 开始设置一个变量 var flag = true;
// If(flag) {flag = false; do something} 关闭水龙头
// 利用回调函数 动画执行完毕， flag = true 打开水龙
 window.addEventListener('load',function(){//load事件 用window来当做对象
    // 1.获取元素
     let arrowl = document.querySelector('.arrow-l');//用querySelector记得加选择器符号
     let arrowr = document.querySelector('.arrow-r');
     let focus  = document.querySelector('.focus');
     let focusWidth = focus.offsetWidth; //获取focus显示器 的宽度 作为全局变量
    //  2.鼠标经过focus 显示隐藏左右按钮
     focus.addEventListener('mouseenter',function(){//mouseenter 鼠标移动到盒子上的事件
         arrowl.style.display = 'block';
         arrowr.style.display = 'block'; 
         clearInterval(timer);//当鼠标移到focus盒子上时 不会自动播放轮播图
         timer = null //清除定时器变量 优化代码
    })
     focus.addEventListener('mouseleave',function(){//mouseleave 鼠标离开盒子的事件
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function(){
            arrowr.click();
        },2000)
     })
    //  3.动态生成小圆圈 有几张图片 生成几个小圆圈
     let ul = focus.querySelector('ul');//获取ul 而index.html中ul太多了 我们可以用focus 因为要获取的ul在focus盒子里面
     let ol = focus.querySelector('.circle')//获取ol ol有类名 我们用类名获取
    //  console.log(ul.children.length); //4
     for(let i = 0; i < ul.children.length; i++){ //小圆圈的个数要和ul的li图片绑定 有几张图片就有几个小圆圈 这种for循环是动态的
        // 创建li标签 
        let li = document.createElement('li');
        // 把创建好的li标签添加到ol中 获取ul里的li个数 然后创建li 并且添加到ol中;
        ol.appendChild(li);
        // 给每个li 设置自定义属性
        li.setAttribute('date-index',i); //i是值 也是索引号 第一个li就是0 
        // 4.小圆圈排他思想  每创造添加一个小圆圈的同时 就给这个小圆圈绑定click点击事件
        li.addEventListener('click',function(){
            // 干掉所有人 ol有几个孩子li 就清除几个 清除类名
            for(let i = 0; i < ol.children.length; i++){ //这个li是在ol中 
                ol.children[i].className = '';//直接element.className 不用加style 又不是样式 老是忘记
            }
            // 留下我自己 设置类名
            this.className = 'current';//谁调用 谁的className 就变成curent
            // 5.点击小圆圈 实现切换图片的效果
            // Obj是要移动的对象 那就是ul 因为ul在focus里 移动ul 实现图片切换的效果 想象一下 focus是显示器 每一张图是一个li 每个里横排摆放在ul里面 就像长长的卡片 让显示器里显示每一张卡片要想让li切换 是不是得 移动ul 让卡片动起来
            // animate(obj,target,callback)
            // target 是ul 移动的距离 移动的距离就等于 小圆圈的索引号乘以focus的宽度 第一个就是 0*focus 点击第二个小圆圈 就是 1 * focus ....注意是负值 比如点第二个圈圈 ul是向左走 所以是负值
            // 我们先获取索引号 利用添加自定义属性的方法来获取 设置element.setAttribute('属性','值'); 获取时element.getAttribute('属性'); 先添加后获取
            let index = this.getAttribute('date-index');//谁调用就获取他的自定义属性 获取索引号号   
            // 解决bug 因为点击小圆圈事件没有和 点击右按钮绑定 会出现bug 也就是小圆圈的索引号没有给num 和circle
            // 当我们点击了某个小li 就把小li的索引号赋给num
            num = index;
             // 当我们点击了某个小li 就把小li的索引号赋给circle
            circle = index;
            // console.log(focusWidth);
            // console.log(index);
            animate(ul, - focusWidth * index);
        })
     }
    //  6.克隆第一张图片 
     let first = ul.children[0].cloneNode(true);//1.用克隆的方式可以自动化获取图片 不用去html改 clone(true)是深复制 就是把标签带内容都复制过来  2. 不采用克隆的方法 小圆圈会增加一个 因为实际有5个小li 而克隆在for循环外 也就是小圆圈获取外 所以不会增加小圆圈的个数
     ul.appendChild(first);
    //  我们还想要默认第一个小圆圈是实心的
     ol.children[0].className = 'current';//修改第一个孩子的类名为current
    // 7.点击右侧按钮一次 图片就向下滚动一张
     let num = 0;//像上面索引号一样 num是几 就移动num*focusWidth的距离 记得也是负值 点击下一张 ul向左移动
     let circle = 0; //因为还有左按钮 所以circle和num一样声明为全局变量
    //  引入节流阀
    let flag = true;
    // 我们不想让用户快速点击图片 图片会唰唰唰的滚动 而是一张播放完再一张 当上一个动画函数执行完毕 再去执行下一个函数 让函数无法连续运行 我们可以采用回调函数的思想 回调函数就是你先执行完上一个函数以后 再干这件事情
    
     arrowr.addEventListener('click',function(){//记得加点击事件 第一次写忘记了
        //要实现无缝滚动原理 到最后一张时 点击按钮 会像前几张一样缓缓滚动到第一张图片 而不是唰的一下 退回到第一张图片  无缝滚动 原理有点像魔术 利用了欺骗眼睛  比如有三张图片 我复制了第一张作为第四张图片 即现在点3下按钮 会变到第四张 （此时再点击一下 会出现空白 因为ul图片移动完了） 点第四下时 监听器里面我们用一个判断语句 判断此时是否是最后一张 如果是 将最后一张的图片地址改为0  就是第一张的位置 因为计算机运行特别快 第四下点击时 ul位置已经到第一张了 但第一张和第四张是一模一样的 我们肉眼看不到丝毫变化 然后调用缓动函数  缓缓的变到第2张图片
        if(flag){//判断flag值是true 还是false
            flag = false; //第一次点击按钮 肯定正常运行 全局已经设为ture 但第二次点击后不行 因为flag == false if语句不执行 关闭节流阀
        if(num == ul.children.length - 1){//判断是否到最后一张图片了 因为num是索引号从0开始 而length始终比索引号多一 所以索引号是最后一个时 length要减去1
            ul.style.left = '0';//让ul回到最初的位置
            num = 0;//此时图片已经是最后一张 让num = 0 重新开始计算
        }
           num++;
        animate(ul, - num * focusWidth,function(){
            flag = true;//回调函数 当动画执行完 调用回调函数 将flag 变为 true 打开节流阀
        });
        // 8.点击右侧按钮 小圆圈会跟着变化 最简单就是的方法声明一个全局变量 circle 把circle放在按钮点击事件里每点击一下 第circle个小圆圈的样式更改为current 实心
        circle++; 
         if(circle == ol.children.length){//因为无缝滚动原理 图片始终都比小圆圈多一个 所以要判断circle 到最后一张图片 不会变为实心 因为最后一个小圆圈 不存在 所以判断当circle == 小圆圈的长度时 circle变为0 从第一个圆圈开始继续变化  为啥不像num一样长度减去1 因为小圆圈的个数就是 ol孩子的长度也就是小圆圈的长度 当circle == 小圆圈长度时 说明小圆圈走到头了 需要变为0
         circle = 0;
         }
         circleChange();}
     })
    //  9.左侧按钮做法
     arrowl.addEventListener('click',function(){
         if(flag){
             flag = false;
        if(num == 0){//左侧的做法和右侧正好相反 判断num 是不是等于0 等于0 说明在第一张图片 此时点击第一张图片要跳到最后一张图片 
            num = ul.children.length - 1;//当你在第一张图片点击左侧按钮时 num应该变到最后一张图片的索引号
            ul.style.left = - num * focusWidth + 'px';//ul.chidren.lengeth - 1 是最后一张图片的索引号 * focusWidth 是跳到最后一张的位置  记得加负值 当跳转到最后一张图片时 ul是向左移动的  left记得加px值
        }
           num--;//同样与右侧按钮相反  num应该--
        animate(ul, - num * focusWidth,function(){
            flag = true;
        });
        circle--;//同上 
        if(circle < 0){//判断是不是处于第一张图片 circle -- ; 当第一张图片时 circle为0 点击左侧按钮 circle应该<0 
            circle = ol.children.length -1;//当处于第一张图片时 点击左侧按钮 此时小圆圈应该变到最后一个 圈圈 为什么要减一 虽然小圆圈的个数等于小圆圈的长度 但比索引号多 1 ; 
        }
        circleChange();
        }
     })
    //  我们可以优化代码 重复的代码用函数封装起来
    function circleChange(){
        // 干掉所有人 清除类名
        for(let i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        // 留下我自己
        ol.children[circle].className = 'current';//这里不能用this 因为this是被调用函数 
    }
    let timer = setInterval(function(){
        // 手动调用定时器 
        arrowr.click();
    },2000)//每俩秒调用一次
 })