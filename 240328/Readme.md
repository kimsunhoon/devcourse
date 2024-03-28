## 240328 학습 내역 정리
### DB 테이블 생성

Mariadb를 활용하여 다음과 같은 테이블을 생성하고 데이터를 입력해보자

![image](https://github.com/kimsunhoon/devcourse/assets/96249610/bc13236e-1cce-48cb-99f4-6b217cf85fa7)

#### 스키마 생성
- 스키마 만들기
```
CREATE DATABASE Food; 
```
- 스키마 사용
```
USE Food;
```

#### 테이블 생성
```
// 1번 테이블
CREATE TABLE price (
ID INT NOT NULL AUTO_INCREMENT,
NAME VARCHAR(30) NOT NULL,
PRICE INT NOT NULL,
PRIMARY KEY(ID)
);
```
```
//2번 테이블
CREATE TABLE types (
ID INT NOT NULL AUTO_INCREMENT,
FOOD_TYPE VARCHAR(30) NOT NULL,
NAME VARCHAR(30) NOT NULL,
PRIMARY KEY(ID)
);
```

#### 데이터 입력
```
//1번 테이블 데이터 입력
INSERT INTO price VALUES (1,'초밥',12000);
INSERT INTO price VALUES (2,'된장찌개',8000);
INSERT INTO price VALUES ('불고기',9000);
INSERT INTO price VALUES (4,'짬뽕',10000);
INSERT INTO price VALUES (5,'스테이크',24000);
```
```
//2번 테이블 데이터 입력
INSERT INTO types VALUES (1,'한식','불고기');
INSERT INTO types VALUES (2,'중식','짬뽕');
INSERT INTO types VALUES (3,'일식','초밥');
INSERT INTO types VALUES (4,'한식','된장찌개');
INSERT INTO types VALUES (5,'양식','파스타');
```
#### 데이터 확인
```
// 데이터 전체 조회
SELECT * FROM price;
SELECT * FROM types;
```
```
// 테이블 확인
DESC price;
DESC types;
```

### JOIN 학습
[학습 내역 블로그 정리](https://velog.io/@kimsunhoon/SQL-JOIN-%EC%A0%95%EB%A6%AC)
