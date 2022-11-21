import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

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
                setTarefas(response.data.map(usuario => {
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
    }, [reload])

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleChange(e) {
        console.log(e.target.checked)
        const tarefa = e.currentTarget.nextElementSibling
        tarefa.classList.toggle('text-decoration-line-through')
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const caixa = e.currentTarget.previousSibling
        const usuarioId = e.target.id
        try{
            const response = await axios.get(`https://ironrest.herokuapp.com/todo92/${usuarioId}`)
            const usuario = response.data
            const clone = { ...usuario }
            delete clone._id
            const tarefa = {
                nome: caixa.value,
                feito: ''
            }
            clone.tarefas.push(tarefa)
            await axios.put(`https://ironrest.herokuapp.com/todo92/${usuarioId}`, clone)
            caixa.value = ''
            toast.success('Tarefa adicionada com sucesso.')
            handleReload()

        } catch (error){
            console.log(error)
        }

    }


    function handleReload() {
        setReload(!reload)
    }

    async function handleDelete(e) {
        try {
            const index = e.currentTarget.parentElement.getAttribute('name')
            const usuarioId = e.currentTarget.name
            const response = await axios.get(`https://ironrest.herokuapp.com/todo92/${usuarioId}`)
            const usuario = response.data
            const clone = { ...usuario }
            delete clone._id
            clone.tarefas.splice(index, 1)
            await axios.put(`https://ironrest.herokuapp.com/todo92/${usuarioId}`, clone)
            handleReload()
        } catch (error) {
            toast.error('Algo deu errado')

        }
    }

    return (

        <main>

            {isLoading === false && (

                <div>
                    <div className="col-10 justify-content-center mx-auto my-4 py-md-4 row text-center">
                        <input type="search" value={search} className="form-control" placeholder="Pesquise por nome e setor do membro da equipe" aria-label="Search" onChange={handleSearch} />
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
                                            <img className='border rounded-circle w-25' src={usuario.foto} alt='foto do usuário' />
                                            <h4 className="my-0 fw-normal">{usuario.nome} | {usuario.setor} </h4>
                                        </div>

                                        {/* <!--CARD BODY--> */}
                                        <div className="card-body">

                                            {/* <!--TASKS--> */}
                                            <div className="d-flex flex-column form-check form-switch mb-3">
                                                {usuario.tarefas.length > 0 && usuario.tarefas.map((tarefa, index) => {
                                                    if (tarefa.nome.length > 0) {
                                                    return (
                                                        <div className="d-flex justify-content-between" key={index} name={index}>
                                                            <input className="col-1 form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChange} />
                                                                <span className="col-9 form-check-label text-start" htmlFor="flexSwitchCheckDefault">
                                                                    {tarefa.nome}
                                                                </span>
                                                            <button name={usuario._id} className="btn text-danger p-0" onClick={handleDelete}><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    )
                                                    }

                                                })}

                                            </div>

                                            {/* <!--ADD TASK--> */}
                                            <form>
                                                <div className="d-flex justify-content-evenly mb-3">
                                                
                                                    <textarea type="text" className="form-control mx-3" id="adicionarTarefa"
                                                        placeholder="Minha nova tarefa" name="textArea" ></textarea>
                                                    <button id={usuario._id} type="button" className="btn btn-outline-primary" onClick={handleSubmit}>ADD</button>
                                                
                                                </div>
                                            </form>
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