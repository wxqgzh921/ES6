//map()方法： 返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
var arr = [1,2];
var callback = function(x){
	return x+1;
}
var result = arr.map(callback);
console.log(result);//2,3

///reduce()
var arr1 = [1,3,5];
var callback2 = function(x,y){
	console.log("初始值>>",x);
	return x+y;
};
var result2 = arr1.reduce(callback2,100);
console.log(result2);   //x ==100 ,y 是arr1的每个item;


