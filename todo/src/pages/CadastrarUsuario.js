import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function CadastrarUsuario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    setor: "",
    foto: "",
    tarefas: [
      {
        nome: "",
        feito: "",
        data_conclusao: "",
      },
    ],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    console.log("entre no handle submit");
    console.log(form);
    e.preventDefault();
    await axios.post("https://ironrest.herokuapp.com/todo92", form);
    setForm({
      nome: "",
      email: "",
      setor: "",
      foto: "",
      tarefas: [
        {
          nome: "",
          feito: "",
          data_conclusao: "",
        },
      ],
    });
    toast.success("Usuário adicionado com sucesso!");
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
            <button className="btn btn-secondary col-5">Cancelar</button>
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
