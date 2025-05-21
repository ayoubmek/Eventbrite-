import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

const Gallery = () => {
    // Liste des œuvres d'art
    const artworks = [
        {
            id: 1,
            title: "Nuit Étoilée",
            artist: "Vincent Van Gogh",
            description: "Une représentation expressive du ciel nocturne au-dessus d'un petit village.",
            year: 1889,
            price: 4500000,
            image: "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            title: "La Persistance de la Mémoire",
            artist: "Salvador Dalí",
            description: "Montres molles dans un paysage onirique, symbole du temps relatif.",
            year: 1931,
            price: 3200000,
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            title: "Les Nymphéas",
            artist: "Claude Monet",
            description: "Série de peintures représentant le jardin d'eau de Monet à Giverny.",
            year: 1919,
            price: 2800000,
            image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            title: "Le Cri",
            artist: "Edvard Munch",
            description: "Figure angoissée devant un paysage tourmenté aux couleurs vives.",
            year: 1893,
            price: 3900000,
            image: "https://images.unsplash.com/photo-1610220941051-3c79a7dd9e3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            title: "Guernica",
            artist: "Pablo Picasso",
            description: "Représentation puissante des horreurs de la guerre civile espagnole.",
            year: 1937,
            price: 5200000,
            image: "https://images.unsplash.com/photo-1578301978293-680f289bce1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 6,
            title: "La Jeune Fille à la Perle",
            artist: "Johannes Vermeer",
            description: "Portrait énigmatique d'une jeune femme au turban et à la perle.",
            year: 1665,
            price: 4800000,
            image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    return (
        <Container>
            <h1 className="text-center mb-4">Galerie d'Œuvres d'Art</h1>

            <div className="mb-4">
                <Form.Control
                    type="search"
                    placeholder="Rechercher une œuvre ou un artiste..."
                    className="rounded-pill"
                />
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {artworks.map(artwork => (
                    <Col key={artwork.id}>
                        <ArtworkCard artwork={artwork} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Gallery;