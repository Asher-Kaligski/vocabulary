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

  async approveAll(letterId) {
    return this.patchById({}, 'approve-all/' + letterId);
  }

  async getLettersNames() {
    return this.getById('names');
  }

  async getByName(letterName) {
    return this.getById('?letter=' + letterName);
  }

  async getAll() {
    return this.get();
  }

  async createOrUpdateWord(letterId: number, form: any) {
    return this.patchById(form, letterId);
  }

  async deleteWord(letterId: number, wordId: any) {
    return this.deleteById(letterId + '/wordId/' + wordId);
  }
}
