import axios from "axios";
import toast from "react-hot-toast";
import { DragPreviewImage, useDrag } from "react-dnd";
import DeleteTimer from "./DeleteTimer";
import moveImg from '../assets/move.png';

function Task(props) {
  const { tarefa, index, usuario, handleReload, setTarefas } = props;

  const [{ isDragging, opacity}, dragRef, preview] = useDrag(
    () => ({
      type: "task",
      item: { tarefa },
      end: ((item, monitor) => {
        
        if (monitor.didDrop()) {
          deleteItem(index);
        }
      }),
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.2 : 1,
        isDragging: monitor.isDragging()
      }),
      }),
    [tarefa]
  );

  let border 
  if (isDragging) {
    border = '1px dashed gray'
  } 


  
  /*
  async function handleDelete(e) {
    const eventIndex = e.currentTarget.parentElement.getAttribute("name");
    deleteItem(eventIndex);
  }
  */
 
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

  async function handleChange(e) {
        // const tarefa = e.currentTarget.nextElementSibling;
        // tarefa.classList.toggle("text-decoration-line-through");
        const usuarioId = usuario._id;
        try {
            const response = await axios.get(
                `https://ironrest.herokuapp.com/todo92/${usuarioId}`
            );
            const usuario = response.data;
            const clone = { ...usuario };
            delete clone._id;
            if (clone.tarefas[index].feito === false) {
                clone.tarefas[index].feito = true;
            } else {
                clone.tarefas[index].feito = false;
            }
            await axios.put(
                `https://ironrest.herokuapp.com/todo92/${usuarioId}`,
                clone
            );
            setTarefas(clone.tarefas);
            toast.success("Tarefa atualizada com sucesso!");
            handleReload();
        } catch (error) {
            console.log(error);
            toast.error("Algo deu errado");
        }
  }
  
  return (
    <>
    <DragPreviewImage connect={preview} src={moveImg} />
    <div ref={dragRef} className="d-flex justify-content-between shadow-sm p-2 m-3 bg-body rounded" name={index} style={{ opacity, border }}>
      <div className="d-flex flex-column form-check form-switch">
      <input
        className="col-1 form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={tarefa.feito}
        onChange={handleChange}
      />
      </div>
        <span
        className={"col-9 form-check-label text-start " + (tarefa.feito ? 'text-decoration-line-through' : '')}
        htmlFor="flexSwitchCheckDefault"
      >
      {tarefa.nome}
      </span>
      
      <DeleteTimer delFunction={deleteItem} index={index} />

      
    </div>
    </>
  );
}

export default Task;
