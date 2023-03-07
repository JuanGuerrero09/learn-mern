import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import Note from "./components/Note";
import * as NoteApi from './network/notes_api'
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        // alert(error)
      }
    }
    loadNotes();
  }, []);

  return (
    <div>
      <Container>
        <Button className={`mb-4 ${styleUtils.blockCenter}`} onClick={() => setShowAddNote(true)}>Add new note</Button>
        <Row xs={1} md={2} lg={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note note={note} className={styles.note}/>
            </Col>
          ))}
        </Row>
        {
          showAddNote && <AddNoteDialog onDismiss={() => setShowAddNote(false)} onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNote(false)
          }}/>
        }
      </Container> 
    </div>
  );
}

export default App;
