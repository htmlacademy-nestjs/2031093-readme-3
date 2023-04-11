import { Injectable, ConflictException } from '@nestjs/common';
import dayjs from 'dayjs';

import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, firstname, lastname, password, dateRegistered} = dto;

    const blogUser = {
      email,
      firstname,
      lastname,
      passwordHash: '',
      avatar: '',
      dateRegistered: dayjs(dateRegistered).toDate(),
    };

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.create(userEntity);
  }
}
