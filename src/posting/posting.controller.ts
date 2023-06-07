import { Body, Controller, Post } from '@nestjs/common';
import { PostingService } from './posting.service';

@Controller('posting')
export class PostingController {
  constructor(private postingService: PostingService) {}

  @Post('write')
  async write(@Body('title') title: string, @Body('content') content: string) {
    try {
      const save = await this.postingService.writePost(title, content);
      if (save) {
        return { message: '저장완료' };
      } else {
        return { message: '저장실패' };
      }
    } catch (error) {
      return { message: '저장실패' };
    }
  }
}
