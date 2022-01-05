var express = require('express');
const sqlQuery = require('../../module/dsMysql.js');
const crypto = require('crypto');
var router = express.Router();

function jiami(str) {
    //需要加密的字符串
    let password = str;
    password = password + "DSDSDS"
    //使用的加密算法
    let sf = crypto.createHash('md5')
    //123456lc加密的内容
    //123sgjiasojgiaosjgoi ==>123456lc
    //对字符串进行加密
    sf.update(password)
    //加密的二进制数据以字符串的形式
    let content = sf.digest('hex');
    return content
}

router.get('/login', function (req, res, next) {
    res.render('loginregister/login.ejs')
});

router.get('/register', function (req, res, next) {
    res.render('loginregister/register.ejs')
});

router.post('/register', async (req, res) => {
    let username = req.body.username;
    let password = jiami(req.body.password);
    let phone = req.body.phone;
    let email = req.body.email;
    let sqlStr = 'select * from user where username = ?'
    let result = await sqlQuery(sqlStr, [username]);
    if (result.length != 1) {
        // 注册成功
        let sqlStr = 'insert into user (username,password,phone,email,roleid) values (?,?,?,?,5)';
        await sqlQuery(sqlStr, [username, password,phone,email]);
        res.render('info/info.ejs', {
            title: '注册成功',
            content: '注册成功，即将进入登录页',
            href: '/lr/login',
            hrefTxt: '登录页'
        })
    } else {
        res.render('info/info.ejs', {
            title: '注册失败',
            content: '注册失败，即将重新注册',
            href: '/lr/register',
            hrefTxt: '注册页'
        })
    }
})

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = jiami(req.body.password);
    let sqlStr = 'select * from user where username = ? and password = ?'
    let result = await sqlQuery(sqlStr, [username, password]);
    if (result.length) {
        // 登录成功
        req.session.username = username;
        res.render('info/info.ejs', {
            title: '登录成功',
            content: '登录成功，即将进入后台',
            href: '/admin',
            hrefTxt: '后台'
        })
    } else {
        res.render('info/info.ejs', {
            title: '登录失败',
            content: '登录失败，用户名或密码错误，即将重新登录',
            href: '/lr/login',
            hrefTxt: '登录页'
        })
    }
})

router.get('/loginout',(req,res) => {
    req.session.destroy();
    res.render('info/info.ejs', {
        title: '退出成功',
        content: '退出成功，即将重新登录',
        href: '/lr/login',
        hrefTxt: '登录页'
    })
})
module.exports = router;
