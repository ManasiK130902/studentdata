import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import StudentTable from './StudentTable';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import ViewDetails from './ViewDetails';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<PrivateRoute><StudentTable /></PrivateRoute>} />
          <Route path="/student/create" element={<PrivateRoute><CreateStudent /></PrivateRoute>} />
          <Route path="/student/edit/:studentid" element={<PrivateRoute><EditStudent /></PrivateRoute>} />
          <Route path="/student/view/:studentid" element={<PrivateRoute><ViewDetails /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



//json-server --watch db.json --port 8000
//netstat -ano | findstr :8000
//taskkill /PID 12345 /F