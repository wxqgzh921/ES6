1.数组的解构赋值
ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。
以前赋值，只是直接指定值。
let a = 1;
let b = 2;
let c = 3;
es6 允许写成
let [a,b,c] = [1,2,3];

let [foo,[[bar],baz]] = [1,[[2],3]];
foo; //1
bar; //2
baz; //3

let [,,third] = ["foo","bar","baz"];
third; //"baz"

let [x,,y] = [1,2,3];
x;//1
y;//3

let [head,...tail] = [1,2,3,4];
head; //1
tail; //2,3,4

let [x,y,...z] = ['a'];
x; // "a"
y; //undefined   如果解构不成功，变量的值就等于undefined；
z; //[]

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4


// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

对于set结构，也可以使用数组的解构赋值。
let [x,y,z] = new Set(['a','b','c']);
x;  //"a"

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
-------------------------------------------------------------
默认值
解构赋值允许指定默认值
let [foo = true] = [] ;
foo //true
let [x,y='b'] = ['a'];   //x='a',y='b'
let [x,y='b'] = ['a',undefined];  //x='a' ,y='b'
注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined,默认值是不会生效的。
let [x=1] = [undefined];
x;  //1
let [x=1] = [null];
x; //null

如果一个数组成员是null，默认就不会生效，因为null不严格等于undefined;

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function f(){
	console.log('aaaa');
}
let [x= f()] = [1];

等价于

let x ;
if([1][0] === undefined){
	x=f();
}else {
	x=[1][0];
}
默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x=1,y=x] = [];     //x=1,y=1
let [x=1,y=x] = [2];    //x=2,y=2
let [x=1,y=x] = [1,2];  //x=1,y=2
let [x=y,y=1] = [];     //报错，是因为x用到默认值y时，y还没有声明。
 

2.对象的解构赋值
解构不仅可以用于数组，还可以用于对象。
let {foo,bar} = {foo:"aaa",bar:"bbb"};
foo;  //"aaa"
bar;  //"bbb"

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
let {bar,foo} ={foo:'aaa',bar:'bbb'};
foo; //'aaa'
bar; //'bbb'
let {baz} ={foo:'aaa',bar:'bbb'};
baz; //undefined;

如果变量名与属性名不一致，必须写成下面这样。
var {foo:baz} = {foo:'aaa',bar:'bbb'};
baz; //'aaa'
let obj = {first:'hello',last:'world'};
let {first:f,last:l} = obj;
f;  //'hello'
l;  //'world'
说明：对象的解构赋值是下面形式的简写
let {foo:foo,bar:bar} = {foo:'aaa',bar:'bbb'};
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
let {foo:baz} = {foo:'aaa',bar:'bbb'};
baz; //'aaa'
foo; //error：foo is not defined;   foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
-----------------------------------
采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。

let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"

等价于

let foo;
({foo} = {foo: 1}); // 成功

let baz;
({bar: baz} = {bar: 1}); // 成功
---------------------------------------------------
和数组一样，解构也可以用于嵌套结构的对象。
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
// 这时p是模式，不是变量，因此不会被赋值

var node = {
  loc:{
    start:{
      line:1,
      column:5
    }
  }
}
var {loc:{start:{line}}} = node;
line //1
loc  //error: loc is undefined
start //error: loc is undefined
// 只有line是变量其他都是模式不会被赋值

// 嵌套赋值的例子
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj //{prop:123}
arr //{true}
------------------------------------------------------
对象的解构也可以指定默认值
var {x=3} ={}
x //3


// var { message: msg = 'Something went wrong' } = {};
// msg // "Something went wrong"
var {x,y=5}={x:1};
x //1
y //5

var {x:y=3}={};
x://error x is not defined
y//3
var {x:y=3} ={x:5};
x; //error x is not defined
y;//5
var { message: msg = 'Something went wrong' } = {};
msg; //'Something went wrong'
message ;//message is not defined

默认值生效的条件是，对象的属性值严格等于undefined。

var {x=3} = {x:undefined};
x; //3
var {x=1} = {x:null};
x; //null
如果x属性等于null,就不严格等于undefined，导致默认值不会生效。
如果解构失败，变量的值等于undefined。
let {foo} = {bar:'baz'};
foo ;//undefined
如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错；
let{foo:{bar}} = {bar:'baz'}
//等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错，请看下面的代码。
let _tmp = {baz:'baz'};
_tmp.foo.bar  // 报错

如果要将一个已经声明的变量用于解构赋值，必须非常小心。
let x;
{x} = {x:1}  //错误的写法
//正确的写法
let x; 
({x} = {x:1});
将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。
解构赋值允许，等号左边的模式之中，不放置任何变量名。
({} = [true,false]);
({} = 'abc');
({} = [])

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let {log,sin,cos} = Math;

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
let arr = [1,2,3];
let {0:first,[arr.length-1]:last} = arr;
first;  //1     对应的arr的0键对应的值是1，
last;   //3     方括号这种写法，属于“属性名表达式”

-------------------------------------------------------------------------
4.数值和布尔值的解构赋值
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
let {toString:s} = 123;
s === Number.prototype.toString  //true

let{toString:s} =true;
s === Boolean.prototype.toString  //true  

数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
let{prop:x} = undefined;  //typeError
let{prop:y} = null;       //typeError

---------------------------------------------------------------------------
5.函数参数的解构赋值
函数的参数也可以使用解构赋值
function add([x,y]){
  return x+y;
}
add([1,2]);   //3



