import { useEffect, useState } from "react";
import axios from "axios";

import Usuario from "../components/Usuario";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/todo92/"
        );
        setUsuarios(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsuarios();
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleReload() {
    setReload(!reload);
  }

  return (
    <main>
      {isLoading === false && (
        <div>
          <div className="col-10 justify-content-center mx-auto my-4 py-md-4 row text-center">
            <input
              type="search"
              value={search}
              className="form-control"
              placeholder="Pesquise por nome e setor do membro da equipe"
              aria-label="Search"
              onChange={handleSearch}
            />
          </div>

          <div className="row">
            <h1 className="text-center p-4">Tarefas</h1>
          </div>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {usuarios
              .filter((usuario) => {
                return (
                  usuario.nome.toLowerCase().includes(search) ||
                  usuario.setor.toLowerCase().includes(search)
                );
              })
              .map((usuario) => (
                <Usuario key={usuario._id} usuario={usuario} handleReload={handleReload} />
              ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Usuarios;
