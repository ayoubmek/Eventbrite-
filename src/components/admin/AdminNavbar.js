import React from 'react';
import { Navbar, Form, Button, Container } from 'react-bootstrap';
import { FiMenu, FiSearch } from 'react-icons/fi';
import './AdminNavbar.css';
const AdminNavbar = ({ toggleSidebar }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar">
            <Container fluid>
                <Button
                    variant="link"
                    className="text-white"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FiMenu size={20} />
                </Button>
                <Navbar.Brand className="ms-3">EventBrite</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-search" />
                <Navbar.Collapse id="navbar-search">
                    <div className="d-flex ms-auto align-items-center">
                        <Form.Control
                            type="search"
                            placeholder="Rechercher..."
                            className="admin-search me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-light">
                            <FiSearch />
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;