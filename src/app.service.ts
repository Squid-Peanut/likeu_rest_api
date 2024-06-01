import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `\
    <h1>Rest API 테스트 사이트 입니다.</h1> \
    <br><br>\
    <h2>Create users data</h2>\
    <form method="post" action="/input_user" enctype="multipart/form-data">\
    description \
    <input type="text" name="description"><br>\
    price \
    <input type="text" name="price"> <br>\
    Image file\
    <input type="file" name="file" accept="image/png, image/jpeg" multiple><br>\
    <input type="submit">\
    </form><br><br>\
    <h2>Update users data</h2>\
    <form method="post" action="/update_user">\
    id\
    <input type="text" name="id"><br>\
    description \
    <input type="text" name="description"><br>\
    price \
    <input type="text" name="price"> <br>\
    <input type="submit">\
    </form><br><br>\
    <h2>Create notice data</h2>\
    <form method="post" action="/input_notice" enctype="multipart/form-data">\
    title \
    <input type="text" name="title"><br>\
    text \
    <input type="text" name="text"> <br>\
    Image file\
    <input type="file" name="file" accept="image/png, image/jpeg" multiple><br>\
    <input type="submit">\
    </form><br><br>\
    <h2>Update notice data</h2>\
    <form method="post" action="/update_notice">\
    id\
    <input type="text" name="id"><br>\
    title \
    <input type="text" name="title"><br>\
    text \
    <input type="text" name="text"> <br>\
    <input type="submit">\
    </form><br><br>\
    <h1>카카오 로그인</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/kakao/login'" />\
    <br><br>\
    <h1>카카오 로그아웃</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/kakao/logout'" />\
    <br><br>\
    <h1>구글 로그인</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/google/login'" />\
    <br><br>\
    <h1>구글 로그아웃</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/google/logout'" />\
    <br><br>\
    <h1>세션확인</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/session'" />`;
  }
}
