const express = require('express')
const pool = require('./../libs/database');
const router = express.Router();

var crypto    = require('crypto');

const Hashing = (text) => {
    const secret    = 'dlgprbs9441@com.naver'; //make this your secret!!
    const algorithm = 'sha256';   //consider using sha256
    let hmac = crypto.createHmac(algorithm, secret);
    hmac.update(text);
    hash = hmac.digest('hex');
    console.log("Hash result : ", hash);
};

/* GET List Page. */
router.get('/list', async (req, res) => {
    let connection = await pool.getConnection();
    let [ rows ] = await connection.query('SELECT `idx`, `title`, `writer`, `hit`, DATE_FORMAT(`moddate`, "%Y/%m/%d %T") as `moddate` FROM `board`');

    res.render('list', { title: 'Post List', rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
    connection.release();
});

router.get('/list/:page', async (req, res) => {
    let connection = await pool.getConnection();

    connection.query(
        'UPDATE `board` SET `hit` = `hit` + 1 WHERE `idx` = ?',
        [ req.params.page ]
    );

    let [ rows ] = await connection.query(
        'SELECT `idx`, `title`, `writer`, `hit`, DATE_FORMAT(`regdate`, "%Y/%m/%d %T") as `regdate`, DATE_FORMAT(`moddate`, "%Y/%m/%d %T") as `moddate` FROM `board` WHERE `idx` = ?',
        [ req.params.page ]
    );
    
    console.log(rows);
    
    
    connection.release();
    res.render('read', { title: 'View Post', rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
});

router.get('/write', async(req, res) =>{
    let connection = await pool.getConnection();
    connection.release();
    res.render('write', { title : 'Write Post', Hashing, }); // view 디렉토리에 있는 list 파일로 이동합니다.
});

router.post('/writeAction', async(req, res) => {
    console.log(req.body);
    res.redirect('list')
});

module.exports = router;