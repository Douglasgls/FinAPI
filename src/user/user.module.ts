import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../user/user.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/implantation/userRepository';
import { CategoryModule } from 'src/category/category.module';
import { categoryRepository } from 'src/category/repository/implantation/category';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CategoryModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
