import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import * as admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();
const collectionRef = firestore.collection('articles');

@Injectable()
export class ArticlesService {
  async create(createArticleDto: CreateArticleDto) {
    const res = await firestore.collection('cities').add({
      name: 'Tokyo',
      country: 'Japan',
    });
    return res;
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
