import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [estudiantes, setEstudiantes] = useState(() => {
    const guardados = localStorage.getItem('estudiantes')
    return guardados ? JSON.parse(guardados) : []
  })
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [carrera, setCarrera] = useState('')

  useEffect(() => {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes))
  }, [estudiantes])

  const registrarEstudiante = () => {
    if (nombre.trim() === '' || codigo.trim() === '' || carrera.trim() === '') return
    setEstudiantes([
      ...estudiantes,
      { id: Date.now(), nombre, codigo, carrera }
    ])
    setNombre('')
    setCodigo('')
    setCarrera('')
  }

  const eliminarEstudiante = (id) => {
    setEstudiantes(estudiantes.filter(e => e.id !== id))
  }

  return (
    <main className="contenedor">
      <h1>Gestión académica</h1>
      <p>Registro de estudiantes con React y Vite</p>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
        />
        <button onClick={registrarEstudiante}>Registrar</button>
      </div>

      <h2>Estudiantes registrados: {estudiantes.length}</h2>

      <ul>
        {estudiantes.map(e => (
          <li key={e.id}>
            <div className="datos">
              <strong>{e.nombre}</strong>
              <small>Código: {e.codigo} · {e.carrera}</small>
            </div>
            <button className="eliminar" onClick={() => eliminarEstudiante(e.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)