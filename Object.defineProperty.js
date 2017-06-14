//vue.js和avalon.js都是通过它实现双向绑定 
var a = {}
Object.defineProperty(a,"b",{
	value:123
})
console.log(a.b);//123 
//传入参数 第一个参数：目标对象；第二个参数：需要定义的属性或方法的名字。第三个参数：目标属性所拥有的特性（descriptor）
//descriptor 
//value：属性的值; writable：false的话属性值只读，不能被重写;configurable:总开关，一旦false，就不能设置他的（value,writable,configurable）;enumerable：是否能在for ...in循环中遍历出来或在Objevt.keys中列举出来 get；set 
//只设置value,别的不设置，会被理解为默认将writable,configurable,enumerable的值为false(仅限于第一次设置的时候)

--------------------------------------------------
configurable

总开关，第一次设置 false 之后，，第二次什么设置也不行了，比如说

var a= {}
Object.defineProperty(a,"b",{
  configurable:false
})
Object.defineProperty(a,"b",{
  configurable:true
})
//error: Uncaught TypeError: Cannot redefine property: b

就会报错了。。注意上面讲的默认值。。。如果第一次不设置它会怎样。。会帮你设置为false。。所以。。第二次。再设置他会怎样？。。对喽，，会报错 
--------------------------------------------------
writable

如果设置为fasle，就变成只读了。。

var a = {}; 
Object.defineProperty(a, "b", { 
    value : 123,
    writable : false });

console.log(a.b); // 打印 123
a.b = 25; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值）
console.log(a.b); // 打印 123， 赋值不起作用。

----------------------------------------------------
enumerable

属性特性 enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。

var a= {}
Object.defineProperty(a,"b",{
  value:3445,
  enumerable:true
})
console.log(Object.keys(a));// 打印["b"]

改为false

var a= {}
Object.defineProperty(a,"b",{
  value:3445,
  enumerable:false //注意咯这里改了
})
console.log(Object.keys(a));// 打印[]

for...in 类似，，不赘述了

--------------------------------------------------------

set和get


在 descriptor 中不能 同时 设置访问器 (get 和 set) 和 wriable 或 value，否则会错，就是说想用(get 和 set)，就不能用（wriable 或 value中的任何一个）

set 和 get ，他俩干啥用的的，

var a= {}
Object.defineProperty(a,"b",{
  set:function(newValue){
    console.log("你要赋值给我,我的新值是"＋newValue)
    },
  get:function(){
    console.log("你取我的值")
    return 2 //注意这里，我硬编码返回2
   }
})
a.b =1 //打印 你要赋值给我,我的新值是1
console.log(a.b)    //打印 你取我的值
                    //打印 2    注意这里，和我的硬编码相同的

简单来说，， 这个 “b” 赋值 或者 取值的时候会分别触发 set 和 get 对应的函数

这就是实现 observe的关键啊