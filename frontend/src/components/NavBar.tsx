import React from 'react'
import { User } from '../models/user'
import { Navbar, Container, NavbarBrand, Nav } from 'react-bootstrap'
import StyleUtils from '../styles/utils.module.css'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import NavBarLoggedInView from './NavBarLoggedInView'
import NavBarLoggedOutView from './NavBarLoggedOutView'

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogOutSuccessful: () => void,
}

export default function NavBar({loggedInUser, onLogInClicked, onLogOutSuccessful, onSignUpClicked}:NavBarProps) {
  return (
    <Navbar bg='primary' variant='dark' expand='lg' sticky='top' className={StyleUtils.width100}>
        <Container>
            <NavbarBrand>
                My notes
            </NavbarBrand>
            <NavbarToggle aria-controls='main-navbar'/>
            <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link >
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccessful={onLogOutSuccessful} />
                            : <NavBarLoggedOutView onLogInClicked={onLogInClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar> 
  )
}
