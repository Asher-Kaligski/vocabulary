import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'app/core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class LetterService extends CrudService {
  endpoint = 'letters';
  constructor(http: HttpClient) {
    super(http);
  }

  async getLettersNames() {
    return this.getById('/names');
  }

  getByName(letterName) {
    return this.getById('/?letter=' + letterName);
  }
}
