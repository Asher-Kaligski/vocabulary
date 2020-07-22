import { LetterBComponent } from './components/letter-b/letter-b.component';
import { LetterComponent } from './components/letter/letter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'letter-a', component: LetterComponent },
{path: 'letter-b', component: LetterBComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocabularyRoutingModule {}
