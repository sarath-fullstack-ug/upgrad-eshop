import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import { AuthProvider } from './common/context/AuthContext';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Footer from './components/layout/footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">

      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main style={{ minHeight: '70vh', padding: '0' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/products' element={<Products />} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              {/* <Route path="/add-product" element={<ProtectedRoute adminOnly><AddProduct /></ProtectedRoute>} /> */}
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
