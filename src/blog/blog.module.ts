import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
