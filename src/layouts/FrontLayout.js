import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import FrontNavbar from '../components/front/FrontNavbar';
import Footer from '../components/front/Footer';

const FrontLayout = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <div className="front-layout">
            <FrontNavbar toggleMenu={() => setShowMobileMenu(!showMobileMenu)} />

            <Container fluid className="main-content">
                <Row>
                    <Col className="content-area">
                        {/* Main content area with Outlet for nested routes */}
                        <Outlet />
                    </Col>
                </Row>
            </Container>

            <Footer />

            <style jsx>{`
                .front-layout {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .main-content {
                    flex: 1;
                    padding: 0;
                }
                .content-area {
                    padding: 20px;
                }
                @media (max-width: 768px) {
                    .content-area {
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default FrontLayout;