
import React, {useEffect, useState} from "react";
import './TodoList.css'
import image from "./assets/images/icon.png"

function TodoList(){

    const listaStorage = localStorage.getItem('lista');


    const [lista,setLista] = useState( listaStorage ? JSON.parse(listaStorage) : []);
    const[novoItem, setNovoItem] = useState("");


    useEffect(()=>{
        localStorage.setItem('lista',  JSON.stringify(lista))

    }, [lista])




    function adicionarItem(form){
        form.preventDefault();

        if (!novoItem){
            return; 
            
        }
        setLista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById("inputEntrada").focus();

    }

    function clicou(index){
        const listaAux =  [...lista ];
        listaAux[index].isCompleted = !listaAux[index].isCompleted
        setLista(listaAux)
    }

    function deleta(index){

        const listaAux = [...lista]
        listaAux.splice(index,1)
        setLista(listaAux)
        

    }


    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionarItem}>
                <input 
                id="inputEntrada"
                value={novoItem} 
                onChange={(e)=>{setNovoItem(e.target.value)}} type="text" placeholder="Digite a sua tarefa...."/>
                <button type="submit" className="add" >Add</button>
            </form>
            <div className="listaTarefas" >
                {
                    lista.length < 1
                    ?
                    <img src={image} className="ListIllust" />
                    : 
                    lista.map((item,index)=>( 
                    <div key={index} id="itemList" className={item.isCompleted ? "item completo" : "item"} 
                    >
                        <span onClick={()=>{clicou(index)}} >
                            {item.text}
                        </span  >
                        <button onClick={()=>{deleta(index)}}  className="del"  >Deletar</button>
                    </div>))
                   
                }
                {
                    lista.length > 0 &&
                    <button className="deletAll" onClick={()=>{setLista([])}} >Deletar todos</button>

                }

               
                    

               
            </div>
        </div>
    )
}

export default TodoList