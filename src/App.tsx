import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SubscriptionPage } from './pages/SubscriptionPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;