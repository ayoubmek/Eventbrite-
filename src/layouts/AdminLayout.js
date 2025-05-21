import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'; // Add this import
import AdminNavbar from '../components/admin/AdminNavbar';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="admin-dashboard">
            <AdminNavbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className={`admin-sidebar-container ${showSidebar ? 'show' : ''}`}>
                        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </Col>

                    <Col md={9} lg={10} className="admin-main">
                        {/* Replace {children} with Outlet */}
                        <Outlet />
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .admin-dashboard {
                    min-height: 100vh;
                    background-color: #f5f7fa;
                }
                .admin-sidebar-container {
                    position: fixed;
                    height: calc(100vh - 56px);
                    overflow-y: auto;
                    transition: transform 0.3s;
                    z-index: 100;
                    background: #2c3e50;
                }
                @media (max-width: 992px) {
                    .admin-sidebar-container {
                        transform: translateX(-100%);
                    }
                    .admin-sidebar-container.show {
                        transform: translateX(0);
                    }
                }
                .admin-main {
                    margin-left: 250px;
                    padding: 20px;
                    width: calc(100% - 250px);
                }
                @media (max-width: 992px) {
                    .admin-main {
                        margin-left: 0;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;