import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async login(data: LoginUserDto) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return { error: 'Email or password is incorrect' };
    }
    // Compare password
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { error: 'Email or password is incorrect' };
    }
    // Hide password in response
    const { password, ...userSafe } = user;
    return { user: userSafe };
  }

  async register(data: RegisterUserDto) {
    try {
      // Check if email exists
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing) {
        return { error: 'Email already exists' };
      }
      // Hash password
      const hashedPassword: string = await bcrypt.hash(data.password, 10);
      // Create user
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        },
      });
      // Hide password in response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userSafe } = user;
      return { user: userSafe };
    } catch (err) {
      if (err.code === 'P2002') {
        // Prisma unique constraint error
        return { error: 'Email already exists' };
      }
      return { error: 'Registration failed. Please try again.' };
    }
  }
}
