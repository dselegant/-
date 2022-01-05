var express = require('express');
var router = express.Router();
const sqlQuery = require('../../../module/dsMysql.js');


router.get('/',(req,res) => {
    res.render('admin/users/authority.ejs');
})
router.get('/api', async (req, res) => {

    let sqlStr = "select * from authority";
    let result = await sqlQuery(sqlStr);
    let sqlStr1 = "select count(id) as num from authority";
    let result1 = await sqlQuery(sqlStr1);
    res.json({
        "code": 0,
        "msg": "",
        "count": result1[0].num,
        "data": result
    })
})

module.exports = router;