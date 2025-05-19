import PageController from '../controllers/PageController';
import Dashboard from '../pages/admin/Dashboard';
import ArtworksPage from '../pages/admin/ArtworksPage';
import Tickets from '../pages/admin/Tickets';
import Login from '../pages/auth/Login';
import Page404 from '../pages/errors/Page404';

import AvisPageFront from '../pages/front/AvisPageFront';
import ReclamationPageFront from '../pages/front/ReclamationPageFront';

const routesConfig = [
    {
        path: '/admin',
        ...PageController.getAdminPage(Dashboard, 'Tableau de bord'),
        exact: true
    },
    {
        path: '/admin/artworks',
        ...PageController.getAdminPage(ArtworksPage, 'Gestion des œuvres')
    },
    {
        path: '/admin/tickets',
        ...PageController.getAdminPage(Tickets, 'Gestion des billets')
    },
    {
        path: '/avis',
        ...PageController.getPublicPage(AvisPageFront, 'Avis des utilisateurs')
    },
    {
        path: '/reclamation',
        ...PageController.getPublicPage(ReclamationPageFront, 'Réclamation')
    },
    {
        path: '/login',
        ...PageController.getPublicPage(Login, 'Connexion')
    },
    {
        path: '*',
        ...PageController.getErrorPage(Page404, 'Page non trouvée')
    }
];

export default routesConfig;
