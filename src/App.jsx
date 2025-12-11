import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPhone from './pages/LoginPhone';
import OtpVerify from './pages/OtpVerify';
import Dashboard from './pages/Dashboard';
import FoodList from './pages/FoodList';
import FoodForm from './pages/FoodForm';
import Orders from './pages/Orders';
import Partners from './pages/Partners';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPhone />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/food" element={<FoodList />} />
            <Route path="/food/new" element={<FoodForm />} />
            <Route path="/food/edit/:id" element={<FoodForm />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partners/new" element={<Partners />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;