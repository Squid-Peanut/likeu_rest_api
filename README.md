# Nest.js로 만든 Rest API

Nest.js를 이용해서 Rest API를 구축

쿼리 스트링도 지원

## 사용법

### /users

/users 로 접속시 users에 대한 모든 데이터 출력

- id는 /users에서 나온 providerId를 뜻한다.
- 사용법
  - id(number) : 해당 아이디의 데이터 검색
    - ex) /users/id/1
  - data(number) : 해당하는 아이디에서 data의 데이터 검색
    - ex) /users/data/1
  - similarity_per_date(number) : 해당하는 아이디에서 similarity_per_date의 데이터 검색
    - ex) /users/similarity_per_date/1
  - date(number) : 해당하는 아이디에서 date의 데이터 검색
    - ex) /users/similarity_per_date/date/1
  - similarity(number) : 해당하는 아이디에서 similarity의 데이터 검색
    - ex) /users/similarity_per_date/similarity/1
  - star_player(number) : 해당하는 아이디에서 star_player의 데이터 검색
    - ex) /users/star_player/1

### /notice

/notice 로 접속시 notice에 대한 모든 데이터 출력

- 사용법
  - id(숫자, number) 검색
    - 해당 id를 검색
    - ex) /notice/id/1
  - title(문자형, string) 검색
    - 해당 title을 검색
    - ex) /notice/title/테스트제목
  - imageUrl(숫자, number) 검색
    - 해당 ImageUrl을 검색, 입력값은 id를 입력함
    - ex) /notice/imageUrl/1
