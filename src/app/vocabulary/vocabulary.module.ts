import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { LetterComponent } from './components/letter/letter.component';
import { EditWordComponent } from './dialogs/edit-word/edit-word.component';
import { VocabularyRoutingModule } from './vocabulary-routing.module';

@NgModule({
  declarations: [LetterComponent, EditWordComponent],
  imports: [
    CommonModule,
    VocabularyRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    TextFieldModule,
  ],
  exports: [LetterComponent],
  entryComponents: [ EditWordComponent],
})
export class VocabularyModule {}
