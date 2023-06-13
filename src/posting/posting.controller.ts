import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostingService } from './posting.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('posting')
export class PostingController {
  constructor(private postingService: PostingService) {}

  @Post('write')
  @UseGuards(JwtAuthGuard)
  async write(
    @Req() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const username = req.username;

    try {
      const save = await this.postingService.writePost(title, content);
      console.log(save);
      if (save) {
        return { message: '저장완료' };
      } else {
        return { message: '저장실패' };
      }
    } catch (error) {
      console.log(error);
      return { message: '저장실패' };
    }
  }
}
//1. 가드 생성 2. 가드를 통해서 user_id 받기 3. 받은 user_id를 writepost에 넘겨주면됨
