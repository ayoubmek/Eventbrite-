import React from 'react';
import { Card, Row, Col, Container, ProgressBar } from 'react-bootstrap';
import {
    FiImage,
    FiDollarSign,
    FiPieChart,
    FiTrendingUp,
    FiUsers
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    // Sample data - replace with your actual data
    const ticketStats = {
        total: 1245,
        validated: 890,
        pending: 210,
        cancelled: 145,
        types: {
            standard: 800,
            vip: 300,
            reduced: 100,
            group: 45
        }
    };

    const artworkStats = {
        total: 87,
        exposed: 65,
        inRestoration: 12,
        inReserve: 10,
        categories: {
            painting: 60,
            sculpture: 20,
            photography: 7
        }
    };

    const revenueData = {
        total: '€42,580',
        monthlyTrend: 12, // percentage
        byEvent: [
            { name: 'Exposition Van Gogh', amount: '€15,250' },
            { name: 'Concert Classique', amount: '€12,300' },
            { name: 'Visite Guidée', amount: '€8,750' },
            { name: 'Autres', amount: '€6,280' }
        ]
    };

    // Helper functions
    const calculatePercentage = (value, total) => {
        return Math.round((value / total) * 100);
    };

    return (
        <Container className="dashboard-container py-4">
            <h2 className="dashboard-title mb-4">
                <FiPieChart className="me-2" /> Tableau de Bord
            </h2>

            {/* Summary Cards */}
            <Row className="mb-4">
                {/* Tickets Summary */}
                <Col md={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Billets</h5>
                                    <h2 className="mb-0">{ticketStats.total}</h2>
                                </div>
                                <div className="icon-container bg-primary">

                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Validés</span>
                                    <span>{ticketStats.validated} ({calculatePercentage(ticketStats.validated, ticketStats.total)}%)</span>
                                </div>
                                <ProgressBar
                                    variant="success"
                                    now={calculatePercentage(ticketStats.validated, ticketStats.total)}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Artworks Summary */}
                <Col md={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Œuvres d'Art</h5>
                                    <h2 className="mb-0">{artworkStats.total}</h2>
                                </div>
                                <div className="icon-container bg-warning">
                                    <FiImage size={24} />
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Exposées</span>
                                    <span>{artworkStats.exposed} ({calculatePercentage(artworkStats.exposed, artworkStats.total)}%)</span>
                                </div>
                                <ProgressBar
                                    variant="info"
                                    now={calculatePercentage(artworkStats.exposed, artworkStats.total)}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Revenue Summary */}
                <Col md={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Revenue Total</h5>
                                    <h2 className="mb-0">{revenueData.total}</h2>
                                </div>
                                <div className="icon-container bg-success">
                                    <FiDollarSign size={24} />
                                </div>
                            </div>
                            <div className="mt-3 d-flex align-items-center">
                                <FiTrendingUp className="me-2 text-success" />
                                <span>+{revenueData.monthlyTrend}% ce mois</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Detailed Statistics */}
            <Row>
                {/* Ticket Types */}
                <Col md={6} className="mb-4">
                    <Card className="stats-card">
                        <Card.Header>
                            <h5><span className="me-2" /> Répartition des Billets</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <h6>Par Type</h6>
                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Standard</span>
                                        <span>{ticketStats.types.standard} ({calculatePercentage(ticketStats.types.standard, ticketStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="primary" now={calculatePercentage(ticketStats.types.standard, ticketStats.total)} />
                                </div>

                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>VIP</span>
                                        <span>{ticketStats.types.vip} ({calculatePercentage(ticketStats.types.vip, ticketStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="success" now={calculatePercentage(ticketStats.types.vip, ticketStats.total)} />
                                </div>

                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Réduit</span>
                                        <span>{ticketStats.types.reduced} ({calculatePercentage(ticketStats.types.reduced, ticketStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="info" now={calculatePercentage(ticketStats.types.reduced, ticketStats.total)} />
                                </div>

                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Groupe</span>
                                        <span>{ticketStats.types.group} ({calculatePercentage(ticketStats.types.group, ticketStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="warning" now={calculatePercentage(ticketStats.types.group, ticketStats.total)} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Artwork Categories */}
                <Col md={6} className="mb-4">
                    <Card className="stats-card">
                        <Card.Header>
                            <h5><FiImage className="me-2" /> Catégories d'Œuvres</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <h6>Par Type</h6>
                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Peintures</span>
                                        <span>{artworkStats.categories.painting} ({calculatePercentage(artworkStats.categories.painting, artworkStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="primary" now={calculatePercentage(artworkStats.categories.painting, artworkStats.total)} />
                                </div>

                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Sculptures</span>
                                        <span>{artworkStats.categories.sculpture} ({calculatePercentage(artworkStats.categories.sculpture, artworkStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="success" now={calculatePercentage(artworkStats.categories.sculpture, artworkStats.total)} />
                                </div>

                                <div className="mt-2">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Photographies</span>
                                        <span>{artworkStats.categories.photography} ({calculatePercentage(artworkStats.categories.photography, artworkStats.total)}%)</span>
                                    </div>
                                    <ProgressBar variant="info" now={calculatePercentage(artworkStats.categories.photography, artworkStats.total)} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Revenue by Event */}
            <Row>
                <Col md={12}>
                    <Card className="stats-card">
                        <Card.Header>
                            <h5><FiDollarSign className="me-2" /> Revenue par Événement</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {revenueData.byEvent.map((event, index) => (
                                    <Col md={3} key={index}>
                                        <div className="revenue-item">
                                            <h6>{event.name}</h6>
                                            <div className="revenue-amount">{event.amount}</div>
                                            <ProgressBar
                                                variant={index % 2 === 0 ? "primary" : "success"}
                                                now={100}
                                                className="revenue-progress"
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;