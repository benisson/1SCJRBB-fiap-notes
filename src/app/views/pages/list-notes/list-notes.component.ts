import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteEvent } from 'src/app/services/@types/note-event';
import { NoteService } from 'src/app/services/note.service';
import { NoteAction } from '../note/note-action.enum';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css'],
})
export class ListNotesComponent implements OnInit {
  title = 'Titulo da nota';
  notes = [] as Note[];

  subscription: Subscription;

  constructor(private noteService: NoteService) {
    this.subscription = this.noteService.actionProvider.subscribe({
      next: (noteEvent: NoteEvent) => {

        if(noteEvent.action === NoteAction.ADD)
        {
          this.notes.push(noteEvent.note);
        }
        else if(noteEvent.action === NoteAction.EDIT)
        {
          this.getApiNotes();
        }
      },
      error: () => {}
    });
  }

  //método do cliclo de vida do componente
  ngOnInit(): void {
    this.getApiNotes();
  }

  getApiNotes(){
    this.noteService.getNotes().subscribe({
      next: (apiNotes) => this.notes = apiNotes,
      error: (error) => console.error(error),
      // complete: () => alert("Deu tudo certo")
    });
  }


  handlerAction(noteAction: number, note: Note)
  {
      switch(noteAction)
      {
         case NoteAction.DELETE:
         {
            this.removeNote(note.id);
            break;
         }
         case NoteAction.EDIT:
         {
            this.changeNote(note);
            break;
         }
         case NoteAction.ADD:
         {
            this.notes.push(note);
            break;
         }          
      }
  }

  removeNote(noteId: number){
    this.noteService.removeNote(noteId).subscribe(
      () => this.notes = this.notes.filter(note => note.id !== noteId)
    );
  }

  changeNote(note:Note)
  {
    this.noteService.notifyToEditAction({note: note, action: NoteAction.EDIT});
  }

}
