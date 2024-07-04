
import './App.css'
import { Formulario } from './components/PokemonForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PokemonLog } from './components/PokemonLog';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/home">Home</Link>
        <Link to="/consultas">Consultas recientes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/home" element={<Formulario />} />
        <Route path="/consultas" element={<PokemonLog />} />
      </Routes>
    </Router>
  );
}

export default App