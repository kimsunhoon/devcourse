// express 모듈 불러오기
const express = require('express');
const app = express();
const port = 1234;
app.listen(port);

// 기본 데이터 생성
let db = new Map();
let id = 1;

// 객체 생성
let item1 = {
  itemNum : 1,
  Name : 'Computer',
  price : 1000000
};

let item2 = {
  itemNum : 2,
  name : 'Book',
  price : 10000
};

let item3 = {
  itemNum : 3,
  name : 'Cup',
  price : 3000
};

let item4 = {
  itemNum : 4,
  name : 'Chair',
  price : 200000
};

let item5 = {
  itemNum : 5,
  name : 'Table',
  price : 500000
};

// 객체 db 에 삽입
db.set(id++,item1);
db.set(id++,item2);
db.set(id++,item3);
db.set(id++,item4);
db.set(id++,item5);

// 전체 아이템 정보 조회 기능 구현
app.get('/items', (req,res) => {
  if(db.size==0){
    res.json({
      message : '아이템이 존재하지 않습니다'
    });
  } 
  else {
    let items={};
    db.forEach(function(value,key) {
      items[key]=value;
    })
    res.json(items);
  }
});

// 개별 아이템 정보 조회 기능 구현
app.get('/items/:id', (req,res) => {
  let {id} = req.params;
  id = parseInt(id);
  // 해당하는 id가 없는 경우 error 메세지 출력
  if(db.get(id)==undefined){
    res.json({
      message : '해당 아이템이 존재하지 않습니다'
    });
  } else {
    // id에 해당하는 정보 출력
    res.json(db.get(id));
  };
});

// 새로운 아이템 정보 받는 기능 구현
app.use(express.json()); // http 외 모듈 '미들웨어' : json 설정
app.post('/items', (req,res) => {
  // 새로 등록하는 아이템 map에 입력
  db.set(id++,req.body);
  // 아이템 등록 시 문구 출력
  res.json({
    message : `${db.get(id-1).name} 아이템 등록이 정상적으로 완료되었습니다`
  });
  res.json(req.body);
})

// 아이템 정보 개별 삭제 기능 구현
app.delete('/items/:id', (req,res) => {
  let {id} = req.params;
  id = parseInt(id);
  let items = db.get(id);

  // 해당하는 id가 없는 경우 error 메세지 출력
  if(items==undefined){
    res.json({
      message : `요청하신 ${id}번 아이템이 존재하지 않습니다`
    });
  } else {
    const name = items.name;
    db.delete(id);
    // 아이템 삭제 시 문구 출력
    res.json({
      message : `${name} 아이템이 정상적으로 삭제되었습니다`
    });
  }  
});

//아이템 정보 전체 삭제 기능 구현
app.delete('/items', (req,res) => {
  var msg = '';
  //db 값이 1개 이상이면 전체 삭제
  if(db.size>=1){
    db.clear();
    msg = '전체 아이템 삭제가 완료되었습니다'
  } // db 값이 존재하지 않으면 삭제하지 않음
  else {
    msg = `삭제할 아이템이 없습니다`
  };
  res.json({
    message : msg
  });
});

