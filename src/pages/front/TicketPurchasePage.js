import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaStar } from 'react-icons/fa';

const TicketPurchasePage = () => {
    const events = [
        {
            id: 1,
            name: "Festival de Jazz International",
            price: 45.50,
            date: "2023-08-15",
            location: "Paris, Parc des Expositions",
            image: "/images/Client event seminar room.jpeg",
            remaining: 12,
            rating: 4.8,
            type: "Concert"
        },
        {
            id: 2,
            name: "Exposition d'Art Moderne",
            price: 18.00,
            date: "2023-09-22",
            location: "Lyon, Musée des Beaux-Arts",
            image: "/images/Corporate Events Services.jpeg",
            remaining: 34,
            rating: 4.5,
            type: "Exposition"
        },
        {
            id: 3,
            name: "Spectacle de Danse Contemporaine",
            price: 32.00,
            date: "2023-10-05",
            location: "Marseille, Opéra Municipal",
            image: "/images/téléchargement (1).jpeg",
            remaining: 8,
            rating: 4.9,
            type: "Danse"
        },
        {
            id: 4,
            name: "Pièce de Théâtre Classique",
            price: 28.50,
            date: "2023-11-18",
            location: "Toulouse, Théâtre National",
            image: "/images/Hex panels lit with LED tape.jpeg",
            remaining: 21,
            rating: 4.7,
            type: "Théâtre"
        },
    ];

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <Container className="event-tickets py-5">
            <h1 className="text-center mb-4">Événements à ne pas manquer</h1>
            <p className="text-center mb-5">Réservez vos billets pour des expériences inoubliables</p>

            <Row className="g-4">
                {events.map(event => (
                    <Col key={event.id} xl={3} lg={4} md={6}>
                        <Card className="event-card h-100">
                            <div className="event-image-container">
                                <Card.Img
                                    variant="top"
                                    src={event.image}
                                    alt={event.name}
                                />
                                <Badge bg="danger" className="tickets-remaining">
                                    {event.remaining} billets restants
                                </Badge>
                            </div>

                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge bg="info" className="event-type">
                                        {event.type}
                                    </Badge>
                                    <div className="event-rating">
                                        <FaStar className="text-warning" /> {event.rating}
                                    </div>
                                </div>

                                <Card.Title className="event-name">{event.name}</Card.Title>

                                <div className="event-details mb-3">
                                    <div className="detail-item">
                                        <FaCalendarAlt className="me-2" />
                                        {formatDate(event.date)}
                                    </div>
                                    <div className="detail-item">
                                        <FaMapMarkerAlt className="me-2" />
                                        {event.location}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="event-price">
                                        <span className="price-amount">{event.price.toFixed(2)} €</span>
                                        <span className="price-label">par personne</span>
                                    </div>
                                    <Button variant="primary" className="buy-button">
                                        <FaTicketAlt className="me-1" />
                                        Acheter
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
                .event-tickets {
                    max-width: 1200px;
                }
                .event-card {
                    border: none;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }
                .event-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                }
                .event-image-container {
                    position: relative;
                    height: 180px;
                    overflow: hidden;
                }
                .event-image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .event-card:hover img {
                    transform: scale(1.05);
                }
                .tickets-remaining {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 0.75rem;
                }
                .event-type {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                }
                .event-rating {
                    font-size: 0.9rem;
                    color: #6c757d;
                }
                .event-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                    min-height: 3rem;
                }
                .event-details {
                    font-size: 0.9rem;
                    color: #6c757d;
                }
                .detail-item {
                    margin-bottom: 0.5rem;
                }
                .event-price {
                    text-align: left;
                }
                .price-amount {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #0d6efd;
                    display: block;
                    line-height: 1;
                }
                .price-label {
                    font-size: 0.75rem;
                    color: #6c757d;
                }
                .buy-button {
                    font-weight: 500;
                    padding: 0.375rem 1rem;
                }
                @media (max-width: 768px) {
                    .event-name {
                        font-size: 1rem;
                        min-height: auto;
                    }
                    .price-amount {
                        font-size: 1.1rem;
                    }
                }
            `}</style>
        </Container>
    );
};

export default TicketPurchasePage;