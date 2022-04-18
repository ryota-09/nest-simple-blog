import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { format } from 'date-fns';

import * as admin from 'firebase-admin';
import { Article } from './entities/article.entity';

admin.initializeApp();
const firestore = admin.firestore();
const collectionRef = firestore.collection('articles');

@Injectable()
export class ArticlesService {
  async create(createArticleDto: CreateArticleDto) {
    const docRef = await collectionRef.add({
      title: createArticleDto.title,
      body: createArticleDto.body,
      date: format(new Date(), 'yyyy-MM-dd HH:mm'),
    });
    const snapshot = await docRef.get();
    const newArticle = {
      id: docRef,
      ...snapshot.data(),
    };
    return newArticle;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const articleList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return articleList;
  }

  async findOne(id: string) {
    const snapshot = await collectionRef.get();
    const articleList: Array<Article> = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as { title: string; body: string; date: string }),
      };
    });
    let targetArticle: Article = null;
    for (const article of articleList) {
      if (article.id === id) {
        targetArticle = {
          id: article.id,
          title: article.title,
          body: article.body,
          date: article.date,
        };
      }
    }
    return targetArticle;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const docRef = await firestore.collection('articles');
    const targetDoc = await docRef.doc(id);
    await targetDoc.update({
      title: updateArticleDto.title,
      body: updateArticleDto.body,
      date: format(new Date(), 'yyyy-MM-dd HH:mm'),
    });
    const snapshot = await targetDoc.get();
    const updatedArticle = {
      id: docRef,
      ...snapshot.data(),
    };
    return updatedArticle;
  }

  async remove(id: string) {
    const docRef = await firestore.collection('articles');
    const targetDoc = await docRef.doc(id);
    await targetDoc.delete();
    const snapshot = await targetDoc.get();
    const deleteArticle = {
      id: docRef,
      ...snapshot.data(),
    };
    return deleteArticle;
  }
}
