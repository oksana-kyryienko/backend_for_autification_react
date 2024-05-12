import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    return user || null;
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.userRepository.findOne({});
      return true;
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      return false;
    }
  }
}
