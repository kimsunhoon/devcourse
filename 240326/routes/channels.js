//express 모듈 불러오기
const express = require('express');
const router = express.Router();
router.use(express.json());

//데이터 생성
let db = new Map();
let id = 1;

router
  .route('/')
  //채널 전체 조회
  .get((req,res) => {
    let {userID} = req.body;
    let channels = [];
    
    if(db.size && userID) {
      db.forEach(function(value,key) {
        if(value.userID === userID){
          channels.push(value);
        }
      });
      if(channels.length){
        res.status(200).json(channels);
      } else {
        notFound();
      }
    } else {
      notFound();
    }
  })

  //채널 개별 생성
  .post((req,res) => {
    if(req.body.channelName){
      let channel = req.body;

      db.set(id++,channel);
      res.status(201).json({
        message : `${db.get(id-1).channelName} 채널 생성 완료!`
      });
    } else {
      res.status(400).json({
        message : '채널 명이 존재하지 않습니다'
      });
    }
  }) 


router
  .route('/:id')
  //채널 개별 조회
  .get((req,res) => {
    let {id} = req.params;
    id = parseInt(id);
    let channelID = db.get(id);
    if(channelID){
      res.status(200).json(channelID);
    } else {
      notFound();
    }
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

function notFound() {
  res.status(404).json({
    message : '조회할 채널이 없습니다'
  });
}

module.exports = router;