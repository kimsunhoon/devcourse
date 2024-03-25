const obj = {};
const obj2 = {message : 'not empty'};

// 객체 비어있는지 확인하는 test
console.log(Object.keys(obj).length===0);
console.log(Object.keys(obj2).length===0);

const num = 1;
const str = 'one';
const str2 = '';

//문자열도 마찬가지로 가능한지 확인하는 test
console.log(Object.keys(num).length===0);
console.log(Object.keys(str).length===0);
console.log(Object.keys(str2).length===0);

// 함수로 구현
function isEmpty(obj) {
  if(obj.constructor === Object);
  if(Object.keys(obj).length === 0) {
    return true;
  } else return false;
}

// 함수 사용 예시
console.log(isEmpty(str2));