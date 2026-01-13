import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly STORAGE_KEY = 'blogs';
  private blogs: BlogPost[] = [];

  constructor() {
    this.loadBlogs();
  }

  getBlogs(): BlogPost[] {
    return this.blogs;
  }

  addBlog(title: string, content: string, author: string): void {
    const blog: BlogPost = {
      id: Date.now(),
      title,
      content,
      author,
      createdAt: new Date()
    };

    this.blogs.unshift(blog);
    this.saveBlogs();
  }

  deleteBlog(id: number): void {
    this.blogs = this.blogs.filter(b => b.id !== id);
    this.saveBlogs();
  }

  private saveBlogs(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.blogs));
  }

  private loadBlogs(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.blogs = data ? JSON.parse(data) : [];
  }
}
