import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const FrontNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Eventbrite</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/gallery">Galerie</Nav.Link>
                        <Nav.Link as={Link} to="/events">Événements</Nav.Link>
                        <Nav.Link as={Link} to="/tickets">Billets</Nav.Link>
                        <Nav.Link as={Link} to="/avis">Avis</Nav.Link>
                        <Nav.Link as={Link} to="/reclamation">Réclamation</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/signup" className="btn btn-outline-primary me-2">S'inscrire</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="btn btn-primary">Connexion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default FrontNavbar;
