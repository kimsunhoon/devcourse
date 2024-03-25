//express 모듈 불러오기
const express = require('express');
const app = express();
const port = 1234;
app.use(express.json());
app.listen(port);

//데이터 생성
let db = new Map();
let id = 1;

app
  .route('/channels')
  //채널 전체 조회
  .get((req,res) => {
    let channels = [];
    if(db.size) {
      db.forEach(function(value,key) {
        channels.push(value);
      });
      res.status(200).json(channels);
    } else {
      res.status(404).json({
        message : '조회할 채널이 없습니다'
      })
    }
    
  })
  //채널 개별 생성
  .post((req,res) => {
    if(req.body.channelName){
      db.set(id++,req.body);
      res.status(201).json({
        message : `${db.get(id-1).channelName} 채널 생성 완료!`
      });
    } else {
      res.status(400).json({
        message : '채널 명이 존재하지 않습니다'
      });
    }
  }) 


app
  .route('/channels/:id')
  //채널 개별 조회
  .get((req,res) => {
    let {id} = req.params;
    id = parseInt(id);
    let channelID = db.get(id);
    if(channelID){
      res.status(200).json(channelID);
    } else {
      res.status(404).json({
        message : '채널이 존재하지 않습니다'
      });
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
      res.status(404).json({
        message : '채널이 존재하지 않습니다'
      });
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
      res.status(404).json({
        message : '채널이 존재하지 않습니다'
      });
    }
  }) 