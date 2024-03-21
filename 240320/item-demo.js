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

// 아이템 정보를 가저오는 라우트
app.get('/items', (req,res) => {
  // 데이터베이스에 저장된 모든 상품 정보를 배열로 변환
  const allItems = Array.from(db.values());
  // 클라이언트에게 상품 정보를 JSON 형식으로 응답5
  res.json(allItems);
});

app.get('/items/:id', (req,res) => {
  let {id} = req.params;
  id = parseInt(id);
  if(db.get(id)==undefined){
    res.json({
      // 해당하는 id가 없는 경우 error 메세지 출력
      message : 'error'
    });
  } else {
    // id에 해당하는 정보 출력
    res.json(db.get(id));
  };
});

// 아이템 정보를 새로 입력받는 라우트
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
