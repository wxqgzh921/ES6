//Object.assign函数可以快速的复制一个或多个对象到目标对象中
//函数的定义:函数参数为一个目标对象（该对象作为最终的返回值），源对象（可以为任意多个）。通过调用该函数可以拷贝所有可被枚举的自有属性值到目标对象中。Object.assign(target, ...sources) ; 强调1.可被枚举的属性2.自有属性3.string或者Symbol类型是可以被直接分配的 ；拷贝过程中将调用源对象的getter方法，并在target对象上使用setter方法实现目标对象的拷贝。
//函数实例 
//eg1:最开始的哦因为设置为target，则调用其setter方法设置了其他对象的属性到自身
var o1 = { a : 1 };
var o2 = { b : 2 };
var o3 = { c : 3 };
var obj = Object.assign(o1,o2,o3);
console.log(obj);  //{ a:1,b:2,b:3 }
console.log(o1);   //{ a:1,b:2,c:3 }   target object itself is changed.
console.log(o2);   //{b:2}
console.log(o3);   //{c:3}

//eg2:自定义了一个对象，这个对象包含了不可枚举的属性，使用Object.defineProperty初始化的对象默认是不可枚举的属性。，对于可枚举的对象，可以直接使用Object.keys()获得，或者for-in遍历出来。对于不可枚举的属性，使用Object.assign的时候被自动忽略
var obj = Object.create({foo:1},{  //foo is an inherit property.
	bar:{
		value:2  //bar is a non-enumerable property.
	},
	baz:{
		value:3,
		enumerable:true  //baz is an own enumerable property.
	}
});
var copy = Object.assign({},obj);
console.log(copy);  //{ baz:3 }

//eg3:
var target = Object.defineProperty({},'foo',{
	value:1,
	writable:false
});
Object.assign(target,{bar:2})  //{bar:2,foo:1}
Object.assign(target,{foo:2})  //Uncaught TypeError: Cannot assign to read only property 'foo' of object '#<Object>'(…)
