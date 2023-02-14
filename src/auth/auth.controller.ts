import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common'
  import { GetCurrentUser } from 'src/decorators/get-current-user.decorator'
  import { GetCurrentUserId } from 'src/decorators/get-current-user-id.decorator'
  import { Public } from 'src/decorators/public.decorator'
  import { User } from 'src/modules/user/user.entity'
  import { Request, Response } from 'express'
  import { RequestWithUser } from 'src/interfaces/auth.interface'
  import { UserData } from 'src/interfaces/user.interface'
  
  import { AuthService } from './auth.service'
  import { SignUpDto } from './dto/signup.dto'
  import { JwtAuthGuard } from './guards/jwt.guard'
  import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard'
  import { LocalAuthGuard } from './guards/local-auth.guard'
  
  @Controller('auth')
  @UseInterceptors(ClassSerializerInterceptor)
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: SignUpDto): Promise<User> {
      return this.authService.register(body)
    }
  
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
      return this.authService.login(req.user, res)
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('signout')
    @HttpCode(HttpStatus.OK)
    async signout(@GetCurrentUserId() userId: string, @Res() res: Response): Promise<void> {
      return this.authService.signout(userId, res)
    }
  
    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.ACCEPTED)
    async refreshTokens(@Req() req: Request): Promise<User> {
      return this.authService.refreshTokens(req)
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getCurrentUser(@GetCurrentUser() user: User): Promise<UserData> {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        }
    }
  }
