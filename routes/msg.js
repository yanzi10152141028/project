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
router.get('/getformid', function (req, res) {
	var code = req.query.code;
	var formid = req.query.formid;
	console.log(formid)
	request('https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' + code + '&grant_type=authorization_code', function (error, response, body) {
		if (!error && response.statusCode === 200) {	//通过前端传过来的code获取openID
			console.log(body, '获取openID返回的信息')
			var bodyJson = JSON.parse(body);
			//获取access_token
			request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wx.appid + '&secret=' + wx.secret, function (error2, response2, body2) {
				if (!error2 && response2.statusCode == 200) {
					console.log(body2, '获取access_token返回的数据')

					var bodyJson2 = JSON.parse(body2);

					var requestData = {
						touser: bodyJson.openid,	//要通知的用户的openID
						form_id: 1540380591153,	//保存的form_id,因为编辑器无法获取到，只能真机测试才可以，所以只能从真机测试后拿过来写死
						template_id: "EVKZI7sq4vuEh_b0kmi--RiCC_ib_RAikRO_dadnmCU",	//模板id
						data: {	//要通知的模板数据
							"keyword1": { "value": "2018-10-24" },
							"keyword2": { "value": "顺丰" },
							"keyword3": { "value": "28orudfs0808uosdufou" },
							"keyword4": { "value": "发货通知成功，闪开，我要开始装逼了" }
						}
					};
					request({	//调用接口进行模板消息发送
						url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + bodyJson2.access_token,
						method: 'POST',
						json: true,
						headers: {
							"content-type": "application/json",
						},
						body: requestData,
					}, function (error3, response3, body3) {

						if (!error3 && response3.statusCode == 200) {
							console.log(body3, '发送消息返回的参数')
						}
					})
				}
			})

		}
	})

})
module.exports = router;