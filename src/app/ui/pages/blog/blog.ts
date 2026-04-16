// src/app/ui/pages/blog/blog.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleCardComponent } from '../../components/article-card/article-card';
import { StatsService } from '../../../services/stats';
import { Article } from '../../../models/article.model';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, FormsModule, ArticleCardComponent],
    templateUrl: './blog.html',
    styleUrls: ['./blog.scss']
})
export class BlogComponent implements OnInit, AfterViewInit {
    articles: Article[] = [];
    showForm = false;
    newArticle = { title: '', content: '' };
    currentDisplayCount = 7;
    readonly INITIAL_POSTS = 7;
    readonly POSTS_PER_LOAD = 3;
    private readonly STORAGE_KEY = 'blog_articles';

    constructor(private statsService: StatsService) {}

    ngOnInit(): void {
        this.loadArticles();
    }

    ngAfterViewInit(): void {
        this.initSidebarButtons();
    }

    private loadArticles(): void {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.articles = JSON.parse(saved);
        } else {
            this.addMockData();
        }
    }

    private saveArticles(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.articles));
    }

    private addMockData(): void {
        const now = new Date();
        this.articles = [
            {
                id: 1,
                title: 'Основы веб-разработки',
                content: 'Введение в веб-разработку. Изучаем HTML, CSS и основы создания сайтов.',
                date: 'Опубликовано: 1 марта 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            },
            {
                id: 2,
                title: 'Продвинутый CSS',
                content: 'Глубокое погружение в CSS. Flexbox, Grid, анимации и адаптивный дизайн.',
                date: 'Опубликовано: 10 марта 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            },
            {
                id: 3,
                title: 'JavaScript для начинающих',
                content: 'Основы JavaScript: переменные, функции, события и работа с DOM.',
                date: 'Опубликовано: 20 марта 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            },
            {
                id: 4,
                title: 'React для начинающих',
                content: 'Введение в React: компоненты, состояние и пропсы.',
                date: 'Опубликовано: 5 апреля 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            },
            {
                id: 5,
                title: 'TypeScript: основы',
                content: 'Изучаем типы, интерфейсы и преимущества TypeScript.',
                date: 'Опубликовано: 12 апреля 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            },
            {
                id: 6,
                title: 'Node.js и Express',
                content: 'Создание серверных приложений на Node.js.',
                date: 'Опубликовано: 20 апреля 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            },
            {
                id: 7,
                title: 'MongoDB для разработчиков',
                content: 'Работа с NoSQL базами данных MongoDB.',
                date: 'Опубликовано: 1 мая 2025',
                createdAt: now.toISOString(),
                imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
            }
        ];
        this.saveArticles();
    }

    addArticle(): void {
        if (!this.newArticle.title.trim() || !this.newArticle.content.trim()) {
            alert('Пожалуйста, заполните заголовок и текст статьи');
            return;
        }

        const now = new Date();
        const dateStr = `Опубликовано: ${now.getDate()} ${this.getMonthName(now.getMonth())} ${now.getFullYear()}`;
        
        const newArticle: Article = {
            id: Date.now(),
            title: this.newArticle.title.trim(),
            content: this.newArticle.content.trim(),
            date: dateStr,
            createdAt: now.toISOString(),
            imageUrl: 'assets/images/ea2d1b6afe5408fad4c7e9efc468ec520d055669.png'
        };
        
        this.articles.unshift(newArticle);
        this.saveArticles();
        this.newArticle = { title: '', content: '' };
        this.showForm = false;
    }

    deleteArticle(id: number): void {
        if (confirm('Вы уверены, что хотите удалить эту статью?')) {
            const index = this.articles.findIndex(article => article.id === id);
            if (index !== -1) {
                this.articles.splice(index, 1);
                this.saveArticles();
                if (this.currentDisplayCount > this.articles.length) {
                    this.currentDisplayCount = this.articles.length;
                }
                alert('Статья успешно удалена!');
            }
        }
    }

    get hasArticles(): boolean {
        return this.articles.length > 0;
    }

    get hasMoreArticles(): boolean {
        return this.currentDisplayCount < this.articles.length;
    }

    get displayedArticles(): Article[] {
        return this.articles.slice(0, this.currentDisplayCount);
    }

    loadMore(): void {
        if (this.currentDisplayCount < this.articles.length) {
            this.currentDisplayCount = Math.min(
                this.currentDisplayCount + this.POSTS_PER_LOAD,
                this.articles.length
            );
        }
    }

    toggleForm(): void {
        this.showForm = !this.showForm;
        if (!this.showForm) {
            this.newArticle = { title: '', content: '' };
        }
    }

    openPostDialog(): void {
        this.showForm = true;
        setTimeout(() => {
            const formElement = document.querySelector('.post-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }

    viewArticle(id: number): void {
        console.log('View article:', id);
    }

    private initSidebarButtons(): void {
        setTimeout(() => {
            const createBtn = document.getElementById('createPostBtn');
            const statsBtn = document.getElementById('statsBtn');

            if (createBtn) {
                const newCreateBtn = createBtn.cloneNode(true);
                createBtn.parentNode?.replaceChild(newCreateBtn, createBtn);
                newCreateBtn.addEventListener('click', () => this.openPostDialog());
            }
            if (statsBtn) {
                const newStatsBtn = statsBtn.cloneNode(true);
                statsBtn.parentNode?.replaceChild(newStatsBtn, statsBtn);
                newStatsBtn.addEventListener('click', () => this.statsService.showStats());
            }
        }, 100);
    }

    private getMonthName(month: number): string {
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return months[month];
    }
}