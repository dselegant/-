var express = require('express');
var router = express.Router();
const userlistRouter1 = require('./user/userlist1.js');
const userlistRouter2 = require('./user/userlist2.js');
const authorityRouter = require('./user/authority.js');
const rolelistRouter = require('./user/rolelist.js');

const sqlQuery = require('../../module/dsMysql.js');
const crypto = require('crypto');
const fs =require('fs');
const multer = require('multer');
//初始化上传对象（上传的位置）
let upload = multer({ dest: './public/images' });

// 用户列表一
router.use('/userlist1',userlistRouter1);
// 用户列表二
router.use('/userlist2',userlistRouter2);
// 角色管理
router.use('/rolelist',rolelistRouter);
// 权限管理
router.use('/authority',authorityRouter);

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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('用户管理');
});

// 个人信息页
router.get('/selfinfo',async (req,res) => {
  let sqlStr = 'select * from user where username = ?';
  let result = await sqlQuery(sqlStr,[req.session.username]);
  res.render('admin/users/selfinfo.ejs',{
    users:result[0],
    roles:await getRole()
  });
})

// 修改个人信息
router.post('/selfinfo',async (req,res) => {
  console.log(req.body);
  let password = jiami(req.body.password)
  let email = req.body.email;
  let phone= req.body.phone;
  let roleid = req.body.roleid;
  let username = req.body.username;
  let sqlStr = "update user set password=?,email=?,phone=?,roleid=? where username =?";
  let arr = [password,email,phone,roleid,username];
  await sqlQuery(sqlStr,arr);
  res.json({
    state:"ok",
    content:"个人信息更新成功"
  })

})

// 上传头像
router.post('/upload',upload.single("imgfile"),async (req,res) => {
  console.log(req.file);
  let sqlStr = 'update user set imgheader = ? where username = ?'
  let imgSrc = rename(req)
  console.log(imgSrc);
  await sqlQuery(sqlStr,[imgSrc.imgSrc,req.session.username])
  res.json(imgSrc)
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
