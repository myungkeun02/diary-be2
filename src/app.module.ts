import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PostingController } from './posting/posting.controller';
import { PostingModule } from './posting/posting.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
@Module({
  imports: [
    UserModule,
    PostingModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'audrms',
      password: 'yss00407209',
      database: 'diary',
      models: [user, post],
    }),
  ],
  controllers: [AppController, UserController, PostingController],
  providers: [AppService, UserService],
})
export class AppModule {}
