import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>ArtGallery</h5>
                        <p>Découvrez les plus belles œuvres d'art contemporain.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact</h5>
                        <p>123 Rue des Arts, Paris<br/>contact@artgallery.com</p>
                    </Col>
                    <Col md={4}>
                        <h5>Horaires</h5>
                        <p>Lundi-Vendredi: 9h-18h<br/>Week-end: 10h-20h</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-3">
                        <p>&copy; {new Date().getFullYear()} ArtGallery. Tous droits réservés.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;