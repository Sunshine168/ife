# javascirpt从0开始
前言，在这个知识爆炸的年代，前端技术迭代日新月异，各类框架层出不穷，遗忘曲线实在太高了，所以在这最后的一个学期里~有了展开一次从0学习前端的想法。
##mission_1
题目:

~~~
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <label>请输入北京今天空气质量：<input id="aqi-input" type="text"></label>
  <button id="button">确认填写</button>

  <div>您输入的值是：<span id="aqi-display">尚无录入</span></div>

<script type="text/javascript">

(function() {
  /*    
  在注释下方写下代码
  给按钮button绑定一个点击事件
  在事件处理函数中
  获取aqi-input输入的值，并显示在aqi-display中
  */

})();

</script>
</body>
</html>

~~~

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
 
##mission_2

题目:

~~~
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <h3>污染城市列表</h3>
  <ul id="aqi-list">
<!--   
    <li>第一名：福州（样例），10</li>
      <li>第二名：福州（样例），10</li> -->
  </ul>

<script type="text/javascript">

var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */

})();

</script>
</body>
</html>
~~~


详情见mission_2.html
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

##mission_3
 
题目:

~~~
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <ul id="source">
    <li>北京空气质量：<b>90</b></li>
    <li>上海空气质量：<b>70</b></li>
    <li>天津空气质量：<b>80</b></li>
    <li>广州空气质量：<b>50</b></li>
    <li>深圳空气质量：<b>40</b></li>
    <li>福州空气质量：<b>32</b></li>
    <li>成都空气质量：<b>90</b></li>
  </ul>

  <ul id="resort">
    <!-- 
    <li>第一名：北京空气质量：<b>90</b></li>
    <li>第二名：北京空气质量：<b>90</b></li>
    <li>第三名：北京空气质量：<b>90</b></li>
     -->

  </ul>

  <button id="sort-btn">排序</button>

<script type="text/javascript">

/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
  /*
  coding here
  */

  /*
  data = [
    ["北京", 90],
    ["北京", 90]
    ……
  ]
  */

  return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {

}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {

}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}

function init() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数

}

init();

</script>
</body>
</html>
~~~

##mission_4




###任务描述
>如图，模拟一个队列，队列的每个元素是一个数字，初始队列为空
有一个input输入框，以及4个操作按钮

点击"左侧入"，将input中输入的数字从左侧插入队列中；
点击"右侧入"，将input中输入的数字从右侧插入队列中；
点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
点击队列中任何一个元素，则该元素会被从队列中删除

###任务注意事项
>实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
请注意代码风格的整齐、优雅
代码中含有必要的注释
示例图仅为参考，不需要完全一致
需要考虑数字输入的合法性
建议不使用任何第三方库、框架
~~~

###任务注意事项
>
实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
请注意代码风格的整齐、优雅
代码中含有必要的注释
示例图仅为参考，不需要完全一致
需要考虑数字输入的合法性
建议不使用任何第三方库、框架

##mission_5

###任务描述
>基于上一任务
限制输入的数字在10-100
队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
队列展现方式变化如图，直接用高度表示数字大小
实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料

###任务注意事项
>实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
请注意代码风格的整齐、优雅
代码中含有必要的注释
示例图仅为参考，不需要完全一致
具体算法及可视化的形式不做特别限制，只要求能够展现出算法的过程
建议不使用任何第三方库、框架


##mission_6

笔记:
匹配字符串的方法

~~~
stringObject.match(searchvalue)//传入字符串
stringObject.match(regexp)//传入正则表达式
~~~

字符串转正则(存在一定的安全问题)来源于网上

~~~
var str = '/'+keyword+'/';
str = str.replace(/\/\//g,"\/");
var newStr = eval(str);
~~~

这里拓展一下关于正则表达式的内容
在js里面\w是不能匹配到汉字的
所以需要自己写一个正则


~~~
//单汉字的正则匹配式是
[\u4e00-\u9fa5]
//所以匹配汉字、数字、英文的正则表达式则是
/[\u4e00-\u9fa5a-zA-Z0-9]+/g
~~~

最近看了一些文章有讲到通过
Array.prototype.map()(min in IE9)
取代循环 这里就尝试一下使用了

~~~
var array = [1,2,3,4];
var newArray = array.prototype.map((value)=>{
return value*2;
});
//newArray=[2,4,6,8]；

~~~


