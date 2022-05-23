import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Quote} from "./quote.entity";
import {User} from "../user/user.entity";
import {QuoteCreateDto} from "./dto/quote-create.dto";
// import {QuoteCreateDto} from "./dto/quote-create.dto";

@Injectable()
export class QuoteService {

    constructor(
        @InjectRepository(Quote)
        private quoteRepository: Repository<Quote>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async all(): Promise<Quote[]> {
        return await this.quoteRepository.find();
    }

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
    async getQuoteByUser(user: User) {
        return await this.quoteRepository.findOne({
            where: {user: user},
            relations: [
                'user',
                // 'userUpVoted',
                // 'userDownVoted'
            ],
        });
    }
    //
    // // for get quote of exact user id
    // async getQuoteById(id: number) {
    //     return await this.quotesRepository.findOne({
    //         where: {id: id},
    //         relations: ['user', 'usersUpVoted', 'usersDownVoted'],
    //     });
    // }

    // for make a quote
    async createQuote(
        @Body() createQuoteDto: QuoteCreateDto) {

        const newQuote = await this.getQuoteByUser(createQuoteDto.user);

        if (!newQuote) {
            const quote = new Quote();
            quote.text = createQuoteDto.text;
            quote.user = createQuoteDto.user;
            // quote.downVote = 0;
            // quote.upVote = 0;
            quote.date = new Date();
            await this.quoteRepository.save(quote);
            return quote;
        }

        newQuote.text = createQuoteDto.text;
        await this.quoteRepository.save(newQuote);
        return newQuote;


        // return this.quotesRepository.create({
        //     test: createQuoteDto.text,
        // });
    }

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
}
