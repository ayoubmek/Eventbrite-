import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="eventbrite-footer bg-dark text-white pt-5 pb-3">
            <Container>
                <Row>
                    {/* About Section */}
                    <Col lg={4} md={6} className="mb-4">
                        <h5 className="footer-heading mb-3">Eventbrite</h5>
                        <p className="footer-text">
                            Découvrez et réservez les meilleurs événements près de chez vous.
                            Concerts, festivals, ateliers et bien plus encore.
                        </p>
                        <div className="social-icons mt-3">
                            <a href="#" className="text-white me-3"><FaFacebook size={20} /></a>
                            <a href="#" className="text-white me-3"><FaTwitter size={20} /></a>
                            <a href="#" className="text-white"><FaInstagram size={20} /></a>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6} className="mb-4">
                        <h5 className="footer-heading mb-3">Navigation</h5>
                        <ul className="footer-links list-unstyled">
                            <li className="mb-2"><Link to="/events" className="footer-link">Événements</Link></li>
                            <li className="mb-2"><Link to="/categories" className="footer-link">Catégories</Link></li>
                            <li className="mb-2"><Link to="/create" className="footer-link">Créer un événement</Link></li>
                            <li className="mb-2"><Link to="/help" className="footer-link">Aide</Link></li>
                        </ul>
                    </Col>

                    {/* Contact */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="footer-heading mb-3">Contact</h5>
                        <ul className="footer-contact list-unstyled">
                            <li className="mb-2">
                                <FaMapMarkerAlt className="me-2" />
                                Paris, France
                            </li>
                            <li className="mb-2">
                                <FaEnvelope className="me-2" />
                                contact@eventbrite.fr
                            </li>
                        </ul>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="footer-heading mb-3">Newsletter</h5>
                        <p className="footer-text">Recevez les derniers événements</p>
                        <div className="newsletter-form d-flex">
                            <input
                                type="email"
                                className="form-control rounded-0"
                                placeholder="Votre email"
                            />
                            <button className="btn btn-primary rounded-0 px-3">
                                OK
                            </button>
                        </div>
                    </Col>
                </Row>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col className="text-center">
                        <p className="footer-copyright mb-0">
                            &copy; {currentYear} Eventbrite. Tous droits réservés.
                            <span className="mx-2">•</span>
                            <Link to="/terms" className="footer-legal-link">Conditions</Link>
                            <span className="mx-2">•</span>
                            <Link to="/privacy" className="footer-legal-link">Confidentialité</Link>
                        </p>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .eventbrite-footer {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                }
                .footer-heading {
                    font-size: 1rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .footer-text {
                    color: #adb5bd;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }
                .footer-links {
                    font-size: 0.9rem;
                }
                .footer-link {
                    color: #adb5bd;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .footer-link:hover {
                    color: #fff;
                }
                .footer-contact {
                    color: #adb5bd;
                    font-size: 0.9rem;
                }
                .social-icons a {
                    transition: opacity 0.2s;
                }
                .social-icons a:hover {
                    opacity: 0.8;
                    text-decoration: none;
                }
                .newsletter-form input {
                    background-color: #343a40;
                    border-color: #495057;
                    color: white;
                }
                .newsletter-form input:focus {
                    background-color: #343a40;
                    color: white;
                }
                .footer-copyright {
                    color: #6c757d;
                    font-size: 0.85rem;
                }
                .footer-legal-link {
                    color: #6c757d;
                    text-decoration: none;
                }
                .footer-legal-link:hover {
                    color: #adb5bd;
                    text-decoration: underline;
                }
                hr {
                    border-color: #495057;
                }
            `}</style>
        </footer>
    );
};

export default Footer;