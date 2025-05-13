import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert, Container, Badge, Row, Col } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './TicketsPage.css';

const eventTickets = [
    {
        id: 1,
        event: 'Festival de Jazz International',
        client: 'Ayoub',
        price: '45.50€',
        date: '2023-08-15',
        status: 'validé',
        type: 'VIP',
        email: 'jean.dupont@example.com',
        location: 'Paris, Parc des Expositions',
        remaining: 12,
        rating: 4.8
    },
    {
        id: 2,
        event: 'Exposition d\'Art Moderne',
        client: 'Mekni',
        price: '18.00€',
        date: '2023-09-22',
        status: 'en attente',
        type: 'Standard',
        email: 'sophie.martin@example.com',
        location: 'Lyon, Musée des Beaux-Arts',
        remaining: 34,
        rating: 4.5
    },
    {
        id: 3,
        event: 'Spectacle de Danse Contemporaine',
        client: 'Ahmed',
        price: '32.00€',
        date: '2023-10-05',
        status: 'annulé',
        type: 'Réduit',
        email: 'pierre.leblanc@example.com',
        location: 'Marseille, Opéra Municipal',
        remaining: 8,
        rating: 4.9
    },
    {
        id: 4,
        event: 'Pièce de Théâtre Classique',
        client: 'Ali',
        price: '28.50€',
        date: '2023-11-18',
        status: 'validé',
        type: 'Groupe',
        email: 'marie.dubois@example.com',
        location: 'Toulouse, Théâtre National',
        remaining: 21,
        rating: 4.7
    }
];

const TicketsPage = () => {
    const [tickets, setTickets] = useState(eventTickets);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        event: '',
        client: '',
        price: '',
        date: '',
        status: 'validé',
        type: 'Standard',
        email: '',
        location: '',
        remaining: 0,
        rating: 0
    });

    // Filter tickets based on search term
    const filteredTickets = tickets.filter(ticket =>
        ticket.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentTicket) {
            // Update existing ticket
            setTickets(tickets.map(ticket =>
                ticket.id === currentTicket.id ? { ...formData, id: currentTicket.id } : ticket
            ));
            setAlertMessage('Billet mis à jour avec succès');
        } else {
            // Add new ticket
            const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
            setTickets([...tickets, { ...formData, id: newId }]);
            setAlertMessage('Billet ajouté avec succès');
        }

        setShowAlert(true);
        setShowModal(false);
        setCurrentTicket(null);
        setFormData({
            event: '',
            client: '',
            price: '',
            date: '',
            status: 'validé',
            type: 'Standard',
            email: '',
            location: '',
            remaining: 0,
            rating: 0
        });
    };

    // Handle edit
    const handleEdit = (ticket) => {
        setCurrentTicket(ticket);
        setFormData({
            event: ticket.event,
            client: ticket.client,
            price: ticket.price,
            date: ticket.date,
            status: ticket.status,
            type: ticket.type,
            email: ticket.email,
            location: ticket.location,
            remaining: ticket.remaining,
            rating: ticket.rating
        });
        setShowModal(true);
    };

    const handleShow = (ticket) => {
        setCurrentTicket(ticket);
        setShowDetailModal(true);
    };

    const handleDelete = (id) => {
        setTickets(tickets.filter(ticket => ticket.id !== id));
        setAlertMessage('Billet supprimé avec succès');
        setShowAlert(true);
    };

    // Status badge color and icon
    const getStatusBadge = (status) => {
        const variants = {
            'validé': { bg: 'success', icon: <FiCheckCircle className="me-1" /> },
            'en attente': { bg: 'warning', icon: <FiClock className="me-1" /> },
            'annulé': { bg: 'danger', icon: <FiXCircle className="me-1" /> }
        };
        return (
            <Badge bg={variants[status].bg} className="d-flex align-items-center">
                {variants[status].icon}
                {status}
            </Badge>
        );
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <Container className="tickets-page py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="page-title">Gestion des Billets</h2>
                <div className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Rechercher..."
                        className="me-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" onClick={() => setShowModal(true)} className="add-button">
                        <FiPlus className="me-1" /> Ajouter un billet
                    </Button>
                </div>
            </div>

            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="alert-message">
                    {alertMessage}
                </Alert>
            )}

            <Table striped bordered hover responsive className="tickets-table">
                <thead className="table-header">
                <tr>
                    <th>Événement</th>
                    <th>Client</th>
                    <th>Prix</th>
                    <th>Date</th>
                    <th>Lieu</th>
                    <th>Statut</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredTickets.map(ticket => (
                    <tr key={ticket.id}>
                        <td>{ticket.event}</td>
                        <td>{ticket.client}</td>
                        <td>{ticket.price}</td>
                        <td>{formatDate(ticket.date)}</td>
                        <td>{ticket.location}</td>
                        <td>{getStatusBadge(ticket.status)}</td>
                        <td>{ticket.type}</td>
                        <td>
                            <div className="action-buttons">
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => handleShow(ticket)}
                                    title="Voir les détails"
                                >
                                    <FiEye />
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEdit(ticket)}
                                    title="Modifier"
                                >
                                    <FiEdit2 />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(ticket.id)}
                                    title="Supprimer"
                                >
                                    <FiTrash2 />
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setCurrentTicket(null);
                setFormData({
                    event: '',
                    client: '',
                    price: '',
                    date: '',
                    status: 'validé',
                    type: 'Standard',
                    email: '',
                    location: '',
                    remaining: 0,
                    rating: 0
                });
            }} centered size="lg">
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>{currentTicket ? 'Modifier' : 'Ajouter'} un billet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Événement</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="event"
                                        value={formData.event}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Client</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="client"
                                        value={formData.client}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Lieu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    >
                                        <option value="Standard">Standard</option>
                                        <option value="VIP">VIP</option>
                                        <option value="Réduit">Réduit</option>
                                        <option value="Groupe">Groupe</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Statut</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    >
                                        <option value="validé">Validé</option>
                                        <option value="en attente">En attente</option>
                                        <option value="annulé">Annulé</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="modal-footer-buttons">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {currentTicket ? 'Mettre à jour' : 'Ajouter'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered size="lg">
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Détails du billet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentTicket && (
                        <div className="ticket-details">
                            <h4 className="ticket-title">{currentTicket.event}</h4>
                            <Row>
                                <Col md={6}>
                                    <div className="detail-item">
                                        <span className="detail-label">Client:</span>
                                        <span className="detail-value">{currentTicket.client}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Email:</span>
                                        <span className="detail-value">{currentTicket.email}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Prix:</span>
                                        <span className="detail-value">{currentTicket.price}</span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="detail-item">
                                        <span className="detail-label">Date:</span>
                                        <span className="detail-value">{formatDate(currentTicket.date)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Lieu:</span>
                                        <span className="detail-value">{currentTicket.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Billets restants:</span>
                                        <span className="detail-value">{currentTicket.remaining}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <div className="detail-item">
                                        <span className="detail-label">Type:</span>
                                        <span className="detail-value">{currentTicket.type}</span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="detail-item">
                                        <span className="detail-label">Note:</span>
                                        <span className="detail-value">{currentTicket.rating}/5</span>
                                    </div>
                                </Col>
                            </Row>
                            <div className="detail-item">
                                <span className="detail-label">Statut:</span>
                                <span className="detail-value">{getStatusBadge(currentTicket.status)}</span>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TicketsPage;