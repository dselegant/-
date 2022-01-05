var express = require('express');
var router = express.Router();
const sqlQuery = require('../../../module/dsMysql.js');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let page = req.query.page;
  page = page ? page : 1
  let sqlStr = "select * from user limit ?,5"
  let result = await sqlQuery(sqlStr, [parseInt(page) - 1] * 5);
  res.render('admin/users/userlist1.ejs', {
    userlist: result
  })
});

router.post('/deluser', async (req, res) => {
  let ids = req.body["delid[]"]
  let sqlStr = 'delete from user where id = ?'
  for( id of ids){
    await sqlQuery(sqlStr, [id])
  }
  res.json({
    code:200,
    content:'删除成功'
  })
})
module.exports = router;
