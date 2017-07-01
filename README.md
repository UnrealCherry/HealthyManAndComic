# HealthyManAndComic
一个健康的项目

## 运行项目
* npm install先安装包
* npm  run start(或者node  RandomHC)都可以

#### 在RandomHC.js里面修改参数
```
RandomHC(NAME,INDEX)
*
* //NAME参数只有两个 "绅士"  或者 "少女"  NAME为字符串格式
*
*//  INDEX参数为漫画番号 或者 漫画名  不输入默认为随机漫画   输错番号会报错
//  番号名为数字 例如:RandomHC("少女",9333)              
//  搜索名为字符串 例如:RandomHC("少女","ちゃんに見せられ")  //可模糊搜索但不能带有空格
*  (爬少女随机的估计要爬3分钟以上,因为少女这个域名的漫大概有4000部而绅士只有1500多部)
```
#### NPM包
```

* cnpm install h-comic   //用cnpm安装h-comic
* var h =require("h-comic")
* h.download("少女","ちゃんに見せられ") //搜索指定名字 可模糊搜索但不能带有空格
* h.download("少女",9333)   //搜索指定番号

* ****千万不要用txt保存代码然后改后缀名成js 因为编码不同里面的汉字无法识别,会报错****

```

#### 更新了部分bug  
*遇到网站挂链或者没响应的情况自动跳过
#### 优化了读取速度
*加快了读取速度大概40%
####  增加了搜索功能
*可模糊搜索
####   更新了注释
*方便新手们学习 




![](https://github.com/ResJay/HealthyManAndComic/blob/master/%E6%8F%8F%E8%BF%B0%E5%9B%BE%E7%89%87/%E6%B3%A8%E9%87%8A.png?raw=true)
![](https://github.com/ResJay/HealthyManAndComic/blob/master/%E6%8F%8F%E8%BF%B0%E5%9B%BE%E7%89%87/QQ%E6%88%AA%E5%9B%BE20170627041039.png?raw=true)
![](https://github.com/ResJay/HealthyManAndComic/blob/master/%E6%8F%8F%E8%BF%B0%E5%9B%BE%E7%89%87/QQ%E6%88%AA%E5%9B%BE20170626081959.png?raw=true)
#### 更新了番号参数  具体在TXT里
```
绅士
```
![绅士](https://github.com/ResJay/HealthyManAndComic/blob/master/%E6%8F%8F%E8%BF%B0%E5%9B%BE%E7%89%87/QQ%E6%88%AA%E5%9B%BE20170627005348.png?raw=true) 
```
 少女
```
![少女](https://github.com/ResJay/HealthyManAndComic/blob/master/%E6%8F%8F%E8%BF%B0%E5%9B%BE%E7%89%87/QQ%E6%88%AA%E5%9B%BE20170627005357.png?raw=true)

