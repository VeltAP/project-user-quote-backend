import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from '../quote/quote.entity';
import { User } from '../user/user.entity';
import { Vote } from './vote.entity';
import { Repository } from 'typeorm';
import { QuoteUpdateDto } from '../quote/dto/quote-update.dto';
import { QuoteService } from '../quote/quote.service';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly quoteService: QuoteService
  ) {}

  async findUserVotes(user:User, quote:Quote) {
    return this.voteRepository.find({where : {user, quote}})
  }

  async findUserVote(user:User, quote:Quote):Promise<Vote>{
    const getVote = this.voteRepository.findOne({where : {user, quote}})
    return getVote
  }
  
  async voting(value: boolean, user: User, quote: Quote){
    const getVote = await this.findUserVote(user, quote)
    if(getVote){
      return this.update(getVote.id).then(() => {
          const karma = value ? getVote.quote.karma + 2 : getVote.quote.karma - 2
          return this.quoteService.update(getVote.quote.id, new QuoteUpdateDto[karma])
      }) 
    }
    const vote = await this.voteRepository.create({value, user, quote}) as Vote
    return this.voteRepository.save(vote).then(() => {
        const karma = value ? vote.quote.karma + 1 : vote.quote.karma - 1
        return this.quoteService.update(vote.quote.id, new QuoteUpdateDto[karma])
    })
  }

  async update(id: number){
    const vote = await this.voteRepository.findOne({where : {id}})
    vote.value = !vote.value
    return await this.voteRepository.save(vote)
  }

}