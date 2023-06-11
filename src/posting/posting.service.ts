import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/post.model';

@Injectable()
export class PostingService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async writePost(title: string, content: string): Promise<Post> {
    // try {
    const post = await this.postModel.create({
      title: title,
      content: content,
    });
    return post;
    // } catch (error) {
    //   throw new Error('게시물 작성에 실패했습니다.');
    // }
  }
}
