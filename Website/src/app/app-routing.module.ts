import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

const routes: Routes = [
  { path: 'header', component: AppHeaderComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'form', component: FormComponent },
  { path: '', redirectTo: '/contact', pathMatch: 'full' },
  { path: '**', component: ContactPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }