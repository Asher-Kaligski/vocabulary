import { HttpClient } from '@angular/common/http';
import { CrudService } from 'app/core/services/crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentReplyService extends CrudService {
  endpoint = 'comment-replies';
  constructor(http: HttpClient) {
    super(http);
  }
  async create(form) {
    return this.post(form);
  }
}
