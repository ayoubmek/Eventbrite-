// Ticket.js
import React from "react";
import "./Ticket.css"; // Move styles to this file or keep using styled-jsx if you're in Next.js

const Ticket = () => {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* Ticket 1 */}
            <div className="col">
                <div className="card h-100 border-primary shadow ticket-card">
                    <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">🎟️ #INF-001 - Problème d'inscription</h5>
                    </div>
                    <img
                        src="https://via.placeholder.com/300x150/007bff/ffffff?text=Bug+Inscription"
                        className="card-img-top img-ticket"
                        alt="Problème Inscription"
                    />
                    <div className="card-body">
                        <p className="card-text">🚫 Certains participants ne peuvent pas finaliser leur inscription à l'événement via le site.</p>
                        <ul className="list-group list-group-flush mb-3">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Statut</span>
                                <span className="badge bg-warning text-dark">⏳ En cours</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Priorité</span>
                                <span className="text-danger fw-bold">🔥 Haute</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Créé le</span>
                                <small className="text-muted">12/05/2025</small>
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-outline-primary btn-sm btn-action">👁️ Voir Détails</button>
                            <button className="btn btn-primary btn-sm btn-action">✏️ Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket 2 */}
            <div className="col">
                <div className="card h-100 border-success shadow ticket-card">
                    <div className="card-header bg-success text-white">
                        <h5 className="card-title mb-0">💡 #INF-002 - Suggestion d'amélioration</h5>
                    </div>
                    <img
                        src="https://via.placeholder.com/300x150/28a745/ffffff?text=Suggestion+App"
                        className="card-img-top img-ticket"
                        alt="Suggestion Application"
                    />
                    <div className="card-body">
                        <p className="card-text">🌙 Proposition d'ajouter un mode sombre à l'application mobile de l'événement.</p>
                        <ul className="list-group list-group-flush mb-3">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Statut</span>
                                <span className="badge bg-success">✅ Terminé</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Priorité</span>
                                <span className="text-info fw-bold">🔵 Moyenne</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Créé le</span>
                                <small className="text-muted">10/05/2025</small>
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-outline-success btn-sm btn-action">👁️ Voir Détails</button>
                            <button className="btn btn-success btn-sm btn-action">✏️ Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket 3 */}
            <div className="col">
                <div className="card h-100 border-info shadow ticket-card">
                    <div className="card-header bg-info text-dark">
                        <h5 className="card-title mb-0">🐞 #INF-003 - Bug d'affichage mobile</h5>
                    </div>
                    <img
                        src="https://via.placeholder.com/300x150/17a2b8/ffffff?text=Bug+Mobile"
                        className="card-img-top img-ticket"
                        alt="Bug Mobile"
                    />
                    <div className="card-body">
                        <p className="card-text">📱 Le menu mobile ne se referme pas lorsque l’on clique en dehors de celui-ci.</p>
                        <ul className="list-group list-group-flush mb-3">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Statut</span>
                                <span className="badge bg-info text-dark">📂 Ouvert</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Priorité</span>
                                <span className="text-warning fw-bold">🟡 Faible</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Créé le</span>
                                <small className="text-muted">08/05/2025</small>
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-outline-info btn-sm btn-action">👁️ Voir Détails</button>
                            <button className="btn btn-info btn-sm btn-action">✏️ Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
