import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/post.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async writePost(
    title: string,
    content: string,
    userId: number,
  ): Promise<Post> {
    const post = await this.postModel.create({
      title: title,
      content: content,
      userId: userId,
    });
    return post;
  }
}
