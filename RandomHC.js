var superagent  =require('superagent')
var cheerio = require('cheerio');
var fs=require("fs")
var path = require('path');
var http=require("http")

function RandomHC(NAME,INDEX) {
    var name = NAME
    var ztime=new Date()
    if(NAME=="绅士"){
        name="shenshimonhua"
        console.log("*****************正在读取绅士漫***************************")
    }
    if(NAME=="少女"){
        name="shaonvmanhua"
        console.log("**********少女漫数量巨大请稍后.......*********")
    }
    var p = new Promise(
        function (resolve, reject) {
            if(typeof INDEX=="number"){resolve(INDEX)}
            else {

            }
            var index = 0
            if (name == "shenshimonhua") {
                index = 6
            }
            if (name == "shaonvmanhua") {
                index = 4
            }
            var ARR = []
            superagent.get("http://www.lfkumh.com/" + name + "/list_" + index + "_1.html").end(function (err, res) {
                console.log("*************正在读取总本子数....请稍后....***********************")
                var $ = cheerio.load(res.text)
                var g = 0
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
                        console.log(name + "一共有本子" + ARR.length + "部")
                        console.log("准备开始下载")
                        var x = ARR[Math.round(ARR.length * Math.random())]
                        resolve(x)
                    }
                    superagent.get("http://www.lfkumh.com/" + name + "/list_" + index + "_" + g + ".html").end(function (err, res) {
                        if(err){
                            console.log("**请稍后**")
                            return}
                        if(res.text=="undefined"){
                            g++
                            console.log("**请稍后**")
                            return}
                        var $ = cheerio.load(res.text)
                        $(".piclist a").each(function (i, ele) {
                            var bookname=$(this).attr("title")
                            if(bookname.indexOf(INDEX)!==-1){
                                console.log("找到本子:"+$(this).attr("title"))
                                resolve($(this).attr("href").replace(/[^0-9]/ig, ""))
                            }
                            ARR.push($(this).attr("href").replace(/[^0-9]/ig, ""))
                        })

                    })
                }, 1200)
            })

        }
    )

    p.then(function (arr) {
        console.log("正在下载的番号为:" + arr)
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
                    console.log("******************这本子一共有"+page+"页***************")
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
}
//  NAME参数只有两个 "绅士"  或者 "少女"  NAME为字符串格式
//  INDEX参数为漫画番号 或者 漫画名  不输入默认为随机漫画   输错番号会报错
//  番号名为数字 例如:RandomHC("少女",9333)
//  搜索名为字符串 例如:RandomHC("少女","ちゃんに見せられ")
 exports.download=RandomHC

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

