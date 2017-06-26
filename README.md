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
* //INDEX参数为漫画番号  不输入默认为随机漫画   输错番号会报错
*  (爬少女随机的估计要爬3分钟以上,因为少女这个域名的漫大概有4000部而绅士只有1500多部)
```
#### NPM包
```

* npm install h-comic   //安装h-comic
* var h =require("h-comic")
* h.download("少女",9043)   //运行

```






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
#### 更新了部分bug  
*遇到网站挂链或者没响应的情况自动跳过
#### 优化了读取速度
*加快了读取速度大概40%
