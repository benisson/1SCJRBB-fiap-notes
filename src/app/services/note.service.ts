import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './@types/note';
import { environment } from '../../environments/environment';
import { NoteEvent } from './@types/note-event';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl: string;

  private actionSource = new Subject<NoteEvent>();
  actionProvider = this.actionSource.asObservable();

  private toEditSource = new Subject<NoteEvent>();
  toEditProvider = this.toEditSource.asObservable();



  constructor(private http: HttpClient) {
    this.apiUrl = environment.api;
  }

  notifyAction(noteEvent: NoteEvent)
  {
      this.actionSource.next(noteEvent);
  }

  notifyToEditAction(noteEvent: NoteEvent)
  {
      this.toEditSource.next(noteEvent);
  }

  getNotes(){
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  removeNote(noteId: number){
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
  }

  postNotes(text: string, id?:number)
  {
    if(id)
    {
      return this.http.put<Note>(`${this.apiUrl}/notes/${id}`, {text});
    }
    return this.http.post<Note>(`${this.apiUrl}/notes`, {text});
  }
  
}
