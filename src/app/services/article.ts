import { Injectable } from '@angular/core';

export interface Article {
    id: number;
    title: string;
    content: string;
    date: string;
    createdAt: string;
    imageUrl?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private storageKey = 'blog_articles';
    private articles: Article[] = [];

    constructor() {
        this.loadFromLocalStorage();
        if (this.articles.length === 0) {
            this.addMockData();
        }
    }

    private loadFromLocalStorage(): void {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.articles = JSON.parse(saved);
            }
        }
    }

    private saveToLocalStorage(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.storageKey, JSON.stringify(this.articles));
        }
    }

    private addMockData(): void {
        const mockData = [
            { title: 'Основы веб-разработки', content: 'Введение в веб-разработку...', date: 'Опубликовано: 1 марта 2025' },
            { title: 'Продвинутый CSS', content: 'Глубокое погружение в CSS...', date: 'Опубликовано: 10 марта 2025' },
            { title: 'JavaScript для начинающих', content: 'Основы JavaScript...', date: 'Опубликовано: 20 марта 2025' },
        ];
        
        mockData.forEach(post => {
            this.articles.push({
                id: Date.now() + Math.random(),
                title: post.title,
                content: post.content,
                date: post.date,
                createdAt: new Date().toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            });
        });
        this.saveToLocalStorage();
    }

    getArticles(): Article[] {
        return [...this.articles];
    }

    getArticlesCount(): number {
        return this.articles.length;
    }

    getArticleById(id: number): Article | undefined {
        return this.articles.find(a => a.id === id);
    }

    addArticle(article: Omit<Article, 'id' | 'createdAt'>): Article {
        const newArticle: Article = {
            ...article,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            imageUrl: article.imageUrl || 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
        };
        this.articles.unshift(newArticle);
        this.saveToLocalStorage();
        return newArticle;
    }

    deleteArticle(id: number): boolean {
        const index = this.articles.findIndex(article => article.id === id);
        
        if (index !== -1) {
            this.articles.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    updateArticle(id: number, updates: Partial<Article>): Article | null {
        const index = this.articles.findIndex(a => a.id === id);
        if (index !== -1) {
            this.articles[index] = { ...this.articles[index], ...updates };
            this.saveToLocalStorage();
            return this.articles[index];
        }
        return null;
    }
}