import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const ENDPOINT = `${API_BASE}/api/leaderboard/`;

function rankClass(i) {
  if (i === 0) return 'rank-badge rank-1';
  if (i === 1) return 'rank-badge rank-2';
  if (i === 2) return 'rank-badge rank-3';
  return 'rank-badge rank-other';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Leaderboard: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then(r => r.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setEntries(items);
        setLoading(false);
      })
      .catch(e => {
        console.error('Leaderboard: fetch error', e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const sorted = [...entries].sort((a, b) => b.points - a.points);

  return (
    <div className="container">
      <h2 className="page-heading">🏆 Leaderboard</h2>
      <div className="card octofit-card">
        <div className="card-header">Team Rankings</div>
        <div className="card-body p-0">
          {loading && (
            <div className="octofit-spinner">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {!loading && !error && sorted.length === 0 && (
            <p className="text-muted p-3">No leaderboard entries found.</p>
          )}
          {!loading && !error && sorted.length > 0 && (
            <table className="table table-striped table-hover mb-0 octofit-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((e, i) => (
                  <tr key={e.id || i}>
                    <td><span className={rankClass(i)}>{i + 1}</span></td>
                    <td className="fw-semibold">{e.team === 'marvel' ? '🦸 Marvel' : e.team === 'dc' ? '🦇 DC' : e.team}</td>
                    <td><span className="badge bg-warning text-dark fs-6">{e.points} pts</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
