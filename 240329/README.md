## 240329 학습 내역 정리

### MySQL workbench 활용
- mySQL workbench를 설치하여 GUI 환경에서 SQL 작성 실습을 진행

  ![image](https://github.com/kimsunhoon/devcourse/assets/96249610/c0d20d54-8082-498c-abba-22e52fe2f2ce)
```
// 테이블 생성 예시
CREATE TABLE `Channel`.`shows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `sub_num` INT NOT NULL DEFAULT 0,
  `video_cnt` INT NOT NULL DEFAULT 0,
  `user_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Channel`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
```
```
// 데이터 입력 예시
INSERT INTO `Channel`.`users` (`email`, `name`, `pwd`, `contact`) VALUES ('abc@naver.com', 'kim', '1234', '010-3124-2314');
INSERT INTO `Channel`.`users` (`email`, `name`, `pwd`, `contact`) VALUES ('add@gmail.com', 'park', '54321', '010-3145-5156');
INSERT INTO `Channel`.`users` (`email`, `name`, `pwd`, `contact`) VALUES ('kkiiu@naver.com', 'lee', '1111', '010-7222-1512');
```

### DB 연동
- npm-> mysql2 패키지 설치
- 다음 코드를 활용하여 디비와 연동
```
// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'Channel',
});

// A simple SELECT query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// Using placeholders
connection.query(
  'SELECT * FROM `users`',
  ['Page', 45],
  function (err, results) {
    console.log(results);
  }
);
```

![image](https://github.com/kimsunhoon/devcourse/assets/96249610/adef59a9-0093-4138-93ab-44cec8b1b2c7)

다음과 같이 workbench에 작성한 데이터들이 정상적으로 출력됨을 확인할 수 있다
