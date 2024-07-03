
import './App.css'
import { Formulario } from './components/PokemonForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PokemonLog } from './components/PokemonLog';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/">Home</Link>
        <Link to="/consultas">Consultas recientes</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Formulario />} />
        <Route path="/consultas" element={<PokemonLog />} />
      </Routes>
    </Router>
  );
}

export default App
