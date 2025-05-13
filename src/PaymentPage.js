import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Container, Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51RR0ZsQOnSTUXn9WcM3Ew5SOGcFRczQVK0on7uihm1npWCdMN7WmMQB3xka007gkrL2PSPaKJc1LjQ6841Dzz2F7006jX7l4Uj');

const CheckoutForm = ({ event }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (event) {
            // Create PaymentIntent
            axios.post('http://localhost:3001/create-payment-intent', {
                amount: event.price * 100,
                currency: 'eur',
            }).then(res => {
                setClientSecret(res.data.clientSecret);
            }).catch(() => {
                setError("Erreur lors de l'initialisation du paiement.");
            });
        }
    }, [event]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        if (result.error) {
            setError(result.error.message);
            setLoading(false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                setPaymentSuccess(true);
            }
            setLoading(false);
        }
    };

    if (paymentSuccess) {
        return (
            <Container className="py-5 text-center">
                <div className="success-icon mb-4">
                    <FaCheck size={64} className="text-success" />
                </div>
                <h2 className="mb-3">Paiement réussi!</h2>
                <p className="lead mb-4">Merci pour votre achat. Votre billet pour "{event.name}" a été réservé.</p>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Retour à l'accueil
                </Button>
            </Container>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ hidePostalCode: true }} />
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <Button
                type="submit"
                variant="primary"
                className="w-100 mt-3"
                disabled={!stripe || loading}
            >
                {loading ? <Spinner animation="border" size="sm" /> : `Payer ${event.price.toFixed(2)} €`}
            </Button>
        </form>
    );
};

const PaymentPage = () => {
    const location = useLocation();
    const { event } = location.state || {};
    const navigate = useNavigate();

    if (!event) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="danger">Aucun événement sélectionné. Veuillez choisir un billet.</Alert>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Retour à la liste des événements
                </Button>
            </Container>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <Container className="py-5">
                <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
                    <FaArrowLeft className="me-2" /> Retour
                </Button>

                <h2 className="mb-4">Paiement du billet</h2>
                <Row>
                    <Col lg={8}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Résumé de votre commande</Card.Title>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Événement:</span>
                                    <strong>{event.name}</strong>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Prix unitaire:</span>
                                    <strong>{event.price.toFixed(2)} €</strong>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Quantité:</span>
                                    <strong>1</strong>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Total:</span>
                                    <strong className="text-primary h4">{event.price.toFixed(2)} €</strong>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <Card.Title>Méthode de paiement</Card.Title>
                                <p className="text-muted mb-4">Paiement sécurisé via Stripe</p>
                                <CheckoutForm event={event} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card>
                            <Card.Img variant="top" src={event.image} />
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text>
                                    <small className="text-muted d-block mb-2">
                                        <FaCalendarAlt className="me-2" />
                                        {new Date(event.date).toLocaleDateString('fr-FR')}
                                    </small>
                                    <small className="text-muted">
                                        <FaMapMarkerAlt className="me-2" />
                                        {event.location}
                                    </small>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Elements>
    );
};

export default PaymentPage;
