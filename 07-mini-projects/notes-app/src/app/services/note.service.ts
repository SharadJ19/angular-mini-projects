import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly STORAGE_KEY = 'notes';
  private notes: Note[] = [];

  constructor() {
    this.loadNotes();
  }

  getNotes(): Note[] {
    return this.notes;
  }

  addNote(title: string, content: string): void {
    const note: Note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date()
    };

    this.notes.unshift(note);
    this.saveNotes();
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveNotes();
  }

  private saveNotes(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes));
  }

  private loadNotes(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.notes = data ? JSON.parse(data) : [];
  }
}
