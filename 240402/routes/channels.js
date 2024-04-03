const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator');

router.use(express.json());

const validate = (req,res) => {
  const err = validationResult(req);
    
  if(!err.isEmpty()){
    return res.status(400).json(err.array());
  }
}

router
  .route('/')
  .get(
    [
      body('userId').notEmpty().isInt().withMessage('userId is number'),
      validate
    ]
    ,(req,res) => {
    
    let {userId} = req.body
    let sql = 'SELECT * FROM shows WHERE user_id = ?';
    conn.query(sql,userId,
      function (err,results){
        if(err){
          console.log(err);
          return res.status(400).end();
        }

        if(results.length){
          res.status(200).json(results);
        } else {
          notFoundShow(res);
        }
      }
    );
  })

  .post(
    [body('userId').notEmpty().isInt().withMessage('userId is number'),
    body('name').notEmpty().isString().withMessage('name is string')]
    ,(req,res) => {
      const err = validationResult(req)

      if(!err.isEmpty()){
        return res.status(400).json(err.array());
      }

      const {name,userId} = req.body;

      let sql = 'INSERT INTO shows (title,user_id) VALUES (?, ?)';
      let values = [name,userId];
      conn.query(sql,values,
        function (err,results){
          if(err){
            console.log(err);
            return res.status(400).end();
          }
          res.status(201).json(results);
        }
      )
  }) 

router
  .route('/:id')
  .get(
    param('id').notEmpty().withMessage('input id')
    ,(req,res) => {
    const err = validationResult(req)

    if(!err.isEmpty()){
      return res.status(400).json(err.array());
    }

    let {id} = req.params;
    id = parseInt(id);
    
    let sql = 'SELECT * FROM shows WHERE id = ?';
    conn.query(sql,id,
      function (err,results){
        if(err){
          console.log(err);
          return res.status(400).end();
        }

        if(results.length){
          res.status(200).json(results);
        } else {
          notFoundShow(res);
        }
      }
    );
  }) 

  .delete(
    param('id').notEmpty().isInt().withMessage('input id')
    ,(req,res) => {
    const err = validationResult(req)

    if(!err.isEmpty()){
      return res.status(400).json(err.array());
    }

    let {id} = req.params;
    id = parseInt(id);

    let sql = 'DELETE FROM shows WHERE id = ?';
    conn.query(sql,id,
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

  .put(
    [param('id').notEmpty().withMessage('input id'),
    body('name').notEmpty().isString().withMessage('title error')]
    ,(req,res) => {
    const err = validationResult(req)

    if(!err.isEmpty()){
      return res.status(400).json(err.array());
    }

    let {id} = req.params;
    id = parseInt(id);
    let {name} = req.body;

    let sql = 'UPDATE shows SET title = ? WHERE id = ?';
    let values = [name,id];

    conn.query(sql,values,
      function (err,results){
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
    )
  }) 

module.exports = router;
