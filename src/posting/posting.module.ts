import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/models/post.model';
import { PostingController } from './posting.controller';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
