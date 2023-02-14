// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './modules/user/user.module';
// import {TypeOrmModule} from "@nestjs/typeorm";
// import { QuoteModule } from './modules/quote/quote.module';
// import { AuthModule } from './auth/auth.module';



// @Module({
//   imports: [
//       TypeOrmModule.forRoot({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: 'root',
//         database: 'backend',
//         entities: [],
//         autoLoadEntities: true,
//         synchronize: true
//       }),
//     UserModule,
//     QuoteModule,
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { QuoteModule } from './modules/quote/quote.module'
import { DatabaseModule } from './database.module'
import { VoteModule } from './modules/vote/vote.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    QuoteModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [ 
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}