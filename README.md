# Nest.js로 만든 Rest API

Nest.js를 이용해서 Rest API를 구축

쿼리 스트링도 지원

## 사용법

### /users

/users 로 접속시 users에 대한 모든 데이터 출력

- 쿼리 스트링
  - id(number) : 해당 아이디의 데이터 검색
    - ex) /users?id=1 또는 /users/?id=1
  - description(string) : 해당 description의 데이터 검색
    - ex) /users?description=hello 또는 /users/?description=hello
  - price(number) : 해당 가격의 데이터 검색
    - ex) /users?price=5000 또는 /users/?price=hello
  - imageUrl(boolean) : 사진경로만 검색
    - ex) /users?id=1&imageUrl=true 또는 /users/?id=1&imageUrl=true

### /notice

/notice 로 접속시 notice에 대한 모든 데이터 출력

- 사용법
  - id(숫자, number) 검색
    - 해당 id를 검색
    - ex) http://13.125.195.45:3000/notice/id/1
  - title(문자형, string) 검색
    - 해당 title을 검색
    - ex) http://13.125.195.45:3000/notice/title/테스트제목
  - imageUrl(숫자, number) 검색
    - 해당 ImageUrl을 검색, 입력값은 id를 입력함
    - ex) http://13.125.195.45:3000/notice/imageUrl/1
