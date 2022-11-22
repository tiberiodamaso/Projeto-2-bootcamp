import axios from "axios";
import toast from "react-hot-toast";
import { useDrag } from "react-dnd";
import { cloneElement } from "react";

function Task(props) {
  const { tarefa, index, usuario, handleReload, setTarefas } = props;

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "task",
      item: { tarefa },
      end: ((item, monitor) => {
        if (monitor.didDrop()) {
          deleteItem(index);
        }
      })
      }),
    []
  );

  async function handleDelete(e) {
    const eventIndex = e.currentTarget.parentElement.getAttribute("name");
    deleteItem(eventIndex);
  }

  async function deleteItem(_index) {
    const usuarioId = usuario._id;
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/todo92/${usuarioId}`
      );
      const usuario = response.data;
      const clone = { ...usuario };
      delete clone._id;
      clone.tarefas.splice(_index, 1);
      await axios.put(
        `https://ironrest.herokuapp.com/todo92/${usuarioId}`,
        clone
      );
      setTarefas(clone.tarefas);
      handleReload();
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  }

  function handleChange(e) {
    const tarefa = e.currentTarget.nextElementSibling;
    tarefa.classList.toggle("text-decoration-line-through");
  }

  return (
    <div ref={dragRef} className="d-flex justify-content-between" name={index}>
      <input
        className="col-1 form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onChange={handleChange}
      />
      <span
        className="col-9 form-check-label text-start"
        htmlFor="flexSwitchCheckDefault"
      >
        {tarefa.nome}
      </span>
      <button
        name={usuario._id}
        className="btn text-danger p-0"
        onClick={handleDelete}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default Task;
