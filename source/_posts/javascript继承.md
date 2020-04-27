---
title: javascript继承
date: 2017-09-29 15:20:21
categories:
	- web前端
tags:
	- javascript
---



- 1.原型链
> 定义两个类型：SuperType和SubType。每个类型分别有一个属性和一个方法。主要区别是SubType继承了SuperType，为继承是通过创建SuperType的实例，并将该实例赋给SubType.prototype实现的。实现的本质是重写原型对象，用一个新的类型的实例来代替。换句话说，原来存在于SuperType的实例中的所有属性和方法，现在也存在于SubType.prototype中了。在确立了继承关系后，给SubType.prototype添加了一个方法，这样，SubType即拥有SuperType的属性和方法也拥有自己的属性和方法


```
function SuperType(){
this.property = true;
}
SuperType.prototype.getSuperValue = function()
{
return this.property;
}
```
<!-- more -->
-----------------------以上为SuperType的属性和方法------------------------------------
```
function SubType（）{
this.subproperty = false;
}
SubType.prototype = new SuperType();

 
 //通过创建SuperType的实例，并把实例赋值给SubType的原型实现了继承，即重写原型对象，用新的类型去代替
SubType.prototype.getSubValue = function(){
return this.subproperty;
}

```
> ------------------------以上为SubType的属性和方法-------------------------------------------


```
var instance = new SubType（）；
alert(instance.getSuperValue)//true
```
>   用SubType的实例调用SuperType的方法
> 在上面的代码中我们没有使用SubType默认提供的原型，而是用SuperType的实例作为新原型替换了。于是，这个新原型内部有一个指针指向SuperType的原型，最终的结果是：instance指向SubType的原型，SubType的原型指向SuperType的原型。getSuperValue()方法仍然还在SuperType.prototype中，但properotyp则位于SubType中。这是因为property是一个实例属性，而getSuperValue（）则是一个原型方法。既然SubType.prototype现在是SuperType的实例，那么，property就应在实例中。此外要注意，instance.constructor现在指向的是SuperType，这是因为原来SubType.prototype中的Constructor被重写了的缘故。 

- - ##### 通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样做就会重写原型链

- 2.借用构造函数

> 在子类型构造函数的内部调用超类型构造函数。（解决原型中引用类型值所带来的问题）


```
function SuperType(){
            this.color = ["red","blue","green"];
        }
        //继承了SuperType
        function SubType(){
            SuperType.call(this);
        }
        var instance1 = new SubType();
        instance1.color.push("black");
        console.log("子类型继承了超级类型的color属性，并添加了一个属性值："+instance1.color);


        var instance2 = new SubType();
        console.log(instance2.color);
```

- - 传递参数

     
```
function SuperType(name){
            this.name = name;
        }
        function SubType(){
            //继承函数传递参数
            SuperType.call(this,"Nicholas");
            //自己的属性
            this.age = 19;
        }
        var instance = new SubType();
        console.log("继承的name属性是"+instance.name+",自身的属性age的值是："+instance.age);
```

- - 缺点

> 如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定
> 义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结
> 果所有类型都只能使用构造函数模式

- 组合函数继承

- - ###### 原型链和借用构造函数的技术组合到一块
 
```
        function SuperType(){
            this.name = name;
            this.color = ["red","blue","green"];
        }
        SuperType.prototype.sayName = function(){
            console.log(this.name);
        }
        function SubType(name,age){
            //继承属性
            SuperType.call(this,name);
            this.age = age;
        }
        //继承方法
        SubType.prototype = new SuperType();
        SubType.prototype.constructor = SubType;
        SubType.prototype.sayAge = function () {
            console.log(this.age);
        };

        var instance1 = new SubType("Nicholas",29);
        instance1.color.push("black");
        console.log(instance1.color);
        instance1.sayAge();
        instance1.sayName();

        var instance2 = new SubType("Greg",21);
        console.log(instance2.color);
        instance2.sayAge();
        instance2.sayName();
```

> 组合继承最发的问题就是无论什么情况下，都会调用两次超类型构造函数：
>     一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
>     子类型最终会包含超类型的全部实例属性，但我们不得不在调用子类型
>     构造函数时重写这些属性

- 原型式继承

      
```
function object(o){
            function F(){}
            F.prototype=o;
            return new F();
        }
```


> 在函数的内部先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个
>     临时类型的一个新实例


 
```
function object(o){
            function F(){}
            F.prototype=o;
            return new F();
        }
        var person = {
            name : "Nicholas",
            friends:["Shelby","Court","Van"]
        };
        var anotherPerson = object(person);
        anotherPerson.name = "Greg";
        anotherPerson.friends.push("Rob");

        var yetAnotherPerson = object(person);
        yetAnotherPerson.name = "Linda";
        yetAnotherPerson.friends.push("Barbie");

        console.log(person.friends); //"Shelby","Court","Van","Rob","Barbie"
```

> Object.create()方法规范化了原型式继承。这个方法接收两个参数：一
>         个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，
>         Object.create()与 object()方法的行为相同

 
```
var person = {
            name: "Nicholas",
            friends: ["Shelby", "Court", "Van"]
        };
        var anotherPerson = Object.create(person);
        anotherPerson.name = "Greg";
        anotherPerson.friends.push("Rob");
        var yetAnotherPerson = Object.create(person);
        yetAnotherPerson.name = "Linda";
        yetAnotherPerson.friends.push("Barbie");
        alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```

- 寄生式继承
>     创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作
>      一样返回对象。



```
function object(o){
            function F(){}
            F.prototype=o;
            return new F();
        }
        function createAnother(original){
            var clone = object(original);//通过调用函数创建一个新对象
            clone.sayHi = function () { //以某种方式来增强这个对象
                console.log("hi");
            };
            return clone;   //返回这个对象
        }
        var person = {
            name:"Nicholas",
            friends:["Shelby","Court","Van"]
        };
        var anotherPerson = createAnother(person)
        anotherPerson.sayHi();
```

> 做不到函数复用而降低效率


- 寄生组合式继承
>     寄生组合式继承通过借用构造函数来继承属性，通过原型链的混成形式来继承方法


```
        function object(o){
            function F(){}
            F.prototype=o;
            return new F();
        }
       function inheritPrototype(subType,superType){
           var prototype = object(superType.prototype);//创建对象
           prototype.constructor = subType; //增强对象
           subType.prototype = prototype;//指定对象
       }
       //1、创建超类型原型的一个副本
       // 2、创建的副本constructor属性
       // 3、将新创建的对象赋值给子类型的原型
        function SuperType(name){
            this.name = name;
            this.colors = ["red", "blue", "green"];
        }
        SuperType.prototype.sayName = function(){
            alert(this.name);
        };
        function SubType(name, age){
            SuperType.call(this, name);
            this.age = age;
        }
        inheritPrototype(SubType, SuperType);
        SubType.prototype.sayAge = function(){
            alert(this.age);
        };
        var instance = new SubType("slm",19);
        instance.sayName();
```

> 超类型中有name、color属性，原型中有sayName方法
>         子类型中有age属性，原型中有sayAge方法，但是，子类型继承了超类型。
>          最终，子类型也可以使用sayName方法


- 小结

- - 原型式继承，可以在不必先定义构造函数的情况下实现继承，其本质是执行对给定队形的浅复制。而复制得到的副本还可以得到进一步改造。

- - 寄生式继承，与原型继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强对象，最后返回对象。可以将这个模式和组合继承一起使用。

- - 寄生组合式继承，集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式。


