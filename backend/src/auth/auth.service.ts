import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Pick<UserDocument, '_id' | 'firstName' | 'lastName' | 'email'>> {
    const user = await (await this.usersService.findByEmail(email)).toJSON();
    // TODO: save password hashes and compare hashed password instead
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user.email, sub: String(user._id) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
