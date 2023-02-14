// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import {ValidationPipe} from "@nestjs/common";
// import * as cookieParser from "cookie-parser";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('api');
//   app.useGlobalPipes(new ValidationPipe());
//   app.use(cookieParser());
//   app.enableCors({
//     origin: 'http://localhost:3000',
//     credentials: true
//   });

//   await app.listen(4200);
// }
// bootstrap();

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import express from 'express'
import Logging from './library/Logging'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  // Setup to display files
  app.use('/files', express.static('files'))

  // Setup Swagger
  // const config = new DocumentBuilder()
  //   .setTitle('NestJS tutorial API')
  //   .setDescription('This is API for NestJS tutorial.')
  //   .setVersion('1.0.0')
  //   .build()

  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('/', app, document)

  const PORT = process.env.PORT || 4200
  await app.listen(PORT)

  Logging.info(`App is listening on: ${await app.getUrl()}`)
}
bootstrap()