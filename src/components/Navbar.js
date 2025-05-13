import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import logo from './assets/logo.png';
const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src={logo}
                        alt="Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                    />
                    Eventbrite
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#" className="active">
                            <i className="bi bi-house-door me-1"></i> Accueil
                        </Nav.Link>
                        <Nav.Link href="#">
                            <i className="bi bi-palette me-1"></i> Œuvres d'art
                        </Nav.Link>
                        <Nav.Link href="#">
                            <i className="bi bi-ticket-perforated me-1"></i> Billets
                        </Nav.Link>
                        <Nav.Link href="#">
                            <i className="bi bi-calendar-event me-1"></i> Événements
                        </Nav.Link>
                        <Nav.Link href="#">
                            <i className="bi bi-envelope me-1"></i> Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;