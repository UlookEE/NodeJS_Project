const express = require('express')
const pool = require('./../libs/database');

const router = express.Router();

/* GET List Page. */
router.get('/list', async (req, res) => {
    let [ rows ] = await pool.query('SELECT `idx`, `title`, `writer`, `hit`, DATE_FORMAT(`moddate`, "%Y/%m/%d %T") as `moddate` FROM `board`');

    res.render('list', { title: 'Post List', rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
});

router.get('/list/:page', async (req, res) => {
    let connection = await pool.getConnection();

    let [ rows ] = await connection.query(
        'SELECT `idx`, `title`, `writer`, `hit`, DATE_FORMAT(`regdate`, "%Y/%m/%d %T") as `regdate`, DATE_FORMAT(`moddate`, "%Y/%m/%d %T") as `moddate` FROM `board` WHERE `idx` = ?',
        [ req.params.page ]
    );

    connection.release();

    res.render('read', { title: 'View Post', rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
});

module.exports = router;
