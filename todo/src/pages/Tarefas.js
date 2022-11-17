import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

function Tarefas() {

  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const response = await axios.get('https://api.openbrewerydb.org/breweries?per_page=3')
        setTarefas(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTarefas()
    console.log(tarefas)
  }, [])

  return (
    <main>
      <h1>Estou na página tarefas</h1>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        {tarefas.map(tarefa => {
          return (
            <div className="col" >
              <div className="card mb-4 rounded-3 shadow-sm">

                {/* <!--CARD HEADER--> */}
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{tarefa.name}</h4>
                </div>

                {/* <!--CARD BODY--> */}
                <div className="card-body">

                  {/* <!--TASKS--> */}
                  <div className="align-items-center d-flex form-check form-switch justify-content-evenly mb-3">
                    <input className="col-1 form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <span className="col-9 form-check-label" htmlFor="flexSwitchCheckDefault">{tarefa.brewery_type}</span>
                    <Link to="/tarefa/delete/:id" className="col-1"><i className="bi bi-trash"></i></Link>
                  </div>

                  {/* <!--ADD TASK--> */}
                  <div className="d-flex justify-content-evenly mb-3">
                    <textarea type="text" className="form-control mx-3" id="adicionarTarefa"
                      placeholder="Minha nova tarefa"></textarea>
                    <button type="button" className="btn btn-outline-primary">ADD</button>
                  </div>

                </div>

              </div>
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default Tarefas;