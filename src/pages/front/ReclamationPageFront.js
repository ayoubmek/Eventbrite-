import React, { useState } from 'react';

const ReclamationPageFront = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lire les réclamations existantes
    const existingReclamations = JSON.parse(localStorage.getItem('reclamations')) || [];

    // Ajouter la nouvelle
    const updatedReclamations = [...existingReclamations, form];

    // Enregistrer dans localStorage
    localStorage.setItem('reclamations', JSON.stringify(updatedReclamations));

    alert('Réclamation envoyée. Merci pour votre retour.');
    setForm({ nom: '', email: '', sujet: '', message: '' });
  };

  return (
    <div className="container">
      <h2>Soumettre une Réclamation</h2>
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
          <label>Sujet</label>
          <input
            type="text"
            className="form-control"
            value={form.sujet}
            onChange={e => setForm({ ...form, sujet: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea
            className="form-control"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-warning" type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ReclamationPageFront;
