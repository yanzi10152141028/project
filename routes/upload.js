var express = require("express");
var router = express.Router();
var path = require("path");
// 上传图片的模板
var multer = require("multer");
// 生成图片放在uploads
let storage = multer.diskStorage({
	// 文件存的地方
	destination: (req, file, cb) => {
		//保存在public文件夹的upload文件夹里
		cb(null, path.join(__dirname, '../public/uploads/'))
	},
	// 文件名
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${Math.ceil(Math.random() * 1000)}_multer.${file.originalname.split('.').pop()}`)
	}
})
let uploadConfig = { storage: storage };
// 图片上传必须用post
router.post('/img', async (req, res) => {
	try {
		let upload = multer(uploadConfig).any();
		upload(req, res, async (err) => {
			if (err) {
				res.json({ path: `/uploads/${uploadFile.filename}` })
				console.log(err);
				return;
			};
			let uploadFile = req.files[0];
			res.json({ path: `/uploads/${uploadFile.filename}` });
		})

	} catch (e) {
		res.send({
			message: e
		})

	}
})
module.exports = router;
