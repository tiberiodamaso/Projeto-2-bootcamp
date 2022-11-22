import { useState } from 'react';



function DeleteTimer({delFunction, index}) {
    
    const timer = 2;
    const [counter, setCounter] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [showDelete, setShowDelete] = useState(true)

    function startTime(){
        const myInterval = setInterval(() => {
            setIntervalId(myInterval);
            setCounter((prevTime) => prevTime + 1);                       
        }, 1000);
        setShowDelete(false);
    }

    function handleDelete(){
        
        //function delete
        delFunction(index);  
        stopTime();
    }

    function stopTime(){
        clearInterval(intervalId);
        setCounter(0);
        setShowDelete(true);
    }

  return (
        <>          
            {counter>timer && handleDelete()}    
                       
                {!showDelete &&  (
                    <div onClick={()=>{stopTime()}} style={{width:"30px", textAlign: "center"}}>
                    
                    <i className="bi bi-x-circle text-danger"></i>
                    <div className="progress" style={{height: "1px"}}>
                        <div className="progress-bar bg-danger" role="progressbar" style={{width: `${counter*50}%`}} aria-valuenow={counter} aria-valuemin="0" aria-valuemax={timer}></div>
                    </div>
                    </div>
                    )                   
                }
                
                
                {showDelete && (
                    <div>
                    <button className="btn text-danger p-0" onClick={()=>{startTime()}}><i className="bi bi-trash"></i></button>                    
                    </div>
                )}
  
        </>
  )
}

export default DeleteTimer;