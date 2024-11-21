import { Controller, Post, Body, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { RegisterDto } from '../Dto/auth.register.dto';
import { LoginDto } from '../Dto/auth.login.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<{ message: string; user: Partial<User> }> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ message: string; user: Partial<User>; token: string }> {
        return this.authService.login(loginDto);
    }
}
