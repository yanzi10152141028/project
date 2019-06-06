const express = require("express");
const router = express.Router();
//处理formdata
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//处理node request请求
const request = require("request");
//微信小程序设置
const wx = require("../public/javascripts/wxConfig");

//路由
router.post('/msgTemplate',urlencodedParser,(req,res)=>{
	let option={
		method:"POST",
		url:wx.url+'/cgi-bin/token?',
		formData:{
			appid:wx.appid,
			secret:wx.secret,
			grant_type:'client_credential'
		}
	}
	request(option,(error,response,body)=>{
		if (error) {
			//请求异常会有返回信息
			res.json({
				"code":-1,
				"status":"操作失败"
			})
		}else{
			// 返回给前端的值
			let data = JSON.parse(body);
			console.log(data)
			res.send(data);
		}
	})
})

module.exports = router;