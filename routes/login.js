//express
const express = require('express');
const router = express.Router();

//处理formdata
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//处理node request请求
const request = require('request');

//token
// const jwt = require('./jwt.js');  //这个是jsonwebtoken中的方法，我又进行了二次加工。

//微信小程序设置
const wx = require("../public/javascripts/wxConfig"); //文件中存储了appid 和 secret

//数据库
const datebase = require('../db/DBConfig') //文件中存储了数据库地址
const mysql = require('mysql');
var $sql = require("../db/sql");
const msqClient = mysql.createConnection(datebase.mysql);
//路由
router.post('/getOpenId', urlencodedParser, (req, res) => {
    console.log(req.body.code)
        //拿到前台给的code后，发送请求
    if(req.body.code) {
        let options = {
            method: 'POST',
            url:  wx.url+'/sns/jscode2session?',
            formData: {
                appid: wx.appid,
                secret: wx.secret,
                js_code: req.body.code,
                grant_type: 'authorization_code'
            }
        };
        request(options, (error, response, body) => {
            if(error) { //请求异常时，返回错误信息
                res.json({
                    "status": "error",
                    "code": "操作失败"
                })
            } else {
                //返回值的字符串转JSON
                let data = JSON.parse(body);
                // 生成token
                // var openid = data.openid.replace('-','a');
                // var token = req.body.code+openid;
                res.send(data)
                res.end();
            }
        });
    } else {
        res.json({
            "status": "error",
            "code": "0004"
        });
    }
})

module.exports = router;