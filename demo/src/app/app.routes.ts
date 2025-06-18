import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: 'demo', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: '**', redirectTo: '/demo' }
];
