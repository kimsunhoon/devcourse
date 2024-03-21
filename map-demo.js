// map 함수 (매서드) 와 forEach 차이 확인
const arr=[1,2,3,4,5];

const foreachArr = arr.forEach(function(a,b,c) {
  // console.log(`a : ${a} , b : ${b} , c : ${c}`);
  return a*2;
});
const mapArr = arr.map(function(a,b,c) {
  // console.log(`a : ${a} , b : ${b} , c : ${c}`);
  return a*2;
});

console.log(`foreach return 값 ${foreachArr} , map return 값 ${mapArr}`);