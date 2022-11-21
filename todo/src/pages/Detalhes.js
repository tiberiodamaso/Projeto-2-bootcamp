import {useState, useEffect} from "react"; 
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";



function Detalhes(){

    const {id} = useParams();
    const [reload, setReload] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [form, setForm] = useState({
        nome: "",
        email: "",
        setor: "",
        foto: ""
    });
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchUsuarioId(){
            const response = await axios.get(`https://ironrest.herokuapp.com/todo92/${id}`);
            setUsuario(response.data);
            setForm(response.data);
        }
        fetchUsuarioId();
    },[id, reload]);

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const clone = {...form};
            delete clone._id;
            await axios.put(`https://ironrest.herokuapp.com/todo92/${id}`, clone);
         
            setReload(!reload);
            setShowForm(false);
            toast.success("Usuário atualizado com sucesso!");
            
        } catch (error) {
            console.log(error); 
            toast.error("Erro na atualização do usuário");
        }
    }

    return (
        <div>
            <h1>Equipe</h1>

            {!showForm && (

            <article>
            <div className="align-content-center m-0 py-3 row">
                <div className="col col-md-3 text-center">
                    <img src={usuario.foto} alt="foto-usuario" width="200px" height="200px" style={{borderRadius: "50%", border: "1px solid #cccccc", margin: "10px"}}/>
                </div>
                
                <div className="border col-md-6 m-0 py-2 rounded-bottom">
                    <div className="col mb-3">
                        <label className="form-label">Nome completo:</label>
                        <p className="fw-bold fs-3">{usuario.nome}</p>
                    </div>

                    <div className="col mb-3">
                        <label className="form-label">Setor:</label>
                        <p className="fw-bold">{usuario.setor}</p>
                    </div>

                    <div className="col mb-3">
                        <label className="form-label">Email:</label>
                        <p className="fw-bold">{usuario.email}</p>
                    </div>

                    
                
                    <div className="justify-content-between m-0 mx-auto my-4 row">
                        <button className="btn btn-secondary col-3" onClick={()=>{navigate("/equipe")}}>Voltar</button>
                        <button className="btn btn-primary col-3" onClick={()=>{setShowForm(true)}}>Atualizar</button>
                        <button className="btn btn-danger col-3">Deletar</button>
                    </div>
                </div>
            </div>
            </article>        


            )}



            {showForm && (

            <article>
            <div className="align-content-center flex-column justify-content-center m-0 py-2 row">
                <div className="bg-dark bg-opacity-10 col col-md-6 text-center">
                    <h2 className="my-4">Atualizar membro na equipe</h2>
                </div>
                
                <form className="border col-md-6 m-0 py-2 rounded-bottom">
                    <div className="col mb-3">
                        <label className="form-label">Nome completo:</label>
                        <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome sobrenome" />
                    </div>

                    <div className="col mb-3">
                        <label className="form-label">Setor:</label>
                        <input type="text" className="form-control" name="setor" value={form.setor} onChange={handleChange} placeholder="Front-end" />
                    </div>

                    <div className="col mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="nome@example.com" />
                    </div>

                    <div className="col mb-3">
                        <label className="form-label">foto:</label>
                        <input type="text" className="form-control" name="foto" value={form.foto} onChange={handleChange} placeholder="http://url.da.foto" />
                    </div>
                
                    <div className="justify-content-between m-0 mx-auto my-4 row">
                        <button className="btn btn-secondary col-5" onClick={()=>{setShowForm(false)}}>Cancelar</button>
                        <button className="btn btn-primary col-5" onClick={handleSubmit}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
            </article>                 

            )}

            
        </div>
    )
};

export default Detalhes;