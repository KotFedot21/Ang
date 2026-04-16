// src/app/services/stats.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    private storageKey = 'blog_articles';

    showStats(): void {
        // Получаем статьи из localStorage
        const saved = localStorage.getItem(this.storageKey);
        const articles = saved ? JSON.parse(saved) : [];
        const totalPosts = articles.length;
        const totalComments = Math.floor(Math.random() * 100);

        // Удаляем старый диалог, если есть
        const existingOverlay = document.getElementById('statsOverlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Создаем диалог
        const overlay = document.createElement('div');
        overlay.id = 'statsOverlay';
        overlay.className = 'stats-overlay';
        
        overlay.innerHTML = `
            <div class="stats-dialog">
                <div class="stats-header">
                    <h3 class="stats-title">Статистика страницы</h3>
                </div>
                <div class="stats-content">
                    <div class="stat-card">
                        <div class="stat-label">Количество статей</div>
                        <div class="stat-value">${totalPosts}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Количество комментариев</div>
                        <div class="stat-value">${totalComments}</div>
                    </div>
                </div>
                <div class="stats-footer">
                    <button class="stats-close-btn" id="closeStatsBtn">Закрыть</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Закрытие по клику на оверлей
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
}