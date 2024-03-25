const express = require('express');
const app = express();
app.use(express.json());
app.listen(1234);

// 기본 데이터 생성
let db = new Map();
let id = 1; // 객체 구별을 위해 생성

//회원 가입
app.post('/join',(req,res)=>{
  const userID = req.body.name;
  if(userID){
    db.set(id++,req.body);
    res.status(201).json({
      message : `${userID}님 환영합니다`
    });
  } else {
    res.status(400).json({
      message : '입력 값을 다시 확인해주세요'
    });
  }
});

//회원 탈퇴
app.delete('/users/:id',(req,res)=>{
  let {id} = req.params;
  id = parseInt(id);
  let user = db.get(id);

  if(user){
    db.delete(id);
    res.status(200).json({
      message : `${user.name} 탈퇴가 완료되었습니다`
    });
  } else {
    res.status(404).json({
      message : `요청하신 회원 정보가 없습니다`
    });
  }
});

//회원 정보 조회
app.get('/users/:id',(req,res)=>{
  let {id} = req.params;
  id = parseInt(id);
  
  const user = db.get(id);
  if(user == undefined){
    res.status(404).json({
      message : "회원 정보가 없습니다"
    });
  } else {
    res.status(200).json({
      userID : user.userID,
      name : user.name
    });
  }
});

//로그인
app.post('/login',(req,res)=>{
  const {userID, pwd} = req.body;
  let loginUser = {};
  
  db.forEach(function(user,id){
    if(user.userID === userID){
      loginUser = user;
    }
  });

  if(isExist(loginUser)){
    console.log("id ok");

    if(loginUser.pwd === pwd){
      console.log("pwd ok");
    } else {
      console.log("pwd error");
    }
  } else {
    console.log("id error");
  }
});

function isExist(obj){
  if(Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
};