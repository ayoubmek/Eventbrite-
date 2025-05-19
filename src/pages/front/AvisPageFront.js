import React, { useState } from 'react';

const AvisPageFront = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    note: 5,
    commentaire: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lire les avis existants
    const existingAvis = JSON.parse(localStorage.getItem('avis')) || [];

    // Ajouter le nouveau
    const updatedAvis = [...existingAvis, form];

    // Enregistrer dans localStorage
    localStorage.setItem('avis', JSON.stringify(updatedAvis));

    alert('Merci pour votre avis !');
    setForm({ nom: '', email: '', note: 5, commentaire: '' });
  };

  return (
    <div className="container">
      <h2>Laisser un Avis</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Note (1 à 5)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="form-control"
            value={form.note}
            onChange={e => setForm({ ...form, note: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Commentaire</label>
          <textarea
            className="form-control"
            value={form.commentaire}
            onChange={e => setForm({ ...form, commentaire: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AvisPageFront;
