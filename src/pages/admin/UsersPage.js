import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert, Container, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

const initialUsers = [
    { id: 1, nom: 'Alice Martin', email: 'alice.martin@example.com', password: '******', role: 'administrateur' },
    { id: 2, nom: 'Bob Dupont', email: 'bob.dupont@example.com', password: '******', role: 'utilisateur' },
];

const UsersPage = () => {
    const [users, setUsers] = useState(initialUsers);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        role: 'utilisateur',
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser) {
            setUsers(users.map(user => user.id === currentUser.id ? { ...formData, id: currentUser.id } : user));
            setAlertMessage('Utilisateur modifié avec succès');
        } else {
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            setUsers([...users, { ...formData, id: newId }]);
            setAlertMessage('Utilisateur ajouté avec succès');
        }
        setShowAlert(true);
        setShowModal(false);
        setCurrentUser(null);
        setFormData({ nom: '', email: '', password: '', role: 'utilisateur' });
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setFormData({
            nom: user.nom,
            email: user.email,
            password: user.password,
            role: user.role,
        });
        setShowModal(true);
    };

    const handleShow = (user) => {
        setCurrentUser(user);
        setShowDetailModal(true);
    };

    const handleDelete = (id) => {
        setUserToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(user => user.id !== userToDelete));
        setAlertMessage('Utilisateur supprimé avec succès');
        setShowAlert(true);
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const getRoleBadge = (role) => {
        const variants = {
            'administrateur': 'primary',
            'utilisateur': 'secondary',
        };
        return <Badge bg={variants[role]}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
    };

    return (
        <Container className="users-page py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="page-title">Gestion des Utilisateurs</h2>
                <Button variant="primary" onClick={() => setShowModal(true)} className="add-button">
                    <FiPlus className="me-1" /> Ajouter un utilisateur
                </Button>
            </div>

            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="alert-message">
                    {alertMessage}
                </Alert>
            )}

            <Table striped bordered hover responsive className="users-table">
                <thead className="table-header">
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.nom}</td>
                        <td>{user.email}</td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>
                            <div className="action-buttons">
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => handleShow(user)}
                                    title="Voir les détails"
                                >
                                    <FiEye />
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEdit(user)}
                                    title="Modifier"
                                >
                                    <FiEdit2 />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
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
                setCurrentUser(null);
                setFormData({ nom: '', email: '', password: '', role: 'utilisateur' });
            }} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>{currentUser ? 'Modifier' : 'Ajouter'} un utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={formData.nom}
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
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rôle</Form.Label>
                            <Form.Select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            >
                                <option value="administrateur">Administrateur</option>
                                <option value="utilisateur">Utilisateur</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="modal-footer-buttons">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {currentUser ? 'Mettre à jour' : 'Ajouter'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Détails de l'utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentUser && (
                        <div className="user-details">
                            <h4 className="user-title">{currentUser.nom}</h4>
                            <div className="detail-item">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{currentUser.email}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Rôle:</span>
                                <span className="detail-value">{getRoleBadge(currentUser.role)}</span>
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

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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

export default UsersPage;
