import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import styles from './styles/NotesPage.module.css'
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("http://localhost:8080/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
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
        <Row xs={1} md={2} lg={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note note={note} className={styles.note}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
