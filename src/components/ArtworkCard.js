import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ArtworkCard = ({ artwork }) => {
    return (
        <Card className="artwork-card shadow-sm h-100">
            <Card.Img
                variant="top"
                src={artwork.image}
                className="artwork-img"
                alt={artwork.title}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="artwork-title">{artwork.title}</Card.Title>
                <Card.Subtitle className="mb-2 artwork-artist">
                    {artwork.artist}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                    {artwork.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="badge bg-success price-badge">
            {artwork.price} €
          </span>
                    <Button variant="outline-primary" size="sm">
                        <i className="bi bi-info-circle me-1"></i> Détails
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ArtworkCard;