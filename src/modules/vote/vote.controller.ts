import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Quote } from '../quote/quote.entity';
import { User } from '../user/user.entity';
import { VoteService } from './vote.service';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  async findUserVotes(user:User, quote:Quote) {
    return this.voteService.findUserVotes(user, quote);
  }
  
  @Get(':id')
  async findUserVote(user:User, quote:Quote) {
    return this.voteService.findUserVote(user, quote);
  }

  @Patch(':id')
  async vote(value: boolean, user: User, quote: Quote) {
    return this.voteService.voting(value, user, quote);
  }

}