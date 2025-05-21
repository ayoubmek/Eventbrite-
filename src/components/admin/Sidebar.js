import React from 'react';
import { Nav } from 'react-bootstrap';
import {
    FiHome,
    FiImage,
    FiUsers,
    FiCalendar,
    FiSettings,
    FiLayers,
    FiDollarSign,
    FiStar,
    FiAlertCircle,
    FiLogOut
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Menu items data with corresponding routes
    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: <FiHome className="me-2" />, path: '/admin' },
        { id: 'artworks', label: 'Œuvres d\'art', icon: <FiImage className="me-2" />, path: '/admin/artworks' },
        { id: 'tickets', label: 'Billets', icon: <FiDollarSign className="me-2" />, path: '/admin/tickets' },
        { id: 'events', label: 'Événements', icon: <FiCalendar className="me-2" />, path: '/admin/events' },
        { id: 'ads', label: 'Publicités', icon: <FiImage className="me-2" />, path: '/admin/ads' },
        { id: 'users', label: 'Utilisateurs', icon: <FiUsers className="me-2" />, path: '/admin/users' },
        { id: 'categories', label: 'Catégories', icon: <FiLayers className="me-2" />, path: '/admin/categories' },
        { id: 'avis', label: 'Avis', icon: <FiStar className="me-2" />, path: '/admin/avis' },
        { id: 'reclamations', label: 'Réclamations', icon: <FiAlertCircle className="me-2" />, path: '/admin/reclamations' },
        { id: 'settings', label: 'Paramètres', icon: <FiSettings className="me-2" />, path: '/admin/settings' }
    ];

    // Check if item is active based on current route
    const isActive = (path) => {
        return location.pathname === path ||
            (path !== '/admin' && location.pathname.startsWith(path));
    };

    const handleLogout = () => {
        // Supprimer les données de l'utilisateur du localStorage
        localStorage.removeItem('currentUser');
        // Rediriger vers la page de connexion
        navigate('/login');
    };

    return (
        <Nav className="flex-column pt-3">
            {menuItems.map((item) => (
                <Nav.Link
                    key={item.id}
                    active={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                    className="sidebar-link"
                >
                    {item.icon}
                    {item.label}
                </Nav.Link>
            ))}

            <Nav.Link
                onClick={handleLogout}
                className="sidebar-link mt-auto"
                style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
                <FiLogOut className="me-2" />
                Déconnexion
            </Nav.Link>

            <style jsx>{`
                .sidebar-link {
                    color: rgba(255, 255, 255, 0.8);
                    padding: 12px 20px;
                    border-left: 3px solid transparent;
                    transition: all 0.3s ease;
                    margin-bottom: 4px;
                    cursor: pointer;
                }
                .sidebar-link:hover {
                    color: white;
                    background: rgba(255, 255, 255, 0.1);
                    text-decoration: none;
                }
                .sidebar-link.active {
                    color: white;
                    background: rgba(255, 255, 255, 0.1);
                    border-left: 3px solid #3498db;
                }
            `}</style>
        </Nav>
    );
};

export default Sidebar;
