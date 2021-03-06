一、数组的深浅拷贝
--------------------------------------------------------
在使用JavaScript对数组进行操作的时候，我们经常需要将数组进行备份，事实证明如果只是简单的将它赋予其他变量，那么我们只要更改其中的任何一个，然后其他的也会跟着改变，这就导致了问题的发生。
var arr = ['one','two','three'];
var arrto = arr;
arrto[0] = 'test';
console.log(`新数组：${arrto}`);//Export:数组的新值：one,test,three
console.log(`原数组：${arr}`);//Export:数组的原始值：one,test,three
像上面的这种直接赋值的方式就是浅拷贝，很多时候，这样并不是我们想要得到的结果，其实我们想要的是arr的值不变
------------------------------------------------------------------------------------------
解决方法一：js的slice函数
-----------------------
对于array对象的slice函数，
返回一个数组的一段。（仍为数组）
arrayObj.slice(start, [end])
参数
arrayObj
必选项。一个 Array 对象。
start
必选项。arrayObj 中所指定的部分的开始元素是从零开始计算的下标。
end
可选项。arrayObj 中所指定的部分的结束元素是从零开始计算的下标。
说明
slice 方法返回一个 Array 对象，其中包含了 arrayObj 的指定部分。
slice 方法一直复制到 end 所指定的元素，但是不包括该元素。如果 start 为负，将它作为 length + start处理，此处 length 为数组的长度。如果 end 为负，就将它作为 length + end 处理，此处 length 为数组的长度。如果省略 end ，那么 slice 方法将一直复制到 arrayObj 的结尾。如果 end 出现在 start 之前，不复制任何元素到新数组中。
-----------------------------------------------------------------
var arr = ['one','two','three'];
var arrtoo = arr.slice(0);
arrtoo[0] = 'set map';
console.log(`新数组：${arrtoo}`);//Export:数组的新值:one,set map,three
console.log(`原数组：${arr}`);//Export:数组的原始值：one,two,three
------------------------------------------------------------------------------
解决方法二：js的concat方法
--------------------------
concat() 方法用于连接两个或多个数组。
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
语法
arrayObject.concat(arrayX,arrayX,......,arrayX)
说明
返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
---------------------------------------------------------------------
var arr = ['one','two','three'];
var arrtooo = arr.concat();
arrtooo[0] = 'set map to';
console.log(`新数组：${arrtooo}`);//Export:数组的新值:one,set map to,three
console.log(`原数组：${arr}`);//Export:数组的原始值：one,two,three
----------------------------------------------------------
二、对象的深浅拷贝
-------------------
var a = {name:'yy',age:26};
var b = new Object();

b.name = a.name;
b.age = a.age;
a.name = 'xx';
console.log(b);
console.log(a);
---------------------------------------
就是把对象的属性遍历一遍，赋给一个新的对象。
-------------------------------------------
var deepCopy = function(source){
	var result = {};
	for(var key in source){
		result[key] = typeof source[key] === "object" ? deepCopy(source[key]):source[key];
	}
	return result;
}
