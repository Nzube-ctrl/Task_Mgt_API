import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            console.log(`Inside the authentication Guard!`)
            const request = context.switchToHttp().getRequest()
            // console.log(request.headers);
            const token = request.headers.authorization.split(' ')[1];
            console.log(token);

            if (!token) {
                throw new UnauthorizedException();
            }
            request.user = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            });
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }

        return true;
        // throw new UnauthorizedException();
        // return false;
    }
}