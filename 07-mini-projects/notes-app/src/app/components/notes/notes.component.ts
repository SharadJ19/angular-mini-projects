import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  title = '';
  content = '';

  constructor(private noteService: NoteService) {}

  get notes(): Note[] {
    return this.noteService.getNotes();
  }

  addNote(): void {
    if (!this.title.trim() || !this.content.trim()) return;

    this.noteService.addNote(this.title, this.content);
    this.title = '';
    this.content = '';
  }

  delete(note: Note): void {
    this.noteService.deleteNote(note.id);
  }
}
