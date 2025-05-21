
import React, { useEffect, useState } from 'react';

const AvisAdminPage = () => {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    const storedAvis = JSON.parse(localStorage.getItem('avis')) || [];
    setAvis(storedAvis);
  }, []);

  const handleDelete = (index) => {
    const updated = [...avis];
    updated.splice(index, 1);
    setAvis(updated);
    localStorage.setItem('avis', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2>Gestion des Avis</h2>
      {avis.length === 0 ? (
        <p>Aucun avis enregistré.</p>
      ) : avis.map((a, index) => (
        <div key={index} className="card my-2 p-3">
          <p><strong>Nom:</strong> {a.nom}</p>
          <p><strong>Email:</strong> {a.email}</p>
          <p><strong>Note:</strong> {'⭐'.repeat(a.note)}</p>
          <p><strong>Commentaire:</strong> {a.commentaire}</p>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default AvisAdminPage;
