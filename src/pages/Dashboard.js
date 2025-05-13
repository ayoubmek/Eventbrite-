import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="card-title">Billets vendus</h5>
                            <h2 className="mb-0">1,254</h2>
                            <small className="text-success">+12% ce mois</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="card-title">Œuvres exposées</h5>
                            <h2 className="mb-0">87</h2>
                            <small className="text-success">+5 nouvelles œuvres</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="card-title">Revenue mensuel</h5>
                            <h2 className="mb-0">€42,580</h2>
                            <small className="text-danger">-3% vs dernier mois</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow-sm">
                <Card.Body>
                    <h5 className="card-title">Activité récente</h5>
                    <div className="text-center py-4 text-muted">
                        Graphique ou tableau des activités récentes
                    </div>
                </Card.Body>
            </Card>
        </AdminLayout>
    );
};

export default Dashboard;