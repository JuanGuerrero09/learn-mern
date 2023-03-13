import { useState, useEffect } from "react";
import * as NoteApi from './network/notes_api'
import { Container } from "react-bootstrap";
import LogInModal from "./components/LogInModal";
import NavBar from "./components/NavBar";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import styles from "./styles/NotesPage.module.css";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser();

  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLogInClicked={() => setShowLogInModal(true)}
        onLogOutSuccessful={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />
      <Container className={styles.notesPage}>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </Container>
        {showLogInModal && (
          <LogInModal onDismiss={() => setShowLogInModal(false)} onLogInSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLogInModal(false)
          }} />
        )}
        {showSignUpModal && (
          <SignUpModal onDismiss={() => setShowSignUpModal(false)} onSignUpSuccessful={(user) => {
            setLoggedInUser(user)
            setShowSignUpModal(false)
        }} />
        )}
    </>
  );
}

export default App;
