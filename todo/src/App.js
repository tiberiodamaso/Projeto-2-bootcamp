import Navbar from './components/Navbar'
import Usuarios from './pages/Usuarios'
import Equipe from './pages/Equipe'
import {Routes, Route} from 'react-router-dom'

function App() {


  return (
    <div className="App container">

    <Navbar />
    <Routes>
      <Route path="/" element={<Usuarios />} />
      <Route path="/equipe" element={<Equipe />} />
    </Routes>

    </div>
  );
}

export default App;
