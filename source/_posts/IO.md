---
title: IO
date: 2014-12-28 22:52:47
categories:
	- java
tags:
	- Io
---
# IO

流向|字节流 | 字符流
---|---|---
输入流| InputStream | Reader
输出流|  outputStream | Writer

- 按数据流的方向不同可分为：输入流和输出流
- 按处理数据单位不同可分为：字节流和字符流（一个字节（byte）是8位(bit)）
- 按照功能不同可以分为：节点流和处理流（读写数据）和（包装数据）
<!-- more -->

##### 节点流
![alt 节点流][jiedian]

[jiedian]: /img/jiedian.jpg "节点流"
> 就是一根管道直接插到数据源上面，直接读写数据：字节输入输出流（FileInputStream，FileOutputStream），文件的字符输入输出流（FileReader，FileWriter）
##### 处理流
![alt 处理流][chuli]

[chuli]: /img/chuli.jpg "处理流"
###### 缓冲流
4种

```
BufferedReader(Reader in);
BufferedReader(Reader in,int size);//size为自定义缓冲区的大小
BufferedWriter(Writer out);
BufferedWriter(Writer out,int size);
BufferedInputStream(InputStream in);
BufferedInputStream(InputStream in,int size)
BufferedOutputStream(OutputStream,out,int size);
BufferedOutputStream(OutputStream out,int size);
```

> 缓冲输入流支持其分类的mark和reset方法
> BufferedReader提供了readLine方法用于读取一行字符串（\r或\n分割）
> BufferedWriter提供了newLine用于写入一个行分隔符
> 对于输出的缓冲流，写的数据会先在内存中缓存，使用flush方法将内存中的数据立刻写出
> 使用缓冲流，在节点流套一层缓冲流：

```
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("F:\\Io\\01.txt"));
bis.flush();//清空缓冲区
```

###### 转换流
> InputStreamReader和OutputStreamWriter用于 字节数据到字符数据之间的转换
> InputStreamReader 需要和InputStream “套接”
> OutputStreamWriter 需要和OutputStream “套接”
> 转换流在构造是可以指定其编码集合，例如：

```
InputStream is = new InputStreamReader(System.in,"gbk");
```

> 转换流使用流程(以输入流为例)
> 背景：
> 读取原始的文件，格式一般都不是中文的(gbk),但是，内容却是中文的，此时就需要字节转换字符读取，那么，走以下步骤：
1. 1、字节输入流读取

```
FileInputStream fis = new FileInputStream("file");
```

1. 2、字节输入流转换为字符输入流，就用到了转换流，并改变编码(转换流接受字节流类型)

```
InputStreamReader isr = new InputStreamReader(fis,"gbk" );
```

1. 3、转换流内容放入缓冲流中方便读取
BufferedReader br = new BufferedReader(isr);
1. 4、此时就可以正常读取了

```
String a=null;
while((a=br.readLine())!=null){
System.out.print(a);
}
```

###### 数据流
> DataInputStream和DateOutputStream分别继承自InputStream和OutputStream，它属于处理流，需要分别"套接"在InputStream和OutputStream类型的节点流上。
> DataInputStream和DataOutputStream提供了可以存取与机器无关的java原始类型数据（如：int,double等）的方法
> DataInputStream和dataOutputStream的构造放大为：
> DataInputStream（InputStream in）;
> DataOutputStream（OutputStream out）;
###### 打印流
> PrintWriter和PrintStream都属于输出流，分别针对字符和字节
> PrintSWriter和PrintStream提供了重载的print
> Println方法用于多种数据类型的输出
> PrintStream和PrintWriter的输出操作不会抛异常，用户通过检测错误状态获取错误信息
> PrintStream和PrintWriter都有自动flush功能
> 默认情况下，out这个标准的输出流是直接和DOS窗口链接的，通过修改打印流对象的setOut(),可以更改输出窗口
###### 对象流
Object

---

输入输出对象，就需要把对象序列化成一个字节流，再用对象流包装后，直接输出对象
直接将Object写入或读出
把对象序列化成一个字节流，要实现序列化接口。

```
FileOutputStream fos = new FileOutputStream (file);
ObjectOutputStream oos = new ObjectOutputStream (fos );
Student stu = new Student("值1","值2");//实现Serializable接口
oos.writeObject(stu);
oos.flush();
oos.close();
反序列化
FileInputStream fis = new FileInputStream (file);
ObjectInputStream ois = new ObjectInputStream (fos );
Student stu = (Student)ois.readObject();//实现Serializable接口
ois.close();
```


IO总结
![alt 总结][zongjie]

[zongjie]: /img/zongjie.jpg "总结"

例子
![alt 例子][demo]

[demo]: /img/demo.jpg "例子"

特例
![alt 特例][random]

[random]: /img/random.jpg "特例"
