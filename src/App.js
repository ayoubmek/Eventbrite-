import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontLayout from './layouts/FrontLayout';
import AdminLayout from './layouts/AdminLayout';
import AvisAdminPage from './pages/admin/AvisAdminPage';
import ReclamationsAdminPage from './pages/admin/ReclamationsAdminPage';
import Signup from './pages/auth/Signup';

// Front office pages
import HomePage from './pages/front/HomePage';
import GalleryPage from './pages/front/GalleryPage';
import EventsPage from './pages/front/EventsPage';
import ContactPage from './pages/front/ContactPage';
import TicketPurchasePage from './pages/front/TicketPurchasePage';
import AvisPageFront from './pages/front/AvisPageFront';
import ReclamationPageFront from './pages/front/ReclamationPageFront';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import ArtworksPage from './pages/admin/ArtworksPage';
import AdminTicketsPage from './pages/admin/TicketsPage';
import AdminEventsPage from './pages/admin/EventsPage';
import UsersPage from './pages/admin/UsersPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import SettingsPage from './pages/admin/SettingsPage';
import LoginPage from './pages/auth/login';
import AdvertisementManagement from './pages/admin/AdvertisementManagement';

function App() {
    return (
        <Routes>
            {/* Front Office Routes */}
            <Route path="/" element={<FrontLayout />}>
                <Route index element={<HomePage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="tickets" element={<TicketPurchasePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="avis" element={<AvisPageFront />} />
                <Route path="reclamation" element={<ReclamationPageFront />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<Signup />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="artworks" element={<ArtworksPage />} />
                <Route path="tickets" element={<AdminTicketsPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="avis" element={<AvisAdminPage />} />
                <Route path="reclamations" element={<ReclamationsAdminPage />} />
                <Route path="ads" element={<AdvertisementManagement />} />
            </Route>
        </Routes>
    );
}

export default App;
