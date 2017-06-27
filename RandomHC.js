var superagent  =require('superagent')   //一个类似Ajax为了访问网页返回数据的包
var cheerio = require('cheerio');     //一个类似JQ主要为了读取HTMLE页面的包
var fs=require("fs")      //node原生文件系统
var path = require('path'); //node原生路径系统
var http=require("http") //node原生http系统

function RandomHC(NAME,INDEX) {
    var name = NAME
    var ztime=new Date()             //程序开始时间(为了计算整个程序耗时)
    if(NAME=="绅士"){
        name="shenshimonhua"
        console.log("*****************正在读取绅士漫***************************")
    }             //参数NAME是绅士,// 就name="shenshimonhua"
    if(NAME=="少女"){
        name="shaonvmanhua"
        console.log("**********少女漫数量巨大请稍后.......*********")
    }
    var p = new Promise(               //Promise里的函数立即执行
        function (resolve, reject) {
            if(typeof INDEX=="number"){resolve(INDEX)}        //如果INDEX是数字就状态就成功,并返回INDEX数值
            var index = 0               //index区分少女漫和绅士漫 因为他们的域名不同 绅士是6 少女是4
            if (name == "shenshimonhua") {
                index = 6
            }
            if (name == "shaonvmanhua") {
                index = 4
            }
            var ARR = []               //存储 番号
            superagent.get("http://www.lfkumh.com/" + name + "/list_" + index + "_1.html").end(function (err, res) {
                // superagent.get(访问的网页).end(返回函数, 参数res是返回的数据)
                //res.text是返回的html数据
                console.log("*************正在读取总本子数....请稍后....***********************")
                var $ = cheerio.load(res.text)          //cheerio包的标准格式  cheerio.load(HTML数据)
                var g = 0                                             //定时器计数器
                var page = 0                                     //总页数
                var timer = 0                                     //为了清除定时器
                $(".pageinfo strong").each(function (i, ele) {
                    //$("")为cheerio操作  类似JQ   取class为.pageinfo里的strong标签. each为遍历
                    //i是index, ele是element
                    if (i == 0) {   //                   //判断i==0 就是找第一个
                        page = $(this).text()  //保存第一个class为.pageinfo里的strong标签的innerHTML值
                        //
                    }
                })   //获取页数
                timer = setInterval(function () {         //开启定时器
                    if (g < page) {          //当定时器运行次数没总页数多时说明总页面还没遍历完
                        g++                            //定时器运行次数+1
                    }
                    else {                        //如果遍历完了
                        g == page         //定时器运行次数等于总页数
                        clearInterval(timer)  //关闭定时器
                        console.log(name + "一共有本子" + ARR.length + "部")
                        console.log("准备开始下载")
                        var x = ARR[Math.round(ARR.length * Math.random())] //取任意一个番号 现在数组里面都是番号
                        resolve(x)                  //状态改成成功  把番号返回准备传给then
                    }
                    superagent.get("http://www.lfkumh.com/" + name + "/list_" + index + "_" + g + ".html").end(function (err, res) {
                        if(err){
                            console.log("**请稍后**")
                            return}   //报错就直接返回
                        if(res.text=="undefined"){
                            g++       //找不到这个文档就直接返回
                            console.log("**请稍后**")
                            return}
                        var $ = cheerio.load(res.text)
                        $(".piclist a").each(function (i, ele) {
                            var bookname=$(this).attr("title")  // 遍历到的本子名
                            if(bookname.indexOf(INDEX)!==-1){
                                console.log("找到本子:"+$(this).attr("title"))
                                resolve($(this).attr("href").replace(/[^0-9]/ig, ""))
                            }  //搜索相关 利用    "我是好人".indexOf("坏人")  就会返回-1就是找不到了
                            ARR.push($(this).attr("href").replace(/[^0-9]/ig, ""))  //把番号push到数组
                        })

                    })
                }, 1200)
            })

        }
    )

    p.then(function (arr) {
        //当上面Primise状态成功时候
        //就给这个then传值 一般是番号
        //这个then是为了下载图片 保存在本地
        console.log("正在下载的番号为:" + arr)
        function Haitai(ht) {
            var i = 1             //定时器运行次数计数
            var page = 0    //本子页数
            var timer = 0   //定时器相关
            var g = ht         //本子番号
            var dir = 0        //路径
            var url = "http://www.lfkumh.com/" + name + "/" + g + ".html"   //要下载的本子网站
            superagent.get(url).end(
                function (err, res) {
                    var $ = cheerio.load(res.text)
                    var z = $(".pagelist").children().first().text()   //本子一共有几页
                    console.log("正在下载" + $(".mhtitle").text())   //打印本子名
                    dir = $(".mhtitle").text().replace(/(:)/g,"")       //把路径名设置成本子名
                    console.log(dir)
                    if (!fs.existsSync(dir)) {          //如果没有这个文件夹
                        fs.mkdirSync(dir, (err) => {    //就创建这个文件夹
                            if(err){
                                console.log('err');      //报错了
                            } else{
                                console.log("创建了" + dir)  //打印创建了这个文件夹
                        }
                    })
                    }
                    page = z.replace(/[^0-9]/ig, "")     //page赋值本子页数
                    console.log("******************这本子一共有"+page+"页***************")
                    timer = setInterval(                            //定时器准备遍历这个本子把每页都保存下来
                        function () {
                            if (i < page) {         //如果page小于i就说明没比例完
                                i++                    //i++继续遍历
                            }
                            else {                     //否则遍历完了
                                i = page            //i=page
                                var xtime=new Date() - ztime  // ztime是程序开始执行的时间   得出 一共用了多少秒
                                console.log("******************一共花费了"+xtime+"毫秒*********************")
                                clearInterval(timer)        //结束了 关闭定时器
                            }

                            superagent.get("http://www.lfkumh.com/" + name + "/" + g + "_" + i + ".html").end(
                                function (err, res) {
                                    var $ = cheerio.load(res.text)
                                    var imgSrc = encodeURI($("#imgshow img").attr("src")) //图片链接再编码一次 因为无法识别中文和日文
                                    console.log(i)    //打印这是第几页
                                    http.get(imgSrc, (res) => {
                                        res.pipe(fs.createWriteStream(dir + "/" + i + ".jpg"))   //用node的流方式保存图片 具体API可以去node官网看
                                    console.log("爬取" + imgSrc + "进" + dir + "目录成功")
                                })

                                }
                            )
                        }, 2000                 //2000毫秒爬一张图片
                    )

                }
            )
        }

        Haitai(arr)
    })
}
//  NAME参数只有两个 "绅士"  或者 "少女"  NAME为字符串格式
//  INDEX参数为漫画番号 或者 漫画名  不输入默认为随机漫画   输错番号会报错
//  番号名为数字 例如:RandomHC("少女",9333)
//  搜索名为字符串 例如:RandomHC("少女","ちゃんに見せられ")

 exports.download=RandomHC   //暴露一个函数

/*exports.RandomHC=function (NAME,INDEX) {
    var name = NAME
    var ztime=new Date()
    if(NAME=="绅士"){
        name="shenshimonhua"
    }
    if(NAME=="少女"){
        name="shaonvmanhua"
        console.log("**********少女H漫数量巨大请稍后.......*********")
    }
    var p = new Promise(
        function (resolve, reject) {
            if(INDEX){resolve(INDEX)}
            var index = 0
            if (name == "shenshimonhua") {
                index = 6
            }
            if (name == "shaonvmanhua") {
                index = 4
            }
            var ARR = []
            superagent.get("http://www.lfkumh.com/" + name + "/list_" + index + "_1.html").end(function (err, res) {
                console.log("*************正在读取总H漫数....请稍后....***********************")
                var g = 0
                var $ = cheerio.load(res.text)
                var page = 0
                var timer = 0
                $(".pageinfo strong").each(function (i, ele) {
                    if (i == 0) {
                        page = $(this).text()
                    }
                })   //获取页数
                timer = setInterval(function () {
                    if (g < page) {
                        g++
                    }
                    else {
                        g == page
                        clearInterval(timer)
                        console.log(name + "一共有H漫" + ARR.length + "部")
                        console.log("准备开始下载")
                        var x = ARR[Math.round(ARR.length * Math.random())]
                        resolve(x)

                    }
                    superagent.get("http://www.lfkumh.com/" + name + "/list_" + index + "_" + g + ".html").end(function (err, res) {

                        var $ = cheerio.load(res.text)
                        $(".piclist a").each(function (i, ele) {
                            ARR.push($(this).attr("href").replace(/[^0-9]/ig, ""))
                        })

                    })
                }, 2000)
            })

        }
    )

    p.then(function (arr) {
        console.log("正在下载" + arr)
        function Haitai(ht) {
            var i = 2
            var page = 0
            var timer = 0
            var g = ht
            var dir = 0
            var url = "http://www.lfkumh.com/" + name + "/" + g + ".html"
            superagent.get(url).end(
                function (err, res) {
                    var $ = cheerio.load(res.text)
                    var z = $(".pagelist").children().first().text()
                    console.log("正在下载" + $(".mhtitle").text())
                    dir = $(".mhtitle").text().replace(/(:)/g,"")
                    console.log(dir)
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, (err) => {
                            if(err){
                                console.log('err');
                            } else{
                                console.log("创建了" + dir)
                        }
                    })
                    }
                    ;
                    page = z.replace(/[^0-9]/ig, "")
                    console.log("******************这部漫画一共有"+page+"页***************")
                    timer = setInterval(
                        function () {
                            if (i < page) {
                                i++
                            }
                            else {
                                i = page
                                var xtime=new Date() - ztime
                                console.log("******************一共花费了"+xtime+"毫秒*********************")
                                clearInterval(timer)

                            }
                            superagent.get("http://www.lfkumh.com/" + name + "/" + g + "_" + i + ".html").end(
                                function (err, res) {
                                    var $ = cheerio.load(res.text)
                                    var imgSrc = encodeURI($("#imgshow img").attr("src"))
                                    console.log(i)
                                    http.get(imgSrc, (res) => {
                                        res.pipe(fs.createWriteStream(dir + "/" + i + ".jpg"))
                                    console.log("爬取" + imgSrc + "进" + dir + "目录成功")
                                })

                                }
                            )
                        }, 2000
                    )

                }
            )
        }

        Haitai(arr)
    })
}*/

