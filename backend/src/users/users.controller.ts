import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getCurrentProfile(
    @Req() req,
  ): Promise<Pick<UserDocument, 'firstName' | 'lastName'>> {
    const currentUser: UserDocument = req.user;

    return {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };
  }
}
