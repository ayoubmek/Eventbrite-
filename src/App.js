import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontLayout from './layouts/FrontLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/front/HomePage';
import GalleryPage from './pages/front/GalleryPage';
import EventsPage from './pages/front/EventsPage';
import ContactPage from './pages/front/ContactPage';
import TicketPurchasePage from './pages/front/TicketPurchasePage';
import PaymentPage from './PaymentPage';

import Dashboard from './pages/admin/Dashboard';
import ArtworksPage from './pages/admin/ArtworksPage';
import AdminTicketsPage from './pages/admin/TicketsPage';
import AdminEventsPage from './pages/admin/EventsPage';
import UsersPage from './pages/admin/UsersPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import SettingsPage from './pages/admin/SettingsPage';
function App() {
    return (
        <Routes>
            <Route path="/" element={<FrontLayout />}>
                <Route index element={<HomePage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="tickets" element={<TicketPurchasePage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="contact" element={<ContactPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="artworks" element={<ArtworksPage />} />
                <Route path="tickets" element={<AdminTicketsPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}

export default App;