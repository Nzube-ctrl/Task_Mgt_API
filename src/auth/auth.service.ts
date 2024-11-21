import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../Dto/auth.login.dto';
import { RegisterDto } from '../Dto/auth.register.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } })
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async generateToken(user: User): Promise<string> {
        return this.jwtService.sign({ userId: user.id, email: user.email })
    }

    async register(registerDto: RegisterDto): Promise<{ message: string; user: Partial<User> }> {
        const existingUser = await User.findOne({ where: { email: registerDto.email } })
        if (existingUser) {
            throw new UnauthorizedException(`User with email exists already!`)
        }
        const hashedPassword = await this.hashPassword(registerDto.password);
        const newUser = (await User.create({ ...registerDto, password: hashedPassword })).save();
        const { password, ...userWithoutPassword } = (await newUser).toJSON()
        return {
            message: `User registered successfully!`,
            user: userWithoutPassword,
        }
    }

    async login(loginDto: LoginDto): Promise<{ message: string; user: Partial<User>; token: string }> {
        const user = await User.findOne({ where: { email: loginDto.email } })
        if (!user) {
            throw new UnauthorizedException(`Invalid credentials!`)
        }
        const isPasswordValid = bcrypt.compare(loginDto.password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException(`Invalid email or password`)
        }
        const payload = { id: user.id, email: user.email }
        const token = this.jwtService.sign(payload);
        const { password, ...userWithoutPassword } = user.toJSON();
        return {
            message: `Login Successful!`,
            user: userWithoutPassword,
            token
        }
    }
}
