import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddNoteDialog from "../components/AddEditNoteDialog";
import Note from "../components/Note";
import { Note as NoteModel } from "../models/note";
import * as NoteApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";

export default function NotesPageLoggedInView() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NoteApi.deleteNote(note._id);
      setNotes(notes.filter((existingNotes) => existingNotes._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const noteGrid = (
    <Row xs={1} md={2} lg={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            onDeleteNoteClick={deleteNote}
            onNoteClicked={setNoteToEdit}
            note={note}
            className={styles.note}
          />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
    <Button
          className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
          onClick={() => setShowAddNote(true)}
        >
          <FaPlus /> Add new note
        </Button>

        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && (
          <p>Something went wrong, please refresh the page</p>
        )}
        {!notesLoading && !showNotesLoadingError && (
          <>{notes.length === 0 ? <p>Please add some notes</p> : noteGrid}</>
        )}

        {showAddNote && (
          <AddNoteDialog
            onDismiss={() => setShowAddNote(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setShowAddNote(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNoteToEdit(null);
              setNotes(
                notes.map((note) =>
                  note._id === updatedNote._id ? updatedNote : note
                )
              );
            }}
          />
        )}
    </>
  )
}
