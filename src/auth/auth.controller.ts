import { Controller, Post, Body, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { RegisterDto } from '../Dto/auth.register.dto';
import { LoginDto } from '../Dto/auth.login.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: `Register a user` })
    @ApiCreatedResponse({ description: 'User registered successfully!' })
    async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<{ message: string; user: Partial<User> }> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: `Login a user` })
    @ApiOkResponse({ description: 'User logged in successfully!' })
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ message: string; user: Partial<User>; token: string }> {
        return this.authService.login(loginDto);
    }
}
