// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cadastrar } from './pages/Cadastrar';
import { Listar } from './pages/Listar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastrar />} />
        <Route path="/listar" element={<Listar />} />
      </Routes>
    </Router>
  );
}

export default App;
