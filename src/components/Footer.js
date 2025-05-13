import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Galerie d'Art</h5>
                        <p>Découvrez les plus belles œuvres d'art contemporain.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <p>123 Rue des Arts, Paris<br/>contact@galerie-art.com</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Réseaux sociaux</h5>
                        <div className="social-icons">
                            <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white me-2"><i className="bi bi-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <hr/>
                <p className="text-center mb-0">&copy; 2023 Galerie d'Art. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;