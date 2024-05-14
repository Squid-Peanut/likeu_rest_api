import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '\
    <h1>Rest API 테스트 사이트 입니다.</h1> \
    <br><br>\
    <h2>Create users data</h2>\
    <form method="post" action="/input_user">\
    description \
    <input type="text" name="description"><br>\
    price \
    <input type="text" name="price"> <br>\
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
    <form method="post" action="/input_notice">\
    title \
    <input type="text" name="title"><br>\
    text \
    <input type="text" name="text"> <br>\
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
    </form><br><br>';
  }
}
