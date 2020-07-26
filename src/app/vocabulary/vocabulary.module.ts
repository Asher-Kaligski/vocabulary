import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../shared/material.module';
import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterComponent } from './components/letter/letter.component';
import { NewWordComponent } from './dialogs/new-word/new-word.component';
import { EditWordComponent } from './dialogs/edit-word/edit-word.component';

@NgModule({
  declarations: [LetterComponent, NewWordComponent, EditWordComponent],
  imports: [
    CommonModule,
    VocabularyRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
  ],
  exports: [LetterComponent],
  entryComponents: [NewWordComponent, EditWordComponent]
})
export class VocabularyModule {}
