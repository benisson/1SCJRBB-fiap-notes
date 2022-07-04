import { NoteAction } from "../../views/pages/note/note-action.enum";
import { Note } from "./note";

export interface NoteEvent
{
     action:NoteAction,
     note: Note
}