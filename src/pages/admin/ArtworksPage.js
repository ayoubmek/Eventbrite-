import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert, Container, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiInfo } from 'react-icons/fi';
import './ArtworksPage.css';

const galleryArtworks = [
    {
        id: 1,
        title: "La Kahina",
        artist: "Hatem El Mekki",
        description: "Portrait emblématique de la reine berbère qui a résisté à l'invasion arabe au VIIe siècle.",
        year: 1960,
        price: 1200000,
        image: "https://www.tunisienumerique.com/wp-content/uploads/2020/03/hatem-el-mekki.jpg",
        category: "Peinture",
        status: "Exposé"
    },
    {
        id: 2,
        title: "Marché de Tunis",
        artist: "Yahia Turki",
        description: "Scène animée du marché central de Tunis avec ses couleurs et son ambiance typique.",
        year: 1930,
        price: 950000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Yahia_Turki_-_March%C3%A9_%C3%A0_Tunis.jpg/800px-Yahia_Turki_-_March%C3%A9_%C3%A0_Tunis.jpg",
        category: "Peinture",
        status: "Exposé"
    },
    {
        id: 3,
        title: "Portrait de Farhat Hached",
        artist: "Ali Bellagha",
        description: "Hommage au syndicaliste et militant nationaliste tunisien assassiné en 1952.",
        year: 1955,
        price: 850000,
        image: "https://www.realites.com.tn/wp-content/uploads/2021/12/ali-bellagha.jpg",
        category: "Sculpture",
        status: "En restauration"
    },
    {
        id: 4,
        title: "Les Femmes de Djerba",
        artist: "Abdelaziz Gorgi",
        description: "Représentation stylisée des femmes portant les costumes traditionnels de Djerba.",
        year: 1975,
        price: 750000,
        image: "https://www.lemaghreb.tn/wp-content/uploads/2021/05/Abdelaziz-Gorgi.jpg",
        category: "Peinture",
        status: "Exposé"
    },
    {
        id: 5,
        title: "Calligraphie Coranique",
        artist: "Nja Mahdaoui",
        description: "Œuvre contemporaine mêlant calligraphie arabe traditionnelle et abstraction moderne.",
        year: 1990,
        price: 650000,
        image: "https://www.jeuneafrique.com/medias/2019/10/16/nja-mahdaoui-expose-ses-calligraphies-a-linstitut-du-monde-arabe-a-paris-20191016-145026.jpg",
        category: "Calligraphie",
        status: "En réserve"
    },
    {
        id: 6,
        title: "La Médina",
        artist: "Ammar Farhat",
        description: "Vue panoramique des ruelles et architectures typiques de la médina de Tunis.",
        year: 1965,
        price: 880000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Ammar_Farhat_-_La_M%C3%A9dina.jpg/800px-Amar_Farhat_-_La_M%C3%A9dina.jpg",
        category: "Peinture",
        status: "Exposé"
    }
];

const ArtworksPage = () => {
    const [artworks, setArtworks] = useState(galleryArtworks);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        category: '',
        year: '',
        status: 'Exposé',
        description: '',
        price: '',
        image: ''
    });

    // Filter artworks based on search term
    const filteredArtworks = artworks.filter(artwork =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
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
            description: '',
            price: '',
            image: ''
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
            description: artwork.description,
            price: artwork.price,
            image: artwork.image
        });
        setShowModal(true);
    };

    const handleShow = (artwork) => {
        setCurrentArtwork(artwork);
        setShowDetailModal(true);
    };

    const handleDelete = (id) => {
        setArtworks(artworks.filter(art => art.id !== id));
        setAlertMessage('Œuvre supprimée avec succès');
        setShowAlert(true);
    };

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

            <div className="mb-4">
                <Form.Control
                    type="search"
                    placeholder="Rechercher une œuvre ou un artiste tunisien..."
                    className="rounded-pill"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                    <th>Prix (TND)</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredArtworks.map(artwork => (
                    <tr key={artwork.id}>
                        <td>{artwork.title}</td>
                        <td>{artwork.artist}</td>
                        <td>{artwork.category}</td>
                        <td>{artwork.year}</td>
                        <td>{artwork.price ? `${artwork.price.toLocaleString()} TND` : '-'}</td>
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

            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setCurrentArtwork(null);
                setFormData({
                    title: '',
                    artist: '',
                    category: '',
                    year: '',
                    status: 'Exposé',
                    description: '',
                    price: '',
                    image: ''
                });
            }} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>{currentArtwork ? 'Modifier' : 'Ajouter'} une œuvre tunisienne</Modal.Title>
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
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            >
                                <option value="">Sélectionner une catégorie</option>
                                <option value="Peinture">Peinture</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Calligraphie">Calligraphie</option>
                                <option value="Céramique">Céramique</option>
                                <option value="Photographie">Photographie</option>
                            </Form.Select>
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
                            <Form.Label>Prix (TND)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
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
                    <Modal.Title>Détails de l'œuvre tunisienne</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentArtwork && (
                        <div className="artwork-details">
                            {currentArtwork.image && (
                                <div className="text-center mb-3">
                                    <img
                                        src={currentArtwork.image}
                                        alt={currentArtwork.title}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '300px' }}
                                    />
                                </div>
                            )}
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
                                <span className="detail-label">Prix:</span>
                                <span className="detail-value">
                                    {currentArtwork.price ? `${currentArtwork.price.toLocaleString()} TND` : '-'}
                                </span>
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