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