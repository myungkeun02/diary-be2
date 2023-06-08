import { Controller, Get } from '@nestjs/common';
import { Post } from '../models/post.model';
import { User } from 'src/models/user.model';

@Controller('blog')
export class BlogController {
  @Get('myblog')
  async getPosts(): Promise<any[]> {
    const posts = await Post.findAll({
      attributes: ['title', 'createdAt', 'updatedAt'],
      include: { model: User, attributes: ['name'] },
    });

    return posts.map((post) => ({
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userName: post.user.username,
    }));
  }
}
