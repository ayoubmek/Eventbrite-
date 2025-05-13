import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert, Container, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiInfo } from 'react-icons/fi';
import './ArtworksPage.css'; // Create this CSS file

const ArtworksPage = () => {
    // Sample initial data
    const initialArtworks = [
        { id: 1, title: 'Nuit Étoilée', artist: 'Van Gogh', category: 'Peinture', year: 1889, status: 'Exposé', description: 'Une représentation expressive du ciel nocturne' },
        { id: 2, title: 'David', artist: 'Michel-Ange', category: 'Sculpture', year: 1504, status: 'En restauration', description: 'Sculpture en marbre de la Renaissance' },
        { id: 3, title: 'La Persistance', artist: 'Dalí', category: 'Peinture', year: 1931, status: 'Exposé', description: 'Œuvre surréaliste avec des montres molles' },
    ];

    const [artworks, setArtworks] = useState(initialArtworks);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        category: '',
        year: '',
        status: 'Exposé',
        description: ''
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

        if (currentArtwork) {
            // Update existing artwork
            setArtworks(artworks.map(art =>
                art.id === currentArtwork.id ? { ...formData, id: currentArtwork.id } : art
            ));
            setAlertMessage('Œuvre mise à jour avec succès');
        } else {
            // Add new artwork
            const newId = artworks.length > 0 ? Math.max(...artworks.map(a => a.id)) + 1 : 1;
            setArtworks([...artworks, { ...formData, id: newId }]);
            setAlertMessage('Œuvre ajoutée avec succès');
        }

        setShowAlert(true);
        setShowModal(false);
        setCurrentArtwork(null);
        setFormData({
            title: '',
            artist: '',
            category: '',
            year: '',
            status: 'Exposé',
            description: ''
        });
    };

    // Handle edit
    const handleEdit = (artwork) => {
        setCurrentArtwork(artwork);
        setFormData({
            title: artwork.title,
            artist: artwork.artist,
            category: artwork.category,
            year: artwork.year,
            status: artwork.status,
            description: artwork.description
        });
        setShowModal(true);
    };

    // Handle show details
    const handleShow = (artwork) => {
        setCurrentArtwork(artwork);
        setShowDetailModal(true);
    };

    // Handle delete
    const handleDelete = (id) => {
        setArtworks(artworks.filter(art => art.id !== id));
        setAlertMessage('Œuvre supprimée avec succès');
        setShowAlert(true);
    };

    // Status badge color
    const getStatusBadge = (status) => {
        const variants = {
            'Exposé': 'success',
            'En restauration': 'warning',
            'En réserve': 'secondary'
        };
        return <Badge bg={variants[status]}>{status}</Badge>;
    };

    return (
        <Container className="artworks-page py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="page-title">Gestion des Œuvres d'Art</h2>
                <Button variant="primary" onClick={() => setShowModal(true)} className="add-button">
                    <FiPlus className="me-1" /> Ajouter une œuvre
                </Button>
            </div>

            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="alert-message">
                    {alertMessage}
                </Alert>
            )}

            <Table striped bordered hover responsive className="artworks-table">
                <thead className="table-header">
                <tr>
                    <th>Titre</th>
                    <th>Artiste</th>
                    <th>Catégorie</th>
                    <th>Année</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {artworks.map(artwork => (
                    <tr key={artwork.id}>
                        <td>{artwork.title}</td>
                        <td>{artwork.artist}</td>
                        <td>{artwork.category}</td>
                        <td>{artwork.year}</td>
                        <td>{getStatusBadge(artwork.status)}</td>
                        <td>
                            <div className="action-buttons">
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => handleShow(artwork)}
                                    title="Voir les détails"
                                >
                                    <FiEye />
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEdit(artwork)}
                                    title="Modifier"
                                >
                                    <FiEdit2 />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(artwork.id)}
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
                setCurrentArtwork(null);
                setFormData({
                    title: '',
                    artist: '',
                    category: '',
                    year: '',
                    status: 'Exposé',
                    description: ''
                });
            }} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>{currentArtwork ? 'Modifier' : 'Ajouter'} une œuvre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Artiste</Form.Label>
                            <Form.Control
                                type="text"
                                name="artist"
                                value={formData.artist}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Année</Form.Label>
                            <Form.Control
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="form-input"
                            />
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
                                <option value="Exposé">Exposé</option>
                                <option value="En restauration">En restauration</option>
                                <option value="En réserve">En réserve</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="modal-footer-buttons">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {currentArtwork ? 'Mettre à jour' : 'Ajouter'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Détails de l'œuvre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentArtwork && (
                        <div className="artwork-details">
                            <h4 className="artwork-title">{currentArtwork.title}</h4>
                            <div className="detail-item">
                                <span className="detail-label">Artiste:</span>
                                <span className="detail-value">{currentArtwork.artist}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Catégorie:</span>
                                <span className="detail-value">{currentArtwork.category}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Année:</span>
                                <span className="detail-value">{currentArtwork.year}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Statut:</span>
                                <span className="detail-value">{getStatusBadge(currentArtwork.status)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Description:</span>
                                <p className="detail-value">{currentArtwork.description}</p>
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

export default ArtworksPage;