import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePassword, generateJWT } from '../utils/utils';
import { ConfigService } from '@nestjs/config';
import { AuthTokenDto } from './dto/auth.dto';
import { AllMethods } from 'supertest/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUserEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const password = comparePassword(pass, user.password_hash);

    if (!password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };

    const access_token = await generateJWT(payload);

    return { access_token };
  }

  async refreshToken(
    userToken: AuthTokenDto,
  ): Promise<{ refresh_token: string }> {
    const access_token = userToken.access_token;

    const payload: { email: string; username: string; id: string } =
      await this.jwtService.verifyAsync(access_token, {
        secret: this.configService.get<string>('JWT_SECRET'),
        ignoreExpiration: false,
      });

    if (!payload) {
      throw new UnauthorizedException();
    }

    this.usersService.findByUserEmail(payload.email);

    const newPayload = { id: payload.id };

    const newAccess_token = await generateJWT(newPayload);

    return { refresh_token: newAccess_token };
  }

  // async validateUser(id:string): Promise<any> {
  //   const user = await this.usersService.findOneById(id);
    
  //   if (!user) {
  //     return null;
  //   }

  //   return user;
  // }
}
