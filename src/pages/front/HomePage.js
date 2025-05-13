import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-hero py-5 text-center">
            <Container>
                <h1 className="display-4 mb-4">Bienvenue à ArtGallery</h1>
                <p className="lead mb-4">
                    Découvrez notre collection exceptionnelle d'œuvres d'art contemporain
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Button as={Link} to="/gallery" variant="primary" size="lg">
                        Voir la galerie
                    </Button>
                    <Button as={Link} to="/events" variant="outline-primary" size="lg">
                        Nos événements
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default HomePage;