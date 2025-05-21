import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';

const GalleryPage = () => {
    const artworks = [
        {
            id: 1,
            title: 'Nuit Étoilée',
            artist: 'Vincent Van Gogh',
            year: 1889,
            medium: 'Huile sur toile',
            dimensions: '73.7 × 92.1 cm',
            location: 'MoMA, New York',
            image: '/images/Abstract.jpeg',
            likes: 1243,
            isLiked: false
        },
        {
            id: 2,
            title: 'La Jeune Fille à la perle',
            artist: 'Johannes Vermeer',
            year: 1665,
            medium: 'Huile sur toile',
            dimensions: '44.5 × 39 cm',
            location: 'Mauritshuis, La Haye',
            image: '/images/Instagram.jpeg',
            likes: 892,
            isLiked: true
        },
        {
            id: 3,
            title: 'La Persistance de la mémoire',
            artist: 'Salvador Dalí',
            year: 1931,
            medium: 'Huile sur toile',
            dimensions: '24 × 33 cm',
            location: 'MoMA, New York',
            image: '/images/Tulip Flower Orphism - Art Prints.jpeg',
            likes: 2156,
            isLiked: false
        },
        {
            id: 4,
            title: 'Le Cri',
            artist: 'Edvard Munch',
            year: 1893,
            medium: 'Tempera et pastel sur carton',
            dimensions: '91 × 73.5 cm',
            location: 'Galerie nationale, Oslo',
            image: '/images/téléchargement (2).jpeg',
            likes: 1785,
            isLiked: false
        },
    ];

    return (
        <Container className="gallery-container py-5">
            <h1 className="text-center mb-5 gallery-title">Galerie d'Art</h1>

            <Row className="g-4">
                {artworks.map(artwork => (
                    <Col key={artwork.id} xl={3} lg={4} md={6}>
                        <Card className="art-card h-100">
                            <div className="art-image-wrapper">
                                <Card.Img
                                    variant="top"
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="art-image"
                                />
                                <div className="art-overlay">
                                    <button className="icon-button">
                                        {artwork.isLiked ?
                                            <FaHeart className="text-danger" /> :
                                            <FaRegHeart className="text-white" />
                                        }
                                    </button>
                                    <button className="icon-button">
                                        <FaShareAlt className="text-white" />
                                    </button>
                                </div>
                                <div className="art-year-badge">
                                    {artwork.year}
                                </div>
                            </div>

                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="art-title">
                                    {artwork.title}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 art-artist">
                                    {artwork.artist}
                                </Card.Subtitle>

                                <div className="art-details mt-auto">
                                    <p className="mb-1"><strong>Technique:</strong> {artwork.medium}</p>
                                    <p className="mb-1"><strong>Dimensions:</strong> {artwork.dimensions}</p>
                                    <p className="mb-3"><strong>Localisation:</strong> {artwork.location}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="art-likes">
                                        <FaHeart className="text-danger me-1" />
                                        {artwork.likes.toLocaleString()}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
                .gallery-container {
                    max-width: 1200px;
                }
                .gallery-title {
                    font-family: 'Playfair Display', serif;
                    font-weight: 700;
                    color: #333;
                    letter-spacing: 1px;
                }
                .art-card {
                    border: none;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                    background: #fff;
                }
                .art-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.12);
                }
                .art-image-wrapper {
                    position: relative;
                    overflow: hidden;
                    height: 250px;
                }
                .art-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .art-card:hover .art-image {
                    transform: scale(1.05);
                }
                .art-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.7));
                    padding: 15px;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .art-card:hover .art-overlay {
                    opacity: 1;
                }
                .icon-button {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }
                .icon-button:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.1);
                }
                .art-year-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                }
                .art-title {
                    font-family: 'Playfair Display', serif;
                    font-weight: 600;
                    color: #333;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                }
                .art-artist {
                    font-family: 'Raleway', sans-serif;
                    font-weight: 500;
                    color: #666;
                    font-size: 0.95rem;
                }
                .art-details {
                    font-family: 'Raleway', sans-serif;
                    font-size: 0.85rem;
                    color: #555;
                    line-height: 1.5;
                }
                .art-likes {
                    font-family: 'Raleway', sans-serif;
                    font-size: 0.9rem;
                    color: #666;
                }
            `}</style>
        </Container>
    );
};

export default GalleryPage;