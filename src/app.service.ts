import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(findUser) {
    const defult = `\
    <h1>Rest API 테스트 사이트 입니다.</h1> \
    <br><br>\
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
    </form><br><br>`;

    const googleLogout = `
    <h1>구글 로그아웃</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/google/logout'" />\
    <br><br>`;

    const kakaoLogout = `<h1>카카오 로그아웃</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/kakao/logout'" />\
    <br><br>`;

    const login = `<h1>카카오 로그인</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/kakao/login'" />\
    <br><br>\
    <h1>구글 로그인</h1>\
    <img src="/static/kakao_login_medium_narrow.png" alt="카카오 로그인" onclick="location.href='/google/login'" />\
    <br><br>`;

    if (findUser == null || findUser.accessToken == undefined)
      return defult + login;
    else if (findUser.provider != null && findUser.provider == 'google')
      return defult + googleLogout;
    else if (findUser.provider != null && findUser.provider == 'kakao')
      return defult + kakaoLogout;
  }
}
