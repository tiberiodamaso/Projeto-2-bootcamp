import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDrop } from "react-dnd";

import Task from "./Task";

function Usuario(props) {
  const { usuario, handleReload } = props;

  const [tarefas, setTarefas] = useState(usuario.tarefas);


  const [collectedProps, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      adicionarTarefa(item.tarefa.nome, item.tarefa.feito);
      handleReload();
    },
  }));

  
  async function handleSubmit(e) {
    e.preventDefault();
    const caixa = e.currentTarget.previousSibling;
    caixa.value = caixa.value.trim();
    if (caixa.value.length === 0) {
      toast.error("Digite uma tarefa válida!");
      return false;
    }
    await adicionarTarefa(caixa.value);
    caixa.value = "";
    toast.success("Tarefa adicionada com sucesso.");
  }

  async function adicionarTarefa(nome, feito) {
    const usuarioId = usuario._id;
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/todo92/${usuarioId}`
      );
      const usuario = response.data;
      const clone = { ...usuario };
      delete clone._id;
      const tarefa = {
        nome: nome,
        feito: feito ?? false,
      };
      clone.tarefas.push(tarefa);
      await axios.put(
        `https://ironrest.herokuapp.com/todo92/${usuarioId}`,
        clone
      );
      setTarefas(clone.tarefas);
      handleReload();
    } catch (error) {
      console.log(error);
    }
  }

//   console.log(collectedProps)
  
  return (
    <div ref={drop} className="col">
      <div className="card mb-4 rounded-3 shadow-sm">
        {/* <!--CARD HEADER--> */}
        <div className="card-header py-3">
          <img
            className="border rounded-circle w-25"
            src={usuario.foto}
            alt="foto do usuário"
          />
          <h4 className="my-0 fw-normal">
            {usuario.nome} | {usuario.setor}{" "}
          </h4>
        </div>

        {/* <!--CARD BODY--> */}
        <div className="card-body">
          {/* <!--TASKS--> */}
          <div className="d-flex flex-column form-check form-switch mb-3">
            {tarefas.map((tarefa, index) => (
              <Task
                key={index}
                tarefa={tarefa}
                index={index}
                usuario={usuario}
                handleReload={handleReload}
                setTarefas={setTarefas}
              />
            ))}
          </div>

          {/* <!--ADD TASK--> */}
          <form>
            <div className="d-flex justify-content-evenly mb-3">
              <textarea
                type="text"
                className="form-control mx-3"
                id="adicionarTarefa"
                placeholder="Minha nova tarefa"
                name="textArea"
              ></textarea>
              <button
                id={usuario._id}
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
