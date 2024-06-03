import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // true 시 모든 url에 개방(개발 환경). 특정 url만 허용할 수 있음(배포 환경)
    credentials: true, // 프론트에서 credentials 설정을 true 해주었기 때문
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      // cookie: {
      //   httpOnly: true,
      //   secure: false, // true if you use https
      //   maxAge: 60000, // Example: 1 minute
      // },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    '/static',
    express.static(path.join(__dirname, '..', 'src', 'static')),
  );

  app.use(
    '/users',
    express.static(path.join(__dirname, '..', 'src', 'users', 'uploads')),
  );
  app.use(
    '/notice',
    express.static(path.join(__dirname, '..', 'src', 'notice', 'uploads')),
  );
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('The is a sample REST API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
