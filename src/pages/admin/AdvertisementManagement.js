import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Table, 
    Button, 
    Modal, 
    Form, 
    Card,
    Badge,
    FormCheck
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { 
    advertisements, 
    getActiveAdvertisements,
    updateAdvertisement,
    addAdvertisement,
    deleteAdvertisement
} from '../../data/advertisements';

const AdvertisementManagement = () => {
    const [ads, setAds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        redirectUrl: '',
        startDate: '',
        endDate: '',
        isActive: true
    });

    useEffect(() => {
        // Charger les publicités au montage du composant
        setAds(advertisements);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectedAd) {
            // Mise à jour d'une publicité existante
            const updatedAd = updateAdvertisement(selectedAd.id, formData);
            setAds(prev => prev.map(ad => 
                ad.id === selectedAd.id ? updatedAd : ad
            ));
        } else {
            // Ajout d'une nouvelle publicité
            const newAd = addAdvertisement(formData);
            setAds(prev => [...prev, newAd]);
        }
        
        handleCloseModal();
    };

    const handleEdit = (ad) => {
        setSelectedAd(ad);
        setFormData({
            title: ad.title,
            description: ad.description,
            imageUrl: ad.imageUrl,
            redirectUrl: ad.redirectUrl,
            startDate: ad.startDate,
            endDate: ad.endDate,
            isActive: ad.isActive
        });
        setShowModal(true);
    };

    const handleDelete = (ad) => {
        setSelectedAd(ad);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedAd) {
            deleteAdvertisement(selectedAd.id);
            setAds(prev => prev.filter(ad => ad.id !== selectedAd.id));
            setShowDeleteModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAd(null);
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            redirectUrl: '',
            startDate: '',
            endDate: '',
            isActive: true
        });
    };

    const toggleAdvertisementStatus = (ad) => {
        const updatedAd = updateAdvertisement(ad.id, { ...ad, isActive: !ad.isActive });
        setAds(prev => prev.map(a => a.id === ad.id ? updatedAd : a));
    };

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestion des Publicités</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    <FaPlus className="me-2" />
                    Nouvelle Publicité
                </Button>
            </div>

            {/* Publicité active actuelle */}
            <Card className="mb-4">
                <Card.Header>
                    <h4 className="mb-0">Publicité Active</h4>
                </Card.Header>
                <Card.Body>
                    {getActiveAdvertisements().length > 0 ? (
                        <div className="d-flex align-items-center">
                            <img 
                                src={getActiveAdvertisements()[0].imageUrl} 
                                alt={getActiveAdvertisements()[0].title}
                                style={{ width: '200px', height: '100px', objectFit: 'cover' }}
                                className="me-3"
                            />
                            <div>
                                <h5>{getActiveAdvertisements()[0].title}</h5>
                                <p className="mb-0">{getActiveAdvertisements()[0].description}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted mb-0">Aucune publicité active</p>
                    )}
                </Card.Body>
            </Card>

            {/* Liste des publicités */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Dates</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => (
                        <tr key={ad.id}>
                            <td>
                                <img 
                                    src={ad.imageUrl} 
                                    alt={ad.title}
                                    style={{ width: '100px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{ad.title}</td>
                            <td>{ad.description}</td>
                            <td>
                                {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <FormCheck
                                        type="switch"
                                        id={`status-${ad.id}`}
                                        checked={ad.isActive}
                                        onChange={() => toggleAdvertisementStatus(ad)}
                                        className="me-2"
                                    />
                                    <Badge bg={ad.isActive ? "success" : "secondary"}>
                                        {ad.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => window.open(ad.redirectUrl, '_blank')}
                                >
                                    <FaEye />
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => handleEdit(ad)}
                                >
                                    <FaEdit />
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(ad)}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal d'ajout/modification */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedAd ? 'Modifier la Publicité' : 'Nouvelle Publicité'}
                    </Modal.Title>
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
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de l'image</Form.Label>
                            <Form.Control
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de redirection</Form.Label>
                            <Form.Control
                                type="url"
                                name="redirectUrl"
                                value={formData.redirectUrl}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date de début</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date de fin</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="isActive"
                                name="isActive"
                                label="Publicité active"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedAd ? 'Modifier' : 'Ajouter'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal de confirmation de suppression */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette publicité ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdvertisementManagement;
