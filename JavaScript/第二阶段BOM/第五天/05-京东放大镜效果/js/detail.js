window.addEventListener('load',function(){//因为js是从上往下执行 等css啥的执行完 然后js再执行 用load事件
    let preview_img = document.querySelector('.preview_img')
 let mask =document.querySelector('.mask');
 let big = document.querySelector('.big');
//  1.当鼠标在照片上时 显示遮罩层和大图片 所以让preview_img获取监听器
 preview_img.addEventListener('mouseover',function(){
     mask.style.display = 'block';
     big.style.display = 'block';
 })
 preview_img.addEventListener('mouseout',function(){
     mask.style.display = 'none';
     big.style.display = 'none';
 })
//  2.当鼠标在照片上移动时 遮罩层跟着移动 且不要超出图片盒子
mask.addEventListener('mousemove',function(e){
    // (1). 先计算出鼠标在盒子内的坐标
    let x = e.pageX - preview_img.offsetLeft;//跟着鼠标走 就是把鼠标在图片盒子内部的 x y坐标赋值给遮罩层 e.pageX 鼠标每移动一下 获取一个值  - preview_img的offsetLeft 就preview_img到body的距离 一减去就是 遮罩层在盒子中的坐标 也是鼠标在盒子中的坐标 这里也可以直接用this 简单 
    let y = e.pageY - preview_img.offsetTop;
    // (2) 我们mask 移动的距离
    let maskX = x - mask.offsetWidth/2; //要让遮罩层中心随着鼠标移动 减去本身大小的一半 
    let maskY = y - mask.offsetHeight/2;

    let maskMax =preview_img.offsetWidth - mask.offsetWidth;//这个是遮罩层的最大移动距离 底下都可以替换 因为正方形 宽和高是一样的

    if( maskX < 0){  //maskX是遮罩层中心到 图片盒子最左侧的距离 如果小于0 则说明 遮罩层从小图片盒子中左边移动出去了 所以此时给maskX 赋值为 0 这时候 遮罩层最左边正好和小图片盒子最左边对齐 
            maskX = 0;
    }else if(maskX > preview_img.offsetWidth - mask.offsetWidth){//不要固定思维想着 从右边出去 和 图片盒子右边有关系 preview_img.offsetWidth是图片盒子的宽度 mask.offsetWidth是遮罩层盒子的宽度 俩者相减就是maskX遮罩层中心在图片盒子中最远移动距离 因为当maskX大于最远移动距离时 遮罩层从图片盒子右边移动出去了 
       maskX = preview_img.offsetWidth - mask.offsetWidth;// 遮挡层的最大移动距离
    }
    if( maskY < 0){  
        maskY = 0;
}else if(maskY > preview_img.offsetHeight - mask.offsetHeight){
   maskY = preview_img.offsetHeight- mask.offsetHeight;
}
    mask.style.left = maskX + 'px';//这里要用left 而不是width 因为width是盒子大小 而不是盒子的坐标 记得要加px x是数值 没有单位
    mask.style.top = maskY + 'px';
    // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离 
    // 这个公式怎么得出来的 就是当遮罩层移动时 大图片要跟着移动 而且要同步  但是大图片的大小比遮罩层大很多 不能使用简单的遮罩层赋值 但遮罩层与大图片存在比例关系 遮罩层 一次移动一个像素 乘以他们的比例就是 大图片移动的像素 比例是 遮挡层移动的距离/遮挡层的最大移动距离 = 大图片的移动距离/大图片最大的移动距离 
    let bigImg = document.querySelector('.bigImg');
    // 大图片的最大移动距离
    let bigMax = bigImg.offsetWidth - big.offsetWidth ;//在大图片盒子里 图片的宽度 减去 盒子的宽度 就是大图片的最大移动距离 类比遮罩层 图片的宽度比盒子的宽度大 相当于盒子是遮罩层
    let bigX =  maskX * bigMax / maskMax;
    let bigY = maskY * bigMax / maskMax;
    bigImg.style.left = -bigX + 'px';//要给图片的横坐标加-负号 否则图片会等比例向遮罩层移动方向移动 而不会产生放大效果 就是你想看某一块细节 你往那里移动  但图片层的原理
    bigImg.style.top = -bigY + 'px';
})
})