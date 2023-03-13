import React from 'react'
import { User } from '../models/user'
import * as NoteApi from '../network/notes_api'
import { Navbar, Button } from 'react-bootstrap'

interface NavBarLoggedInViewProps {
    user: User,
    onLogOutSuccessful: () => void
}

export default function NavBarLoggedInView({user, onLogOutSuccessful}:NavBarLoggedInViewProps) {

    async function logOut() {
        try {
            await NoteApi.logOut()
            onLogOutSuccessful()
        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <>
        <Navbar.Text className='me-2'>
            Sign in as {user.username}
        </Navbar.Text>
        <Button onClick={logOut}>
            Log Out
        </Button>
    </>
  )
}
