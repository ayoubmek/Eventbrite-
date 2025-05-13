import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Badge,
    InputGroup,
    Form,
    Pagination,
    Modal,
    FloatingLabel,
    Alert
} from 'react-bootstrap';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiDownload,
    FiUpload,
    FiImage
} from 'react-icons/fi';

// Assuming you have a Gallery class like this:
class Gallery {
    constructor() {
        this.artworks = [];
        this.nextId = 1;
    }

    addArtwork(artwork) {
        const newArtwork = { ...artwork, id: this.nextId++ };
        this.artworks.push(newArtwork);
        return newArtwork;
    }

    updateArtwork(updatedArtwork) {
        const index = this.artworks.findIndex(a => a.id === updatedArtwork.id);
        if (index !== -1) {
            this.artworks[index] = updatedArtwork;
            return true;
        }
        return false;
    }

    deleteArtwork(id) {
        const initialLength = this.artworks.length;
        this.artworks = this.artworks.filter(a => a.id !== id);
        return this.artworks.length !== initialLength;
    }

    getAllArtworks() {
        return [...this.artworks];
    }

    searchArtworks(searchTerm) {
        return this.artworks.filter(artwork =>
            artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}

const ArtworksTable = () => {
    const [gallery] = useState(new Gallery());
    const [artworks, setArtworks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [editingArtwork, setEditingArtwork] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        category: '',
        value: '',
        status: 'en réserve',
        image: ''
    });

    const itemsPerPage = 10;

    useEffect(() => {
        // Load initial data
        setArtworks(gallery.getAllArtworks());
    }, [gallery]);

    const filteredArtworks = gallery.searchArtworks(searchTerm);
    const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
    const paginatedArtworks = filteredArtworks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleAdd = () => {
        setEditingArtwork(null);
        setFormData({
            title: '',
            artist: '',
            category: '',
            value: '',
            status: 'en réserve',
            image: ''
        });
        setShowAddEditModal(true);
    };

    const handleEdit = (artwork) => {
        setEditingArtwork(artwork);
        setFormData({
            title: artwork.title,
            artist: artwork.artist,
            category: artwork.category,
            value: artwork.value,
            status: artwork.status,
            image: artwork.image || ''
        });
        setShowAddEditModal(true);
    };

    const handleDelete = (artwork) => {
        setSelectedArtwork(artwork);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (gallery.deleteArtwork(selectedArtwork.id)) {
            setArtworks(gallery.getAllArtworks());
            showAlert('success', 'Œuvre supprimée avec succès');
        } else {
            showAlert('danger', 'Erreur lors de la suppression');
        }
        setShowDeleteModal(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editingArtwork) {
            // Update existing artwork
            const updatedArtwork = { ...editingArtwork, ...formData };
            if (gallery.updateArtwork(updatedArtwork)) {
                setArtworks(gallery.getAllArtworks());
                showAlert('success', 'Œuvre mise à jour avec succès');
            } else {
                showAlert('danger', 'Erreur lors de la mise à jour');
            }
        } else {
            // Add new artwork
            const newArtwork = gallery.addArtwork(formData);
            setArtworks(gallery.getAllArtworks());
            showAlert('success', 'Œuvre ajoutée avec succès');
        }
        setShowAddEditModal(false);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    if (Array.isArray(importedData)) {
                        importedData.forEach(artwork => gallery.addArtwork(artwork));
                        setArtworks(gallery.getAllArtworks());
                        showAlert('success', `${importedData.length} œuvres importées avec succès`);
                    }
                } catch (error) {
                    showAlert('danger', 'Erreur lors de la lecture du fichier');
                }
            };
            reader.readAsText(file);
        }
        setShowImportModal(false);
    };

    const exportArtworks = () => {
        const dataStr = JSON.stringify(artworks, null, 2);
        const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
        const exportName = `export_oeuvres_${new Date().toISOString().slice(0,10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportName);
        linkElement.click();
        showAlert('success', 'Export réalisé avec succès');
    };

    const showAlert = (variant, message) => {
        setAlert({ variant, message });
        setTimeout(() => setAlert(null), 5000);
    };

    const getStatusBadge = (status) => {
        const variants = {
            'exposée': 'success',
            'en restauration': 'warning',
            'en réserve': 'secondary',
            'vendu': 'danger'
        };
        return <Badge bg={variants[status]}>{status}</Badge>;
    };

    return (
        <div className="artworks-table">
            {/* Alertes */}
            {alert && (
                <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
                    {alert.message}
                </Alert>
            )}

            {/* Barre d'outils */}
            <div className="d-flex justify-content-between mb-4">
                <InputGroup style={{ width: '300px' }}>
                    <InputGroup.Text>
                        <FiSearch />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                <div>
                    <Button variant="outline-secondary" className="me-2" onClick={() => setShowImportModal(true)}>
                        <FiUpload className="me-1" /> Importer
                    </Button>
                    <Button variant="outline-secondary" className="me-2" onClick={exportArtworks}>
                        <FiDownload className="me-1" /> Exporter
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        <FiPlus className="me-1" /> Ajouter
                    </Button>
                </div>
            </div>

            <Table striped hover responsive className="mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Titre</th>
                    <th>Artiste</th>
                    <th>Catégorie</th>
                    <th>Valeur</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedArtworks.length > 0 ? (
                    paginatedArtworks.map(artwork => (
                        <tr key={artwork.id}>
                            <td>{artwork.id}</td>
                            <td>
                                {artwork.image ? (
                                    <img
                                        src={artwork.image}
                                        alt={artwork.title}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        className="rounded"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <FiImage size={20} />
                                    </div>
                                )}
                            </td>
                            <td>{artwork.title}</td>
                            <td>{artwork.artist}</td>
                            <td>{artwork.category}</td>
                            <td>{artwork.value}</td>
                            <td>{getStatusBadge(artwork.status)}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-1"
                                    onClick={() => handleEdit(artwork)}
                                >
                                    <FiEdit2 />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(artwork)}
                                >
                                    <FiTrash2 />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                            Aucune œuvre trouvée
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        />
                        {[...Array(totalPages)].map((_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                active={i + 1 === currentPage}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        />
                    </Pagination>
                </div>
            )}

            {/* Modale de suppression */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer l'œuvre "{selectedArtwork?.title}" ?
                    <p className="text-danger mt-2">Cette action est irréversible.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Confirmer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modale d'import */}
            <Modal show={showImportModal} onHide={() => setShowImportModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Importer des œuvres</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Fichier JSON" className="mb-3">
                        <Form.Control
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                        />
                    </FloatingLabel>
                    <Alert variant="info">
                        Le fichier doit contenir un tableau JSON d'œuvres d'art avec la structure appropriée.
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowImportModal(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modale d'ajout/modification */}
            <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editingArtwork ? 'Modifier une œuvre' : 'Ajouter une œuvre'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleFormSubmit}>
                    <Modal.Body>
                        <FloatingLabel label="Titre" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Titre"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Artiste" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Artiste"
                                value={formData.artist}
                                onChange={(e) => setFormData({...formData, artist: e.target.value})}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Catégorie" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Catégorie"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Valeur" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Valeur"
                                value={formData.value}
                                onChange={(e) => setFormData({...formData, value: e.target.value})}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Statut" className="mb-3">
                            <Form.Select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="exposée">Exposée</option>
                                <option value="en restauration">En restauration</option>
                                <option value="en réserve">En réserve</option>
                                <option value="vendu">Vendu</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel label="URL de l'image" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="URL de l'image"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddEditModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="primary" type="submit">
                            {editingArtwork ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Styles */}
            <style jsx>{`
                .artworks-table {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                .table th {
                    font-weight: 600;
                    background-color: #f8f9fa;
                }
                .table td {
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
};

export default ArtworksTable;