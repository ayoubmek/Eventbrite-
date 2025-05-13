import PageController from '../controllers/PageController';
import Dashboard from '../pages/admin/Dashboard';
import ArtworksPage from '../pages/admin/ArtworksPage';
import Tickets from '../pages/admin/Tickets';
import Login from '../pages/auth/Login';
import Page404 from '../pages/errors/Page404';

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
        path: '/login',
        ...PageController.getPublicPage(Login, 'Connexion')
    },
    {
        path: '*',
        ...PageController.getErrorPage(Page404, 'Page non trouvée')
    }
];

export default routesConfig;