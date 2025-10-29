import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.usersService.register(registerUserDto);
    if (result.error) {
      throw new BadRequestException(result.error);
    }
    return { message: 'User registered successfully', user: result.user };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.login(loginUserDto);
    if (result.error) {
      throw new BadRequestException(result.error);
    }
    return { message: 'Login successful', user: result.user };
  }
}
