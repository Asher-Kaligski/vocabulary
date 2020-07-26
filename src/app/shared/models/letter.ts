import { Comment } from './comment';
import { Word } from './word';
export interface Letter {
  _id: string;
  letterId: number;
  name: string;
  title: string;
  words: Word[] | null;
  comments: Comment[] | null;
  createAt: Date;
  updateAt: Date;
}
