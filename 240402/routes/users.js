const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

router.use(express.json());

router.post('/join',(req,res)=>{
  if(req.body == {}){
    res.status(400).json({
      message : '입력 값을 다시 확인해주세요'
    });
  } else {
    let {email,name,pwd,contact} = req.body;
    let sql = 'INSERT INTO users (email,name,pwd,contact) VALUES (?, ?, ?, ?)';
    let values = [email,name,pwd,contact];
    conn.query(sql,values,
      function (err,results){
        res.status(201).json(results);
      }
    );
  }
});

router
  .route('/users')
  .get((req,res)=>{
    let {email} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql,email,
      function (err, results){
        if(results.length)
          res.status(200).json(results);
        else {
          res.status(404).json({
            message : "회원 정보가 없습니다"
          });
        }
      }
    );
  })

  .delete((req,res)=>{
    let {email} = req.body;
    let sql = 'DELETE FROM users WHERE email = ?';
    conn.query(sql,email,
      function (err, results){
        res.status(200).json(results);
      }
    );
  })

router.post('/login',(req,res)=>{
  let {email, pwd} = req.body;
  let loginUser = {};
  let sql = 'SELECT * FROM users WHERE email = ?';

  conn.query(sql,email,
    function (err, results){
      let loginUser = results[0];

      if(loginUser && loginUser.pwd == pwd){
        res.status(200).json({
          message : `${loginUser.name}님 로그인 완료되었습니다`
        });
      } else {
        res.status(404).json({
          message : `아이디 또는 비밀번호가 잘못 입력되었습니다`
        });
      }
    }
  );
});

module.exports = router;