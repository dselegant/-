var express = require('express');
var router = express.Router();
const sqlQuery = require('../../../module/dsMysql.js');
const fs =require('fs');
const crypto = require('crypto');

const multer = require('multer');
//初始化上传对象（上传的位置）
let upload = multer({ dest: './public/images' });

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

// 渲染用户列表2基础页面
router.get('/', async (req, res, next) => {
    //   let page = req.query.page;
    //   page = page ? page : 1
    //   let sqlStr = "select * from user limit ?,5"
    //   let result = await sqlQuery(sqlStr, [parseInt(page) - 1] * 5);
    //   res.render('admin/users/userlist1.ejs', {
    //     userlist: result
    //   })
    let sqlStr1 = "select count(id) as num from user";
    let result1 = await sqlQuery(sqlStr1);
    res.render('admin/users/userlist2.ejs',{
        count:result1[0].num
    })
});

// layui发送数据表格的json数据
router.get('/api', async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    page = parseInt(page)-1;
    limit = parseInt(limit)
    // console.log(page);
    // console.log(limit);
    let sqlStr = "select u.id,u.username,u.email,u.phone,u.imgheader,r.rolename from user as u inner JOIN role as r on u.roleid = r.id limit ?,?"
    let result = await sqlQuery(sqlStr,[page * 5,limit]);
    let sqlStr1 = "select count(id) as num from user";
    let result1 = await sqlQuery(sqlStr1);
    console.log(result);
    console.log(result1[0].num);
    res.json({
        "code": 0,
        "msg": "",
        "count": result1[0].num,
        "data": result
    })
})

// 渲染编辑页面
router.get('/edit',async (req,res) => {
    let id = req.query.id;
    let sqlStr = 'select * from user where id = ?';
    let result = await sqlQuery(sqlStr,[id]);
    res.render('admin/users/userinfo.ejs',{
      users:result[0],
      roles:await getRole()
    });
})


// 上传头像
router.post('/upload',upload.single("imgfile"),async (req,res) => {
    console.log(req.file);
    let username = req.query.username
    let sqlStr = 'update user set imgheader = ? where username = ?'
    let imgSrc = rename(req)
    console.log(imgSrc);
    await sqlQuery(sqlStr,[imgSrc.imgSrc,username]);
    res.json(imgSrc)
  })
  
  // 修改用户信息
router.post('/edit',async (req,res) => {
    console.log(req.body);
    let email = req.body.email;
    let phone= req.body.phone;
    let roleid = req.body.roleid;
    let username = req.body.username;
    let sqlStr = "update user set email=?,phone=?,roleid=? where username =?";
    let arr = [email,phone,roleid,username];
    await sqlQuery(sqlStr,arr);
    res.json({
      state:"ok",
      content:"个人信息更新成功"
    })
  });
  //添加用户头像预览   
  router.post('/addupload',upload.single("imgfile"), (req,res) => {
    let imgSrc = rename(req)
    console.log(imgSrc);
    res.json(imgSrc)
  })
  //添加用户 
  router.get('/adduser',async (req,res) => {
      
      res.render('admin/users/adduser.ejs',{
        roles:await getRole()
      })
  })
  router.post('/adduser',async (req,res) => {
    console.log(req.body);
    let password = jiami(req.body.password)
    let email = req.body.email;
    let phone= req.body.phone;
    let roleid = req.body.roleid;
    let username = req.body.username;
    let imgheader = req.body.imgheader;
    let result = await sqlQuery('select username from user where username = ?',[username]);
    console.log(result);
    if (result[0]){
        res.json({
            state:"off",
            content:"用户已存在"
          })
    }else{
        let sqlStr = "insert into user (password,email,phone,roleid,username,imgheader) values (?,?,?,?,?,?)";
        let arr = [password,email,phone,roleid,username,imgheader];
        await sqlQuery(sqlStr,arr);
        res.json({
            state:"ok",
            content:"添加用户成功成功"
          })
    }

})

// 删除用户
router.get('/memberdel',async(req,res) => {
    let id = req.query.id
    let sqlStr = "delete from user where id = ?"
    let result = await sqlQuery(sqlStr,[id]);
    res.send(result[0]);
})
  // 上传图片改名
  function rename(req){
    let oldName = req.file.destination+"/"+req.file.filename;
    let newName = req.file.destination+"/"+req.file.filename+req.file.originalname;
    fs.rename(oldName,newName,(err) => {
        if (err){
            return Error("上传失败");
        }
        console.log("改名成功");
    })
    return {
      state:'ok',
      imgSrc:'/images/'+req.file.filename+req.file.originalname
    }
  }
// 获取角色
async function getRole(){
    let sqlStr = 'select * from role';
    let result = await sqlQuery(sqlStr);
    return result
  }

module.exports = router;
