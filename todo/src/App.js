import Navbar from './components/Navbar'
import Tarefas from './pages/Tarefas'
import Equipe from './pages/Equipe'
import {Routes, Route} from 'react-router-dom'

function App() {


  return (
    <div className="App container">

    <Navbar />
    <Routes>
      <Route path="/" element={<Tarefas />} />
      <Route path="/equipe" element={<Equipe />} />
    </Routes>

    </div>
  );
}

export default App;
