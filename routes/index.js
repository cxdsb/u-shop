var express = require('express');
// const Db = require('../utils/Db');
// Db.connect2();
var router = express.Router();
const url = require("url");
const Dbconfig = require("../model/Dbconfig")

const { Success, MError, Guest } = require("../utils/Result")

const base64 = (str) => {
  //base64加密方法
  if (typeof str !== 'string') {
    str = JSON.stringify(str);
  }
  return Buffer.from(str).toString("base64");
}
const base64decode = (str = "") => {
  // base64解密
  return Buffer.from(str, "base64").toString('utf-8');
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function (req, res, next) {
  res.render('register.html', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get("/provincesList", async (req, res) => {
  const [err, data] = await Dbconfig.querys(`select * from provinces`);
  if (err) {
    res.send(MError(err.tostring()))
  } else {
    res.send(Success(data, "查看成功"));
  }
})
//城市接口
/*
  省份下的所有城市列表
  需要用到城市下的pro_id
*/
router.get("/cityList", async (req, res) => {
  //查询pro_id
  let objectproid = url.parse(req.url, true)["query"];
  let pro_id = objectproid["pro_id"];
  // console.log(pro_id);
  //查询数据库中的数据
  let [err, data] = await Dbconfig.querys(`select * from cities where pro_id=${pro_id}`);
  if (data.length == 0) {
    res.send(MError("查询的数据不存在"))
  } else {
    res.send(Success(data, "查询城市接口内容成功"));
  }
})


// 注册接口
// 验证码

let svgCaptcha = require("svg-captcha");

router.get("/regcode", (req, res) => {
  const captcha = svgCaptcha.create();
  // console.log(captcha);
  res.cookie("code", captcha.text); // 把真正的验证码保存到cookie上,用于下面接口的调用
  res.type("svg"); // 告诉浏览器, 这里返回的是图片的数据
  res.send(captcha.data); // 提取验证码图片的data数据返回给前端
})




// 注册
let uuid = require("node-uuid");
router.post("/register", async (req, res) => {
let [err, data] = await Dbconfig.querys(`insert into member(uid,username,password,createdate) values ('${uuid.v1()}','${req.body.username}','${req.body.password}','${new Date().getTime()}')`)
    res.send(Success(data, "注册成功"));
  // if (req.cookies.code.toUpperCase() == req.body.userCode.toUpperCase()) {
    

  // } else {
  //   res.send(MError("验证码失败"));

  // }
})


// 登录接口

router.post("/login", async (req, res) => {

  let [err, data] = await Dbconfig.querys(`select * from member where username='${req.body.username}' and password='${req.body.password}'`);

      
     
  if (req.cookies.code.toUpperCase() == req.body.userCode.toUpperCase()) {
if (data.length > 0) {
        res.send(Success(data, "登录成功"));
      } else {
        res.send(MError("你输入的用户名或者密码错误"));
      }

  } else {
 
    res.send(MError("验证码有误"));
  }

})
// 存储session

// router.use(session({
//   secret:"qweqtrrewtreqwq",//对session使用相关的cookie签名
//   resave:true,//强制session保存在session store中
//   saveUninitialized:false,//是否保存未初始化的会话任务
//   cookie:{
//       maxAge:1000*60*3//过期时间 
//   }
// }))




const { staticPath } = require("../common/global");
/*
轮播图接口数据
*/
router.get("/bannerList", async (req, res) => {
  // CONCAT的作用: 是在查询结果时, 给某个字段进行拼接值
  // CONCAT(在前面拼接的字符串, 查询的字段) as 给值起个别名
  const [err, arr] = await Dbconfig.querys(`SELECT CONCAT('${staticPath}', coverimg) as coverimg FROM banner`);
  console.log(err);
  res.send(Success(arr));
})

// category_first 商品导航栏





module.exports = router;
