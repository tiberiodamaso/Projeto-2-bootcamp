import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function CadastrarUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    setor: "",
    foto: "",
    tarefas: [],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(){
    const nome = form.nome;
    const reNome = /^[a-z ,.'-]+$/i;
    if (!reNome.test(nome)){
      toast.error("Digite um nome válido!");
      return false;
    }

    const setor = form.setor;
    if (!reNome.test(setor)){
      toast.error("Digite um nome de setor válido!");
      return false;
    }

    const email = form.email;
    const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!reEmail.test(email)){
      toast.error("Digite um email válido!");
      return false;
    }

    const link = form.foto
    const reLink = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (!reLink.test(link)){
      toast.error("Digite uma URL válida!");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      await axios.post("https://ironrest.herokuapp.com/todo92", form);
      setForm({
        nome: "",
        email: "",
        setor: "",
        foto: "",
        tarefas: [],
      });
      toast.success("Usuário adicionado com sucesso!");
      navigate('/equipe');
    }


  }

  return (
    <article>
      <div className="align-content-center flex-column justify-content-center m-0 py-2 row">
        <div className="bg-dark bg-opacity-10 col col-md-6 text-center">
          <h2 className="my-4">Cadastrar novo membro na equipe</h2>
        </div>
        <form className="border col-md-6 m-0 py-2 rounded-bottom">
          <div className="col mb-3">
            <label htmlFor="nome" className="form-label">Nome completo:</label>
            <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome sobrenome" />
          </div>
          <div className="col mb-3">
            <label htmlFor="setor" className="form-label">Setor:</label>
            <input type="text" className="form-control" name="setor" value={form.setor} onChange={handleChange} placeholder="Front-end" />
          </div>
          <div className="col mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="nome@example.com" />
          </div>
          <div className="col mb-3">
            <label htmlFor="foto" className="form-label"> foto: </label>
            <input type="text" className="form-control" name="foto" value={form.foto} onChange={handleChange} placeholder="http://url.da.foto" />
          </div>
          <div className="justify-content-between m-0 mx-auto my-4 row">
            <button className="btn btn-secondary col-5" onClick={()=>navigate('/equipe')}>Cancelar</button>
            <button className="btn btn-primary col-5" onClick={handleSubmit}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}

export default CadastrarUsuario;
