import { 
    Controller,
     Get, 
     Post, 
     Body, 
     Patch, 
     Param, 
     Delete, 
     UseInterceptors,
     ClassSerializerInterceptor
  } from '@nestjs/common';
  import { QuoteService } from './quote.service';
  import { QuoteCreateDto } from './dto/quote-create.dto';
  import { QuoteUpdateDto } from './dto/quote-update.dto';
  import { User } from '../user/user.entity';
  
  @Controller('quotes')
  @UseInterceptors(ClassSerializerInterceptor)
  export class QuoteController {
    constructor(private readonly quoteService: QuoteService) {}
  
    @Post()
    async create(@Body() quoteCreateDto: QuoteCreateDto) {
      return this.quoteService.create(quoteCreateDto);
    }
  
    @Get()
    async findAll() {
      return this.quoteService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') quoteId: number, userData: User) {
      return this.quoteService.findById(quoteId, userData);
    }
  
    @Patch(':id')
    async update(@Param('id') id: number, @Body() quoteUpdateDto: QuoteUpdateDto) {
      return this.quoteService.update(id, quoteUpdateDto);
    }
  
  }