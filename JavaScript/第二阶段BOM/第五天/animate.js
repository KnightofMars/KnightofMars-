let span = document.querySelector('span');
let btn500 = document.querySelector('.btn500');
let btn800 = document.querySelector('.btn800');
function animate(obj,target,callback){
    console.log(callback);
    clearInterval( obj.timer);
    obj.timer = setInterval(function(){
         let step = (target - obj.offsetLeft) / 10;
         step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){ 
            clearInterval(obj.timer);
            if(callback){
                callback();//回调函数写的位置 定时器结束的时候 因为是要在运行完了以后变色 不是你点击时变色
            }
    }else{
   obj.style.left = obj.offsetLeft + step +'px';//step 会一直变小 
} 
},15)
}