import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  title = '';
  content = '';
  author = '';

  constructor(private blogService: BlogService) {}

  get blogs(): BlogPost[] {
    return this.blogService.getBlogs();
  }

  addBlog(): void {
    if (!this.title.trim() || !this.content.trim() || !this.author.trim()) {
      return;
    }

    this.blogService.addBlog(this.title, this.content, this.author);

    this.title = '';
    this.content = '';
    this.author = '';
  }

  delete(blog: BlogPost): void {
    this.blogService.deleteBlog(blog.id);
  }
}
