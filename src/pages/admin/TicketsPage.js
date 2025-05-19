import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert, Container, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './TicketsPage.css'; // Reuse the same CSS file or create a specific one

const TicketsPage = () => {
    // Sample initial data
    const initialTickets = [
        {
            id: 1,
            event: 'Exposition Van Gogh',
            client: 'Jean Dupont',
            price: '25€',
            date: '2023-06-15',
            status: 'validé',
            type: 'Standard',
            email: 'jean.dupont@example.com'
        },
        {
            id: 2,
            event: 'Concert Classique',
            client: 'Sophie Martin',
            price: '40€',
            date: '2023-06-22',
            status: 'en attente',
            type: 'VIP',
            email: 'sophie.martin@example.com'
        },
        {
            id: 3,
            event: 'Visite Guidée',
            client: 'Pierre Leblanc',
            price: '15€',
            date: '2023-06-10',
            status: 'annulé',
            type: 'Réduit',
            email: 'pierre.leblanc@example.com'
        }
    ];

    const [tickets, setTickets] = useState(initialTickets);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        event: '',
        client: '',
        price: '',
        date: '',
        status: 'validé',
        type: 'Standard',
        email: ''
    });

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
            email: ''
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
            email: ticket.email
        });
        setShowModal(true);
    };

    // Handle show details
    const handleShow = (ticket) => {
        setCurrentTicket(ticket);
        setShowDetailModal(true);
    };

    // Handle delete
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

    return (
        <Container className="tickets-page py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="page-title">Gestion des Billets</h2>
                <Button variant="primary" onClick={() => setShowModal(true)} className="add-button">
                    <FiPlus className="me-1" /> Ajouter un billet
                </Button>
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
                    <th>Statut</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket.id}>
                        <td>{ticket.event}</td>
                        <td>{ticket.client}</td>
                        <td>{ticket.price}</td>
                        <td>{ticket.date}</td>
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

            {/* Add/Edit Modal */}
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
                    email: ''
                });
            }} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>{currentTicket ? 'Modifier' : 'Ajouter'} un billet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Détails du billet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentTicket && (
                        <div className="ticket-details">
                            <h4 className="ticket-title">{currentTicket.event}</h4>
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
                            <div className="detail-item">
                                <span className="detail-label">Date:</span>
                                <span className="detail-value">{currentTicket.date}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Type:</span>
                                <span className="detail-value">{currentTicket.type}</span>
                            </div>
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