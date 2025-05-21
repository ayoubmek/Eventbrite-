
import React, { useEffect, useState } from 'react';

const ReclamationsAdminPage = () => {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reclamations')) || [];
    setReclamations(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = [...reclamations];
    updated.splice(index, 1);
    setReclamations(updated);
    localStorage.setItem('reclamations', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2>Gestion des Réclamations</h2>
      {reclamations.length === 0 ? (
        <p>Aucune réclamation enregistrée.</p>
      ) : reclamations.map((r, index) => (
        <div key={index} className="card my-2 p-3">
          <p><strong>Nom:</strong> {r.nom}</p>
          <p><strong>Email:</strong> {r.email}</p>
          <p><strong>Sujet:</strong> {r.sujet}</p>
          <p><strong>Message:</strong> {r.message}</p>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default ReclamationsAdminPage;
