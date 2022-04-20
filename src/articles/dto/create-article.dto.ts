export class CreateArticleDto {
  h1tag: string;
  body: Array<{ h2tag: string; text: string }>;
  imgPath: string;
  category: string;
}
