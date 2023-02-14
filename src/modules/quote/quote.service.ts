// import {Body, Injectable} from '@nestjs/common';
// import {InjectRepository} from '@nestjs/typeorm';
// import {Repository, Timestamp} from 'typeorm';
// import {Quote} from "./quote.entity";
// import {User} from "../user/user.entity";
// import {QuoteCreateDto} from "./dto/quote-create.dto";
// // import {QuoteCreateDto} from "./dto/quote-create.dto";

// @Injectable()
// export class QuoteService {

//     constructor(
//         @InjectRepository(Quote)
//         private quoteRepository: Repository<Quote>,
//         @InjectRepository(User)
//         private userRepository: Repository<User>
//     ) {}

//     async all(): Promise<Quote[]> {
//         return await this.quoteRepository.find();
//     }

    // async findOneQuote (condition, relations = []): Promise<any> {
    //     return this.quoteRepository.findOne(condition, {relations});
    // }

    // for get all quotes
    // async getAllQuotes() {
    //     return await this.quotesRepository.find({
    //         order: {
    //             upVote: 'DESC',
    //         },
    //         relations: ['user', 'usersUpVoted', 'usersDownVoted'],
    //     });
    // }

    // for get quote of exact user
    // async getQuoteByUser(user: User) {
    //     return await this.quoteRepository.findOne({
    //         where: {user: user},
    //         relations: [
    //             'user',
    //             // 'userUpVoted',
    //             // 'userDownVoted'
    //         ],
    //     });
    // }
    //
    // // for get quote of exact user id
    // async getQuoteById(id: number) {
    //     return await this.quotesRepository.findOne({
    //         where: {id: id},
    //         relations: ['user', 'usersUpVoted', 'usersDownVoted'],
    //     });
    // }

    // for make a quote
    // async createQuote(
    //     @Body() createQuoteDto: QuoteCreateDto) {

    //     const newQuote = await this.getQuoteByUser(createQuoteDto.user);

    //     if (!newQuote) {
    //         const quote = new Quote();
    //         quote.text = createQuoteDto.text;
    //         quote.user= createQuoteDto.user;
    //         // quote.downVote = 0;
    //         // quote.upVote = 0;
    //         quote.time = new Timestamp();
    //         await this.quoteRepository.save(quote);
    //         return quote;
    //     }

    //     newQuote.text = createQuoteDto.text;
    //     // newQuote.user.id = createQuoteDto.user.id;
    //     await this.quoteRepository.save(newQuote);
    //     return newQuote;


        // return this.quotesRepository.create({
        //     test: createQuoteDto.text,
        // });
    // }

    // async createQuote(userId: number, quote: string): Promise<Quote> {
    //     const user = await this.usersService.getUserById(userId);
    //     const newQuote = this.quoteRepository.create({ user: user, quote: quote });
    //     const result = await this.quoteRepository.save(newQuote).catch((err) => {
    //         if (err.code === '23505') throw new ConflictException();
    //         throw new BadRequestException();
    //     });
    //     delete result.user;
    //     return result;
    // }

    // for quotes that were liked by user
    // async userUpVotedQuotes(id: number) {
    //
    //     const likedQuotes = [];
    //
    //     const user = await this.userRepository.findOne(id)
    //     const userUpVotes = user.upVoted;
    //
    //     const allQuotes = await this.quotesRepository.find({
    //         relations: ['user']
    //     })
    //
    //     userUpVotes.forEach(elementLikedId => {
    //         allQuotes.forEach(elementQuote => {
    //             if (elementLikedId === elementQuote.id) {
    //                 likedQuotes.push(elementQuote)
    //             }
    //         });
    //     });
    //     return likedQuotes;
    // }

    // for "Most recent quotes"
    // async mostRecentQuotes() {
    //
    //     return await this.quotesRepository.find({
    //         order: {
    //             date: 'DESC',
    //         },
    //         relations: ['user', 'usersUpVoted', 'usersDownVoted'],
    //     });
    // }
    //
    // // for "Quote of the day"
    // async randomQuote() {
    //
    //     const value = await this.quotesRepository.count({});
    //     const random = Math.floor(Math.random() * value);
    //
    //     return await this.quotesRepository.find({
    //         relations: ['user', 'usersUpVoted', 'usersDownVoted'],
    //         order: {
    //             upVote: 'DESC',
    //         },
    //         skip: random,
    //         take: 1,
    //     });
    // }
// }


import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { User } from 'src/modules/user/user.entity';
import Logging from 'src/library/Logging';
import { Repository } from 'typeorm';
import { QuoteCreateDto } from './dto/quote-create.dto';
import { QuoteUpdateDto } from './dto/quote-update.dto';

@Injectable()
export class QuoteService{
  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>){}
    
  async create(quoteCreateDto: QuoteCreateDto): Promise<Quote> {
    try {
      const quote = this.quotesRepository.create({ ...quoteCreateDto })
      return this.quotesRepository.save(quote)
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('Something went wrong while posting a quote')
    }
  }

  async findAll():Promise<Quote[]> {
    return await this.quotesRepository.find()
  }

  async findById(quoteId: number, user: User):Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id: quoteId, user }})
    return quote
  }

  async update(id: number, quoteUpdateDto: QuoteUpdateDto): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id }})
    try {
      quote.text = quoteUpdateDto.text;
      quote.karma = quoteUpdateDto.karma;
      return this.quotesRepository.save(quote)
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException('Something went wrong while updating the quote')
    } 
  }
}