//Object.create()方法使用指定的原型对象和其属性创建一个新的对象
//Object.create(proto, [propertiesObject ])  
//proto 一个对象，应该是新创建的对象的原型
//propertiesObject  可选，该参数对象是一组属性与值，该对象的属性名称将是新创新的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是undefined，只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。
//抛出异常  如果proto参数不是null,或者一个对象值，则抛出一个TypeError异常
//eg  使用Object.create()来实现类式继承，这个是单继承。
function Shape(){
	this.x = 0;
	this.y = 0;
}
Shape.prototype.move = function(x,y){
	this.x += x;
	this.y += y;
	console.info("Shapge.moved.");
	console.log(x);
	console.log(y);
}
//Rectangle - subclass
function Rectangle(){
	Shape.call(this); //call super constructor
}
Rectangle.prototype = Object.create(Shape.prototype);
var rect = new Rectangle();
console.log(rect instanceof Rectangle);  //true
console.log(rect instanceof Shape);      //true
rect.move(1,1)  // 输出 Shapge.moved.

//希望继承到多个对象，则可以使用混入的方式。
function MyClass(){
	SuperClass.call(this);
	OtherSuperClass.call(this);
}
MyClass.prototype = Object.create(SuperClass.prototype); //inherit
mixin(MyClass.prototype,OtherSuperClass.prototype);  //mixin
MyClass.prototype.myMethod = function(){
	//do a thing
}
//mixin 函数会把超类原型上的函数拷贝到子类原型上

//使用Object.create的prototypeObject参数
var o ;

//创建一个原型为null的空对象
o = Object.create(null);

o={};
//以字面量方式创建的空对象就相当于：
o=Object.create(Object.prototype);

o = Object.create(Object.prototype,{
	//foo会成为所创建对象的数据属性
	foo:{ writable:true,configurable:true,value:'hello'},
	//bar会成为所创建对象的访问器属性
	bar：{
		configurable：false,
		get:function(){return 10},
		set:function(value){ console.log("Setting `o.bar` to",value)}
	}
})

function Constructor(){}
o = new Constructor();
//上面的一句就相当于：
o = Object.create(Constructor.prototype); //当然，如果在constructor函数中有一些初始化代码，Object.create不能执行那些代码

//创建一个以另一个空对象为原型，且拥有一个属性p的对象
o = Object.create({},{p:{value:42}})

//省略了的属性特性默认为false,所以属性p不可写，不可枚举，不可配置
o.p = 24
o.p  //42
o.q = 12 
for(var prop in o){
	console.log(prop);
}   // " q "
delete o.p    //false

//创建一个可写的，可枚举，可配置的属性p
o2 = Object.create({},{p:{value:42,writable:true,enumerable:true,configurable:true}});