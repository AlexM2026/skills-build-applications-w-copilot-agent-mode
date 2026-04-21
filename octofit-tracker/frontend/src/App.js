import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container">
      <div className="octofit-hero">
        <h1 className="display-4">🦸 Welcome to OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities and compete with your superhero team!</p>
        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <p className="mb-4">Use the navigation menu above to view Users, Teams, Activities, Leaderboard, and Workouts.</p>
        <div className="hero-links d-flex flex-wrap gap-2">
          <Link to="/activities" className="btn btn-warning btn-lg fw-bold">🏃 Activities</Link>
          <Link to="/leaderboard" className="btn btn-outline-light btn-lg">🏆 Leaderboard</Link>
          <Link to="/workouts" className="btn btn-outline-light btn-lg">💪 Workouts</Link>
          <Link to="/teams" className="btn btn-outline-light btn-lg">👥 Teams</Link>
          <Link to="/users" className="btn btn-outline-light btn-lg">🦸 Users</Link>
        </div>
      </div>

      <div className="row mt-4 g-4">
        {[
          { to: '/users', icon: '🦸', title: 'Users', desc: 'View all registered superheroes.' },
          { to: '/teams', icon: '👥', title: 'Teams', desc: 'Browse Marvel and DC teams.' },
          { to: '/activities', icon: '🏃', title: 'Activities', desc: 'Log and view fitness activities.' },
          { to: '/leaderboard', icon: '🏆', title: 'Leaderboard', desc: 'See who leads the pack.' },
          { to: '/workouts', icon: '💪', title: 'Workouts', desc: 'Explore available workouts.' },
        ].map(card => (
          <div key={card.to} className="col-sm-6 col-lg-4">
            <div className="card octofit-card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{card.icon} {card.title}</h5>
                <p className="card-text text-muted flex-grow-1">{card.desc}</p>
                <Link to={card.to} className="btn btn-primary mt-2">View {card.title}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🏋️ OctoFit Tracker</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: '/users', label: '🦸 Users' },
              { to: '/teams', label: '👥 Teams' },
              { to: '/activities', label: '🏃 Activities' },
              { to: '/leaderboard', label: '🏆 Leaderboard' },
              { to: '/workouts', label: '💪 Workouts' },
            ].map(item => (
              <li key={item.to} className="nav-item">
                <NavLink
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="octofit-footer">
      <div className="container">
        <span>OctoFit Tracker &copy; {new Date().getFullYear()} &mdash; Built with React &amp; Django</span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
