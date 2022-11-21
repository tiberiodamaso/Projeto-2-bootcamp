import axios from "axios";
import toast from "react-hot-toast";
import { useDrag } from "react-dnd";

function Task(props) {
  const { tarefa, index, usuario, handleReload } = props;

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "task",
      item: { tarefa },
      collect: (monitor) => {
        // console.log(monitor.getItem());
        return {
          opacity: monitor.isDragging() ? 0.5 : 1,
        };
      },
    }),
    []
  );

  async function handleDelete(e) {
    try {
      const index = e.currentTarget.parentElement.getAttribute("name");
      const usuarioId = e.currentTarget.name;
      const response = await axios.get(
        `https://ironrest.herokuapp.com/todo92/${usuarioId}`
      );
      const usuario = response.data;
      const clone = { ...usuario };
      delete clone._id;
      clone.tarefas.splice(index, 1);
      await axios.put(
        `https://ironrest.herokuapp.com/todo92/${usuarioId}`,
        clone
      );
      handleReload();
    } catch (error) {
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
