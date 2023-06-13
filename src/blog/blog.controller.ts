import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('blog')
  @UseGuards(JwtAuthGuard)
  async getPostsByUserId(@Req() req: any): Promise<any[]> {
    const id = req.user.id;
    console.log(id);

    return this.blogService.getPostsByUserId(id);
  }
}
