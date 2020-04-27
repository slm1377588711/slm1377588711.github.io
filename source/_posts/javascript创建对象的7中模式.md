---
title: javascript创建对象的7中模式
date: 2017-09-01 17:28:17
categories:
	- web前端
tags:
	- javascript
---

# javascript创建对象的7种模式
1. 工厂模式
   
```
<script>
        function createPerson(name,age,job){
            var o = new Object();
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function(){
                alert(this.name);
            }
            return o;
        }
        var person1 = createPerson("Nicholas",18,"Software Engineer");
        var person2 = createPerson("Greg",27,"Doctor"); 
    </script>
```
<!-- more -->
> 解决了创建
         多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）

1. 原型模式

```

        function Person(){}
        Person.prototype.name = "Nicholas";
        Person.prototype.age = 18;
        Person.prototype.job = "Software Engineer";
        Person.prototype.sayName = function(){
            alert(this.name);
        }
        var person1 = new Person();
        person1.sayName();
        var person2 = new Person();
        person2.sayName();
        alert(person1.sayName == person2.sayName);//true
```
> person1和Person2访问的是同一组属性和同一个sayName函数

>         理解原型对象
>          无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，
>          这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor属性，
>          这个属性包含一个指向prototype属性所在函数的指针。Person.prototype.Constructor指向Person。
>          而通过这个构造函数，我们还可以继续为原型对象添加其他属性和方法。
>          创建了自定义的构造函数之后，其原型对象默认只会取的一个Constructor属性；至于其他方法，
>          这都是从Object继承而来的。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针([Prototype])指向构造函数的原型对象。

>         person1([Prototype])-->Person.prototype(constructor)-->Person
        
		
![alt text][id]

[id]: /img/原型和实例及构造函数之间的关系.jpg "Title"
>         用isPrototypeOf()方法来确定对象之间是否存这种关系，如果[[Prototype]]指向isPrototypeOf()的对象，那么这个
>         方法就返回true


```
alert(Person.prototype.isPrototypeOf(person1));//true
        alert(Person.prototype.isPrototypeOf(person2));//true
```

> ECMAScript5增加的一个新方法，叫Object.getPrototypeOf(),返回对象就是这个对象的原型在所有支持的实现中，这个方法返回[[Prototype]]的值


```
alert(Object.getPrototypeOf(person1) == Person.prototype);//true
        alert(Object.getPrototypeOf(person1).name);//Nicholas
```

> 每当代码读取某个随想的某个属性是，都会进行一次搜索，目标是具有给定名字的属性。搜索顺序是
>          实例本身-->原型对象，所以，在调用perison1.sayName()的时候，会先后执行两次搜索
> 

> 在实例添加一个属性，属性名和原型中属性名重复的话，会屏蔽原型中的属性，但是在其他没有定义这个属性并且指向这个原型对象的实例中
>          依然获取的是原型对象的属性，即使定义属性的实例复制是null也会在实例中设置这个属性，但是，用delete看可以完全删除实例属性，
>          从而让我们能够重新访问原型中的属性


```
var person3 = new Person();
        person3.name = "tom";
        alert(person3.name);//tom
        delete person3.name
        alert(person3.name);//Nicholas  来自原型
```

> 使用hasOwnProperty()方法可以检测一个属性是存在实例中还是存在于原型中。
>          这个方法在只给定属性存在于对象实例中时才会返回true



```
alert(person1.hasOwnProperty("name"));//false
        person1.name = "Greg";
        alert(person1.hasOwnProperty("name"));//true
```
>   原型与in操作符
>         单独使用in操作符时，会在通过对象能够访问给定属性是返回true,无论属性存在于实例中还是原型中
         

```
alert(person2.hasOwnProperty("name"));//实例中没有这个属性
        alert("name" in person2);//true
```

> 更简洁方便的写法,如下，每创建一个函数，就会同时创建他的prototype对象，这个对象也会自动获得Constructor属性。
>          而我们这里使用的语法完全重写了prototype对象，因此Constructor属性也就变成了新对象的Constructor属性（指向Object）。
>          尽管instanceof操作符还能返回正确的结果，但通过Constructor已经无法确定对象的类型了
        

 
```
function Person1(){}
        Person1.prototype = {
            name:"tom",
            age:10
        };
 var friend = new Person1();
        alert(friend instanceof Object); //true
        alert(friend instanceof Person1); //true
        alert(friend.constructor == Person1); //false
        alert(friend.constructor == Object); //true
```
> 可以显示指定,这样重设Constructor属性会导致他的[[Enumerable]]特性设置为true，默认情况原生的是不可枚举的


```
Person1.prototype = {
            constructor:Person1,
            name:"tom",
            age:10
        };
```
> 适用于兼容ECMAScript5的浏览器，重设构造函数

 
```
Object.defineProperty(Person1.prototype, "constructor", {
            enumerable: false,
            value: Person1
        });
```
> 原型对象的缺点。原型中所有的属性是被很多实例共享的，这种共享对于函数非常合适，然而，对于包含引用类型值的属性来说，
>         * 问题就比较突出了，实例一般都是要有属于自己的全部属性的。如下：


```
function Person2(){
        }
        Person2.prototype = {
            constructor: Person2,
            name : "Nicholas",
            age : 29,
            job : "Software Engineer",
            friends : ["Shelby", "Court"],
            sayName : function () {
                alert(this.name);
            }
        };
        var person21 = new Person2();
        var person22 = new Person2();
        person21.friends.push("Van");
        alert(person21.friends); //"Shelby,Court,Van"
        alert(person22.friends); //"Shelby,Court,Van"
        alert(person21.friends === person2.friends); //true
```

> 我们创建的每个函数都有一个prototype属性，它是一个指针，指向一个对象，对象的用途可以是包含可以有特定类型的所有实例共享的属性和方法
>     好处是，可以让所有对象实例共享他所包含的属性和方法。

1. 构造函数模式
 

```
function Person(name,age,job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.sayName = function(){
                alert(this.name);
            }
        }
        var person1 = new Person("Nicholas",18,"Software Engineer");
        var person2 = new Person("Greg",27,"Doctor");
```
> 没有显式地创建对象；
>           直接将属性和方法赋给了 this 对象；
>           没有 return 语句。
>         
>         构造函数名Person使用大写字符开头，创建他的实例，必须使用new操作符
>          (1)创建一个新对象；
>          (2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
>          (3) 执行构造函数中的代码（为这个新对象添加属性）；
>          (4) 返回新对象。

> person1和person2分别保存着Person的一个不同的实例，这两个对象都有一个Constructor属性，该属性指向Person，如下所示


```
alert(person1.constructor == Person);//true
        alert(person2.constructor == Person);//true
```
> 对象的constructor属性最初是用来标识对象类型的，检测对象类型还是用instanceof操作符


```
alert(person1 instanceof Object);//是Object的实例
        alert(person1 instanceof Person);//是Person的实例
        alert(person2 instanceof Object);//是Object的实例
        alert(person2 instanceof Person);//是Person的实例
```
> 将构造函数当做函数，调用的方法有：
>         构造函数调用
        
```
var person = new Person("Nich",21,"Software Engineer");
        person.sayName();
```

>         作为普通函数调用
      
```
Person("Nich",21,"Software Engineer");
        window.sayName();
```

>         在另一个对象的作用域中调用
       
```
var o = new Objet();
        Person.call(o,"Kristen",25,"Nurse");
        o.sayName();
```
> 构造函数的缺点。每个方法都要在每个实例上重新创建一遍，sayName()在两个实例中个创建了一次，
>      函数就是对象，因此，每定义一个函数就实例化了一个对象，然而，创建两个完成同样任务的函数实例
>     的确没必要，况且有this对象在，不需要再执行代码前就把函数绑定在特定对象上面。可以把sayName()
>      定义在构造函数外，构造函数中就写一个属性指向外部的sayName函数，写成下面这样


```
function Person(name, age, job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.sayName = sayName;
        }
        function sayName(){
            alert(this.name);
        }
        var person1 = new Person("Nicholas", 29, "Software Engineer");
        var person2 = new Person("Greg", 27, "Doctor");
```
> 但是这样的问题是：在全局作用域中定义的函数实际上只能被某个对象调用，折让全局作用域有点名不副实，
>         如果对象需要定义很对方法，那么就要定义很多和全局函数。我们自定义的引用类型就没有封装性可言了。


1. 组合构造函数模式和原型模式
###### 如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系

```
function Person(name,age,job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.friends = ["Shelby","Court"];
        }
        Person.prototype = {
            constructor:Person,
            sayName:function(){
                alert(this.name);
            }
        }
        var person1 = new Person("Nicholas",18,"Software Engineer");
        var person2 = new Person("Greg",27,"Doctor");


        person1.friends.push("Van");
        alert(person1.friends); //"Shelby,Count,Van"
        alert(person2.friends);//Shelby,Count
        alert(person1.friends === person2.friends);//false
        alert(person1.sayName === person2.sayName);//true
```
>  这个例子中，实例属性都是在构造函数中定义的，而有所有实例共享的方法，则是在原型中定义，而修改
>      person1.friends，并不影响到person2.friends,因为他们引用了不同的数组


1. 动态原型模式

>  把所有信息都封装在了构造函数中，而通过在构造函数
> 中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。
> 可以通过
> 检查某个应该存在的方法是否有效，来决定是否需要初始化原型

```
function Person(name,age,job){
            this.name = name;
            this.age = age;
            this.job = job;
            if(typeof this.sayName!="function"){
                Person.prototype.sayName = function () {
                    alert(this.name);
                };
            }
        }

        var person1 = new Person("Nicholas",29,"Software Engineer");
        person1.sayName();
```




1. 寄生构造函数模式
 
```
function Person(name,age,job){
            var o = new Object();
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function(){
                alert(this.name);
            }
            return o;
        }
        var person1 = new Person("Nicholas",18,"Software Engineer");
        person1.sayName();
```

> 与工厂模式一模一样，除了使用new操作并把使用的包装函数叫做构造函数之外。
>          这个模式可以在特殊的情况下用来为对象创建构造函数

1. 稳妥模式

> 稳妥对象在一些安全环境中（禁止使用this和new），或者在放置数据被其他应用程序改动时使用
>     与寄生构造函数类似，两点不同：1.新创建对象的实例方法不引用this2.不适用new操作符调用构造函数

```
function Person(name,age,job){
            var o = new Object();
            o.sayName = function(){
                alert(name);
            }
            return o;
        }
        var person1 = Person("Nicholas",18,"Software Engineer");
        person1.sayName();
```
> 这样除了调用sayName()方法外，没有别的方式可以访问其数据成员