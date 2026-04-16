// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home';
import { BlogComponent } from './ui/pages/blog/blog';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: '**', redirectTo: '' }
];