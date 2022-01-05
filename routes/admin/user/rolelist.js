const { json } = require('express');
var express = require('express');
var router = express.Router();
const sqlQuery = require('../../../module/dsMysql.js');


router.get('/',(req,res) => {
    res.render('admin/users/rolelist.ejs');
})
router.get('/api', async (req, res) => {
    let sqlStr = "select * from role ";
    let result = await sqlQuery(sqlStr);
    let sqlStr1 = "select count(id) as num from role";
    let result1 = await sqlQuery(sqlStr1);
    res.json({
        "code": 0,
        "msg": "",
        "count": result1[0].num,
        "data": result
    })
})

// 添加角色渲染页面
router.get('/addrole',(req,res) => {
    res.render('admin/users/addrole.ejs')
})

// 添加角色进数据库
router.post('/addrole',async (req,res) => {

    // 修改角色表
    let rolename = req.body.rolename;
    let brief = req.body.brief;
    let sqlStr = "insert into role (rolename,brief) values (?,?)";
     await sqlQuery(sqlStr,[rolename,brief]);
    // 修改角色和权限关系表
    let sqlStr1 = "insert into auth_role(roleid,authid) values ((select id from role where rolename = ?),?)"
    for (authlist of req.body.authlist){
         await sqlQuery(sqlStr1,[rolename,authlist.value]);
    }
    res.json({
        "code":200,
        "content":"数据插入成功"
    })
    // insert into auth_role(roleid,authid) values (select id from role where rolename = rolename,?)
})
module.exports = router;