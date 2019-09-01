import React, {useState, Fragment, useEffect} from 'react';

function Cita({cita, index, eliminarCita}) {
  return(
    <div className="cita">
      <p>Nombre de la Mascota : <span>{cita.mascota}</span> </p>
      <p>Dueño : <span>{cita.propietario}</span></p>
      <p>Fecha : <span>{cita.fecha}</span></p>
      <p>Hora : <span>{cita.hora}</span></p>
      <p>Sintomas : <span>{cita.sintomas}</span></p>
      <button 
        onClick={() => eliminarCita(index)}
        type='button' className='button eliminar u-full-width'>
          Eliminar Esta Cita  "X"
      </button>

    </div>
   
  );
}


function Formulario ({crearCita}) {
  const stateInicial= {
    mascota:'',
    propietario: '',
    fecha:'',
    hora:'',
    sintomas:'',

  }


  const [cita, actualizaCita]= useState(stateInicial); 
  const actualizarState = e => {
    actualizaCita({
      ...cita,
      [e.target.name] : e.target.value
    })
    
  }
  const enviarCita = e => {
    e.preventDefault();
    //llenar el state principal
    crearCita(cita)

    // reiniciar el formulario
    actualizaCita(stateInicial);

  }
  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form
        onSubmit={enviarCita}
      >
            <label>Nombre Mascota</label>
            <input 
              type="text" 
              name="mascota"
              className="u-full-width" 
              placeholder="Nombre Mascota"
              onChange={actualizarState}
              value={cita.mascota}
            />

            <label>Nombre Dueño</label>
            <input 
              type="text" 
              name="propietario"
              className="u-full-width"  
              placeholder="Nombre Dueño de la Mascota" 
              onChange={actualizarState}
              value={cita.propietario}
            />

            <label>Fecha</label>
            <input 
              type="date" 
              className="u-full-width"
              name="fecha"
              onChange={actualizarState}
              value={cita.fecha}
            />               

            <label>Hora</label>
            <input 
              type="time" 
              className="u-full-width"
              name="hora" 
              onChange={actualizarState}
              value={cita.hora}
            />

            <label>Sintomas</label>
            <textarea 
              className="u-full-width"
              name="sintomas"
              onChange={actualizarState}
              value={cita.sintomas}
            ></textarea>

            <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  );
}
// CARGAR LA INFORMACION DE LOCALSTORAGE
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
     if(!citasIniciales) {
      citasIniciales= [] 
    } 

function App() {
  
  const [citas, guardarCItas]= useState(citasIniciales); 
   /// Recibir informacion del formulario
  
   const crearCita = cita => {
    // Tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas=[...citas,cita];
    //Almacenamos en el state
    guardarCItas(nuevasCitas);

  }

  // eliminamos la cita... 
  const eliminarCita = index =>{
    const citasState= [...citas];
    citasState.splice(index, 1)
    guardarCItas(citasState)

    
  }

  /// almacenar en localStorage
  useEffect(
    () => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(citasIniciales) {
          localStorage.setItem('citas', JSON.stringify(citas));
        } else {
          localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas] )

  /// mostramos un mensaje condicional 
  let titulo= Object.keys(citas).length ===0 ? 'No hay citas' : 'Administra las citas aqui';
  /*if (citas.length === 0){
    titulo='NO HAY CITAS'
  } else {
    titulo= ' Administras las Citas Aquí'
  }*/
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map((cita, index) => (
                <Cita 
                  cita={cita}
                  indice={index}
                  key={index}
                  eliminarCita={eliminarCita}

                />
              ))}
            

            </div>
          </div>
        </div>
    </Fragment>
  )
}

export default App;
