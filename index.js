let data = [];

document.addEventListener("DOMContentLoaded", () => {
  pintar();
  filtrar()
});

const limpiar = () => {
  document.querySelector("#nombre").value = "";
  document.querySelector("#propietario").value = "";
  document.querySelector("#telefono").value = "";
  document.querySelector("#tipo").value = "0";
  document.querySelector("#fecha").value = "";
  document.querySelector("#hora").value = "";
  document.querySelector("#sintomas").value = "";

};

let animals = [
  { nombre: "mamifero", img: "http://www.anipedia.net/imagenes/ciervos-animales-mamiferos.jpg" },
  { nombre: "reptil", img: "https://concepto.de/wp-content/uploads/2019/03/serpiente-azul-e1553039545947-800x400.jpg" },
  { nombre: "anfibio", img: "https://www.ejemplos.co/wp-content/uploads/2016/09/ranas-genes-min-e1507319541109.jpg" },
  { nombre: "ave", img: "https://humanidades.com/wp-content/uploads/2017/03/pajaro-azul-e1563758291533.jpg" },
  { nombre: "pez", img: "https://images.hola.com/imagenes/estar-bien/20201021177701/pez-betta-caracteristicas-cuidados/0-880-714/pez-betta-t.jpg?tx=w_680" },
]

function pintar() {
  let fragment = document.createDocumentFragment();
  data.forEach((d, i) => {
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class", "citas");

    let foto = document.createElement("img");
    foto.classList.add("foto");

    let detallesContainer = document.createElement("div");
    detallesContainer.classList.add("detalles-container");

    const crearDetalles = (label, text) => {
      const p = document.createElement("p");
      const labelSpan = document.createElement("span");
      labelSpan.textContent = label;
      labelSpan.classList.add("label");
      p.appendChild(labelSpan);
      p.appendChild(document.createTextNode(text));
      return p;
    };

    if (d.tipo && animals.find((animal) => animal.nombre === d.tipo)) {
      const animal = animals.find((animal) => animal.nombre === d.tipo);
      foto.src = animal.img;
    }

    detallesContainer.appendChild(crearDetalles("Nombre: ", d.nombre));
    detallesContainer.appendChild(crearDetalles("Tipo: ", d.tipo));
    detallesContainer.appendChild(crearDetalles("Propietario: ", d.propietario));
    detallesContainer.appendChild(crearDetalles("Telefono: ", d.telefono));
    detallesContainer.appendChild(crearDetalles("Fecha: ", d.fecha));
    detallesContainer.appendChild(crearDetalles("Hora: ", d.hora));
    detallesContainer.appendChild(crearDetalles("Síntomas: ", d.sintomas));

    let btEditar = document.createElement("button");
    let btBorrar = document.createElement("button");
    let select = document.createElement("select");
    select.id = "select"

    let opcion1 = document.createElement("option")
    opcion1.id = "enProceso"
    opcion1.text = "En proceso"
    opcion1.value = "enProceso"
    select.add(opcion1)

    let opcion2 = document.createElement("option")
    opcion2.text = "Terminada"
    opcion2.value = "Terminada"
    select.add(opcion2)

    let opcion3 = document.createElement("option")
    opcion3.text = "Anulada"
    opcion3.value = "Anulada"
    select.add(opcion3)

      btEditar.textContent = "Editar";
      btEditar.setAttribute("data-bs-toggle", "modal");
      btEditar.setAttribute("data-bs-target", "#exampleModal");
      btEditar.addEventListener("click", () => {
        editar(d);
      });
      btBorrar.textContent = "Borrar";
      btBorrar.addEventListener("click", () => {
        eliminar(i);
      });


      let botonesContainer = document.createElement("div");
      botonesContainer.classList.add("botones-container");
      botonesContainer.appendChild(btEditar);
      botonesContainer.appendChild(btBorrar);
      botonesContainer.appendChild(select);

      contenedor.appendChild(foto);
      contenedor.appendChild(detallesContainer);
      contenedor.appendChild(botonesContainer);
      fragment.appendChild(contenedor);

    });
    document.getElementById("contenedor").appendChild(fragment);
  }

  function mostrarTodasLasTarjetas() {
    const cartas = document.querySelectorAll(".citas");
    cartas.forEach((i) => {
      i.style.display = "block"; 
    });
  }

  function filtrarPorEstado() {
    const estadoSeleccionado = document.getElementById("check").value;
    if (estadoSeleccionado === "todas") {
      mostrarTodasLasTarjetas(); 
      return;
    }
    const cartas = document.querySelectorAll(".citas");
  cartas.forEach((i) => {
    const estadoTexto = i.getElementById("select").value;
    if (estadoTexto === estadoSeleccionado) {
      i.style.display = "block";
    } else {
      i.style.display = "none";
    }
  });
}

let bd = 0;
let c = 0;
let id = 0;

function horario() {
  var horaInput = document.getElementById("hora").value;
  var horaIngresada = new Date();
  horaIngresada.setHours(parseInt(horaInput.substr(0, 2)), parseInt(horaInput.substr(3, 2)));
  var horaMinima = new Date();
  horaMinima.setHours(8, 0, 0); // Hora mínima: 8 AM
  var horaMaxima = new Date();
  horaMaxima.setHours(20, 0, 0); // Hora máxima: 8 PM

  if (horaIngresada < horaMinima || horaIngresada > horaMaxima) {
    return true;
  }

}

function valid() {
  if (document.getElementById("nombre").value.trim() === "") {
    document.getElementById("p1").style.display = "block";
    setTimeout(() => {
      document.getElementById("p1").style.display = "none";
    }, 3000);
  } else if (document.getElementById("propietario").value.trim() === "") {
    document.getElementById("p2").style.display = "block";
    setTimeout(() => {
      document.getElementById("p2").style.display = "none";
    }, 3000);
  } else if (document.getElementById("telefono").value.trim() === "") {
    document.getElementById("p3").style.display = "block";
    setTimeout(() => {
      document.getElementById("p3").style.display = "none";
    }, 3000);
  } else if (document.getElementById("telefono").value.length < 10) {
    document.getElementById("p4").style.display = "block";
    setTimeout(() => {
      document.getElementById("p4").style.display = "none";
    }, 3000);
  } else if (document.getElementById("tipo").value === "0") {
    document.getElementById("p5").style.display = "block";
    setTimeout(() => {
      document.getElementById("p5").style.display = "none";
    }, 3000);
  } else if (document.getElementById("fecha").value.trim() === "") {
    document.getElementById("p6").style.display = "block";
    setTimeout(() => {
      document.getElementById("p6").style.display = "none";
    }, 3000);
  } else if (new Date(document.getElementById("fecha").value) <= new Date()) {
    document.getElementById("p7").style.display = "block";
    setTimeout(() => {
      document.getElementById("p7").style.display = "none";
    }, 3000);
  } else if (document.getElementById("hora").value.trim() === "") {
    document.getElementById("p8").style.display = "block";
    setTimeout(() => {
      document.getElementById("p8").style.display = "none";
    }, 3000);
  } else if (horario() === true) {
    document.getElementById("p9").style.display = "block";
    setTimeout(() => {
      document.getElementById("p9").style.display = "none";
    }, 3000);
  } else if (document.getElementById("sintomas").value.trim() === "") {
    document.getElementById("p10").style.display = "block";
    setTimeout(() => {
      document.getElementById("p10").style.display = "none";
    }, 3000);
  } else {
    document.getElementById("p11").style.display = "block";
    setTimeout(() => {
      document.getElementById("p11").style.display = "none";
    }, 3000);
    return true;
  }
}

function guardar() {
  if (valid() === true) {
    if (bd == 1) {
      data.forEach((e, i) => {
        if (e.id === id) {
          e.nombre = document.getElementById("nombre").value;
          e.propietario = document.getElementById("propietario").value;
          e.telefono = document.getElementById("telefono").value;
          e.tipo = document.getElementById("tipo").value;
          e.fecha = document.getElementById("fecha").value;
          e.hora = document.getElementById("hora").value;
          e.sintomas = document.getElementById("sintomas").value;
        }
      });
    } else {
      data.push({
        id: data.length + 1,
        nombre: document.getElementById("nombre").value,
        propietario: document.getElementById("propietario").value,
        telefono: document.getElementById("telefono").value,
        tipo: document.getElementById("tipo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        sintomas: document.getElementById("sintomas").value,
      });
      console.log(data);
      limpiar()
      document.getElementById("agendarCita").setAttribute = ("data-bs-dismiss", "modal")
    }
    document.getElementById("contenedor").innerHTML = "";
    pintar();
  }
}

function editar(r) {
  bd = 1;
  console.log(r);
  id = r.id;
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("propietario").value = r.propietario;
  document.getElementById("telefono").value = r.telefono;
  document.getElementById("tipo").value = r.tipo;
  document.getElementById("fecha").value = r.fecha;
  document.getElementById("hora").value = r.hora;
  document.getElementById("sintomas").value = r.sintomas;
}

function crear() {
  limpiar();
  bd = 0;
  document.getElementById("id").value = data[data.length - 1].id + 1;
}

function eliminar(i) {
  data.splice(i, 1);

  document.getElementById("contenedor").innerHTML = "";
  pintar();
}

console.log(data);