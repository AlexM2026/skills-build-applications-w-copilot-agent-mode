import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const ENDPOINT = `${API_BASE}/api/workouts/`;

function difficultyBadge(level) {
  const map = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' };
  return `badge ${map[level?.toLowerCase()] || 'bg-secondary'}`;
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Workouts: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then(r => r.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setWorkouts(items);
        setLoading(false);
      })
      .catch(e => {
        console.error('Workouts: fetch error', e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="page-heading">💪 Workouts</h2>
      <div className="row g-4">
        {loading && (
          <div className="octofit-spinner">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && workouts.length === 0 && (
          <p className="text-muted">No workouts found.</p>
        )}
        {!loading && !error && workouts.map((w, i) => (
          <div key={w.id || i} className="col-sm-6 col-lg-4">
            <div className="card octofit-card h-100">
              <div className="card-header">💪 {w.name}</div>
              <div className="card-body">
                <p className="card-text">{w.description || 'No description.'}</p>
              </div>
              <div className="card-footer">
                <span className={difficultyBadge(w.difficulty)}>{w.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
