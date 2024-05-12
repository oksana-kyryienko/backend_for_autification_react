import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userData: { email: string; password: string }) {
    const { email, password } = userData;
    return await this.userService.createUser(email, password);
  }

  @Post('login')
  async loginUser(@Body() userData: { email: string; password: string }) {
    const { email, password } = userData;
    const user = await this.userService.findByEmailAndPassword(email, password);
    if (user) {
      return { message: 'User logged in successfully.' };
    } else {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
