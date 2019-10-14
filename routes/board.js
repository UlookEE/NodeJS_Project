const express = require('express')
const pool = require('./../libs/database');
const router = express.Router();

const crypto = require('crypto');

const Hashing = (plain) => {
    const secret    = 'dlgprbs9441@com.naver'; //make this your secret!!
    const algorithm = 'sha256';   //consider using sha256
    let hmac = crypto.createHmac(algorithm, secret);
    hmac.update(plain);
    hash = hmac.digest('hex');
    console.log("Hash result : ", hash);
    return hash;
};

/* GET List Page. */
router.get('/list', async (req, res) => {
    res.redirect('list/1')
});

router.get('/list/view/:page', async (req, res) => {
    let connection = await pool.getConnection();

    await connection.query(
        'UPDATE `board` SET `hit` = `hit` + 1 WHERE `idx` = ?',
        [ req.params.page ]
    );

    let [ rows ] = await connection.query(
        'SELECT `idx`, `title`, `writer`, `hit` ,`content`, DATE_FORMAT(`regdate`, "%Y/%m/%d %T") as `regdate`, DATE_FORMAT(`moddate`, "%Y/%m/%d %T") as `moddate` FROM `board` WHERE `idx` = ?',
        [ req.params.page ]
    );
    
    console.log(rows);
    
    connection.release();
    res.render('read', { title: 'View Post', rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
});


router.get('/list/:page', async (req, res) => {
    let connection = await pool.getConnection();

    let [ rows ] = await connection.query(
        'SELECT `idx`, `title`, `writer`, `hit` ,`content`, \
        DATE_FORMAT(`regdate`, "%Y/%m/%d %T") as `regdate`, \
        DATE_FORMAT(`moddate`, "%Y/%m/%d %T") as `moddate`  \
        FROM `board` \
        LIMIT ?, ?',
        [ req.params.page*10 - 10, req.params.page*10 ]
    );
    
    console.log(rows);
    
    connection.release();
    res.render('list', { title: 'View Post', rows , page : req.params.page}); // view 디렉토리에 있는 list 파일로 이동합니다.
});


router.get('/write', async(req, res) =>{
    let connection = await pool.getConnection();
    connection.release();
    res.render('write', { title : 'Write Post' }); // view 디렉토리에 있는 list 파일로 이동합니다.
});

router.post('/writeAction', async(req, res) => {
    let connection = await pool.getConnection();
    let body = req.body;
    body.passwd = Hashing(body.passwd);
    let rows = await connection.query(
        'INSERT INTO `board`(`title`, `writer`, `content`, `password`) \
          VALUES (?,?,?,?)',
         [body.title, body.name, body.content, body.passwd]
    );
    connection.release();
    res.redirect('list/1')
});

module.exports = router;