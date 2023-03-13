import React from 'react'
import { User } from '../models/user'
import * as NoteApi from '../network/notes_api'
import { Navbar, Button } from 'react-bootstrap'

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLogInClicked: () => void
}

export default function NavBarLoggedOutView({onLogInClicked, onSignUpClicked}:NavBarLoggedOutViewProps) {
    
  return (
    <>
        <Button onClick={onSignUpClicked}>
            Sign Up
        </Button>
        <Button onClick={onLogInClicked}>
            Log In
        </Button>
    </>
  )
}
