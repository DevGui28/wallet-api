import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'
import { PrismaUserRepository } from '../user/infra/database/prisma/prisma-user.repository'
import { UserController } from '../user/infra/http/controllers/users.controller'
import { UserRepository } from '../user/repositories/user.repository'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { GetUserUseCase } from './use-cases/get-user.use-case'
import { UpdateUserUseCase } from './use-cases/update-user.use-case'

@Module({
  controllers: [UserController],
  imports: [AuthModule, ConfigModule.forRoot()],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ]
})
export class UserModule {}
