import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {QuoteService} from "./quote.service";

import {User} from "../user/user.entity";
import {QuoteCreateDto} from "./dto/quote-create.dto";
import {Quote} from "./quote.entity";
// import {QuoteCreateDto} from "./dto/quote-create.dto";

@Controller('quotes')
export class QuoteController {
    constructor(
        private quoteService: QuoteService
    ) {
    }

    @Get()
    async all(): Promise<Quote[]> {
        return await this.quoteService.all();
    }

    // @Get('/:id/quote')
    // getQuoteById(@Param('id') id: number) {
    //     return this.quoteService.getQuoteById(id);
    // }

    // @Get('/user-upvoted-quotes')
    // getUserUpVotedQuotes(id: number) {
    //     return this.quoteService.userUpVotedQuotes(id);
    // }

    // @Get('/user-quotes')
    // getUserQuotes(id: number) {
    //     return this.quoteService.getUserQuotes(id);
    // }
    //
    // @Get('/most-upvoted')
    // getMostUpvotedQuotes() {
    //     return this.quoteService.mostUpvotedQuotes();
    // }



    @Post('/my-quote')
    postQuote(
        @Body() quoteCreateDto: QuoteCreateDto): Promise<any> {
        return this.quoteService.createQuote(quoteCreateDto);
    }

    // @UseGuards(AuthGuard)
    // @Get('/:id/upvote')
    // userQuoteUpVote(@Param('id') quoteId: number, id: number): Promise<User> {
    //     return this.quoteService.userQuoteUpVote(quoteId, id);
    // }

    // @Get('/:id/downvote')
    // userQuoteDownVote(@Param('id') quoteId: number, id: number): Promise<User> {
    //     return this.quoteService.userQuoteDownVote(quoteId, id);
    // }
}
