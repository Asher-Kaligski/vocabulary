import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterComponent } from './components/letter/letter.component';
import { LetterBComponent } from './components/letter-b/letter-b.component';

@NgModule({
  declarations: [LetterComponent, LetterBComponent],
  imports: [CommonModule, VocabularyRoutingModule],
  exports: [LetterComponent],
})
export class VocabularyModule {}
