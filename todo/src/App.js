import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Usuarios from './pages/Usuarios'
import Equipe from './pages/Equipe'
import Detalhes from './pages/Detalhes';

function App() {


  return (
    <div className="App container">

    <Navbar />
    <Routes>
      <Route path="/" element={<Usuarios />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/equipe/:id" element={<Detalhes />} />
    </Routes>

    </div>
  );
}

export default App;
