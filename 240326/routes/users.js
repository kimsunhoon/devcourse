const express = require('express');
const router = express.Router();

router.use(express.json());

// 기본 데이터 생성
let db = new Map();
let id = 1; // 객체 구별을 위해 생성

//회원 가입
router.post('/join',(req,res)=>{
  if(req.body == {}){
    res.status(400).json({
      message : '입력 값을 다시 확인해주세요'
    });
  } else {
    let {userID} = req.body;
    db.set(userID, req.body);
    res.status(201).json({
      message : `${db.get(userID).name}님 환영합니다`
    });
  }
});

router
  .route('/users')
  //회원 정보 조회
  .get((req,res)=>{
    let {userID} = req.body;
    let user = db.get(userID);

    if(user){
      res.status(200).json({
        userID : user.userID,
        name : user.name
      });
    } else {
      res.status(404).json({
        message : "회원 정보가 없습니다"
      });
    }
  })
  //회원 탈퇴
  .delete((req,res)=>{
    let {userID} = req.body;
    let user = db.get(userID);

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
  })

//로그인
router.post('/login',(req,res)=>{
  let {userID, pwd} = req.body;
  let loginUser = {};
  
  db.forEach(function(user,id){
    if(user.userID === userID){
      loginUser = user;
    }
  });

  if(isExist(loginUser)){
    if(loginUser.pwd === pwd){
      res.status(200).json({
        message : `${loginUser.name}님 로그인 완료되었습니다`
      });
    } else {
      res.status(400).json({
        message : '비밀번호가 잘못 되었습니다'
      });
    }
  } else {
    res.status(404).json({
      message : `회원 정보가 없습니다`
    });
  }
});

function isExist(obj){
  if(Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
};

module.exports = router;