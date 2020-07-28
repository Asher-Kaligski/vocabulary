import { HttpClient } from '@angular/common/http';
import { CrudService } from 'app/core/services/crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends CrudService {
  create(value: any) {
    throw new Error("Method not implemented.");
  }
  endpoint = 'letters';
  constructor(http: HttpClient) {
    super(http);
  }
}
