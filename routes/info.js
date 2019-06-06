var express = require('express');
var http = require('http');
var router = express.Router();
//导入sql模板
var mysql = require('mysql');
var dgConfig = require("../db/DBConfig");
var $sql = require("../db/sql");
// 连接数据库
var conn = mysql.createConnection(dgConfig.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 获取菜单
router.post('/getMenu', (req, res) => {
    var sql = $sql.menu.queryAll
    var params = req.body;
    conn.query(sql,[params.type,params.menuType],function (err, result) {
      if (err) throw err
      if (result) {
        jsonWrite(res, result)
      }
    })
  })
// 添加资讯信息
router.post('/addInformation',(req,res)=>{
  var sql = $sql.info.insert;
  var params = req.body;
  conn.query(sql,[params.title,params.addDate,params.img,params.username,params.type,params.firstType],function(err,result){
    if (err) throw err
    if (result){
       jsonWrite(res,result)
    }  
  })
})
// 添加图片
router.post('/addImg',(req,res)=>{
  var sql = $sql.info.insertImg;
  var params = req.body;
  conn.query(sql,[params.img],function(err,result){
    if (err) throw err
    if (result){
      jsonWrite(res,result);
    }  
  })
})
// 查询资讯信息
router.post('/getInformation',(req,res)=>{
  var sql = $sql.info.queryAll;
  var params = req.body;
  conn.query(sql,[params.type,params.firstType],function(err,result){
    if (err) throw err
    if (result) {
       jsonWrite(res,result)
    }  
  })
})
  module.exports = router