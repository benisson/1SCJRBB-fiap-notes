import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/services/@types/note';
import { NoteEvent } from 'src/app/services/@types/note-event';
import { NoteService } from 'src/app/services/note.service';
import { NoteAction } from '../note/note-action.enum';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css'],
})
export class FormNoteComponent implements OnInit {
  title = 'FIAP NOTES';
  logoImage = '/assets/logo.png';
  checkoutForm!: FormGroup;
  noteEvent: NoteEvent = {} as NoteEvent;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService) 
  {
    this.initForm();

    this.noteService
        .toEditProvider
        .subscribe(noteEvent =>
        {
           this.noteEvent = noteEvent
           this.initForm(noteEvent?.note?.text);  
        })
        
  }


  private initForm(text?:string)
  {
    this.checkoutForm = this.formBuilder.group({
      textNote: [text || '', [Validators.required, Validators.minLength(5)]],
    });
  }


  ngOnInit(): void {}

  sendNote() 
  {
    if (this.checkoutForm.valid) {
      this.noteService.postNotes(this.checkoutForm.value.textNote, this.noteEvent?.note?.id).subscribe({
        next: (note) => this.handlerSendNote(note),
        error: (error) => this.handlerErrorSendNote(error)
      });
    }
  }

  private handlerSendNote(note: Note)
  {
    this.noteEvent = {} as NoteEvent;
    this.checkoutForm.reset();

    this.noteService.notifyAction({note:note, action: NoteAction.EDIT});
  }


  private handlerErrorSendNote(error:any)
  {
    this.noteEvent = {} as NoteEvent;

    alert("Algo errado na inserção! " + error);
  }

  get textNote() {
    return this.checkoutForm.get('textNote');
  }
}
