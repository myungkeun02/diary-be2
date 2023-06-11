import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get(':user_id')
  @UseGuards(JwtAuthGuard)
  async getPostsByUserId(@Param('user_id') userid: number): Promise<any[]> {
    return this.blogService.getPostsByUserId(userid);
  }
}
