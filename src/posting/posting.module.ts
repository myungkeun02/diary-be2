import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';

@Module({
  providers: [PostingService]
})
export class PostingModule {}
