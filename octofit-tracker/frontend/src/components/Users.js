import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const ENDPOINT = `${API_BASE}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Users: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then(r => r.json())
      .then(data => {
        console.log('Users: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setUsers(items);
        setLoading(false);
      })
      .catch(e => {
        console.error('Users: fetch error', e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="page-heading">🦸 Users</h2>
      <div className="card octofit-card">
        <div className="card-header">Registered Superheroes</div>
        <div className="card-body p-0">
          {loading && (
            <div className="octofit-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {!loading && !error && users.length === 0 && (
            <p className="text-muted p-3">No users found.</p>
          )}
          {!loading && !error && users.length > 0 && (
            <table className="table table-striped table-hover mb-0 octofit-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id || i}>
                    <td>{i + 1}</td>
                    <td className="fw-semibold">{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="badge bg-secondary">{u.team}</span></td>
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

export default Users;
