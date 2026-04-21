import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const ENDPOINT = `${API_BASE}/api/activities/`;

const ACTIVITY_ICONS = {
  run: '🏃', cycle: '🚴', swim: '🏊', walk: '🚶', fly: '🦸', gym: '🏋️',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Activities: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then(r => r.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setActivities(items);
        setLoading(false);
      })
      .catch(e => {
        console.error('Activities: fetch error', e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="page-heading">🏃 Activities</h2>
      <div className="card octofit-card">
        <div className="card-header">Fitness Activity Log</div>
        <div className="card-body p-0">
          {loading && (
            <div className="octofit-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {!loading && !error && activities.length === 0 && (
            <p className="text-muted p-3">No activities found.</p>
          )}
          {!loading && !error && activities.length > 0 && (
            <table className="table table-striped table-hover mb-0 octofit-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={a.id || i}>
                    <td>{i + 1}</td>
                    <td className="fw-semibold">{a.user}</td>
                    <td>{ACTIVITY_ICONS[a.activity_type] || '🏅'} {a.activity_type}</td>
                    <td><span className="badge bg-primary">{a.duration} min</span></td>
                    <td>{a.date}</td>
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

export default Activities;
