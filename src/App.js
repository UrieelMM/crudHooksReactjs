import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  // Tareas
  const agregarTarea = (event) => {
    event.preventDefault();

    if (!tarea.trim()) {
      setError('Por favor escriba una Tarea...')
      return;
    }
    setTareas([
      ...tareas,
      {
        id: shortid.generate(),
        nombreTarea: tarea,
      },
    ]);
    // Reiniciar input de tarea
    setTarea("");
    setError(null);
  };

  // Eliminar tarea
  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);

    setTareas(arrayFiltrado);
  };

  // Editar tarea
  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editarTarea = (event) => {
    event.preventDefault();
    if (!tarea.trim()) {
      setError('Por favor escriba una Tarea...')
      return;
    }
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">CRUD</h1>
      <div className="row">
        <div className="col-8 col-sm-6">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 
              ?
              <li className="list-group-item">No hay Tareas</li>
              : 
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4 col-sm-6">
          <h4 className="text-center">
            {modoEdicion ? <h4>Editar Tarea</h4> : <h4>Agregar Tarea</h4>}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <h4 className="text-danger">{error}</h4> : null
            }
            <input
              onChange={(event) => setTarea(event.target.value)}
              value={tarea}
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
            />
            {modoEdicion 
                ? 
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
                : 
              <button className="btn btn-success btn-block" type="submit">
                Agregar
              </button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
