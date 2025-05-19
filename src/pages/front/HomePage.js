import React, { useState, useEffect } from 'react';
import { Container, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getActiveAdvertisements } from '../../data/advertisements';

const HomePage = () => {
    const [activeAds, setActiveAds] = useState([]);

    useEffect(() => {
        // Charger les publicités actives depuis le fichier partagé
        const loadActiveAds = () => {
            const activeAds = getActiveAdvertisements();
            setActiveAds(activeAds);
        };
        
        loadActiveAds();
        // Recharger les publicités toutes les minutes pour refléter les changements
        const interval = setInterval(loadActiveAds, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {activeAds.length > 0 && (
                <Carousel className="mb-4">
                    {activeAds.map((ad) => (
                        <Carousel.Item key={ad.id}>
                            <div 
                                className="d-block w-100" 
                                style={{ 
                                    height: '400px',
                                    backgroundImage: `url(${ad.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <Carousel.Caption className="bg-dark bg-opacity-50 p-4 rounded">
                                    <h3>{ad.title}</h3>
                                    <p>{ad.description}</p>
                                    <Button 
                                        as="a" 
                                        href={ad.redirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="primary"
                                    >
                                        En savoir plus
                                    </Button>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}

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
        </>
    );
};

export default HomePage;