const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
router.use(express.json());

router
  .route('/')
  .get((req,res) => {
    let {userId} = req.body;
    
    let sql = 'SELECT * FROM shows WHERE user_id = ?';
    if(userId){
      conn.query(sql,userId,
        function (err,results){
          if(results.length){
            res.status(201).json(results);
          } else {
            notFoundShow(res);
          }
        }
      );
    } else {
      res.status(400).end();
    }
  })

  .post((req,res) => {
    let {name,userId} = req.body;
    if(name && userId){
        let sql = 'INSERT INTO shows (name,user_id) VALUES (?, ?)';
        let values = [name,userId];

        conn.query(sql,values,
          function (err,results){
            res.status(201).json(results);
          }
        );
      } else {
      res.status(400).json({
        message : '채널 명이 존재하지 않습니다'
      });
    }
  }) 


router
  .route('/:id')
  .get((req,res) => {
    let {id} = req.params;
    id = parseInt(id);
    
    let sql = 'SELECT * FROM shows WHERE id = ?';
    conn.query(sql,id,
      function (err,results){
        if(results.length){
          res.status(201).json(results);
        } else {
          notFoundShow(res);
        }
      }
    );
  }) 
  //채널 개별 삭제
  .delete((req,res) => {
    let {id} = req.params;
    id = parseInt(id);
    let channelID = db.get(id);
    if(channelID){
      db.delete(id);
      res.status(200).json({
        message : `${channelID.channelName} 채널이 정상적으로 삭제되었습니다`
      });
    } else {
      notFound();
    }
  }) 
  //채널 개별 수정
  .put((req,res) => {
    let {id} = req.params;
    id = parseInt(id);
    let channelID = db.get(id);
    let oldName = channelID.channelName;

    if(channelID){
      let newName = req.body.channelName;
      channelID.channelName = newName;
      db.set(id,channelID);
      res.json({
        message : `${oldName} 채널이 정상적으로 ${newName} 으로 수정되었습니다`
      });
    } else {
      notFound();
    }
  }) 

function notFoundShow(res) {
  res.status(404).json({
    message : '조회할 채널이 없습니다'
  });
}

module.exports = router;