1.let 命令 
基本用法
ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
{
	let a = 10;
	var b = 2;
}
console.log(a); // ReferenceError: a is not defined.
console.log(b); //2

for循环的计数器，就很合适使用let命令。
for(let i =0 ; i<10; i++){
  //....
}
console.log(i) //ReferenceError: a is not defined.

上面代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。

下面的代码如果使用var，最后输出的是10。
var a =[];
for(var i=0;i<10;i++){
	a[i] = function(){
		console.log(i);
	}
}
a[6](); 
//变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是10。

var a=[];
for(let i=0;i<10;i++){
	a[i] = function(){
		console.log(i);
	}
}
a[6]();
//变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

//for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc      输出了3次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。

------------------------------------------------------------------------
不会发生变量提升

var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
//var的情况
console.log(foo); //undefined
var foo = 2;
//let的情况
console.log(bar); //报错
let bar = 2;
//变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。

-------------------------------------------------------------------------
暂时性死区
只要块级作用域存在let命令，它所声明的变量就绑定这个区域，不再受外部影响。
var temp = 123;
if(true){
	//暂时性死区 开始
	temp = 'abc';   
	console.log(temp);// ReferenceError
    //暂时性死区 结束
    let temp;  
    console.log(temp);  //undefined
    temp =123；
    console.log(temp);  //123

}
//存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
typeof x; //ReferenceError
let x;
如果一个变量根本没有被声明，使用typeof反而不会报错。
typeof undeclared_variable // "undefined"

有些“死区”比较隐蔽，不太容易发现。
function bar(x=y,y=2){
	return[x,y];
}
bar();  //报错     调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。如果y的默认值是x，就不会报错，因为此时x已经声明了。

// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined

不允许重复声明 
-------------------------------------------------
let 不允许在相同作用域内，重复声明同一个变量 ; 因此，不能在函数内部重新声明参数。
function func(arg){
	let arg; //报错
}

function func(arg){
	{
		let arg; //不报错
	}
}
--------------------------------------------------
2.块级作用域
为什么需要块级作用域？ es5 只有全局作用域和函数作用域，没有块级作用域。

第一种场景，内层变量可能会覆盖外层变量。
var tmp = new Data();
function f(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world';
	}
}
f(); //undefined
if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量。
var s = 'hello';
for(var i=0;i<s.length;i++){
	console.log(s[i]);
}
console.log(i); //5    变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
---------------------------------------------------------------------------
ES6 的块级作用域

let实际上为 JavaScript 新增了块级作用域。

function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。只有两次都使用var定义变量n，最后输出的值才是10。如果只是if语句外层使用var定义n，运行输出依旧是5；如果只是if语句内层使用var定义n，则存在重复声明的问题，会报错。

ES6 允许块级作用域的任意嵌套。

{{{{{let insane = 'Hello World'}}}}};

上面代码使用了一个五层的块级作用域。外层作用域无法读取内层作用域的变量。

{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};

内层作用域可以定义外层作用域的同名变量。

{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
-----------------------------------------------------------
块级作用域与函数声明
ES6 规定，块级作用域之中，函数声明语句的行为类似于let,在块级作用域之外不可引用。
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());

//函数声明语句
{
	let a = 'secret';
	function f(){
		return a;
	}
}
//函数表达式
{
	let a = 'secret';
	let f = function(){
		return a ;
	}
}
避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。
//不报错
'use strict';
if(true){
	function f(){}
}
//报错
'use strict';
if(true){
	function f(){}
}
---------------------------------------------------------------------
// do表达式
// 本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。
// {
// 	let t = f();
// 	t = t * t + 1;
// }
// 上面代码中，块级作用域将两个语句封装在一起，但是，在块级作用域以外，没有办法得到t的值，因为块级作用域不返回值，除非t是全局变量。
// 现在有一个提案，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式。

// let x = do{
// 	let t = f();
// 	t*t+1;
// };
//上面代码中，变量x会得到整个块级作用域的返回值。
----------------------------------------------------------------
//const命令
//const 声明的是一个只读的常量。一旦声明，常量的值就不能改变。

const PI = 3.1415;
PI = 3;   // TypeError: Assignment to constant variable.  
          // const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

const foo;  //只声明不赋值，也会报错。
const 作用域和 let 命令一样，只在声明所在的块级作用域内有效。 const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
const声明的常量，也与let一样不可重复声明。
本质：
const保证的并不是变量的值不得改动，而是变量指向的那个内存地址不得改动，对于简单类型的数据（数值，字符串，布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
const foo={};
//为foo添加一个属性，可以成功
foo.prop = 123;
foo.prop //123
//将foo 指向另一个对象，就会报错 
foo = {}  //TypeError: "foo" is read-only
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

const a = [];
a.push("hello"); //可行
a.length = 0; //可行
a =['Dave']; //报错
//a 是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。
//使用Object.freeze 方法，可以将对象冻结。
const foo = Object.freeze({}); foo.prop=123;
//常规模式时，下面一行不起作用； 严格模式时，会报错。

//将对象彻底冻结的函数。
var constantize = (obj) => {
	Object.freeze(obj);
	Object.keys(obj).forEach(key,i) => {
		if(typeof obj[key] === 'object'){
			constantize(obj[key]);
		}
	}
}

ES6声明变量的六种方法 
ES5 只有2种 ：var 命令 和 function 命令。 
ES6 ：let,const,另外2种声明变量是 import和class 

//顶层对象的属性
顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。 ES5之中，顶层对象的属性与全局变量是等价的。
window.a = 1; a //1
a = 2 ; window.a //2

顶层对象的属性赋值与全局变量的赋值，是同一件事。
顶层对象的属性与全局变量挂钩，被认为是JavaScript语言最大的设计败笔之一。
这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，
从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

var a =1;  //在node的REPL环境，可以写成global.a  或者采用通用方法，写成this.a;
window.a ;  //1

let b =2 ;
window.b;  //undefined
//全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。


------------------------------------------------------------------
global 对象
ES5的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。
  --浏览器里面，顶层对象是window,但Node,和web Worker没有window；
  --浏览器和web worker 里面，self也指向顶层对象，但Node没有self；
  --Node里面，顶层对象是global,但其他环境不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般用this,但有局限性。
  --全局环境中，this会返回顶层对象，但，Node模块和es6模块中，this返回的是当前模块。
  --函数里面的this,如果函数不是作为对象的方法运行，而是单纯作为函数运行，this，会指向顶层对象，但是严格模式下，这时的this会返回undefined.
  --不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
//方法一
(typeof windwo !== 'undefined' 
	? window 
	: (typeof process === 'object' &&
		typeof require === 'function' &&
		typeof global === 'object')
		? global
		: this );

//方法二
var getGlobal = function(){
	if(typeof self !== 'undefined'){ return self;}
	if(typeof window !== 'undefined'){ return window;}
	if(typeof global !== 'undefined'){return global;}
	throw new Error('unable to locate global object');
};


垫片库system.global模拟了这个提案，可以在所有环境拿到global。

// CommonJS的写法
require('system.global/shim')();

// ES6模块的写法
import shim from 'system.global/shim'; shim();

上面代码可以保证各种环境里面，global对象都是存在的。

// CommonJS的写法
var global = require('system.global')();

// ES6模块的写法
import getGlobal from 'system.global';
const global = getGlobal();

上面代码将顶层对象放入变量global。



