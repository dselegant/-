const express = require('express');
const userRouter = require('./userRouter');
const newsRouter = require('./newsRouter')
const doctorsRouter = require('./doctorsRouter')
const patientsRouter = require('./patientsRouter');
const sqlQuery = require('../../module/dsMysql.js');
const router = express.Router();

function isLogin(req, res, next) {
  if (req.session.username == undefined) {
    res.render('info/info.ejs', {
      title: '未登录',
      content: '尚未登录，请进入登录页进行登录',
      href: '/lr/login',
      hrefTxt: '登录页'
    })
  } else {
    next();
  }
}
/* GET home page. */
router.get('/', isLogin, function (req, res, next) {
  res.render('admin/index.ejs', {
    username: req.session.username
  })
});

async function LimitsAfAuthority(req, res, next) {
  let sqlStr = "SELECT authurl from authority WHERE id in (SELECT authid from auth_role where roleid = (select roleid from user where username = ?))";
  let result = await sqlQuery(sqlStr, [req.session.username]);
  // console.log(result);
  //3判断当前请求的路径是否在允许的路径里
  let httpUrl = req.originalUrl;
  let isAllow = result.some((item, i) => {
    let isTrue = new RegExp("^" + item.authurl).test(httpUrl)
    return isTrue;
  })
  console.log('-------', isAllow)
  if (isAllow) {
    next();
  } else {
    res.render('info/info.ejs', {
      title: '访问失败',
      content: '您没有权限访问该页面，请联系后天管理员',
      href: '/admin',
      hrefTxt: '后台首页'
    })
  }


}
// 后台用户管理模块
router.use('/user', LimitsAfAuthority, userRouter);
// 后台新闻
router.use('/news', LimitsAfAuthority, newsRouter);
// 后台医生管理
router.use('/doctors', LimitsAfAuthority, doctorsRouter)
// 换着管理
router.use('/patients', LimitsAfAuthority, patientsRouter)
module.exports = router;
