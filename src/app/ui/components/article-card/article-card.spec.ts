// src/app/ui/components/article-card/article-card.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Article {
    id: number;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
}

@Component({
    selector: 'app-article-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './article-card.html',
    styleUrls: ['./article-card.scss']
})
export class ArticleCardComponent {
    @Input() article!: Article;
    @Input() isFeatured: boolean = false;
    @Output() deleteArticle = new EventEmitter<number>();
    @Output() viewArticle = new EventEmitter<number>();

    onDelete(event: Event): void {
        event.stopPropagation();
        this.deleteArticle.emit(this.article.id);
    }

    onView(): void {
        this.viewArticle.emit(this.article.id);
    }
}