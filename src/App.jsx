import React, { useState } from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion,setmodoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Campo vacio')
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      { id: shortid.generate(), nombreTarea: tarea }
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item =>{
    setmodoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
    
  }

  const editarTarea = e =>{
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Campo vacio')
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? {id, nombreTarea:tarea} : item
      )
      setTareas(arrayEditado)
      setmodoEdicion(false)
      setTarea('')
      setId('')
      setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">TodoList</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tares</h4>
          <ul className="list-group">

          { tareas.length === 0 ?(
              <li className="list-group-item">No hay tareas</li>
            ) : 
                (
                  tareas.map(item => (
                      <li className="list-group-item" key={item.id}>
                            <span className="lead">{item.nombreTarea}</span>
            
                            <button
                              className="btn btn-danger btn-sm float-right mx-2"
                              onClick={() => eliminarTarea(item.id)}
                            >Eliminar</button>
            
                            <button
                              className="btn btn-warning btn-sm float-right"
                              onClick={()=>editar(item)}
                            >Editar</button>      
                      </li>
                    )
                  )
                )
          }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
                {
                  modoEdicion ? 'Editar tarea' : 'Agregar tarea'
                }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            {
                error ? <span className="text-danger">{error}</span> : null
            }

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
                     
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
