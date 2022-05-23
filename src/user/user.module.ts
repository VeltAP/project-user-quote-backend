import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user.service';
import {Quote} from "../quote/quote.entity";
// import {AuthModule} from "../auth/auth.module";
// import {Vote} from "../vote/vote.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Quote]),
        // TypeOrmModule.forFeature([Vote]),
        // AuthModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
