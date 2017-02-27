# javascirpt从0开始
前言，在这个知识爆炸的年代，前端技术迭代日新月异，各类框架层出不穷，遗忘曲线实在太高了，所以在这最后的一个学期里~有了展开一次从0学习前端的想法。
##mission one 
详情见demo.html

内容：
  
  给按钮button绑定一个点击事件
  在事件处理函数中
  获取aqi-input输入的值，并显示在aqi-display中
  
 笔记
 javascript在DOM中获取节点的方式：
 
 ~~~
 document.getElementById()
 //根据节点id获取元素
 document.getElementsByTagName()
 //根据节点的标签获取,返回顺序按照在DOM中的顺序
 返回的是HTMLCollection,数组形式
 document.getElementsByClassName()
  //根据参数获取含有该类的所有元素,(min in IE9)
  返回的是HTMLCollection,数组形式
 ~~~
 
 给节点绑定点击事件
 
 ~~~
 element.onclick = function(){}
 
 //不兼容低版本浏览器方案
 function addEvent(obj,type,handle){
    try{  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type,handle,false);
    }catch(e){
        try{  // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        }catch(e){  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}
 //兼容方案
 //调用eg：addEvent( document.getElementById('button'),"click",change)
 ~~~
 
 修改节点内容
 
 ~~~
 Element.innerHTML= value;
 ~~~
 
##mission two

详情见mission_2.html

title:
遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
 
笔记

~~~
Array.prototype.sort();
//sort() 方法在适当的位置对数组的元素进行排序，并返回数组。 sort 排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点。
~~~

由于函数本身是根据unicode进行排序的，所以对于数字类还是要自定义函数进行排序。

~~~
//eg:
 var sortData = aqiData.sort(function(pre,next){
        if(pre[1]-next[1]<0){return 1;}
        if(pre[1]-next[1]>0){return -1;}
        if(pre[1]===next[1]){return 0;}
   });
   
   //pre为前一个元素,next为下一个元素
   //[pre,next] 在函数里return>0说明需要更改位置，更改后为[next,pre]
   //如果return <0则是不更改位置，如果0则不变
~~~

在节点内增加元素

~~~
element.appendChild();//增加子节点
element.insertBefore();//在节点前插入节点
~~~

