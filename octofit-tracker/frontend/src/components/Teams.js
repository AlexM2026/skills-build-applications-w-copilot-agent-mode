import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const ENDPOINT = `${API_BASE}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Teams: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then(r => r.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setTeams(items);
        setLoading(false);
      })
      .catch(e => {
        console.error('Teams: fetch error', e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="page-heading">👥 Teams</h2>
      <div className="row g-4">
        {loading && (
          <div className="octofit-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && teams.length === 0 && (
          <p className="text-muted">No teams found.</p>
        )}
        {!loading && !error && teams.map((t, i) => (
          <div key={t.id || i} className="col-sm-6 col-lg-4">
            <div className="card octofit-card h-100">
              <div className="card-header">{t.name === 'marvel' ? '🦸 Marvel' : t.name === 'dc' ? '🦇 DC' : t.name}</div>
              <div className="card-body">
                <p className="card-text">{t.description || 'No description available.'}</p>
              </div>
              <div className="card-footer text-muted small">Team ID: {t.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
