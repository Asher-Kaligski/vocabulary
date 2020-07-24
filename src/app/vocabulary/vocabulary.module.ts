import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterComponent } from './components/letter/letter.component';

@NgModule({
  declarations: [LetterComponent],
  imports: [CommonModule, VocabularyRoutingModule],
  exports: [LetterComponent],
})
export class VocabularyModule {}
