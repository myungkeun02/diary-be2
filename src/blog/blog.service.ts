import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getPostsByUserId(user_id: number): Promise<any[]> {
    const posts = await this.postModel.findAll({
      where: { user_id },
      attributes: ['title', 'created_at', 'updated_at'],
      include: { model: User, attributes: ['username'] },
    });

    return posts.map((post) => ({
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userName: post.user.username,
    }));
  }
}
