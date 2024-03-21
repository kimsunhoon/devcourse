// 배열에서 forEach 구현 테스트
const arr=[1,2,3,4,5];
arr.forEach(function(a,b,c) {
  // 콜백함수 안 매개변수 순서 : a,b,c는 각각 데이터, 인덱스, 객체 전체
  console.log(`a : ${a} , b : ${b} , c : ${c}`);
});

// Map에서 forEach 구현 테스트
let map = new Map();
map.set(1,'one');
map.set(2,'two');
map.set(3,'three');
map.forEach(function(a,b,c) {
  console.log(`a : ${a} , b : ${b} , c : ${c}`);
});
