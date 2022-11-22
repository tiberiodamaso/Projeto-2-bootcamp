import axios from "axios";
import toast from "react-hot-toast";
import { useDrag } from "react-dnd";
import DeleteTimer from "./DeleteTimer";

function Task(props) {
    const { tarefa, index, usuario, handleReload, setTarefas } = props;

    const [{ dnd }, dragRef] = useDrag(
        () => ({
            type: "task",
            item: { tarefa },
            end: ((item, monitor) => {
                console.log(dnd);
                if (monitor.didDrop()) {
                    deleteItem(index);
                }
            })
        }),
        []
    );

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
            if (clone.tarefas[index].feito === "" || clone.tarefas[index].feito === "0") {
                clone.tarefas[index].feito = '1';
            } else {
                clone.tarefas[index].feito = "0";
            }
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

    return (
        <div ref={dragRef} className="d-flex justify-content-between" name={index}>
            <input
                className="col-1 form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={handleChange}
            />
            {tarefa.feito === "1" && (
                <span className='col-9 form-check-label text-start text-decoration-line-through'
                    htmlFor="flexSwitchCheckDefault"
                >
                    {tarefa.nome}
                </span>
            )}
            {tarefa.feito === "" || tarefa.feito === '0' && (
                <span className='col-9 form-check-label text-start'
                    htmlFor="flexSwitchCheckDefault"
                >
                    {tarefa.nome}
                </span>
            )}

            <DeleteTimer delFunction={deleteItem} index={index} />


        </div>
    );
}

export default Task;
