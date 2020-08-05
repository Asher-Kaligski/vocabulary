import { HttpClient } from '@angular/common/http';
import { CrudService } from 'app/core/services/crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends CrudService {
  endpoint = 'comments';
  constructor(http: HttpClient) {
    super(http);
  }

  async getAll() {
    return this.get();
  }

  async create(body) {
    return this.post(body);
  }

  async update(body, commentId) {
    return this.putById(body, commentId);
  }

  async delete(commentId) {
    return this.deleteById(commentId);
  }

  async addReply(body, commentId) {
    return this.postById(body, commentId);
  }

  async deleteReply(commentId: any, replyId: any) {
    return this.deleteById(commentId + '/replyId/' + replyId);
  }

  async updateReply(obj, commentId: any, replyId: any) {
    return this.patchById(obj, commentId + '/replyId/' + replyId);
  }
}
