import { Injectable, ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt';

import { CreateUserDto } from '@/user/infra/http/dtos/create-user.dto';
import { UserRepository } from '@/user/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDto) {
    const emailAlreadyInUse = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyInUse) {
      throw new ConflictException('Email already in use.');
    }

    const hashedPassword = await hash(data.password, 10);

    await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}
