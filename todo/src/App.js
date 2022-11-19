import Navbar from "./components/Navbar";
import Usuarios from "./pages/Usuarios";
import Equipe from "./pages/Equipe";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App container">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/novo" element={<CadastrarUsuario />} />
      </Routes>
    </div>
  );
}

export default App;
