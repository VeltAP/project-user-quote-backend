import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {QuoteService} from "../quote/quote.service";
import {Quote} from "../quote/quote.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => UserModule),
        // UserModule,
        // TypeOrmModule.forFeature([Quote]),
        // forwardRef(() => QuoteService),
        // QuoteService,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
