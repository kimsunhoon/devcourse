var jwt = require('jsonwebtoken'); // jwt 모듈 생성

// token 생성 = jwt 서명
var token = jwt.sign({ foo: 'bar' }, 'shhhhh'); 

// jwt 키 확인
console.log(token);

// 검증
var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo) // 결과값 : bar



