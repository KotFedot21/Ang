// src/app/ui/pages/home/home.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService, Article } from '../../../services/article';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
    recentArticles: Article[] = [];

    constructor(
        private articleService: ArticleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.recentArticles = this.articleService.getArticles().slice(0, 2);
    }

    goToBlog(): void {
        this.router.navigate(['/blog']);
    }
}