---
title: 关于this
date: 2017-12-06 19:06:25
categories:
	- web前端
tags:
	- javascript
---

## 第一章 关于this
> this既不指向函数自身也不指向函数的词法作用域，this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

<!-- more -->

## 第二章 全面解析this
### 1. 分析函数的调用位置
> 我们关心的调用位置就在当前正在执行的函数的前一个调用中

> 查看调用栈的方法是使用浏览器的调试工具
> 如果你想要分析this的绑定，使用开发者工具打断点得到调用栈，然后找到栈中第二个元素，这就是真正的调用位置。  
   
### 2. 绑定规则
#### 2.1 默认绑定
> 在非严格模式下，this会绑定到全局对象；如果使用严格模式，那么全局对象将无法
>   使用默认绑定，因为this会绑定到undefind

```
function foo() { 
    console.log( this.a );
}

var a = 2;

foo(); // 2
```


#### 2.2 隐式绑定
> 一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this间接（隐式）绑定到这个对象上

```
    function foo() { 
   	  console.log( this.a );
	}

	var obj = { 
		    a: 2,
		    foo: foo 
	};

	obj.foo(); // 2
```

#### 2.3 显示绑定

> 直接指定this的绑定对象，所以叫显示绑定，使用call()和apply()方法来实现，他们第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时指定这个this


```
function foo() { 
    console.log( this.a );
}

var obj = { 
    a:2
};

foo.call( obj ); //把this强制绑定在了obj上
```
> 如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作this的绑定对象，这个原始值会被转换成它的对象形式（也就是new String(..)、new Boolean(..)或者new Number(..)）。这通常被称为“装箱”。

#### 2.4 new绑定

>   使用new来调用函数，或者说发生构造函数调用的同时，会自动执行下面的操作
    1.创建（或者说构造）一个全新的对象
    2.这个新对象会被执行[[原型]]链接。
    3.这个新对象会绑定到函数调用的this
    4.如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。



```
function foo(a) { 
    this.a = a;
} 

var bar = new foo(2);

console.log( bar.a ); // 2
```


### 3.优先级

> 如果某个调用位置可以应用多条规则，就该给这些给则设定优先级。


---


- [ √] 默认绑定 < 隐式绑定 < 显式绑定 < new绑定 



---

##### 判断this优先顺序：
> （1）函数是否在new中调用？如果是的话this绑定的是新创建的对象
    

```
var bar = new foo()
```

> （2）函数是否通过call、apply或者硬绑定调用？如果是的话，this绑定的是指定的对象。


```
var bar = foo.call(obj2)
```

> （3）函数是否在某个对象中作为这个对象的属性值出现？如果是的话，this绑定的是这个对象


```
var obj = {
    foo:foo
}
obj.foo();
```
> （4）如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到underfined,否则绑定到全局对象


#### 4.绑定例外
##### 4.1
> 把null 或者 underfine作为this的绑定对象传入call、apply或者bind,这些值会在调用的时候被忽略，实际应用的是默认绑定规则：


```
function foo() { 
    console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
```

柯里化：1.参数复用；2.提前返回；3.延迟计算/运行
##### 安全的使用this的绑定
> 创建一个空的对象Object.create(null).


```
function foo(a,b) {
    console.log( "a:" + a + ", b:" + b );
}

// 我们的DMZ空对象
var ø = Object.create( null );

// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3 在ES6中使用 foo(...[2,3]) 相当于 foo(2,3)

// 使用bind(..)进行柯里化
var bar = foo.bind( ø, 2 ); 
bar( 3 ); // a:2, b:3
```
#### 4.2 间接引用
    
> 间接引用容易在赋值时发生


```
function foo() { 
    console.log( this.a );
}

var a = 2; 
var o = { a: 3, foo: foo }; 
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```
> p.foo = o.foo的返回值是目标函数的引用，因此调用位置是foo()而不是p.foo或者o.foo(),这里会引用默认绑定

##### 4.3 软绑定
 
>给默认绑定指定一个全局对象和underfind以外的值，就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显示绑定修改this的能力

### 5.this词法
> ES6介绍了一种无法使用这些规则的特殊函数累心：箭头函数

> 箭头函数不适用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this的，来看箭头函数的词法作用域：


```
function foo(){
    return(a)=>{
        //this继承自foo()
        console.log(this.a);
    };
}

var obj1 = {
    a:2
};

var obj2 = {
    a:3
};

var bar = foo.call(obj1);
bar.call(obj2);//2 ,不是3
```
> 箭头函数的绑定无法被修改（new也不行），所以，还是2

