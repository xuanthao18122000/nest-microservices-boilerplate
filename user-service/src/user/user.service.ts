import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/schema';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepo: Repository<User>,
  ){}
  
  async getAll() {
    return await this.userRepo.find();
  }
}
