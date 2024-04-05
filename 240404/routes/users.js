const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


router.use(express.json());

const validate = (req,res,next) => {
  const err = validationResult(req);
    
  if(err.isEmpty()){ 
    return next();
  } else {
    return res.status(400).json(err.array());
  }
};

router.post(
  '/join',
  [
    body('email').notEmpty().isString().withMessage('password input'),
    body('name').notEmpty().isString().withMessage('name input'),
    body('pwd').notEmpty().isString().withMessage('pwd input'),
    body('contact').notEmpty().isString().withMessage('contatct input'),
    validate
  ],
  (req,res)=>{
    const {email,name,pwd,contact} = req.body;
    let sql = 'INSERT INTO users (email,name,pwd,contact) VALUES (?, ?, ?, ?)';
    let values = [email,name,pwd,contact];
    conn.query(sql,values,
      function (err,results){
        if(err){
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      }
    );
  }
);

router
  .route('/users')
  .get(
    [
      body('email').notEmpty().isString().withMessage('email input'),
      validate
    ],
    (req,res)=>{
      let {email} = req.body;
      let sql = 'SELECT * FROM users WHERE email = ?';
      conn.query(sql,email,
        function (err, results){
          if(err){
            console.log(err);
            return res.status(400).end();
          }
          res.status(200).json(results);
        }
      );
  })

  .delete(
    [
      body('email').notEmpty().isString().withMessage('email input'),
      validate
    ],
    (req,res)=>{
      let {email} = req.body;
      let sql = 'DELETE FROM users WHERE email = ?';
      conn.query(sql,email,
        function (err, results){
          if(err){
            console.log(err);
            return res.status(400).end();
          }
          if(results.affectedRows==0){
            res.status(400).end();
          } else {
            res.status(200).json(results);
          }
        }
      );
  })

router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('email input'),
    body('pwd').notEmpty().isString().withMessage('password input'),
    validate
  ],
  (req,res)=>{
    const {email, pwd} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';

    conn.query(sql,email,
      function (err, results){
        if(err){
          console.log(err);
          return res.status(400).end();
        }

        let loginUser = results[0];

        if(loginUser && loginUser.pwd == pwd){
          const token = jwt.sign({
            email : loginUser.email,
            name : loginUser.name,
            id : loginUser.id
          },process.env.PRIVATE_KEY, {
            expiresIn : '5m',
            issuer : 'hoon'
          });

          res.cookie('token',token,{
            httpOnly : true
          });

          // console.log(token);
          res.status(200).json({
            message : `${loginUser.name}님 로그인 완료되었습니다`
          });
        } else {
          res.status(403).json({
            message : `아이디 또는 비밀번호가 잘못 입력되었습니다`
          });
        }
      }
    );
});

module.exports = router;