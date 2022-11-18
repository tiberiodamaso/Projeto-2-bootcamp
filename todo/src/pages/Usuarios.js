import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

function Usuarios() {

  const [usuarios, setUsuarios] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await axios.get('https://ironrest.herokuapp.com/todo92/')
        setUsuarios(response.data)
        setIsLoading(false)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsuarios()
    
  }, [])

  function handleChange(e) {
    setSearch(e.target.value)
    console.log(search)
  }

  return (

    <main>

     {isLoading === false && (

<div>
      <div className="col-10 justify-content-center mx-auto my-4 py-md-4 row text-center">
        <input type="search" value={search} className="form-control" placeholder="Pesquise por nome e setor do membro da equipe" aria-label="Search" onChange={handleChange}/>
      </div>

      <h1>Estou na página tarefas</h1>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        {usuarios.filter(usuario => {
          return usuario.nome.toLowerCase().includes(search) || usuario.setor.toLowerCase().includes(search)
        }).map(usuario => {
          return (
            <div className="col" key={usuario._id}>
              <div className="card mb-4 rounded-3 shadow-sm">

                {/* <!--CARD HEADER--> */}
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{usuario.nome}</h4>
                </div>

                {/* <!--CARD BODY--> */}
                <div className="card-body">

                  {/* <!--TASKS--> */}
                  <div className="align-items-center d-flex form-check form-switch justify-content-evenly mb-3">
                    {usuario.tarefa.map((t, index)=>{
                       return (
                        <div key={index}>
                        <input className="col-1 form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <span className="col-9 form-check-label" htmlFor="flexSwitchCheckDefault">
                              {t.nome}       
                    </span>
                    <Link to="/tarefa/delete/:id" className="col-1"><i className="bi bi-trash"></i></Link>
                    </div>
                       )

                    })}
                  
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

      </div>
     )}


    </main>

  );
}

export default Usuarios;