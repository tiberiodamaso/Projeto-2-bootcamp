import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [tarefas, setTarefas] = useState([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const response = await axios.get('https://ironrest.herokuapp.com/todo92/')
                setUsuarios(response.data)
                setTarefas(usuarios.map(usuario => {
                    return usuario.tarefas.map(tarefa => {
                        return tarefa.nome.toLowerCase()
                    })
                }))
                setIsLoading(false)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsuarios()
        console.log(tarefas.flat())
    }, [reload])

    function handleChange(e) {
        setSearch(e.target.value)
        console.log(search)
        handleReload()
    }

    function handleReload() {
        setReload(!reload)
      }

    async function handleDelete(e) {
        console.log(e)
        const usuario = e.currentTarget.name
        const tarefas = await axios.get('https://ironrest.herokuapp.com/todo92/')
        await axios.delete('https://ironrest.herokuapp.com/todo92/')
        handleReload()
    }

    return (

        <main>

            {isLoading === false && (

                <div>
                    <div className="col-10 justify-content-center mx-auto my-4 py-md-4 row text-center">
                        <input type="search" value={search} className="form-control" placeholder="Pesquise por nome e setor do membro da equipe" aria-label="Search" onChange={handleChange} />
                    </div>

                    <h1>Estou na página tarefas</h1>
                    <div className="row row-cols-1 row-cols-md-2 mb-3 text-center">
                        {usuarios.filter(usuario => {
                            return usuario.nome.toLowerCase().includes(search) || usuario.setor.toLowerCase().includes(search) || tarefas.flat().includes(search)
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
                                            <div className="d-flex flex-column form-check form-switch mb-3">
                                                {usuario.tarefas.map((tarefa, index) => {
                                                    return (
                                                        <div className="d-flex justify-content-between" key={index} name={index}>
                                                            <input className="col-1 form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                                            <span className="col-9 form-check-label" htmlFor="flexSwitchCheckDefault">
                                                                {tarefa.nome}
                                                            </span>
                                                            <button name={usuario._id} className="col-1" onClick={handleDelete}><i className="bi bi-trash"></i></button>
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