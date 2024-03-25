const express = require('express');
const app = express();
app.listen(1234);

const fruits = [
  {id:1, name:'apple'},
  {id:2, name:'banana'},
  {id:3, name:'berry'},
  {id:4, name:'peach'},
  {id:5, name:'orange'},
];

//과일 전체 조회
app.get('/fruits',(req,res)=>{
  res.json(fruits);
});

// //과일 개별 조회
// app.get('/fruits/:id',(req,res)=>{
//   let id = req.params.id;
//   let fruitResult = ""
//   fruits.forEach(function(fruit){
//     if (fruit.id == id){
//       fruitResult = fruit;
//     };
//   });
//   res.json(fruitResult);
// })

//과일 개별 조회
app.get('/fruits/:id',(req,res)=>{
  let id = req.params.id;
  let findFruit = fruits.find(f=>(f.id==id));
  if(findFruit){
    res.json(findFruit);
  } else {
    // 예외처리 with HTTP Code
    res.status(404).send(
      '찾는 과일이 없습니다'
    );
  }
})