import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UsersService } from './user.service';
import {Quote} from "../quote/quote.entity";
import {JwtModule} from "@nestjs/jwt";
import { AuthModule } from 'src/auth/auth.module';
// import {Vote} from "../vote/vote.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Quote]),
        // TypeOrmModule.forFeature([AuthModule]),
        // TypeOrmModule.forFeature([Vote]),
        // AuthModule
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}
