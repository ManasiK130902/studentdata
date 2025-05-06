import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Student Management System</h1>
        <p>Please login or register to continue</p>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;