import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get(':useri_d')
  async getPostsByUserId(@Param('user_id') user_id: number): Promise<any[]> {
    return this.blogService.getPostsByUserId(user_id);
  }
}
