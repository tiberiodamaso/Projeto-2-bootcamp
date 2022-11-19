import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Equipe() {

  const [equipe,  setEquipe] = useState([]);

  useEffect(() => {
    async function fetchEquipe() {
      try {
        const response = await axios.get('https://ironrest.herokuapp.com/todo92/');
        setEquipe(response.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchEquipe()
    
  }, [])


  return ( 
    <div>
      <h1>Equipe</h1>

      <article>
              <div className="row border m-0 py-2 bg-dark bg-opacity-10">
                <div className="col-md-2 py-1 text-center">
                  <span></span>
                </div>
                <div className="col-md-4 py-1 text-md-start">
                  <span>Usuário</span>
                </div>
                <div className="col-md-2 py-1 text-center">
                  <span>Setor</span>
                </div>
                <div className="col-md-2 py-1 text-center">
                  <span>Tarefas</span>
                </div>
                <div className="col-md-2 py-1 text-center">
                  <span>Ações</span>
                </div>
              </div>

      {equipe.map((usuario)=>{
          return (

    
              
                <div key={usuario._id} className="row border m-0 py-2 align-items-center">
                  <div className="col-md-2 py-1 text-center">
                    <span><img src={usuario.foto} alt="foto-perfil" width="40px" style={{borderRadius: "50%", border: "1px solid #cccccc"}}/></span>
                  </div>
                  <div className="col-md-4 py-1 text-md-start">
                    <span>{usuario.nome}</span>
                  </div>
                  <div className="col-md-2 py-1 text-center">
                    <span>{usuario.setor}</span>
                  </div>
                  <div className="col-md-2 py-1 text-center">
                    <span>{usuario.tarefas.length}</span>
                  </div>
                  <div className="col-md-2 py-1 text-center">
                    <Link to={`/equipe/${usuario._id}`}>+detalhes</Link>
                  </div>
                </div>
   
              
            

          )
              

      })}
          <div className="align-items-center m-0 mx-auto my-4 row w-25">
            <button className="btn btn-primary">Novo membro</button>
          </div>
          </article>
    </div>
   );
}

export default Equipe;