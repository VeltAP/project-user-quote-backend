import { Module } from '@nestjs/common';
import {QuoteService} from './quote.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Quote} from "./quote.entity";
import {User} from "../user/user.entity";
import { UsersService } from '../user/user.service';
import { QuoteController } from './quote.controller';
import { AuthService } from 'src/auth/auth.service';
import { Vote } from '../vote/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Vote]),
  ],
  providers: [QuoteService],
  exports: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
