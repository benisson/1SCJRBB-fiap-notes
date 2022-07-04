import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../../../services/@types/note';
import { NoteAction } from './note-action.enum';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {


  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  action = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  confirmRemove(){
    if(confirm("Deseja realmente apagar?"))
      this.action.emit(NoteAction.DELETE);
  }

  edit(note: Note)
  {
    this.action.emit(NoteAction.EDIT);
  }

}
