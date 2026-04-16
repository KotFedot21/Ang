// src/app/models/article.model.ts
export interface Article {
    id: number;
    title: string;
    content: string;
    date: string;
    createdAt?: string;
    imageUrl?: string;
}